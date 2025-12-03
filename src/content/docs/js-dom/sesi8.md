---
title: Event Handling Modern
---

Aplikasi tanpa interaksi hanyalah poster digital. Untuk membuatnya "hidup", kita harus mendengarkan (listen) tindakan user: Klik, Ketik, Scroll, dan Hover.

---

## 1. Mendengarkan Event (`addEventListener`)

Jangan pernah gunakan atribut HTML `onclick="..."` lagi. Itu teknik purba yang susah di-maintain. Gunakan `addEventListener` yang bersih dan mendukung banyak listener sekaligus.

**Syntax:**

`element.addEventListener(eventType, callbackFunction)`

```javascript
const btn = document.querySelector('#btn-simpan');

// Cara Benar: Memisahkan Logic JS dari HTML
btn.addEventListener('click', function () {
  console.log('Tombol diklik!');
});

// Cara Modern (Arrow Function)
btn.addEventListener('click', () => {
  alert('Data tersimpan');
});
```

## 2. Tipe Event Populer

Event bukan cuma "click". Ada banyak pemicu lain yang bisa Anda tangkap.

### A. Mouse Events

- `click`: Klik kiri (lepas tombol).
- `dblclick`: Klik ganda.
- `mouseenter` / `mouseleave`: Kursor masuk/keluar elemen (Hover).

### B. Keyboard Events

- `keydown`: Tombol ditekan (tahan terus = fire terus).
- `keyup`: Tombol dilepas.
- `input`: Nilai input berubah (real-time).

### C. Form Events

- `submit`: Form dikirim.
- `change`: Nilai input selesai diubah (misal: pindah fokus setelah ketik).

---

## 3. Event Object (`e`)

Saat event terjadi, browser mengirimkan paket data detail ke fungsi kita. Biasa disingkat `e` atau `event`.

```javascript
document.addEventListener('click', (e) => {
  console.log(e.target); // Elemen yang diklik
  console.log(e.clientX); // Koordinat X mouse
  console.log(e.shiftKey); // Apakah tombol Shift ditahan?
});

document.querySelector('input').addEventListener('keydown', (e) => {
  console.log(e.key); // Karakter tombol ("Enter", "a", "Escape")
});
```

## 4. Mencegah Default Behavior (`preventDefault`)

Beberapa elemen punya sifat bawaan yang kadang mengganggu. Kita bisa membatalkannya.

- **Form**: Mencegah reload halaman saat Submit.
- **Link**: Mencegah pindah halaman saat diklik.

```javascript
const form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // STOP! Jangan reload halaman.
  console.log('Form diproses via JavaScript...');
  // Lanjut proses data manual (AJAX/Fetch)
});
```

---

## Praktik Sesi 8

Kita akan membuat **"Papan Gambar Sederhana"** yang merespons mouse.

**1. Siapkan `index.html`:**

```html
<style>
  body {
    height: 100vh;
    margin: 0;
    overflow: hidden;
  }
  .dot {
    position: absolute;
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    pointer-events: none; /* Agar mouse tidak terhalang dot sendiri */
  }
  .info {
    position: fixed;
    top: 10px;
    left: 10px;
    background: white;
    padding: 10px;
  }
</style>

<div class="info">Klik untuk buat titik. Tekan 'Space' untuk reset.</div>
```

**2. Tulis `app.js`:**

```javascript
// 1. Mouse Click Event: Membuat Elemen di posisi kursor
document.addEventListener('click', (e) => {
  const dot = document.createElement('div');
  dot.className = 'dot';

  // Posisi dot mengikuti koordinat klik
  // (Dikurangi setengah lebar dot agar center)
  dot.style.left = e.clientX - 10 + 'px';
  dot.style.top = e.clientY - 10 + 'px';

  // Warna acak (Bonus trik)
  const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
  dot.style.backgroundColor = randomColor;

  document.body.appendChild(dot);
});

// 2. Keyboard Event: Reset layar
document.addEventListener('keydown', (e) => {
  // Cek apakah tombol Spasi yang ditekan
  if (e.code === 'Space') {
    e.preventDefault(); // Mencegah scroll bawaan spasi

    // Hapus semua dot
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => dot.remove());

    console.log('Layar dibersihkan!');
  }
});
```

**Misi Anda:**

1.  Klik di mana saja pada layar untuk menggambar titik warna-warni.
2.  Tekan tombol **Spasi** di keyboard. Semua titik harus hilang seketika.

Jika Anda sudah merasakan "kekuatan" mengontrol input user, di **Sesi 9** kita akan belajar teknik tingkat lanjut: **Event Delegation** dan **Event Bubbling** agar aplikasi Anda tetap cepat meski menangani ribuan elemen.
