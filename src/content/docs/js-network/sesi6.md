---
title: Upload data dan download
---

Di sesi ini fokusnya dua hal: **upload data (form + file) dengan `fetch` menggunakan `FormData`** dan **download dengan progress bar yang ramah pengguna**.

Untuk upload, fetch hanya bisa memberi status “mulai” dan “selesai”; **progress persen upload real‑time masih harus pakai `XMLHttpRequest`**.

---

## Materi: FormData & kapan dipakai

`FormData` adalah objek yang merepresentasikan data form HTML dalam format `multipart/form-data`, format standar untuk kirim form + file di web.

`FormData` bisa dibuat dari elemen `<form>` langsung (`new FormData(formElem)`) atau kosong lalu diisi manual dengan `.append(name, value)` atau `.append(name, file, filename)`.

Saat `fetch` menerima body berupa `FormData`, browser otomatis menyetel header `Content-Type: multipart/form-data; boundary=...`, jadi kamu **tidak perlu dan jangan override** header ini secara manual.

`FormData` cocok untuk kasus: upload file, submit form kompleks, atau saat backend sudah expect multipart; untuk API JSON murni tetap lebih enak pakai body `JSON.stringify(...)`.

---

## Materi: Upload dengan fetch (tanpa progress persen)

Upload form via fetch secara konsep hampir sama dengan POST JSON di sesi 3; bedanya body diisi objek `FormData` dan tidak perlu set `Content-Type` sendiri.

Pola UI‑nya: sebelum kirim set state “mengupload…” dan disable tombol, setelah `fetch` resolve dan status OK ubah ke “sudah terupload”, dan kalau error tampilkan pesan error + re‑enable tombol.

**Contoh HTML minimal:**

```html
<form id="upload-form">
  <input type="text" name="title" placeholder="Judul file" />
  <input type="file" name="file" />
  <button type="submit">Upload</button>
</form>

<p id="upload-status"></p>
```

Dan JavaScript‑nya:

```js
const form = document.getElementById('upload-form');
const statusEl = document.getElementById('upload-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  statusEl.textContent = 'Mengupload...';

  try {
    const formData = new FormData(form);

    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Banyak API balas JSON dengan info status
    await response.json();
    statusEl.textContent = 'Upload berhasil.';
  } catch (error) {
    console.error(error);
    statusEl.textContent = 'Upload gagal. Periksa koneksi atau ukuran file.';
  } finally {
    submitBtn.disabled = false;
  }
});
```

Kode ini sudah memenuhi UX dasar: user melihat “Mengupload…”, tahu kapan “Upload berhasil” atau “Upload gagal”, dan tombol tidak bisa di‑spam saat proses jalan.

---

## Materi: Batasan fetch untuk upload progress

Versi browser saat ini **belum menyediakan event progress upload di Fetch API**, sehingga kamu tidak bisa mendapatkan `loaded/total` upload hanya dengan `fetch`.

Untuk progress bar upload real‑time (misalnya 0–100%), pendekatan yang direkomendasikan adalah tetap memakai `XMLHttpRequest` karena ada `xhr.upload.onprogress` yang memberi `event.loaded` dan `event.total`.

Namun, untuk banyak aplikasi umum, UX sederhana “sedang mengupload” → “sudah terupload” lewat state di contoh di atas sudah cukup dan jauh lebih simpel daripada mencampur dua API.

Nanti ketika kamu sudah nyaman, kita bisa tambahkan sesi kecil khusus untuk **upload progress dengan XHR** kalau memang butuh granular progress.

---

## Praktik: Download dengan progress bar menggunakan fetch

Berbeda dengan upload, **download progress bisa dilacak dengan `fetch`** melalui `response.body`, yang adalah `ReadableStream` dari byte‑byte response.

Strateginya: baca stream chunk‑by‑chunk dengan `getReader()`, simpan `content-length` dari header jika ada, lalu update progress bar berdasarkan `loaded / total`.

**HTML minimal:**

```html
<button id="download-btn">Download Gambar</button>
<progress id="download-progress" value="0" max="100"></progress>
<img id="preview" alt="Preview" />
<p id="download-status"></p>
```

JavaScript:

```js
const downloadBtn = document.getElementById('download-btn');
const progressEl = document.getElementById('download-progress');
const statusEl = document.getElementById('download-status');
const previewImg = document.getElementById('preview');

downloadBtn.addEventListener('click', async () => {
  const url = 'https://picsum.photos/600/400';
  downloadBtn.disabled = true;
  statusEl.textContent = 'Mengunduh...';
  progressEl.value = 0;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentLength = response.headers.get('Content-Length');
    const total = contentLength ? parseInt(contentLength, 10) : null;

    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      received += value.byteLength;

      if (total) {
        const percent = Math.round((received / total) * 100);
        progressEl.value = percent;
      }
    }

    const blob = new Blob(chunks);
    const objectUrl = URL.createObjectURL(blob);

    previewImg.src = objectUrl;
    statusEl.textContent = 'Download selesai.';
    if (!total) {
      progressEl.value = 100;
    }
  } catch (error) {
    console.error(error);
    statusEl.textContent = 'Download gagal. Coba lagi.';
  } finally {
    downloadBtn.disabled = false;
  }
});
```

Pattern ini sudah production‑grade untuk **download besar**: user lihat progress, tahu kalau selesai, dan kamu tetap pakai Fetch API modern tanpa harus balik ke XHR untuk sisi download.

Kalau sesi ini sudah nyaman, di sesi selanjutnya, kita akan membahas **pembatalan request & aksi UI (AbortController)**: misalnya tombol “Batal download”, mencegah double‑submit, dan meng-cancel banyak request sekaligus ketika user pindah halaman.
