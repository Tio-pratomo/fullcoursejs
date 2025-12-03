---
title: Fetch API (GET/POST/PUT/DELETE)
---

Di Sesi 6 ini kita fokus ke **Fetch API**: cara kirim HTTP request (GET, POST, PUT, DELETE) dengan pendekatan modern berbasis Promise, sangat cocok dikombinasikan dengan async/await.

## Materi: Overview Fetch API

Fetch API adalah fitur bawaan browser modern (tanpa library tambahan) untuk melakukan HTTP request ke server, misalnya GET data, POST data baru, update (PUT), atau hapus (DELETE). Di balik layar, `fetch()` selalu mengembalikan Promise sehingga bisa ditangani dengan `.then()/.catch()` atau dengan async/await.

Secara umum, bentuk pemanggilan `fetch` adalah:

```js
fetch(url, options?);
```

- `url` (wajib): alamat resource (API endpoint) yang ingin diakses.
- `options` (opsional): object yang berisi pengaturan request seperti `method`, `headers`, dan `body`.

Jika `options` tidak diberikan, `fetch()` otomatis menggunakan method **GET**.

## Materi: GET Request dan Konversi ke JSON

Di materi sumber, pertama-tama ditunjukkan bahwa kalau `fetch()` dipanggil tanpa URL yang valid, response status menjadi 404 (not found). Ketika URL dummy API (seperti dummy JSON API) diberikan, status berubah menjadi 200 dan `response.body` berisi stream yang perlu dikonversi ke JSON dengan `response.json()`.

Contoh GET dengan `.then()`:

```js
fetch('https://dummyjson.com/products/1') // contoh dummy API
  .then((response) => {
    // response.ok dan response.status bisa dicek di sini
    return response.json(); // konversi stream ke JSON (Promise juga)
  })
  .then((data) => {
    console.log('Product:', data.title, data.price);
  })
  .catch((error) => {
    console.log('Fetch error:', error);
  });
```

`response.json()` sendiri mengembalikan Promise yang resolve menjadi objek JavaScript berisi pasangan key-value (misal `title`, `price`, `rating`, `images`, dll.).

Data inilah yang nantinya bisa dipakai untuk dirender ke HTML (misalnya list produk).

Versi yang lebih enak dengan async/await:

```js
const getProduct = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/1');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Product:', data.title, data.price);
  } catch (error) {
    console.log('Fetch error:', error.message);
  }
};

getProduct();
```

## Materi: POST, PUT, dan DELETE dengan Options Object

Untuk request selain GET (misalnya POST), materi menjelaskan bahwa kita harus mengisi argumen kedua berupa **options object**. Di dalamnya kita set `method`, `headers` (misal `Content-Type: application/json`), dan `body` yang berisi JSON string (bukan objek mentah).

Contoh POST:

```js
const createProduct = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'My New Product',
        price: 123,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Created:', data);
  } catch (error) {
    console.log('POST error:', error.message);
  }
};
```

Pola yang sama dipakai untuk **PUT** (update) dan **DELETE**, hanya mengganti `method` dan kadang endpoint-nya:

```js
// PUT (update)
fetch('https://dummyjson.com/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated Title' }),
});

// DELETE
fetch('https://dummyjson.com/products/1', {
  method: 'DELETE',
});
```

Di materi, penekanan utamanya:

- Selalu set `Content-Type: application/json` ketika mengirim body JSON.
- Selalu `JSON.stringify()` objek JavaScript sebelum dikirim di `body`.

## Praktik: Latihan Fetch + Async/Await

Target Sesi 6: terbiasa melakukan operasi dasar CRUD ke dummy API menggunakan fetch + async/await.

1. **Latihan 1 – GET satu produk**

   Buat file `fetch-get.js`:

   ```js
   const getSingleProduct = async () => {
     try {
       const res = await fetch('https://dummyjson.com/products/1');
       if (!res.ok) throw new Error(`Status: ${res.status}`);

       const data = await res.json();
       console.log('Title:', data.title);
       console.log('Price:', data.price);
     } catch (e) {
       console.error('GET error:', e.message);
     }
   };

   getSingleProduct();
   ```

2. **Latihan 2 – GET list produk**

   Ambil endpoint list (misal `https://dummyjson.com/products?limit=5`), tampilkan `title` tiap item di loop.

3. **Latihan 3 – POST produk baru (fake)**

   Buat `fetch-post.js` yang mengirim objek `{ title, price }` dan log response dari server (biasanya dummy API akan mengembalikan objek yang sama ditambah `id`).

4. **Latihan 4 – PUT dan DELETE**
   - Ubah salah satu produk (PUT) dengan title baru.
   - Lakukan DELETE dan lihat apa yang dikembalikan API (biasanya objek yang dihapus).

Kalau sudah lancar dengan pola ini (URL + options + `response.json()` + async/await), kamu siap untuk **Sesi 7: Mini Projects** (Chuck Norris Joke App, Weather App, Pokedex) yang basically hanya mengulang pattern yang sama dengan sedikit variasi di UI dan struktur data API.
