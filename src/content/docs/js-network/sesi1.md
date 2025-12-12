---
title: Overview HTTP & Fetch
---

Tujuan sesi ini agar, kamu paham **alur dasar HTTP di web modern** dan **mengerti cara kerja `fetch()` secara konseptual** sebelum nanti masuk ke error handling, timeout, dan UI state.

---

## Materi: Pengetahuan & Konsep

**1. Gambaran singkat HTTP (supaya `fetch` masuk akal)**

Di web, browser dan server berkomunikasi dengan **HTTP** menggunakan pesan **request** (dari browser) dan **response** (balasan dari server).

Satu response minimal berisi **status line** (misal 200 OK), kumpulan **HTTP header** (misal `Content-Type: application/json`), dan opsional **body** yang berisi data sebenarnya (HTML, JSON, gambar, dll).

Status code dikelompokkan: **2xx** untuk sukses (contoh 200), **4xx** untuk error di sisi client (contoh 404), dan **5xx** untuk error di sisi server (contoh 500).

Beberapa hal penting yang perlu kamu pegang dari HTTP untuk `fetch`:

- **URL**: alamat resource yang akan diakses, misalnya API URL.
- **Method**: cara aksesnya, umum: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **Headers**: metadata request/response, misalnya `Content-Type`, `Authorization`.
- **Body**: isi data (opsional), misalnya JSON waktu kirim data dengan `POST`.

**2. Apa itu Fetch API (versi modern AJAX)**

**Fetch API** adalah antarmuka JavaScript modern untuk mengambil resource (termasuk lewat jaringan) dan menjadi pengganti yang lebih powerful dan fleksibel dibanding `XMLHttpRequest`.

Berbeda dengan pendekatan lama berbasis callback, `fetch` sepenuhnya berbasis **Promise** dan terintegrasi dengan fitur web modern seperti **async/await**, Service Worker, dan CORS. Ini membuat kode network lebih bersih dan mudah di‑compose(dikombinasikan).

Di browser, fungsi global `fetch()` tersedia di objek `window` dan dapat dipanggil langsung tanpa import tambahan.

**3. Sintaks dasar `fetch()` dan objek `Response`**

Secara umum, bentuk dasar pemanggilan `fetch` adalah: `fetch(url, options?)` dan mengembalikan sebuah **Promise** yang akan resolve ke objek **`Response`** ketika server sudah mengirim **header** HTTP‑nya.

Jika kamu tidak mengirim argumen kedua (`options`), `fetch` otomatis membuat request **GET** sederhana ke URL tersebut dengan konfigurasi default.

Konsep penting tentang objek `Response`:

- `response.status`: angka status HTTP (contoh 200, 404, 500).
- `response.ok`: boolean `true` jika status di rentang 200–299, memudahkan cek “sukses atau tidak”.
- `response.headers`: koleksi header HTTP response yang bisa diakses seperti map.
- **Body hanya bisa dibaca sekali** menggunakan metode berbasis Promise seperti:
  - `response.json()` untuk JSON,
  - `response.text()` untuk teks biasa,
  - `response.blob()` untuk data biner (gambar, file), dll.

Cara kerja `fetch` biasanya diolah sebagai **dua tahap**:

1. `await fetch(url)` → dapat objek `Response` dan bisa cek status & headers.
2. `await response.json()` / `await response.text()` → baru di sini kamu mengambil isi body‑nya dalam format yang kamu mau.

---

## Praktik

Di sesi ini praktiknya fokus ke **GET request sederhana** dan **melihat apa yang terjadi di `Response`**, tanpa dulu masuk error handling kompleks.

**1. Setup lingkungan kecil untuk eksperimen**

Pilih salah satu yang paling nyaman buatmu:

- Cara cepat: buka browser → `F12` → tab **Console** → kita jalankan JS langsung dari sana.
- Atau buat file `index.html` lokal, lalu tambahkan `<script>` di dalamnya dan buka file itu di browser modern (Chrome / Edge / Firefox terbaru).

Contoh minimal `index.html` untuk bermain di `<script>`:

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>Latihan Fetch Dasar</title>
  </head>
  <body>
    <h1>Latihan Fetch Dasar</h1>
    <script>
      // Kode latihan akan kita tulis di sini
    </script>
  </body>
</html>
```

**2. Latihan 1 – Fetch GET paling dasar**

Tujuan: memahami bahwa `fetch` itu **asinkron** dan mengembalikan **Promise** yang resolve ke `Response`.

Tambahkan kode berikut di dalam `<script>` atau jalankan langsung di Console:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';

fetch(url)
  .then((response) => {
    console.log('Status:', response.status);
    console.log('OK?:', response.ok);
    console.log('Headers:', response.headers);
    return response.json(); // ambil body sebagai JSON
  })
  .then((data) => {
    console.log('Data JSON:', data);
  })
  .catch((error) => {
    console.error('Terjadi error jaringan atau fetch gagal:', error);
  });
```

Penjelasan singkat latihan ini:

- Baris `fetch(url)` memicu request HTTP GET ke API publik dan langsung mengembalikan sebuah Promise.
- `response.status`, `response.ok`, dan `response.headers` di‑log untuk menunjukkan metadata HTTP yang bisa kamu baca sebelum body diparse.
- `response.json()` mengembalikan Promise yang resolve ke objek JS hasil parse JSON, lalu kamu lihat isinya di `data`.
- `.catch(...)` di bagian akhir menangani error **jaringan** (misal offline, DNS error) atau error JS lain di chain Promise tersebut.

**3. Latihan 2 – Versi async/await yang lebih “clean”**

Sekarang versi yang sama, tetapi dengan gaya modern `async/await` supaya lebih enak dibaca:

```js
async function fetchTodo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  try {
    const response = await fetch(url);
    console.log('Status:', response.status);
    console.log('OK?:', response.ok);

    const data = await response.json();
    console.log('Data JSON:', data);
  } catch (error) {
    console.error('Terjadi error jaringan atau fetch gagal:', error);
  }
}

fetchTodo();
```

Poin penting dari latihan ini:

- Fungsi diberi keyword `async`, sehingga di dalamnya kamu bisa pakai `await` untuk menunggu Promise selesai secara lebih deklaratif.
- Di sesi ini **belum** ada logika `if (!response.ok)`, karena itu akan dibedah lebih dalam di sesi 2 ketika masuk **pattern cek status & error handling HTTP**.

---

Kalau sudah nyaman dengan dua latihan ini (bisa utak‑atik URL lain, dan paham apa yang keluar di Console), di **Sesi 2** kita akan fokus ke:

- Cara membaca body dalam berbagai format (JSON, text, blob).
- Mulai membedakan **“request sukses tapi status HTTP error”** vs **“request gagal total karena jaringan”**, sebagai pondasi error handling.
