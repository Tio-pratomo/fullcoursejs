---
title: Menghubungkan fetch ke UI
---

Sesi ini fokus ke **menghubungkan fetch ke UI**: bagaimana menampilkan **loading, sukses, error, dan empty** dengan rapi, plus contoh kecil untuk upload/hapus yang terasa “responsif” buat user.

---

## Materi: State async & pola UI

Di hampir semua UI modern, setiap network request minimal punya empat state yang perlu kamu pikirkan: **idle**, **loading**, **success (data)**, dan **error**; kadang juga **empty** saat respon sukses tapi datanya kosong.

Pola dasarnya adalah menyimpan beberapa state di JS (bisa variabel biasa atau state framework) misalnya `isLoading`, `errorMessage`, dan `data`, lalu UI merender berdasarkan kombinasi nilai‑nilai ini.

**Best practice yang relevan (upload/hapus/memuat seimbang):**

- Selalu set `isLoading = true` **sebelum** memanggil `fetch`, dan set kembali `false` di blok `finally` supaya loading pasti dimatikan, entah sukses atau error.
- Saat `isLoading` true untuk aksi tertentu, **disable tombol terkait** dan ganti labelnya jadi “Memuat…”, “Mengupload…”, atau “Menghapus…”, supaya user tahu app sedang kerja dan tidak spam klik.
- Mapping error dari sesi 4 ke UI:
  - Error jaringan/timeout → pesan seperti “Koneksi bermasalah, coba lagi”.
  - Error HTTP (404/500) → pesan lebih spesifik, misalnya “Resource tidak ditemukan” atau “Server error, coba beberapa saat lagi”.

Untuk aksi tulis data (POST/PUT/DELETE) seperti upload/hapus, ada dua pola besar:

- **Pola tradisional (pesimis)**:

  tunggu server sukses dulu baru update UI (misalnya baru hapus item dari list setelah DELETE 200 OK).

  Ini lebih aman tapi terasa sedikit lambat.

- **Optimistic UI**:

  UI langsung berubah seolah‑olah sukses (item langsung hilang, counter langsung naik), lalu kalau request gagal, state di‑rollback dan tampilkan pesan error.

  Ini membuat app terasa jauh lebih cepat, dan banyak dipakai di social media / dashboard modern.

---

## Praktik: Helper request + UI vanilla

Contoh ini memakai JavaScript murni (tanpa framework) untuk:

- Memuat list todo dari API.
- Menampilkan state **loading / error / data / empty**.
- Menunjukkan pola yang sama bisa kamu pakai untuk aksi seperti upload/hapus nanti.

HTML sederhana:

```html title="index.html"
<body>
  <h1>Daftar Todo</h1>

  <button id="reload-btn">Muat ulang</button>
  <p id="status"></p>
  <ul id="todo-list"></ul>

  <script src="app.js"></script>
</body>
```

```js title="app.js"
const statusEl = document.getElementById('status');
const listEl = document.getElementById('todo-list');
const reloadBtn = document.getElementById('reload-btn');

let isLoading = false;
let errorMessage = null;
let todos = [];

// Helper: update tampilan berdasarkan state saat ini
function render() {
  // Status text: prioritas error > loading > empty > success
  if (errorMessage) {
    statusEl.textContent = `Error: ${errorMessage}`;
  } else if (isLoading) {
    statusEl.textContent = 'Memuat data...';
  } else if (!todos.length) {
    statusEl.textContent = 'Tidak ada data.';
  } else {
    statusEl.textContent = `Berhasil memuat ${todos.length} item.`;
  }

  // Render list
  listEl.innerHTML = '';
  for (const todo of todos) {
    const li = document.createElement('li');
    li.textContent = todo.title;
    listEl.appendChild(li);
  }

  // Tombol dinonaktifkan saat loading
  reloadBtn.disabled = isLoading;
}

// Helper fetch JSON dengan cek status + error handling dasar
async function fetchJson(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

async function loadTodos() {
  isLoading = true;
  errorMessage = null;
  render();

  try {
    const data = await fetchJson('https://jsonplaceholder.typicode.com/todos?_limit=5');

    todos = data;
  } catch (error) {
    console.error(error);
    errorMessage = error.message || 'Terjadi kesalahan tak dikenal';
    todos = [];
  } finally {
    isLoading = false;
    render();
  }
}

reloadBtn.addEventListener('click', () => {
  loadTodos();
});

// Muat pertama kali
loadTodos();
```

Hal yang sedang kamu latih di sini:

- **State machine kecil**: kombinasi `(isLoading, errorMessage, todos.length)` menentukan apa yang UI tampilkan.
- Penggunaan `try { ... } catch { ... } finally { ... }` untuk menjamin `isLoading` kembali `false` dan UI tidak “nyangkut” di loading saat error.
- Bisa dengan mudah diadaptasi untuk aksi lain (upload/hapus) dengan menambahkan state lokal di level tombol, misalnya flag `isDeleting` per item dan pesan “Todo sudah dihapus” setelah request sukses.

Kalau pola state + render ini sudah nyaman, selanjutnya, kita mulai fokus ke **upload & download yang ramah pengguna**: `FormData`, upload file, dan progress download (pakai stream) sehingga kamu bisa menampilkan “sudah terupload” dan persentase dengan lebih presisi.
