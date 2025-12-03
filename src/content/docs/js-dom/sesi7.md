---
title: Atribut, Properti, & Styling
---

Selamat datang di **Sesi 7**. Jika struktur elemen adalah tulang dan daging, maka Atribut dan Styling adalah "kosmetik" yang membuat tampilan menarik dan menyimpan data penting.

---

## 1. Mengelola Atribut HTML (Attributes)

Atribut adalah informasi tambahan pada tag HTML (seperti `src` pada `<img>` atau `href` pada `<a>`).

### A. Standard Attributes

Method standar untuk memanipulasi atribut apa pun.

- **`setAttribute(name, value)`**: Menambah/Update nilai atribut.
- **`getAttribute(name)`**: Mengambil nilai atribut (selalu return String).
- **`removeAttribute(name)`**: Menghapus atribut sepenuhnya.
- **`hasAttribute(name)`**: Cek keberadaan atribut (Return Boolean).

```javascript
const logo = document.querySelector('img');

// Ganti gambar
logo.setAttribute('src', 'logo-baru.png');

// Cek apakah ada alt text
if (!logo.hasAttribute('alt')) {
  logo.setAttribute('alt', 'Logo Perusahaan');
}
```

### B. Data Attributes (`dataset`)

Fitur modern HTML5 untuk menyimpan data custom di elemen. Sangat berguna untuk menyimpan ID database atau status state tanpa merusak tampilan.

HTML:

```html
<div id="user-card" data-user-id="101" data-role="admin" data-active="true">John Doe</div>
```

JavaScript:

```javascript
const card = document.getElementById('user-card');

// Baca Data (camelCase otomatis: data-user-id -> userId)
console.log(card.dataset.userId); // "101"
console.log(card.dataset.role); // "admin"

// Update Data
card.dataset.role = 'superadmin'; // HTML berubah jadi data-role="superadmin"
```

## 2. Manipulasi Class (CSS Classes)

Jangan pakai `setAttribute('class', '...')` karena akan menimpa semua class yang ada. Gunakan **`classList`** yang aman dan powerful.

- **`add()`**: Tambah class (jika sudah ada, diabaikan).
- **`remove()`**: Hapus class.
- **`toggle()`**: Jika ada dihapus, jika tidak ada ditambahkan. (Sangat bagus untuk Dark Mode atau Menu).
- **`contains()`**: Cek apakah class tertentu ada.

```javascript
const box = document.querySelector('.box');

box.classList.add('highlight', 'shadow'); // Tambah 2 class
box.classList.remove('hidden');
box.classList.toggle('active'); // Switch on/off

if (box.classList.contains('error')) {
  box.style.borderColor = 'red';
}
```

## 3. Manipulasi Style Inline

Anda bisa mengubah CSS langsung lewat properti `.style`.

- **Format**: Gunakan **camelCase** (contoh: `background-color` menjadi `backgroundColor`).
- **Sifat**: Menambahkan _Inline Style_ di HTML (`<div style="...">`), prioritasnya sangat tinggi (mengalahkan CSS external).

```javascript
const title = document.getElementById('title');

// Set Style
title.style.color = 'crimson';
title.style.fontSize = '2rem';
title.style.marginTop = '20px';

// Reset Style (Hapus inline style agar kembali ikut CSS file)
title.style.color = '';
```

---

## Praktik Sesi 7

Kita akan membuat **"Theme Toggler & Status Card"**.

**1. Siapkan `index.html`:**

```html
<style>
  .card {
    padding: 20px;
    border: 1px solid #ccc;
    transition: 0.3s;
  }
  .dark-mode {
    background-color: #333;
    color: white;
  }
  .highlight {
    border-color: gold;
    box-shadow: 0 0 10px gold;
  }
</style>

<div id="myCard" class="card" data-status="pending">
  <h2 id="statusText">Status: Pending</h2>
  <button id="btnTheme">Toggle Dark Mode</button>
  <button id="btnStatus">Ubah Status</button>
</div>
```

**2. Tulis `app.js`:**

```javascript
const card = document.getElementById('myCard');
const statusText = document.getElementById('statusText');
const btnTheme = document.getElementById('btnTheme');
const btnStatus = document.getElementById('btnStatus');

// 1. Toggle Class (Dark Mode)
btnTheme.addEventListener('click', () => {
  card.classList.toggle('dark-mode');
});

// 2. Manipulasi Atribut (Data Attribute & Style)
btnStatus.addEventListener('click', () => {
  // Cek status saat ini dari data-attribute
  const currentStatus = card.dataset.status;

  if (currentStatus === 'pending') {
    // Ubah ke Active
    card.dataset.status = 'active';
    statusText.innerText = 'Status: Active';

    // Tambah visual highlight
    card.classList.add('highlight');

    // Style manual (Inline)
    statusText.style.color = 'green';
  } else {
    // Balik ke Pending
    card.dataset.status = 'pending';
    statusText.innerText = 'Status: Pending';

    // Hapus visual highlight
    card.classList.remove('highlight');

    // Reset style manual
    statusText.style.color = '';
  }
});
```

**Misi Anda:**

1.  Klik "Toggle Dark Mode". Perhatikan class `dark-mode` muncul/hilang di Inspector browser.
2.  Klik "Ubah Status". Perhatikan perubahan pada:
    - Teks tampilan.
    - Warna teks (via `.style`).
    - Border glowing (via `.classList`).
    - Atribut `data-status` di HTML (via `.dataset`).

Konsep ini adalah dasar dari semua interaksi UI modern. Di **Sesi 8**, kita akan masuk ke **Event Handling** yang lebih dalam agar aplikasi kita bisa merespons klik, ketikan keyboard, dan scroll dengan lebih cerdas. Siap?
