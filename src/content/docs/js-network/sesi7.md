---
title: AbortController lanjutan
---

`AbortController` dipakai untuk **membatalkan request fetch yang sudah berjalan**, misalnya saat user klik “Batal”, melakukan re‑fetch, atau berpindah halaman sehingga request lama tidak perlu diselesaikan.

Di sesi ini kamu akan lihat cara pakainya di UI untuk satu request maupun banyak request sekaligus.

---

## Materi: Konsep AbortController

`AbortController` adalah objek yang punya dua hal penting: method `abort()` dan properti `signal`. `signal` ini dikirim ke `fetch` lewat opsi `{ signal: controller.signal }`, dan ketika `abort()` dipanggil, semua operasi async yang memakai signal tersebut akan dibatalkan dan `fetch` akan me‑reject dengan error bertipe abort.

Ini bisa dipakai tidak hanya untuk `fetch` tunggal, tetapi juga beberapa `fetch` sekaligus jika mereka berbagi signal yang sama, sehingga sekali `abort()` bisa menghentikan semuanya.

---

## Materi: Cancel request & cegah race

Di UI nyata, AbortController berguna untuk tiga pola utama:

- **Tombol “Batal”**: user klik cancel sementara request masih loading, sehingga UI cepat kembali idle dan resource jaringan tidak terbuang.
- **Cegah race condition**: kalau user menekan tombol “Muat ulang” berkali‑kali, request lama di‑abort supaya UI hanya menampilkan hasil dari request terakhir.
- **Pindah halaman / komponen unmount**: ketika halaman diganti, semua request terkait halaman lama di‑abort agar tidak mengupdate UI yang sudah tidak ada.

Saat menangani error di `catch`, penting membedakan abort vs error lain dengan mengecek `error.name === 'AbortError'` (atau `TimeoutError` jika memakai `AbortSignal.timeout`), sehingga kamu bisa menampilkan pesan yang tepat atau bahkan tidak menampilkan error sama sekali untuk cancel yang disengaja.

---

## Praktik: Tombol “Batal” untuk 1 fetch

Contoh kecil: user bisa memulai load data dan membatalkannya sebelum server selesai merespon.

```html
<button id="load-btn">Muat data</button>
<button id="cancel-btn">Batal</button>
<p id="status"></p>
<pre id="result"></pre>
```

```js
const loadBtn = document.getElementById('load-btn');
const cancelBtn = document.getElementById('cancel-btn');
const statusEl = document.getElementById('status');
const resultEl = document.getElementById('result');

let controller = null;

loadBtn.addEventListener('click', async () => {
  // Kalau ada request sebelumnya, batalkan dulu
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  const { signal } = controller;

  statusEl.textContent = 'Memuat...';
  resultEl.textContent = '';
  loadBtn.disabled = true;
  cancelBtn.disabled = false;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', { signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    statusEl.textContent = 'Berhasil memuat.';
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    if (error.name === 'AbortError') {
      statusEl.textContent = 'Dibatalkan oleh pengguna.';
    } else {
      statusEl.textContent = 'Terjadi error jaringan / server.';
      console.error(error);
    }
  } finally {
    loadBtn.disabled = false;
    cancelBtn.disabled = true;
    controller = null;
  }
});

cancelBtn.addEventListener('click', () => {
  if (controller) {
    controller.abort();
  }
});
```

Di sini kamu melatih: membuat satu `AbortController` per request, meng‑assign ke variabel agar bisa diakses handler lain (tombol “Batal”), mengirim `signal` ke `fetch`, dan merespon `AbortError` dengan pesan yang ramah di UI.

---

## Praktik: Batalkan banyak request sekaligus

Kadang kamu ingin memuat beberapa resource paralel (misalnya beberapa section di dashboard), tapi kalau user pindah halaman semua harus stop.

Caranya: pakai **satu controller** yang sinyalnya dipakai oleh semua fetch di halaman itu.

```js
async function loadPageData() {
  const controller = new AbortController();
  const { signal } = controller;

  // Simpan controller ini, misalnya di global/closure; pada framework biasanya di state/ref
  window.currentPageController = controller;

  try {
    const [userRes, postsRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users/1', { signal }),
      fetch('https://jsonplaceholder.typicode.com/posts?userId=1', { signal }),
    ]);

    if (!userRes.ok || !postsRes.ok) {
      throw new Error('HTTP error');
    }

    const [user, posts] = await Promise.all([userRes.json(), postsRes.json()]);

    console.log('User:', user);
    console.log('Posts:', posts);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Semua request halaman dibatalkan.');
    } else {
      console.error('Error load halaman:', error);
    }
  }
}

// Contoh: dipanggil ketika user pindah halaman
function teardownPage() {
  if (window.currentPageController) {
    window.currentPageController.abort();
    window.currentPageController = null;
  }
}
```

Pattern ini sangat berguna untuk menjaga UI tetap ringan: tidak ada request “nyangkut” ketika user sudah tidak butuh datanya lagi, dan kamu terhindar dari bug klasik “UI di‑patch oleh response lama yang telat datang”.

Kalau pemakaian AbortController ini sudah jelas, di Sesi selanjutnya kita akan masuk ke **CORS, credentials, dan security dasar** supaya kamu paham kenapa kadang fetch gagal padahal kode sudah benar, dan bagaimana merancang API / frontend yang bersahabat dengan cross‑origin.
