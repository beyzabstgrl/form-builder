const db = require('./db');

function insertForm(name, schema){
  const exists = db.prepare('SELECT id FROM forms WHERE name = ?').get(name);
  if(exists) return exists.id;
  const info = db.prepare('INSERT INTO forms (name, schema) VALUES (?, ?)').run(name, JSON.stringify(schema));
  return info.lastInsertRowid;
}

// Basic schema items for react-form-builder2
const contactSchema = [
  { id: 'hdr1', element: 'Header', text: 'İletişim Formu', static: true },
  { id: 'nm1', element: 'TextInput', label: 'Ad Soyad', required: true, placeholder: 'Adınızı giriniz' },
  { id: 'em1', element: 'TextInput', label: 'E-Posta', required: true, field_name: 'email', subtype: 'email', placeholder: 'mail@example.com' },
  { id: 'ph1', element: 'TextInput', label: 'Telefon', field_name: 'phone', subtype: 'tel', placeholder: '+90 5xx xxx xx xx' },
  { id: 'ms1', element: 'TextArea', label: 'Mesaj', required: true, placeholder: 'Mesajınız' }
];

const surveySchema = [
  { id: 'hdr2', element: 'Header', text: 'Memnuniyet Anketi', static: true },
  { id: 'rg1', element: 'RadioButtons', label: 'Hizmetten memnun kaldınız mı?', required: true, options: [
      { value: 'Evet', text: 'Evet' },
      { value: 'Hayır', text: 'Hayır' }
    ]
  },
  { id: 'ch1', element: 'Checkboxes', label: 'Hangi kanalları kullandınız?', options: [
      { value: 'Web', text: 'Web' },
      { value: 'Mobil', text: 'Mobil' },
      { value: 'Mağaza', text: 'Mağaza' }
    ]
  },
  { id: 'rt1', element: 'NumberInput', label: 'Genel puan (1-10)', required: true, min_value: 1, max_value: 10 },
  { id: 'tx1', element: 'TextArea', label: 'Öneri / Görüş', placeholder: 'Kısaca yazın' }
];



const ids = [
  insertForm('Örnek: İletişim Formu', contactSchema),
  insertForm('Örnek: Memnuniyet Anketi', surveySchema),

];

console.log('Seed tamamlandı, eklenen/varolan form idleri:', ids.join(', '));
process.exit(0);


