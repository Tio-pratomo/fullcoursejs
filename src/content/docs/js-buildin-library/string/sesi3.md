---
title: Pencarian & pemotongan teks
---

Di Sesi 3 ini fokus ke **mencari teks di dalam string** (cek ada/tidak dan posisi) dan **mengambil potongan string** dengan cara modern (`slice`, `substring`). Ini yang paling sering dipakai di real project: cari kata kunci, ambil username dari email, ambil path dari URL, dsb.

## Materi: Pencarian teks

- **`indexOf()` dan `lastIndexOf()`**

  `indexOf(substring)` mengembalikan indeks kemunculan pertama substring, atau `-1` kalau tidak ketemu. `lastIndexOf(substring)` kebalikannya: mengembalikan indeks kemunculan terakhir substring.

- **`includes()`, `startsWith()`, `endsWith()`**

  `includes(substring)` mengembalikan `true/false` apakah substring ada di dalam string, lebih enak dipakai untuk cek sederhana daripada `indexOf(...) !== -1`. `startsWith(prefix)` dan `endsWith(suffix)` dipakai untuk cek awalan/akhiran string, misalnya file `.js` atau URL yang mulai dengan `https://`.

## Materi: Mengambil substring

- **`slice(start, end?)` (modern, fleksibel)**

  `slice(start, end)` mengembalikan bagian string dari indeks `start` sampai sebelum `end`, dan **tidak mengubah string asli**. Kalau `end` tidak diisi, maka diambil sampai akhir string; `slice` juga mendukung indeks negatif (hitung dari belakang).

- **`substring(start, end?)` (masih dipakai, tapi tanpa indeks negatif)**

  `substring(start, end)` mirip `slice`, mengembalikan bagian string dari `start` sampai sebelum `end` dan juga tidak mengubah aslinya. Bedanya, `substring` tidak mendukung indeks negatif dan kalau `start > end`, keduanya otomatis ditukar, sehingga perilakunya sedikit berbeda dengan `slice`.

- **Catatan `substr()`**

  `substr(start, length)` adalah cara lama untuk mengambil substring berdasarkan posisi dan panjang, tetapi sudah dianggap usang/deprecated dan tidak disarankan untuk kode modern. Fokuskan penggunaan ke `slice` / `substring` saja.

## Praktik: Pencarian sederhana

```js
const text = 'Belajar JavaScript modern dengan string.';

// indexOf & lastIndexOf
console.log(text.indexOf('JavaScript')); // posisi kemunculan pertama
console.log(text.indexOf('React')); // -1 (tidak ada)

console.log(text.lastIndexOf('n')); // posisi 'n' terakhir

// includes, startsWith, endsWith
console.log(text.includes('modern')); // true
console.log(text.startsWith('Belajar')); // true
console.log(text.endsWith('string.')); // true
```

Gunakan `includes` ketika hanya perlu jawaban ya/tidak, dan `indexOf` ketika butuh posisi (misalnya untuk slicing berikutnya). `startsWith` / `endsWith` sangat berguna untuk validasi ringan seperti tipe file atau pola URL tanpa harus pakai regex.

## Praktik: Ekstrak bagian string dengan `slice` & `substring`

```js
const email = 'user.example+test@gmail.com';

// 1. Ambil username sebelum '@'
const atPos = email.indexOf('@');
const username = email.slice(0, atPos);
console.log(username); // "user.example+test"

// 2. Ambil domain (setelah '@')
const domain = email.slice(atPos + 1);
console.log(domain); // "gmail.com"

// 3. Ambil TLD dari domain dengan substring
const dotPos = domain.lastIndexOf('.');
const tld = domain.substring(dotPos + 1);
console.log(tld); // "com"
```

`slice(0, atPos)` adalah pola klasik untuk “ambil dari awal sampai sebelum karakter tertentu”. Kombinasi `indexOf`/`lastIndexOf` dengan `slice`/`substring` adalah senjata utama untuk parsing teks sederhana sebelum masuk ke regex di sesi berikutnya.

Kalau sudah nyaman dengan pola cari (`indexOf`/`includes`) lalu potong (`slice`/`substring`), sesi 4 nanti kita akan masuk ke **manipulasi lanjutan & regex ringan** (`split`, `replace`, `match`, dll.).
