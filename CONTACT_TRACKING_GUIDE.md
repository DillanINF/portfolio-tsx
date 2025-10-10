# 📧 Panduan Contact Tracking System

## Fitur Baru: Tracking Pengirim Email

Sistem ini akan mencatat semua orang yang mengirim email melalui contact form di website portfolio Anda ke **dilaninf6@gmail.com**.

---

## 🎯 Fitur yang Ditambahkan

### 1. **Auto-Logging Pengirim**
- Setiap kali seseorang submit contact form, data mereka akan otomatis disimpan
- Data yang dicatat:
  - ✅ Nama pengirim
  - ✅ Email pengirim
  - ✅ Subjek pesan
  - ✅ Isi pesan lengkap
  - ✅ Waktu pengiriman (timestamp)
  - ✅ IP Address pengirim

### 2. **Admin Dashboard**
- Halaman khusus untuk melihat semua pengirim
- URL: `http://localhost:3000/admin/contact-logs` (development)
- URL Production: `https://your-domain.com/admin/contact-logs`

### 3. **Keamanan**
- Dashboard dilindungi dengan password

- Bisa diubah melalui environment variable

---

## 🚀 Cara Menggunakan

### Step 1: Setup Password Admin (Opsional)

Jika ingin mengubah password default, buat atau edit file `.env.local` di root project:

```bash
ADMIN_PASSWORD=password_kamu_di_sini
```

**Contoh:**
```bash
ADMIN_PASSWORD=Dillan@2024Secure
```

> ⚠️ **PENTING**: Jangan commit file `.env.local` ke Git! Sudah ada di `.gitignore`

### Step 2: Jalankan Development Server

```bash
npm run dev
```

### Step 3: Test Contact Form

1. Buka website: `http://localhost:3000`
2. Scroll ke bagian **Contact**
3. Isi form dan klik **Kirim Pesan**
4. Pesan akan:
   - ✅ Tersimpan di log
   - ✅ Terkirim ke email dilaninf6@gmail.com via EmailJS

### Step 4: Akses Admin Dashboard

1. Buka: `http://localhost:3000/admin/contact-logs`
2. Masukkan password (default: `admin123`)
3. Lihat semua pengirim email!

---

## 📊 Fitur Dashboard

### Tampilan Dashboard:
- **Stats Card**: Total pesan, unique senders, pesan terbaru
- **Tabel Lengkap**: Semua pengirim dengan detail
- **Modal Detail**: Klik "Lihat Pesan" untuk detail lengkap
- **Balas Email**: Button untuk langsung balas via email client
- **Refresh**: Update data terbaru
- **Logout**: Keluar dari dashboard

### Kolom di Tabel:
1. **No** - Nomor urut
2. **Tanggal** - Kapan pesan dikirim
3. **Nama** - Nama pengirim
4. **Email** - Email pengirim (klik untuk mailto)
5. **Subjek** - Subjek pesan
6. **IP** - IP Address pengirim
7. **Aksi** - Button untuk lihat detail pesan

---

## 📁 File yang Ditambahkan

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact-log/
│   │       └── route.ts          ← API untuk simpan & ambil log
│   ├── admin/
│   │   └── contact-logs/
│   │       └── page.tsx           ← Dashboard admin
│   └── page.tsx                    ← Updated contact form
├── data/
│   └── contact-logs.json          ← File log (auto-created)
├── .env.local                      ← Password admin (opsional)
└── CONTACT_TRACKING_GUIDE.md      ← Dokumentasi ini
```

---

## 🔧 Technical Details

### API Endpoints

#### POST `/api/contact-log`
Simpan data pengirim baru.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration Request",
  "message": "Hi, I'd like to work with you..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data pengirim berhasil disimpan",
  "data": {
    "id": "1234567890abc",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Collaboration Request",
    "message": "Hi, I'd like to work with you...",
    "timestamp": "2024-10-11T00:00:00.000Z",
    "ip": "192.168.1.1"
  }
}
```

#### GET `/api/contact-log?password=YOUR_PASSWORD`
Ambil semua data pengirim (protected).

**Query Params:**
- `password` (required) - Password admin

**Response:**
```json
{
  "success": true,
  "total": 5,
  "data": [
    {
      "id": "1234567890abc",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Collaboration Request",
      "message": "Hi...",
      "timestamp": "2024-10-11T00:00:00.000Z",
      "ip": "192.168.1.1"
    }
  ]
}
```

---

## 🔐 Keamanan

### Password Protection
- Dashboard dilindungi password
- Password disimpan di environment variable
- Session-based authentication di browser

### IP Logging
- IP address pengirim dicatat untuk tracking
- Berguna untuk deteksi spam atau abuse

### Data Storage
- Data disimpan di file JSON lokal: `data/contact-logs.json`
- Tidak ada database eksternal
- File ini **tidak** di-commit ke Git (sudah ada di `.gitignore`)

---

## 📝 Best Practices

### 1. Backup Data Logs
```bash
# Backup manual
cp data/contact-logs.json data/contact-logs.backup.json

# Atau setup auto-backup di cron job
```

### 2. Ganti Password Default
```bash
# Edit .env.local
ADMIN_PASSWORD=your_secure_password_here
```

### 3. Monitor Spam
- Cek IP address yang mencurigakan
- Block IP jika perlu di web server level

### 4. Export Data (Coming Soon)
Anda bisa menambahkan fitur export ke CSV:
```javascript
// Di dashboard, tambahkan button export
const exportToCSV = () => {
  const csv = logs.map(log => 
    `"${log.name}","${log.email}","${log.subject}","${log.timestamp}"`
  ).join('\n');
  // Download CSV
};
```

---

## 🐛 Troubleshooting

### Folder `data` tidak ada?
Folder akan otomatis dibuat saat ada pengirim pertama. Atau buat manual:
```bash
mkdir data
```

### Dashboard tidak bisa login?
- Cek password di `.env.local`
- Password default: `admin123`
- Pastikan server restart setelah ubah `.env.local`

### Log tidak tersimpan?
1. Cek console browser untuk error
2. Pastikan API route jalan: buka `/api/contact-log?password=admin123`
3. Cek permission folder `data`

### Error "Form tidak ditemukan"?
- Pastikan form punya `ref={contactFormRef}`
- Pastikan field punya `name` attribute yang benar

---

## 🎨 Customization

### Ubah Tampilan Dashboard
Edit file: `app/admin/contact-logs/page.tsx`

### Tambah Field Baru
1. Update form di `app/page.tsx`
2. Update interface `ContactLog` di `app/api/contact-log/route.ts`
3. Update tabel di dashboard

### Integrasi Database
Ganti file JSON dengan database:
- MongoDB
- PostgreSQL
- Supabase
- Firebase

---

## 🚀 Production Deployment

### Vercel / Netlify
1. Deploy seperti biasa
2. Set environment variable di dashboard hosting:
   ```
   ADMIN_PASSWORD=your_secure_password
   ```
3. Akses dashboard di: `https://your-domain.com/admin/contact-logs`

### VPS / Self-hosted
1. Pastikan folder `data` writable:
   ```bash
   chmod 755 data
   ```
2. Setup `.env` di production
3. Restart server

---

## 📞 Support

Jika ada masalah atau pertanyaan:
- Email: dilaninf6@gmail.com
- WhatsApp: +62 855-9102-2177

---

## ✨ Features to Add (Future)

- [ ] Export to CSV/Excel
- [ ] Email notifications untuk pesan baru
- [ ] Spam filter otomatis
- [ ] Multi-admin dengan role management
- [ ] Search & filter di dashboard
- [ ] Dark mode untuk dashboard
- [ ] Analytics & statistics
- [ ] Integration dengan CRM

---

**Happy Tracking! 🎉**

Sekarang Anda bisa tahu siapa saja yang mengirim email ke **dilaninf6@gmail.com**!
