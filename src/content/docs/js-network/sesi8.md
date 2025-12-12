---
title: CORS & credentials
---

Sesi ini fokus ke **CORS & credentials**: kenapa kadang `fetch` gagal dengan pesan seperti _“blocked by CORS policy”_ padahal kode sudah benar, dan bagaimana mengonfigurasi sisi frontend dengan tepat (serta apa yang harus kamu minta dari backend).

---

## Materi: Same-origin & apa itu CORS

Browser punya aturan keamanan **same-origin policy**: script dari origin A (kombinasi protokol + domain + port) hanya boleh bebas mengakses resource di origin yang sama.

Kalau aplikasimu ada di `http://localhost:5173` dan API di `http://localhost:3000`, itu sudah dianggap **cross-origin**, dan akses JS ke responsnya dibatasi kecuali server API mengizinkan lewat **CORS (Cross-Origin Resource Sharing)**.

CORS bekerja lewat header HTTP di sisi server, terutama:

- `Access-Control-Allow-Origin`: origin mana yang diizinkan (misalnya `https://myapp.com`, bukan selalu `*`).
- `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Max-Age` untuk request yang lebih kompleks (non‑simple).

---

## Materi: Simple request vs preflight

Browser membedakan dua tipe request cross-origin: **simple (aman)** dan **non-simple**, yang menentukan apakah perlu preflight `OPTIONS` dulu.

Request dianggap _simple_ jika method hanya `GET`, `POST`, atau `HEAD` dan header kustom terbatas pada subset tertentu (`Accept`, `Accept-Language`, `Content-Language`, dan `Content-Type` dengan nilai `application/x-www-form-urlencoded`, `multipart/form-data`, atau `text/plain`).

Jika kamu memakai method lain (misalnya `PUT`, `DELETE`) atau header kustom (seperti `Authorization`, `X-API-Key`, atau `Content-Type: application/json`), browser otomatis mengirim **preflight request** `OPTIONS` untuk bertanya dulu apakah request utama diizinkan.

Server harus menjawab preflight ini dengan header seperti `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, dan `Access-Control-Allow-Headers`; kalau tidak cocok, browser memblokir dan di JS kamu hanya melihat error `TypeError: Failed to fetch` / CORS, bukan respons HTTP‑nya.

---

## Materi: Credentials & opsi fetch

Secara default, request CORS via `fetch` **tidak mengirim kredensial** (cookie, HTTP Auth, TLS client cert) kecuali kamu minta.

Jika perlu kirim cookie atau auth header lintas origin, kamu harus set `credentials: 'include'` di opsi `fetch`, misalnya saat sesi login pakai cookie di domain API.

Agar respons bisa dibaca JS, server wajib:

- Menyetel `Access-Control-Allow-Origin` ke **origin spesifik**, bukan `*`, jika request memakai kredensial.
- Menyetel `Access-Control-Allow-Credentials: true` di respons, yang memberi tahu browser bahwa kredensial boleh dipakai.

Jika kombinasi ini tidak benar (misalnya `credentials: 'include'` tapi server pakai `Access-Control-Allow-Origin: *`), browser akan memblok dan kamu akan lihat error khas “must not be the wildcard '\*' when the request's credentials mode is 'include'”.

---

## Praktik: Pola fetch & debugging CORS

Contoh pola `fetch` dengan dan tanpa kredensial (frontend):

```js
// Tanpa kredensial (default untuk kebanyakan public API)
async function getPublicData() {
  const response = await fetch('https://api.example.com/public');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

// Dengan kredensial (cookie / session dari API)
async function getPrivateData() {
  const response = await fetch('https://api.example.com/private', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
```

Jika kamu menemui error CORS saat memakai `fetch`, langkah debugging di frontend yang sehat:

- Cek di DevTools → Network: apakah ada preflight `OPTIONS` dan bagaimana header CORS di responsnya (`Access-Control-Allow-*`).
- Pastikan ketika memakai `credentials: 'include'`, server **tidak** mengirim `Access-Control-Allow-Origin: *` dan sebaliknya menyetel origin spesifik plus `Access-Control-Allow-Credentials: true`.

Konfigurasi header CORS sepenuhnya ditentukan di **backend**, jadi di sisi frontend peranmu adalah: memilih opsi `fetch` yang tepat (`method`, header, `credentials`) dan bisa membaca error CORS sebagai “masalah konfigurasi server / origin”, bukan bug di logika fetch‑mu.

Kalau bagian ini sudah jelas, di **Sesi 9** kita akan naik ke level **manajemen data & loading seimbang di UI**: pagination, infinite scroll, membatasi concurrency request, dan caching sederhana di frontend agar UI tetap responsif di jaringan lambat.
