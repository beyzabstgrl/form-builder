require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const { z } = require('zod');
const errorHandler = require('./middleware/error');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT }));
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/', (req, res) => {
  res.json({
    service: 'Form API',
    endpoints: [
      'GET /health',
      'GET /forms',
      'POST /forms',
      'GET /forms/:id',
      'PUT /forms/:id',
      'POST /forms/:id/submissions',
      'GET /forms/:id/submissions'
    ]
  });
});


// ---- Forms ----
const formCreateSchema = z.object({
  name: z.string().min(1),
  schema: z.any() // react-form-builder2 JSON şeması
});

app.post('/forms', (req, res) => {
  const parsed = formCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const { name, schema } = parsed.data;

  const info = db.prepare('INSERT INTO forms (name, schema) VALUES (?, ?)').run(name, JSON.stringify(schema));
  res.status(201).json({ id: info.lastInsertRowid, name });
});

app.get('/forms', (req, res) => {
  const rows = db.prepare('SELECT id, name, created_at, updated_at FROM forms ORDER BY id DESC').all();
  res.json(rows);
});

app.get('/forms/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM forms WHERE id=?').get(req.params.id);
  if (!row) return res.status(404).json({ message: 'Form not found' });
  row.schema = JSON.parse(row.schema);
  res.json(row);
});

app.put('/forms/:id', (req, res) => {
  const parsed = formCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  const { name, schema } = parsed.data;

  const info = db.prepare(
    `UPDATE forms SET name=?, schema=?, updated_at=datetime('now') WHERE id=?`
  ).run(name, JSON.stringify(schema), req.params.id);

  if (!info.changes) return res.status(404).json({ message: 'Form not found' });
  res.json({ id: Number(req.params.id), name });
});

// ---- Submissions ----
app.post('/forms/:id/submissions', (req, res) => {
  const { data } = req.body || {};
  if (!data) return res.status(400).json({ message: 'data required' });

  const form = db.prepare('SELECT id FROM forms WHERE id=?').get(req.params.id);
  if (!form) return res.status(404).json({ message: 'Form not found' });

  const info = db.prepare('INSERT INTO submissions (form_id, data) VALUES (?, ?)').run(
    req.params.id, JSON.stringify(data)
  );
  res.status(201).json({ id: info.lastInsertRowid });
});

app.get('/forms/:id/submissions', (req, res) => {
  const rows = db.prepare('SELECT id, data, created_at FROM submissions WHERE form_id=? ORDER BY id DESC')
                 .all(req.params.id);
  res.json(rows.map(r => ({ ...r, data: JSON.parse(r.data) })));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));
