---
title: Memuat data secara seimbang
---

Sesi ini fokus ke **cara memuat data secara seimbang**: pagination, infinite scroll, membatasi jumlah request paralel, dan caching sederhana di frontend supaya UI tetap responsif di jaringan lambat.

---

## Materi: Pagination & infinite scroll

Untuk menghindari UI yang berat dan banyak request sekaligus, data sebaiknya diambil **bertahap** dengan pola pagination atau infinite scroll.

Umumnya backend menyediakan query seperti `?page=1&limit=20` atau `?limit=20&offset=0`, lalu frontend mengatur kapan harus memanggil halaman berikutnya: lewat tombol **“Load more”** atau saat mendekati bawah halaman (infinite scroll).

Pola dasar “Load more” dengan fetch dan state sederhana:

```js
let currentPage = 1;
const limit = 10;
let isLoading = false;
let hasMore = true;

async function loadMore() {
  if (isLoading || !hasMore) return;

  isLoading = true;
  renderLoadingState(true);

  try {
    const res = await fetch(`https://catfact.ninja/facts?page=${currentPage}&limit=${limit}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    appendItemsToUI(data.data); // tambahkan ke list
    hasMore = data.current_page < data.last_page;
    currentPage += 1;
  } catch (err) {
    showError('Gagal memuat halaman berikutnya');
    console.error(err);
  } finally {
    isLoading = false;
    renderLoadingState(false);
  }
}
```

Untuk **infinite scroll**, trigger `loadMore()` saat user mendekati bawah, misalnya pakai event `scroll` atau `IntersectionObserver`.

Dari sisi UX, sering lebih nyaman memulai dengan tombol “Load more” dulu, baru nanti diupgrade ke infinite scroll ketika flow‑mu sudah stabil.

---

## Materi: Batasi concurrency request

Kalau kamu memicu banyak `fetch()` sekaligus (misalnya 100 user avatar, atau memproses batch data), browser memang punya limit koneksi, tapi tetap bisa membuat UI dan server tertekan kalau tidak dikontrol.

Pola yang sehat: buat **queue sederhana dengan batas concurrency**, misalnya maksimal 5 request jalan bersamaan; sisanya menunggu giliran sampai salah satu selesai.

Contoh fungsi utilitas `runWithConcurrency`:

```js
async function runWithConcurrency(tasks, maxConcurrent = 5) {
  const results = [];
  let index = 0;
  let running = 0;

  return new Promise((resolve, reject) => {
    const next = () => {
      if (index === tasks.length && running === 0) {
        resolve(results);
        return;
      }

      while (running < maxConcurrent && index < tasks.length) {
        const currentIndex = index++;
        const task = tasks[currentIndex];

        running++;

        task()
          .then((result) => {
            results[currentIndex] = result;
          })
          .catch(reject)
          .finally(() => {
            running--;
            next();
          });
      }
    };

    next();
  });
}
```

Pemakaian dengan `fetch`:

```js
const urls = [
  // daftar URL besar
];

const tasks = urls.map(
  (url) => () =>
    fetch(url).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
);

runWithConcurrency(tasks, 5)
  .then((allData) => console.log('Selesai:', allData))
  .catch((err) => console.error('Error batch:', err));
```

Dengan pola ini, walau ada ratusan resource, hanya 5 yang aktif sekaligus sehingga UI dan server tetap stabil, dan ini bisa kamu kombinasikan dengan **timeout + retry** dari sesi 4 untuk robustness maksimal.

---

## Materi: Caching sederhana di frontend

Supaya tidak bolak‑balik memanggil API yang sama (misalnya detail user yang sering dibuka) dan mengurangi loading di jaringan lambat, kamu bisa membuat **layer cache tipis di atas fetch**.

Idenya: pakai `Map` atau objek untuk menyimpan hasil per `cacheKey` (bisa berupa URL atau gabungan URL + parameter), dan sekaligus menyimpan **Promise in-flight** untuk mencegah request duplikat.

**Helper sederhana:**

```js
const cache = new Map();
const inFlight = new Map();

async function cachedFetchJson(url, options = {}) {
  const key = url; // bisa ditambah JSON.stringify(options) kalau perlu

  if (cache.has(key)) {
    return cache.get(key);
  }

  if (inFlight.has(key)) {
    return inFlight.get(key);
  }

  const promise = (async () => {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cache.set(key, data);
    inFlight.delete(key);
    return data;
  })();

  inFlight.set(key, promise);
  return promise;
}
```

Dengan helper ini:

- Panggilan berulang ke URL yang sama akan **menggunakan data cache** jika sudah ada.
- Jika dua bagian UI memanggil resource yang sama hampir bersamaan, request kedua akan “numpang” Promise yang sama (`inFlight`) sehingga hanya **satu request jaringan** yang benar‑benar dikirim.

Ini cukup untuk banyak use case dashboard dan SPA; kalau nanti kamu berpindah ke React/Vue dsb., pola yang sama sudah dibungkus rapi oleh library seperti React Query / SWR, tetapi inti idenya tetap cache + dedup + limit concurrency seperti di atas.

Kalau konsep disini sudah nyaman (pagination/infinite scroll, concurrency, dan caching), selanjutnya kamu akan melihat gambaran besar di luar `fetch`: long polling, Server‑Sent Events, dan WebSocket, supaya peta “network di browser”‑mu lengkap dan tahu kapan harus pakai mana.
