// seed.js
const db = require('./db');

function insertForm(name, schema) {
  const exists = db.prepare('SELECT id FROM forms WHERE name = ?').get(name);
  if (exists) return exists.id;
  const info = db
    .prepare('INSERT INTO forms (name, schema) VALUES (?, ?)')
    .run(name, JSON.stringify(schema));
  return info.lastInsertRowid;
}

// 📌 Örnek 1: İletişim Formu
const contactSchema = [
  { id: 'hdr1', element: 'Header', text: 'İletişim Formu', static: true },
  { id: 'nm1', element: 'TextInput', label: 'Ad Soyad', required: true, placeholder: 'Adınızı giriniz' },
  { id: 'em1', element: 'TextInput', label: 'E-Posta', required: true, field_name: 'email', subtype: 'email', placeholder: 'mail@example.com' },
  { id: 'ph1', element: 'TextInput', label: 'Telefon', field_name: 'phone', subtype: 'tel', placeholder: '+90 5xx xxx xx xx' },
  { id: 'ms1', element: 'TextArea', label: 'Mesaj', required: true, placeholder: 'Mesajınız' }
];

// 📌 Örnek 2: Memnuniyet Anketi
const surveySchema = [
  { id: 'hdr2', element: 'Header', text: 'Memnuniyet Anketi', static: true },
  {
    id: 'rg1',
    element: 'RadioButtons',
    label: 'Hizmetten memnun kaldınız mı?',
    required: true,
    field_name: 'memnuniyet',
    options: [
      { key: 'evet', value: 'Evet', text: 'Evet' },
      { key: 'hayir', value: 'Hayır', text: 'Hayır' }
    ]
  },
  {
    id: 'ch1',
    element: 'Checkboxes',
    label: 'Hangi kanalları kullandınız?',
    field_name: 'kanallar',
    options: [
      { key: 'web', value: 'Web', text: 'Web' },
      { key: 'mobil', value: 'Mobil', text: 'Mobil' },
      { key: 'magaza', value: 'Mağaza', text: 'Mağaza' }
    ]
  },
  {
    id: 'dd1',
    element: 'Dropdown',
    label: 'Hangi şehirde hizmet aldınız?',
    field_name: 'sehir',
    options: [
      { key: 'istanbul', value: 'İstanbul', text: 'İstanbul' },
      { key: 'ankara', value: 'Ankara', text: 'Ankara' },
      { key: 'izmir', value: 'İzmir', text: 'İzmir' }
    ]
  },
  { id: 'rt1', element: 'NumberInput', label: 'Genel puan (1-10)', required: true, min_value: 1, max_value: 10 },
  { id: 'tx1', element: 'TextArea', label: 'Öneri / Görüş', placeholder: 'Kısaca yazın' }
];

// 📌 Verileri ekle
const ids = [
  insertForm('Örnek: İletişim Formu', contactSchema),
  insertForm('Örnek: Memnuniyet Anketi', surveySchema),
]
