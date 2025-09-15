# 📝 Form Builder Projesi

React ve Node.js tabanlı dinamik form oluşturma uygulaması.  
Kullanıcılar sürükle-bırak yöntemiyle form alanları ekleyebilir, bu alanların etiketlerini (label), placeholderlarını ve özelliklerini düzenleyebilir.  
Oluşturulan formlar veritabanına kaydedilip düzenlenebilir, önizlenebilir ve sonrasında doldurulabilir.

---

## 🚀 Özellikler

- 🎨 **Sürükle-Bırak Form Tasarımı** – `react-form-builder2` kütüphanesi ile  
- ✏️ **Alan Düzenleme Paneli** – Her alan için:
  - Etiket (label)
  - Placeholder
  - Zorunlu/opsiyonel
  - Seçenek listeleri (dropdown / checkbox / radio)  
- 💾 **Form Kaydetme & Güncelleme** – Backend API üzerinden  
- 👀 **Form Önizleme** – Kaydedilen formu kullanıcıya doldurulabilir şekilde gösterme  
- 🎉 **Toast Bildirimleri** – Kaydetme/güncelleme sonrası kullanıcıya durum bildirimi  
- 🌑 **Koyu Tema Desteği** – Modern, dark UI görünümü  

---

## 🛠️ Kullanılan Teknolojiler

### Frontend
- [React](https://reactjs.org/)  
- [React Router DOM](https://reactrouter.com/)  
- [react-form-builder2](https://github.com/quri/react-form-builder)  
- Custom CSS (Dark Theme)  
- Toast Notification (custom)  

### Backend
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- SQLite (veya başka bir veritabanı kullanılabilir)  

API endpointleri:  
- `POST /forms` → Form oluştur  
- `GET /forms/:id` → Form getir  
- `PUT /forms/:id` → Form güncelle  

---

## 📦 Kurulum

### 1. Projeyi klonla ve dizine gir
git clone  
cd form-builder  

### 2. Backend kurulumu
cd server  
npm install  
npm run dev  

Varsayılan port: http://localhost:3000  

### 3. Frontend kurulumu
cd client  
npm install  
npm run dev  

Varsayılan port: http://localhost:5173


📂 Proje Yapısı


## 📂 Proje Yapısı

form-builder/
 ├── backend/
 │   ├── routes/
 │   │   └── forms.js         # API endpointleri
 │   ├── models/
 │   │   └── Form.js          # Form modeli
 │   ├── server.js            # Express server
 │   └── package.json
 │
 └── frontend/
     ├── src/
     │   ├── components/
     │   │   └── Builder.js   # Form oluşturma & düzenleme ekranı
     │   ├── lib/
     │   │   └── api.js       # API fonksiyonları (createForm, getForm, updateForm)
     │   └── App.js
     ├── public/
     └── package.json

👨‍💻 Kullanım
Uygulama açıldığında Form Builder ekranı gelir.

Sağdaki Toolbox üzerinden form alanlarını sürükleyip bırak.

Her alanın Edit ikonuna tıkla → sağ panelde etiket, placeholder vb. ayarla.

Kaydet → backend’e kaydedilir.

Güncelle → mevcut formu günceller.

Önizle → form doldurulabilir şekilde açılır.


