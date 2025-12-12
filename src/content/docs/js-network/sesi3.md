---
title: Options Fetch
---

Sekarang, fokus ke **mengirim data ke server** dengan `fetch` memakai **POST/PUT/DELETE** dan **JSON body** sebagai dasar API modern.

---

## Materi: Method HTTP tulis data

Di RESTful API, method HTTP biasanya dipakai seperti ini: `GET` untuk baca data, `POST` untuk membuat resource baru, `PUT` atau `PATCH` untuk update, dan `DELETE` untuk menghapus.

Saat membuat/mengubah/menghapus data dari frontend, hampir selalu kamu akan kirim **JSON** di body request dan server balas JSON juga (misalnya payload dan pesan sukses/gagal).

---

## Materi: Opsi `fetch` (method, headers, body)

Pemanggilan `fetch` bertipe tulis data selalu memanfaatkan argumen kedua `options` yang berisi beberapa properti penting: `method`, `headers`, dan `body`.
Untuk mengirim JSON, kamu perlu:

- `method: 'POST'` / `'PUT'` / `'PATCH'` / `'DELETE'` sesuai operasi.
- Header `Content-Type: 'application/json; charset=utf-8'` agar server tahu isi body berupa JSON.
- `body: JSON.stringify(objekJs)` karena body HTTP hanya menerima teks/biner, bukan objek JavaScript langsung.

Kalau `body` berupa **string biasa** dan kamu tidak set `Content-Type`, browser akan mengisi default `text/plain; charset=UTF-8`, sehingga server tidak mengenalinya sebagai JSON.

Selain JSON, `fetch` juga bisa menerima `FormData`, `Blob`, `ArrayBuffer` sebagai body, tetapi di sesi ini kita fokus pada JSON karena itu format utama API modern.

---

## Praktik: POST JSON (create resource)

Contoh: membuat “post” baru ke API contoh `jsonplaceholder.typicode.com`. Jalankan di browser (file HTML + `<script>` atau langsung di console devtools):

```js
async function createPost() {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  const payload = {
    title: 'Belajar Fetch POST',
    body: 'Ini konten post test',
    userId: 123,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Gagal membuat post, status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respons server (POST):', data);
  } catch (error) {
    console.error('Error saat POST:', error);
  }
}

createPost();
```

Hal penting yang sedang kamu latih di sini:

- Mengisi `method`, `headers`, dan `body` dengan pattern yang benar untuk JSON.
- Mengulang pola `if (!response.ok) throw ...` dari sesi 2, tetapi sekarang pada **request yang punya body**.

---

## Praktik: PUT & DELETE (update dan hapus)

Secara struktur, `PUT`/`PATCH` dan `DELETE` sangat mirip dengan `POST`, hanya beda method dan kadang URL (biasanya menyertakan `id` resource).

**Update penuh resource (contohnya edit post dengan id 1):**

```js
async function updatePost() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';

  const payload = {
    id: 1,
    title: 'Judul baru',
    body: 'Konten baru',
    userId: 123,
  };

  try {
    const response = await fetch(url, {
      method: 'PUT', // bisa PATCH kalau hanya sebagian field
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Gagal update post, status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respons server (PUT):', data);
  } catch (error) {
    console.error('Error saat PUT:', error);
  }
}

updatePost();
```

Hapus resource (misalnya delete post id 1):

```js
async function deletePost() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Gagal hapus post, status: ${response.status}`);
    }

    // Banyak API balas body kosong atau pesan singkat
    console.log('Post berhasil dihapus (menurut server).');
  } catch (error) {
    console.error('Error saat DELETE:', error);
  }
}

deletePost();
```

Di UI nyata, pola ini akan menjadi dasar untuk menampilkan status seperti **“data tersimpan”, “data gagal tersimpan”, dan “data sudah terhapus”**, yang nanti akan di‑upgrade dengan timeout, retry, dan cancel di sesi‑sesi berikutnya.

Kalau bagian ini sudah nyaman (terutama membedakan kapan pakai POST/PUT/DELETE dan cara set body + headers JSON), sesi 4 nanti akan fokus ke **error handling yang serius**: timeout, retry, dan pemisahan jelas antara error HTTP, error jaringan, dan error parsing.
