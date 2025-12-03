---
title: Interaksi User & Timing Strategy
---

**Sesi 2** ini akan sangat menarik karena kita akan mulai berinteraksi dengan user. Tidak hanya menampilkan halaman statis, tapi "ngobrol" dengan user dan mengatur waktu eksekusi kode.

---

## 1. Dialog Interaktif (User Interaction)

Ada tiga metode bawaan browser untuk memblokir eksekusi kode dan meminta perhatian user (Synchronous/Modal). Gunakan dengan bijak karena ini menghentikan seluruh aktivitas di tab tersebut sampai user merespons.

### A. Alert

Menampilkan pesan sederhana dengan tombol OK. Tidak ada nilai yang dikembalikan.

```javascript
alert('Selamat datang di Dashboard!');
```

### B. Prompt

Meminta input teks dari user.

- **Return Value**: String teks yang diketik user, atau `null` jika user klik Cancel.

```javascript
let nama = prompt('Siapa nama Anda?', 'Tamu'); // Parameter kedua adalah nilai default

if (nama === null) {
  console.log('User membatalkan input');
} else {
  console.log(`Halo, ${nama}!`);
}
```

_Tip Pro_: Hasil prompt selalu **string**. Jika meminta umur, lakukan konversi tipe data: `Number(prompt("Umur?"))`.

### C. Confirm

Meminta konfirmasi Ya/Tidak dari user.

- **Return Value**: `true` jika OK, `false` jika Cancel.

```javascript
let yakin = confirm('Apakah Anda yakin ingin menghapus data ini?');

if (yakin) {
  // Lakukan penghapusan
  console.log('Data dihapus.');
} else {
  console.log('Penghapusan dibatalkan.');
}
```

## 2. Timing Events (Asynchronous)

JavaScript itu _single-threaded_ (satu jalur pengerjaan). Tapi kita bisa menjadwalkan tugas untuk dijalankan nanti agar tidak memblokir antarmuka utama.

### A. setTimeout (Delay Eksekusi)

Menjalankan fungsi **sekali** setelah waktu tertentu.

```javascript
// Syntax: setTimeout(callbackFunction, delayInMs, ...params)

console.log('1. Mulai');

// ID disimpan untuk pembatalan jika perlu
let timeoutID = setTimeout(
  (pesan) => {
    console.log(`3. ${pesan}`);
  },
  2000,
  'Muncul setelah 2 detik'
);

console.log('2. Selesai (script jalan terus)');

// Membatalkan timer sebelum tereksekusi
// clearTimeout(timeoutID);
```

_Alur_: Kode "2. Selesai" akan muncul DULUAN sebelum "3. Muncul...", karena setTimeout bersifat non-blocking.

### B. setInterval (Pengulangan)

Menjalankan fungsi **berulang kali** dengan interval waktu tertentu. Sangat berguna untuk jam digital, countdown, atau polling data.

```javascript
let counter = 5;

// Hitung mundur
let intervalID = setInterval(() => {
  console.log(`Waktu tersisa: ${counter} detik`);
  counter--;

  if (counter < 0) {
    clearInterval(intervalID); // Hentikan interval! Penting agar tidak memory leak
    console.log('Waktu Habis!');
  }
}, 1000); // Jalan setiap 1000ms (1 detik)
```

---

## 🚀 Praktik Sesi 2

Mari kita gabungkan **BOM**, **Interaksi**, dan **Timing** dalam satu mini-script sederhana: "Bom Waktu Interaktif".

Salin kode ini ke file JavaScript Anda dan jalankan di browser:

```javascript
function mulaiBom() {
  // 1. Konfirmasi user
  let siap = confirm('Apakah Anda siap menjinakkan bom?');

  if (!siap) {
    alert('Pengecut! Misi dibatalkan.');
    return; // Stop fungsi
  }

  // 2. Minta durasi
  let inputDetik = prompt('Berapa detik waktu hitung mundur?', '5');
  let detik = Number(inputDetik);

  // Validasi input
  if (!detik || detik <= 0) {
    alert('Waktu tidak valid!');
    return;
  }

  console.log('⏳ Hitung mundur dimulai...');

  // 3. Interval Hitung Mundur
  let timer = setInterval(() => {
    console.log(`${detik}...`);
    detik--;

    if (detik < 0) {
      clearInterval(timer); // Stop timer
      ledakkanBom();
    }
  }, 1000);
}

function ledakkanBom() {
  // 4. Efek ledakan (Visual getar sederhana)
  document.body.style.backgroundColor = 'red';

  // Gunakan setTimeout untuk kembalikan warna
  setTimeout(() => {
    document.body.style.backgroundColor = 'white';
    alert('BOOM! 💣 Waktu habis.');
  }, 100);
}

// Panggil fungsi ini via Console browser: mulaiBom()
// Atau bind ke tombol di HTML: <button onclick="mulaiBom()">Mulai</button>
```

**Tugas Anda:**

Coba jalankan `mulaiBom()` dan lihat bagaimana `confirm` memblokir kode sebelum timer jalan, dan bagaimana `setInterval` bekerja secara asinkron di background console.

Jika sudah berhasil, kita lanjut ke **Sesi 3** untuk mulai memanipulasi elemen visual halaman (DOM) secara langsung.
