---
title: Fundamental DOM & Seleksi Elemen
---

Selamat datang di **Sesi 3**. Ini adalah gerbang utama pengembangan Frontend. Kita meninggalkan "console" yang abstrak dan mulai menyentuh antarmuka visual yang dilihat user.

Tanpa kemampuan menyeleksi elemen (selecting), Anda tidak bisa memanipulasi apa pun.

---

## 1. Apa itu DOM?

**Document Object Model (DOM)** adalah representasi memori dari struktur HTML Anda. Browser membaca HTML dan menyusunnya menjadi struktur pohon (Tree Structure) yang berisi **Nodes**.

- **Document**: Root node (akar).
- **Element**: Tag HTML (`<div>`, `<body>`, `<h1>`).
- **Text**: Isi teks di dalam tag.
- **Attribute**: Atribut tag (`class`, `id`, `src`).

Saat Anda mengetik `document.body`, Anda sedang mengakses DOM Node untuk elemen `<body>`.

## 2. Single Element Selection (Memilih Satu Elemen)

Gunakan ini saat Anda hanya butuh satu elemen spesifik.

### A. `getElementById()`

Metode paling cepat dan spesifik.

- **Return**: Element object atau `null` jika tidak ditemukan.
- **Best Practice**: Gunakan untuk elemen unik/utama seperti Main Container, Header, atau Submit Button.

```javascript
const title = document.getElementById('main-title');
// Manipulasi langsung
if (title) {
  title.style.color = 'blue';
}
```

### B. `querySelector()`

Metode paling modern dan fleksibel. Menerima string **CSS Selector**.

- **Return**: Elemen **pertama** yang cocok dengan selector.
- **Power**: Bisa menyeleksi berdasarkan ID (`#id`), Class (`.class`), Tag (`div`), atau atribut (`[type="text"]`).

```javascript
const submitBtn = document.querySelector('.btn-primary'); // Class
const inputEmail = document.querySelector('input[name="email"]'); // Attribute
const header = document.querySelector('#header'); // ID (alternatif getElementById)
```

## 3. Multiple Element Selection (Memilih Banyak Elemen)

Gunakan ini saat Anda ingin memanipulasi sekumpulan elemen (misal: semua item dalam list).

### A. `querySelectorAll()`

Pasangan dari `querySelector`.

- **Return**: **NodeList** (Static Collection).
- **Fitur**: Support method `forEach()` langsung. Ini adalah standar modern.

```javascript
const allButtons = document.querySelectorAll('.btn');

allButtons.forEach((btn) => {
  btn.style.backgroundColor = 'grey'; // Ubah warna semua tombol
});
```

### B. `getElementsByClassName()` & `getElementsByTagName()`

Cara lama (Legacy) namun performanya sangat tinggi.

- **Return**: **HTMLCollection** (Live Collection).
- **Warning**: `HTMLCollection` **tidak punya** method `forEach` bawaan. Anda harus convert ke Array dulu (`Array.from()`) atau pakai loop biasa.

```javascript
const items = document.getElementsByClassName('list-item');

// Error: items.forEach is not a function
// Solusi:
Array.from(items).forEach((item) => {
  console.log(item.innerText);
});
```

### Tech Note: Static vs Live Collection

- **Static (NodeList dari querySelectorAll)**: Seperti foto snapshot. Jika Anda menambah elemen baru ke DOM _setelah_ seleksi dilakukan, variabel tidak akan update otomatis.
- **Live (HTMLCollection)**: Selalu update real-time. Jika elemen baru ditambahkan ke DOM, variabel `items` di atas otomatis bertambah isinya.

---

## Praktik Sesi 3

Kita akan membuat file HTML sederhana dan mencoba memanipulasi elemennya menggunakan teknik seleksi di atas.

**1. Buat file `index.html`:**

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <title>Belajar DOM Sesi 3</title>
  </head>
  <body>
    <h1 id="judul-utama">Hello World</h1>

    <div class="container">
      <p class="text-content">Paragraf 1</p>
      <p class="text-content">Paragraf 2</p>
      <p class="text-content">Paragraf 3</p>
    </div>

    <button id="btn-ubah">Ubah Warna</button>

    <script src="app.js"></script>
  </body>
</html>
```

**2. Buat file `app.js`:**

```javascript
// 1. Select by ID (Paling Cepat)
const judul = document.getElementById('judul-utama');

// 2. Select by CSS Selector (Paling Fleksibel)
// Mengambil elemen pertama dengan class 'container'
const container = document.querySelector('.container');

// 3. Select Multiple Elements (NodeList)
const paragraf = document.querySelectorAll('.text-content');

// Log hasil seleksi
console.log('Judul:', judul);
console.log('Container:', container);
console.log('Total Paragraf:', paragraf.length); // Output: 3

// 4. Interaksi Sederhana
const tombol = document.getElementById('btn-ubah');

tombol.addEventListener('click', () => {
  // Manipulasi Judul
  judul.style.color = 'crimson';
  judul.innerText = 'DOM itu Seru!';

  // Manipulasi Multiple Elements (Looping)
  paragraf.forEach((p, index) => {
    p.style.fontWeight = 'bold';
    p.innerText = `Paragraf ${index + 1} sudah diupdate!`;
  });
});
```

**Misi Anda:**
Jalankan kode di atas. Klik tombol "Ubah Warna". Perhatikan bagaimana JavaScript menggunakan "alamat" yang Anda berikan via selector untuk menemukan elemen target dan mengubah tampilannya secara instan.

Jika seleksi elemen sudah lancar, di **Sesi 4** kita akan belajar cara "berjalan-jalan" menelusuri DOM (Traversing) tanpa perlu menyeleksi ulang dari awal. Siap?
