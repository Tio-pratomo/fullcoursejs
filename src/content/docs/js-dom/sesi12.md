---
title: Final Project
---

Selamat datang di **Sesi Terakhir**. Anda telah mempelajari banyak hal: BOM, Seleksi Elemen, Traversing, Manipulasi, hingga Event Handling. Sekarang saatnya menggabungkan semua itu menjadi sebuah **Mini Project** yang layak Anda pamerkan.

Project ini adalah "Infinite Scroll Wikipedia Search". Aplikasi ini menggabungkan:

1.  **Form Handling**: Menerima input user.
2.  **DOM Manipulation**: Membuat kartu artikel secara dinamis.
3.  **Event Handling**: Deteksi scroll untuk memuat data otomatis.
4.  **Fetch API**: Mengambil data nyata dari Wikipedia.

---

## 1. Setup HTML & CSS

Buat struktur dasar yang bersih. Kita butuh search bar yang _sticky_ di atas dan container hasil di bawah.

**index.html**:

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>WikiSearch Infinite</title>
    <style>
      body {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
        background: #f4f4f4;
      }

      /* Sticky Header */
      header {
        position: sticky;
        top: 0;
        background: white;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        z-index: 100;
        display: flex;
        gap: 10px;
        justify-content: center;
      }
      input {
        padding: 10px;
        width: 300px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      button {
        padding: 10px 20px;
        background: #333;
        color: white;
        border: none;
        cursor: pointer;
      }

      /* Container Hasil */
      #results {
        max-width: 800px;
        margin: 20px auto;
        padding: 0 15px;
      }

      /* Kartu Artikel */
      .card {
        background: white;
        padding: 20px;
        margin-bottom: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s;
      }
      .card:hover {
        transform: translateY(-3px);
      }
      .card h3 {
        margin: 0 0 10px;
        color: #2c3e50;
      }
      .card p {
        color: #666;
        line-height: 1.6;
      }
      .card a {
        text-decoration: none;
        color: inherit;
      }

      /* Loading Indicator */
      .loader {
        text-align: center;
        padding: 20px;
        display: none;
        color: #888;
      }
    </style>
  </head>
  <body>
    <header>
      <form id="searchForm">
        <input
          type="text"
          id="searchInput"
          placeholder="Cari topik (misal: Indonesia)..."
          required
        />
        <button type="submit">Cari</button>
      </form>
    </header>

    <div id="results"></div>
    <div class="loader" id="loader">Sedang memuat data...</div>

    <script src="app.js"></script>
  </body>
</html>
```

## 2. Logika JavaScript (`app.js`)

Di sini kita akan menerapkan:

- `document.querySelector` untuk seleksi.
- `addEventListener` untuk form submit dan scroll.
- `document.createElement` & `appendChild` untuk rendering.
- `fetch` untuk data eksternal.

```javascript
// --- 1. Seleksi Elemen ---
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const loader = document.getElementById('loader');

// --- 2. State Aplikasi (Menyimpan status saat ini) ---
let currentQuery = '';
let offset = 0; // Posisi data (Wikipedia pakai offset)
let isLoading = false; // Mencegah double request

// --- 3. Fungsi Utama: Ambil Data dari Wikipedia ---
async function searchWikipedia(query, isNewSearch = false) {
  if (isLoading) return; // Stop jika sedang loading

  isLoading = true;
  loader.style.display = 'block';

  if (isNewSearch) {
    resultsContainer.innerHTML = ''; // Bersihkan hasil lama
    offset = 0;
  }

  try {
    // URL API Wikipedia (CORS enabled)
    const url = `https://id.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${query}&sroffset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();

    const articles = data.query.search;

    if (articles.length === 0 && isNewSearch) {
      resultsContainer.innerHTML = '<p style="text-align:center">Tidak ada hasil ditemukan.</p>';
    } else {
      renderResults(articles);
      offset += 10; // Siapkan offset untuk load selanjutnya
    }
  } catch (error) {
    console.error('Gagal mengambil data:', error);
    alert('Terjadi kesalahan koneksi.');
  } finally {
    isLoading = false;
    loader.style.display = 'none';
  }
}

// --- 4. Fungsi Render (DOM Manipulation) ---
function renderResults(articles) {
  const fragment = document.createDocumentFragment(); // Optimasi performa

  articles.forEach((article) => {
    const card = document.createElement('div');
    card.className = 'card';

    // Bersihkan snippet HTML dari API (remove tags)
    const snippet = article.snippet.replace(/<[^>]*>?/gm, '');

    card.innerHTML = `
            <a href="https://id.wikipedia.org/?curid=${article.pageid}" target="_blank">
                <h3>${article.title}</h3>
                <p>${snippet}...</p>
            </a>
        `;

    fragment.appendChild(card);
  });

  resultsContainer.appendChild(fragment);
}

// --- 5. Event Listeners ---

// A. Handle Submit Form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentQuery = input.value.trim();
  if (currentQuery) {
    searchWikipedia(currentQuery, true); // true = Pencarian baru
  }
});

// B. Infinite Scroll Logic
window.addEventListener('scroll', () => {
  // Cek apakah user sudah scroll sampai bawah halaman
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Jika jarak ke bawah < 100px DAN ada query aktif
  if (scrollTop + clientHeight >= scrollHeight - 100 && currentQuery) {
    searchWikipedia(currentQuery, false); // false = Lanjutkan pencarian (Load More)
  }
});
```

## Misi Terakhir Anda:

1.  **Jalankan kode di atas**.
2.  Cari kata kunci seperti "Sejarah", "Teknologi", atau "Kopi".
3.  Scroll ke bawah pelan-pelan. Perhatikan saat Anda mendekati akhir halaman, loader akan muncul sebentar dan artikel baru akan bertambah otomatis (Infinite Scroll).
4.  Klik salah satu kartu untuk memastikan link menuju ke artikel Wikipedia asli.

---

# Penutup

Selamat! Anda telah menyelesaikan seri **Mastering JavaScript DOM**. Anda memulai dari pengenalan `window`, belajar menyeleksi elemen, memanipulasinya, menangani event, hingga akhirnya membangun aplikasi pencarian real-time.

**Saran Langkah Berikutnya:**

- Pelajari **Framework** (React/Vue/Svelte): Konsep DOM Manipulation yang Anda pelajari di sini adalah _fondasi_ cara kerja framework tersebut.
- Pelajari **Async/Await** lebih dalam: Untuk menangani data dari server dengan lebih kompleks.
- Bangun portfolio: Buat 3-5 mini project seperti To-Do List, Weather App, atau Movie Database.

Terima kasih telah mengikuti sesi ini sampai akhir. Kode ada di tangan Anda sekarang. _Happy Coding!_
