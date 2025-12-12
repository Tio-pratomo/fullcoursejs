---
title: Error handling
---

Sesi ini fokus ke **error handling serius**: membedakan jenis error, menambah **timeout** dengan `AbortController`, dan membuat **retry sederhana** yang nanti bisa kamu hubungkan ke UI.

---

## Jenis error di fetch

Secara konsep ada tiga level error yang perlu kamu pisahkan:

- **Error jaringan / teknis**  
  Contoh: offline, DNS gagal, CORS block. Di kasus ini, Promise `fetch()` akan **reject** dan langsung masuk ke `catch`.

- **Error HTTP (status 4xx/5xx)**  
  Request sukses dikirim dan dibalas, tapi statusnya error (misalnya 404, 500). Promise `fetch()` tetap **resolve**, tapi `response.ok === false`, jadi kamu yang harus memutuskan untuk menganggap ini error.

- **Error aplikasi / parsing**  
  Contoh: server balas JSON, tapi struktur tidak sesuai harapan sehingga kode kamu error ketika mengakses field, atau body bukan JSON valid sehingga `response.json()` lempar error.

Pattern dasar yang sehat:

```js
async function safeFetchJson(url, options) {
  try {
    const response = await fetch(url, options);

    // Level HTTP: status di luar 2xx
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Level parsing / format body
    const data = await response.json();
    return data;
  } catch (error) {
    // Bisa di-mapping ke jenis error atau di-log
    console.error('Fetch gagal:', error);
    throw error; // lempar lagi supaya pemanggil bisa handle
  }
}
```

Pendekatan ini konsisten dengan pola yang direkomendasikan banyak referensi modern: cek `response.ok` segera, lalu tangani `catch` untuk error jaringan & runtime lainnya.

---

## Timeout dengan AbortController / AbortSignal

Secara default, `fetch` bisa menunggu sangat lama kalau server lambat. Di UI nyata, ini buruk untuk UX. Untuk itu dipakai **AbortController** (API standar) atau **`AbortSignal.timeout()`** di browser modern.

Versi modern (lebih ringkas) dengan `AbortSignal.timeout`:

```js
async function fetchWithTimeout(url, { timeout = 5000, ...options } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

Atau, jika browser sudah mendukung `AbortSignal.timeout`:

```js
async function fetchWithTimeout(url, { timeout = 5000, ...options } = {}) {
  const signal = AbortSignal.timeout(timeout);
  return fetch(url, { ...options, signal });
}
```

Konsepnya:

- Buat `AbortController`, ambil `controller.signal`, lalu kirim ke `fetch` melalui opsi `signal`.
- Set `setTimeout` untuk memanggil `controller.abort()` setelah `timeout` ms; ketika ini terjadi, `fetch` akan reject dengan error bertipe abort.
- Di `catch`, kamu bisa cek apakah error karena abort (timeout) dan menampilkan pesan “request timeout” khusus ke user.

Contoh gabungan: **GET JSON + timeout + cek status**:

```js
async function fetchJsonWithTimeout(url, { timeout = 5000, ...options } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timeout');
    } else {
      console.error('Error fetch:', error);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

Ini nantinya sangat berguna untuk kasus jaringan lambat: kamu bisa menetapkan standar misalnya “max 8 detik per request API kritikal”.

---

## Retry dengan backoff sederhana

Kadang error sementara (misalnya fluktuasi jaringan atau server momentary overload) bisa hilang kalau dicoba ulang. Di sisi lain, **mengulang POST yang tidak idempotent bisa bahaya** (double-create data di server).
Praktik umum:

- Retry otomatis untuk **request idempotent** (`GET`, `PUT` tertentu, atau `DELETE` jika aman di API‑mu).
- Gunakan **exponential backoff** (delay makin lama setiap percobaan) agar tidak membanjiri server.

Contoh helper retry untuk request GET (atau request aman lain):

```js
async function fetchWithRetry(
  url,
  {
    retries = 3,
    baseDelay = 300, // ms
    ...options
  } = {}
) {
  let attempt = 0;

  while (true) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      attempt += 1;

      const isLastAttempt = attempt > retries;

      // Untuk contoh sederhana, hanya retry error jaringan / timeout.
      const isNetworkLikeError = error.name === 'AbortError' || error.message === 'Failed to fetch';

      if (isLastAttempt || !isNetworkLikeError) {
        throw error;
      }

      const delay = baseDelay * 2 ** (attempt - 1); // exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
```

Ide utamanya:

- Kalau error HTTP, langsung `throw`.
- Kalau error jaringan/timeout, coba lagi sampai `retries` habis.
- Delay antar percobaan bertambah: misalnya 300 ms, lalu 600 ms, lalu 1200 ms, dst.

Di UI nanti kamu bisa memetakan:

- Percobaan ulang otomatis di background (user cuma melihat loading sedikit lebih lama).
- Atau setelah semua retry gagal, tampilkan pesan **“Gagal terhubung, coba lagi”** dan tombol “Retry” yang memanggil fungsi ini lagi.

---

Kalau konsep sesi ini sudah nyaman (jenis error, timeout dasar, dan retry dengan backoff sederhana), di **Sesi 5** kita akan mulai menghubungkan semuanya ke **state UI**: loading, success, error, dan bagaimana menampilkan status seperti **“sudah ter‑upload”, “sudah terhapus”, atau “sedang memuat”** dengan rapi.
