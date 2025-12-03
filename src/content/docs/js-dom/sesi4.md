---
title: DOM Traversing (Navigasi Elemen)
---

Jika di sesi sebelumnya kita belajar cara "menemukan" elemen (Searching), sekarang kita akan belajar cara "berjalan" antar elemen (Traversing).

Bayangkan DOM sebagai pohon keluarga. Dari satu elemen, Anda bisa bergerak ke atas (orang tua), ke bawah (anak), atau ke samping (saudara).

---

# Sesi 4: DOM Traversing (Navigasi Elemen)

## 1. Bergerak ke Atas (Parents)

Kadang kita perlu menemukan container pembungkus dari sebuah elemen, misalnya saat tombol "Hapus" diklik, kita ingin menghapus seluruh baris tabel pembungkusnya.

- **`parentElement`**: Mengembalikan elemen induk langsung (Parent).
- **`closest(selector)`**: Mencari elemen induk (ancestor) terdekat yang cocok dengan selector CSS. Sangat powerful!.

```javascript
const btnHapus = document.querySelector('.btn-delete');

// Cara Lama: Harus tahu pasti struktur HTML
// const row = btnHapus.parentElement.parentElement;

// Cara Modern & Aman: Cari <tr class="data-row"> terdekat di atas
const row = btnHapus.closest('tr.data-row');
if (row) row.remove();
```

## 2. Bergerak ke Bawah (Children)

Mengakses elemen yang ada di dalam sebuah container.

- **`children`**: Mengembalikan `HTMLCollection` berisi hanya **Element Node** (mengabaikan teks/spasi).
- **`firstElementChild`** & **`lastElementChild`**: Mengambil anak pertama atau terakhir (Element Node saja).

```javascript
const listMenu = document.querySelector('ul.menu');

// Ambil anak pertama (li pertama)
const firstItem = listMenu.firstElementChild;
firstItem.style.color = 'red';

// Loop semua anak
Array.from(listMenu.children).forEach((li) => {
  console.log(li.textContent);
});
```

_Catatan_: Hindari `firstChild` atau `childNodes` kecuali Anda benar-benar ingin memanipulasi _Text Node_ (termasuk spasi kosong di HTML).

## 3. Bergerak ke Samping (Siblings)

Mengakses elemen "saudara" yang berada di level (induk) yang sama.

- **`nextElementSibling`**: Elemen setalahnya.
- **`previousElementSibling`**: Elemen sebelumnya.

```javascript
const currentStep = document.querySelector('.step.active');

// Pindah active ke langkah berikutnya
const nextStep = currentStep.nextElementSibling;

if (nextStep) {
  currentStep.classList.remove('active');
  nextStep.classList.add('active');
}
```

---

## Praktik Sesi 4

Kita akan mensimulasikan navigasi menu aktif sederhana.

**1. Update `index.html` Anda:**

```html
<div class="sidebar">
  <h3>Menu Navigasi</h3>
  <ul class="menu-list">
    <li class="item">Dashboard</li>
    <li class="item active">Profile</li>
    <!-- Posisi Awal -->
    <li class="item">Settings</li>
    <li class="item">Logout</li>
  </ul>
  <button id="btn-prev">⬆ Atas</button>
  <button id="btn-next">⬇ Bawah</button>
</div>
```

**2. Update `app.js`:**

```javascript
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

btnNext.addEventListener('click', () => {
  // 1. Cari item yang sedang aktif
  const current = document.querySelector('.item.active');

  // 2. Cari saudaranya di bawah (Next Sibling)
  const next = current.nextElementSibling;

  // 3. Validasi: Apakah ada elemen selanjutnya?
  if (next) {
    current.classList.remove('active'); // Hapus status lama
    next.classList.add('active'); // Pasang status baru
    console.log(`Pindah ke: ${next.textContent}`);
  } else {
    console.log('Mentok! Ini item terakhir.');
  }
});

btnPrev.addEventListener('click', () => {
  const current = document.querySelector('.item.active');
  const prev = current.previousElementSibling;

  if (prev) {
    current.classList.remove('active');
    prev.classList.add('active');
    console.log(`Pindah ke: ${prev.textContent}`);
  } else {
    console.log('Mentok! Ini item pertama.');
  }
});
```

**Tips CSS Tambahan (Opsional):**
Tambahkan CSS ini di `<head>` agar efeknya terlihat jelas.

```css
.item {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
}
.item.active {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}
```

**Misi Anda:**
Jalankan kode. Klik tombol "Bawah" dan "Atas". Perhatikan bagaimana kita tidak perlu menyeleksi elemen tujuan secara manual (misal by ID), tapi kita menemukannya secara **relatif** terhadap elemen yang sedang aktif saat ini. Ini inti dari Traversing.

Jika Anda sudah nyaman bergerak antar elemen, di **Sesi 5** kita akan belajar cara **menciptakan** elemen baru dari nol dan memasukkannya ke halaman.
