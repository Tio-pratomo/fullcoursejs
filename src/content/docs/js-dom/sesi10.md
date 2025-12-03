---
title: Scripting Web Forms
---

Mengelola input pengguna adalah jantung dari aplikasi web. Form handling yang baik tidak hanya mengambil data, tapi juga memberikan feedback (validasi) yang instan.

---

## 1. Mengakses Nilai Form (Forms & Inputs)

Form adalah elemen HTML khusus yang mengelompokkan input. Kita bisa mengaksesnya via `document.forms` atau selektor biasa.

- **`value`**: Properti utama untuk membaca/menulis isi input (Text, Password, Textarea, Select).
- **`checked`**: Properti boolean (true/false) untuk Checkbox dan Radio Button.

```javascript
const inputNama = document.getElementById('nama');
const checkboxSyarat = document.getElementById('agree');

// Ambil nilai
console.log(inputNama.value);
console.log(checkboxSyarat.checked); // true/false
```

## 2. Event Penting Form

Kapan kita harus membaca nilai input?

- **`submit`**: Terjadi pada elemen `<form>` saat user menekan Enter atau tombol Submit. Wajib gunakan `e.preventDefault()` untuk mencegah reload.
- **`input`**: Terjadi **real-time** setiap kali user mengetik satu karakter. Cocok untuk live-search atau validasi instan.
- **`change`**: Terjadi saat nilai "selesai" diubah (setelah user klik di luar input/blur).

## 3. Validasi Form Sederhana

Sebelum kirim data ke server, validasi di sisi klien (Client-side) wajib dilakukan agar user experience lebih cepat.

```javascript
const email = document.getElementById('email');

email.addEventListener('input', () => {
  if (!email.value.includes('@')) {
    email.style.borderColor = 'red'; // Visual Error
  } else {
    email.style.borderColor = 'green'; // Visual Sukses
  }
});
```

---

## Praktik Sesi 10

Kita akan membuat **Form Registrasi** dengan validasi real-time dan fitur "Show Password".

**1. Siapkan `index.html`:**

```html
<form id="regForm" style="max-width: 300px; margin: 20px auto; font-family: sans-serif;">
  <div style="margin-bottom: 15px;">
    <label>Username:</label><br />
    <input type="text" id="username" required minlength="5" />
    <small id="userMsg" style="color: red; display: none;">Min. 5 karakter!</small>
  </div>

  <div style="margin-bottom: 15px;">
    <label>Password:</label><br />
    <input type="password" id="password" required />
    <br />
    <label style="font-size: 0.8em;">
      <input type="checkbox" id="showPass" /> Tampilkan Password
    </label>
  </div>

  <div style="margin-bottom: 15px;">
    <label>Jenis Kelamin:</label><br />
    <input type="radio" name="gender" value="Pria" checked /> Pria
    <input type="radio" name="gender" value="Wanita" /> Wanita
  </div>

  <div style="margin-bottom: 15px;">
    <label>Kota:</label><br />
    <select id="kota">
      <option value="">-- Pilih --</option>
      <option value="JKT">Jakarta</option>
      <option value="BDG">Bandung</option>
      <option value="SBY">Surabaya</option>
    </select>
  </div>

  <button type="submit">Daftar</button>
</form>
```

**2. Tulis `app.js`:**

```javascript
const form = document.getElementById('regForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const showPass = document.getElementById('showPass');
const userMsg = document.getElementById('userMsg');

// 1. Fitur Show/Hide Password
showPass.addEventListener('change', (e) => {
  // Jika checked, ubah type jadi 'text', jika tidak ubah ke 'password'
  password.type = e.target.checked ? 'text' : 'password';
});

// 2. Validasi Real-time Username
username.addEventListener('input', () => {
  if (username.value.length < 5) {
    userMsg.style.display = 'block'; // Tampilkan pesan error
    username.style.borderColor = 'red';
  } else {
    userMsg.style.display = 'none'; // Sembunyikan pesan
    username.style.borderColor = 'green';
  }
});

// 3. Handle Submit
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Cegah Reload!

  // Ambil nilai Radio Button yang terpilih
  // Selector: input[name="gender"]:checked
  const gender = document.querySelector('input[name="gender"]:checked').value;

  // Ambil nilai Select
  const kota = document.getElementById('kota').value;

  if (kota === '') {
    alert('Pilih kota dulu!');
    return;
  }

  console.log('Data Siap Kirim:');
  console.log({
    user: username.value,
    pass: password.value,
    gender: gender,
    city: kota,
  });

  alert('Registrasi Berhasil! Cek Console.');
});
```

**Misi Anda:**

1.  Ketik username < 5 huruf, lihat pesan error muncul.
2.  Ketik password, lalu centang "Tampilkan Password" untuk melihat isinya.
3.  Klik "Daftar" tanpa memilih kota, pastikan alert muncul.
4.  Isi semua data dengan benar, klik "Daftar", dan lihat hasil object data di Console.

Jika Anda sudah menguasai form handling ini, Anda sudah memiliki skill fundamental untuk membangun aplikasi web interaktif.

Di **Sesi 11** (Sesi Bonus), kita akan melihat kumpulan **Code Snippets** (potongan kode) yang sering dipakai developer profesional untuk mempermudah hidup, seperti manipulasi Array dan String tingkat lanjut.
