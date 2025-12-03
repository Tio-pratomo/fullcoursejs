---
title: Browser Object Model (BOM)
---

Kita akan memulai perjalanan ini dari "rumah" bagi seluruh kode JavaScript di browser, yaitu **Browser Object Model (BOM)**.

Sebelum kita menyentuh elemen visual HTML (DOM), kita harus paham dulu lingkungan tempat aplikasi kita hidup.

---

## 1. The Window Object: Sang Penguasa Global

Di browser, `window` adalah object tertinggi (root). Semua yang Anda deklarasikan secara global (`var`, `function`) otomatis menjadi properti dari `window`.

Selain sebagai container global, `window` merepresentasikan jendela browser itu sendiri.

### Key Properties & Methods

- **Viewport Geometry**:
  Anda sering perlu tahu ukuran area "pandang" user untuk responsivitas.

  ```javascript wrap
  // Mendapatkan lebar & tinggi area konten (viewport)
  const width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  const height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  console.log(`Viewport size: ${width}x${height}`);
  ```

- **Window Control**:
  Mengontrol jendela browser (hati-hati, browser modern sering memblokir popup).

  ```javascript
  // Membuka window baru
  // Parameter: URL, WindowName, FeatureString
  let jsWindow = window.open('http://localhost/admin', 'adminPanel', 'height=600,width=800');

  // Resize window (Hanya bekerja pada window yang dibuka oleh script)
  setTimeout(() => {
    if (jsWindow) jsWindow.resizeTo(1024, 768);
  }, 3000);

  // Menutup window
  // jsWindow.close();
  ```

## 2. Location Object: Mengelola URL

Object `location` (bisa diakses via `window.location` atau `document.location`) adalah cara kita membaca dan memanipulasi URL di address bar.

### Anatomi URL

Misalkan URL saat ini: `http://localhost:8080/app/user.html?id=123&type=admin#profile`

| Properti            | Nilai Contoh         | Keterangan                   |
| :------------------ | :------------------- | :--------------------------- |
| `location.href`     | Full URL string      | Keseluruhan URL              |
| `location.protocol` | `http:`              | Protokol yang dipakai        |
| `location.host`     | `localhost:8080`     | Hostname + Port              |
| `location.pathname` | `/app/user.html`     | Path file/resource           |
| `location.search`   | `?id=123&type=admin` | Query String (Parameter)     |
| `location.hash`     | `#profile`           | Fragment identifier (Anchor) |

### Navigasi & Redirection

Ada tiga cara utama memindahkan user ke halaman lain:

1.  **Assign (Standard)**: Mencatat history, user bisa tekan tombol "Back".

    ```javascript
    location.assign('https://www.google.com');
    // Atau shorthand:
    location.href = 'https://www.google.com';
    ```

2.  **Replace (Stealth)**: **Tidak** mencatat history. User tidak bisa kembali ke halaman asal. Cocok untuk halaman login sukses agar user tidak kembali ke form login saat tekan "Back".

    ```javascript
    location.replace('https://www.google.com');
    ```

3.  **Reload**: Refresh halaman.
    ```javascript
    location.reload(); // Reload biasa (bisa dari cache)
    location.reload(true); // Force reload dari server
    ```

### Utility: URLSearchParams

Parsing query string (`?id=123&name=budi`) dulu sangat ribet menggunakan RegEx. Sekarang kita punya `URLSearchParams`.

```javascript
// URL: example.com/?product=shirt&size=m
const params = new URLSearchParams(location.search);

// Cek keberadaan parameter
if (params.has('product')) {
  console.log(params.get('product')); // Output: "shirt"
}

// Iterasi semua parameter
for (const [key, value] of params) {
  console.log(`${key}: ${value}`);
}
```

## 3. History Object: Time Travel

Object ini mengizinkan kita memanipulasi session history browser. Ini adalah fondasi dari routing pada Single Page Application (SPA) modern (seperti React Router atau Vue Router).

```javascript
// Mundur 1 halaman (Sama seperti tombol Back browser)
history.back();

// Maju 1 halaman (Sama seperti tombol Forward)
history.forward();

// Pindah spesifik
history.go(-1); // Mundur 1 step
history.go(2); // Maju 2 step
history.go(0); // Refresh halaman
```

## 4. Navigator Object: Identitas User

`navigator` berisi informasi tentang browser dan perangkat user.

- **User Agent**: String identifikasi browser (jangan terlalu diandalkan karena mudah dipalsukan).
  ```javascript
  console.log(navigator.userAgent);
  ```
- **Feature Detection**: Lebih baik cek kemampuan browser daripada cek nama browser.

  ```javascript
  if (navigator.geolocation) {
    console.log('Browser support Geolocation');
  }

  if (navigator.onLine) {
    console.log('User terhubung ke internet');
  }
  ```

- **Hardware Info**:
  ```javascript
  console.log(`Logical Cores: ${navigator.hardwareConcurrency}`);
  console.log(`Device Memory: ${navigator.deviceMemory} GB`); // Experimental
  ```

## 5. Screen Object: Layar Fisik

Berbeda dengan `window.innerWidth` (ukuran jendela browser), `screen` memberi info tentang layar monitor fisik user.

- `screen.width` / `screen.height`: Resolusi total layar.
- `screen.availWidth` / `screen.availHeight`: Resolusi layar yang _bisa dipakai_ (dikurangi taskbar OS, dock, dll).

```javascript
console.log(`Resolusi Layar: ${screen.width}x${screen.height}`);
console.log(`Area Kerja: ${screen.availWidth}x${screen.availHeight}`);
```

---

### Praktik Sesi 1

Cobalah buat file `index.html` kosong, hubungkan dengan file `.js`, dan jalankan kode berikut di console browser atau script tag untuk melihat data real-time lingkungan browser Anda:

```javascript
console.group('BOM Inspection');

console.log(`URL saat ini: ${location.href}`);
console.log(`Ukuran Viewport: ${window.innerWidth} x ${window.innerHeight}`);
console.log(`Resolusi Layar: ${screen.width} x ${screen.height}`);
console.log(`Status Online: ${navigator.onLine ? 'YES' : 'NO'}`);
console.log(`Browser Language: ${navigator.language}`);

// Cek query params dummy
// Tambahkan ?test=123 di ujung URL browser anda sebelum run ini
const urlParams = new URLSearchParams(location.search);
if (urlParams.has('test')) {
  console.log(`Parameter 'test' ditemukan: ${urlParams.get('test')}`);
} else {
  console.log("Coba tambahkan '?test=halo' di URL bar anda dan refresh.");
}

console.groupEnd();
```

Jika Anda sudah paham konsep dasar lingkungan browser ini, kita bisa lanjut ke **Sesi 2** untuk membahas bagaimana berinteraksi langsung dengan user (`alert`, `prompt`) dan memanipulasi waktu (`setTimeout`).
