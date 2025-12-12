---
title: Fetch GET & Parsing Response
---

Di sesi ini fokusnya, memahami **cara membaca isi response (`body`) dalam berbagai format** dan **mulai membiasakan cek `response.ok`** agar nanti gampang naik level ke error handling yang lebih serius.

---

## Materi: Format body response

Objek `Response` yang dikembalikan `fetch()` menyimpan **meta** (status, headers) dan **body** (isi data). Body ini bukan langsung string/objek, tapi **stream** yang harus di-“parse” lewat metode khusus yang semuanya mengembalikan Promise.

**Metode utama untuk membaca body:**

- `response.json()` → parse body sebagai JSON dan hasilnya jadi objek JavaScript.
- `response.text()` → baca seluruh body sebagai string (cocok untuk HTML, teks biasa, log).
- `response.blob()` → baca sebagai `Blob` (file biner: gambar, PDF, dll).
- `response.formData()` → kalau server mengirim multipart form-data, bisa dibaca sebagai `FormData`.

Body **hanya bisa dibaca sekali**. Setelah kamu memanggil `response.json()` atau `response.text()`, stream dianggap sudah habis dan pemanggilan metode lain untuk body akan gagal.

Biasanya kamu memilih metode baca berdasarkan `Content-Type` header, misalnya jika `Content-Type: application/json`, maka gunakan `response.json()`.

---

## Materi: Status & error dasar

`fetch()` punya perilaku penting yaitu **Promise hanya reject kalau ada error jaringan atau request tidak bisa dibuat sama sekali**, misalnya offline, DNS gagal, atau CORS diblokir.

Kalau server balas 404 atau 500, `fetch()` tetap resolve dengan `Response`, sehingga kamu harus cek sendiri `response.ok` atau `response.status` untuk menganggapnya error aplikasi.

Properti kunci di `Response`:

- `response.status`: angka status HTTP, misalnya 200, 404, 500.
- `response.ok`: `true` kalau status di rentang 200–299, `false` untuk status lain (termasuk 400/500).

Pattern dasar (akan dipakai berulang di sesi selanjutnya) adalah:

1. `await fetch(url)` → dapat `response`.
2. Kalau `!response.ok`, buat dan `throw` Error dengan informasi status.
3. Setelah itu, kalau status OK, baca body dengan `.json()` / `.text()` / `.blob()`.

**Contoh helper kecil yang rapih:**

```js
async function fetchJson(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    // Di sesi berikutnya bisa di-upgrade: logging, mapping pesan, dsb.
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Di sini diasumsikan response berformat JSON
  return response.json();
}
```

Pola ini membuat perbedaan jelas antara:

- **Error HTTP** (status di luar 2xx) → kamu tangani via `if (!response.ok) throw ...`.
- **Error jaringan / CORS / fetch gagal total** → Promise `fetch` langsung `reject` dan tertangkap di `catch`.

---

## Praktik

Latihan di sesi ini: kamu akan **membaca response di tiga format berbeda** (JSON, text, blob) dan **menggunakan pattern cek `response.ok`**.

### Latihan 1 – Ambil JSON dengan cek status

```js
async function loadTodo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request gagal dengan status ${response.status}`);
    }

    const data = await response.json();
    console.log('Todo:', data);
  } catch (error) {
    console.error('Terjadi error (HTTP atau jaringan):', error);
  }
}

loadTodo();
```

Latihan ini melatih pola “**cek `response.ok` dulu, baru parse body**”, dan mulai membedakan error jaringan (masuk ke `catch`) versus error status HTTP (status 4xx/5xx yang kamu lempar manual).

### Latihan 2 – Ambil HTML/text

```js
async function loadText() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Gagal load text, status ${response.status}`);
    }

    const text = await response.text();
    console.log('Potongan text:', text.slice(0, 120));
  } catch (error) {
    console.error('Error ambil text:', error);
  }
}

loadText();
```

Di dunia nyata, pola ini berguna saat kamu ingin **preview raw response** dari API yang belum rapi atau sedang di‑debug, tanpa harus langsung mem‑parse ke JSON.

### Latihan 3 – Download gambar sebagai Blob

```js
async function loadImage() {
  const url = 'https://via.placeholder.com/150';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Gagal download gambar, status ${response.status}`);
    }

    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Gambar hasil fetch';
    document.body.append(img);
  } catch (error) {
    console.error('Error download gambar:', error);
  }
}

loadImage();
```

Latihan ini penting untuk kebutuhan **UI real-world** seperti preview gambar yang baru di-upload atau thumbnail yang diambil dari server.

---

Kalau tiga latihan ini sudah terasa nyaman (terutama pola `if (!response.ok) throw...` dan perbedaan `.json()` / `.text()` / `.blob()`), di **Sesi 3** kita akan masuk ke **fetch untuk POST/PUT/DELETE dan mengirim JSON body**, yang merupakan inti interaksi “tulis data” ke server.
