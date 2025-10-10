# Panduan Setup EmailJS untuk Form Kontak

## ✅ Checklist Setup EmailJS

### 1. Verifikasi Akun EmailJS
- Buka [EmailJS Dashboard](https://dashboard.emailjs.com/)
- Login dengan akun Anda
- Pastikan akun sudah terverifikasi (cek email konfirmasi)

### 2. Setup Email Service
- Pergi ke **Email Services** di dashboard
- Pastikan service `service_nj947y5` sudah ada dan aktif
- Jika belum ada, buat service baru:
  1. Klik **Add New Service**
  2. Pilih provider (Gmail, Outlook, dll)
  3. Hubungkan akun email Anda
  4. Copy Service ID dan update di `app/page.tsx`

### 3. Setup Email Template
- Pergi ke **Email Templates** di dashboard
- Buka template `template_k28jkce` (atau buat baru jika belum ada)
- **PENTING**: Template harus menggunakan variabel berikut:

```
Subject: Pesan Baru dari {{user_name}} - {{subject}}

Dari: {{user_name}}
Email: {{user_email}}
Subjek: {{subject}}

Pesan:
{{message}}

---
Dikirim dari website portfolio
```

**Variabel yang HARUS ada di template:**
- `{{user_name}}` - nama pengirim
- `{{user_email}}` - email pengirim
- `{{subject}}` - subjek pesan
- `{{message}}` - isi pesan

### 4. Configure Settings Template
- Di halaman template, klik **Settings**
- Atur **To Email**: `dilaninf6@gmail.com` (atau email tujuan Anda)
- Atur **From Name**: Portfolio Contact Form
- Atur **Reply To**: `{{user_email}}` (agar Anda bisa balas langsung)

### 5. Setup Security (CORS)
- Pergi ke **Account** → **Security**
- Di bagian **Allowed Origins**, tambahkan:
  ```
  http://localhost:3000
  https://localhost:3000
  ```
- Jika sudah deploy, tambahkan juga domain produksi Anda:
  ```
  https://your-domain.vercel.app
  ```

### 6. Verify Public Key
- Pergi ke **Account** → **General**
- Copy **Public Key** Anda
- Pastikan sama dengan di `app/page.tsx`: `Z7mhNLfOSIFuaF2Z6`
- Jika berbeda, update di kode

### 7. Test Pengiriman
1. Buka website Anda di browser
2. Buka **Developer Tools** (F12)
3. Pergi ke tab **Console**
4. Isi form kontak dan klik **Kirim Pesan**
5. Perhatikan output di Console:
   - Jika sukses: akan ada log "EmailJS success"
   - Jika gagal: akan ada alert dengan error detail

### 8. Cek Email
- Cek inbox email tujuan: `dilaninf6@gmail.com`
- **PENTING**: Cek folder **Spam/Junk** juga!
- Jika masuk spam, tandai sebagai "Not Spam"

### 9. Monitoring di Dashboard
- Pergi ke **Logs** di EmailJS dashboard
- Lihat history pengiriman email
- Jika ada error, akan terlihat di sini dengan detail

## 🔧 Troubleshooting

### Error: "The public key is required"
- Public key salah atau tidak terinisialisasi
- Cek `app/page.tsx` baris 30 dan 35

### Error: "Template not found"
- Template ID salah atau template dihapus
- Verifikasi `template_k28jkce` ada di dashboard
- Update TEMPLATE_ID di `app/page.tsx` jika berbeda

### Error: "Service not found"
- Service ID salah atau service tidak aktif
- Verifikasi `service_nj947y5` ada dan aktif
- Update SERVICE_ID di `app/page.tsx` jika berbeda

### Error: "Origin not allowed"
- Domain belum ditambahkan di Allowed Origins
- Tambahkan di Account → Security → Allowed Origins

### Email tidak masuk
- Cek folder Spam/Junk
- Verifikasi email tujuan di template settings
- Cek Logs di EmailJS dashboard untuk konfirmasi pengiriman
- Pastikan email service (Gmail/Outlook) masih terkoneksi

### Button "Mengirim..." stuck
- Ada error JavaScript di Console
- Cek browser Console untuk detail error
- Pastikan semua field terisi

## 📝 Kode Saat Ini

Kredensial EmailJS di `app/page.tsx`:
```javascript
SERVICE_ID: 'service_nj947y5'
TEMPLATE_ID: 'template_k28jkce'
PUBLIC_KEY: 'Z7mhNLfOSIFuaF2Z6'
```

Form fields yang dikirim:
- `user_name` → Nama dari form
- `user_email` → Email dari form
- `subject` → Subjek dari form
- `message` → Pesan dari form

## 🎯 Langkah Test Cepat

1. Buka browser DevTools (F12)
2. Pergi ke Console tab
3. Isi form dengan data test:
   - Nama: Test User
   - Email: test@example.com
   - Subjek: Test Message
   - Pesan: This is a test
4. Klik "Kirim Pesan"
5. Lihat Console - akan ada log error detail jika gagal
6. Cek email inbox dan spam folder

## 📧 Support

Jika masih belum berhasil setelah mengikuti semua langkah:
1. Screenshot error di Console
2. Screenshot EmailJS Logs di dashboard
3. Verifikasi semua setting di EmailJS sesuai panduan ini

Good luck! 🚀
