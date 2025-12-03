---
title: Konsep Lanjutan dan Praktik Terbaik
---

Selamat datang di sesi terakhir! Di sini kita akan membahas beberapa konsep lanjutan yang membedakan programmer pemula dan mahir. Konsep-konsep ini memungkinkan penulisan kode yang lebih kuat, efisien, dan elegan. Kita juga akan menyentuh beberapa praktik terbaik untuk menjaga kualitas kode Anda.

---

## 1. Memahami Scope

> **Scope** menentukan di mana saja sebuah variabel atau fungsi dapat diakses dalam kode.

Ada dua jenis scope utama di JavaScript:

- **Global Scope**: Variabel yang dideklarasikan di luar fungsi mana pun. Variabel ini dapat diakses dari mana saja dalam program.
- **Local Scope**: Setiap kali sebuah fungsi dibuat, ia menciptakan _local scope_ baru. Variabel yang dideklarasikan di dalam fungsi ini hanya dapat diakses dari dalam fungsi tersebut (dan fungsi lain di dalamnya).

```javascript
// 'globalVariable' berada di Global Scope
let globalVariable = "Saya global";

function first() {
  // 'localVariable' berada di Local Scope milik fungsi first
  let localVariable = "Saya lokal di fungsi first";
  console.log(globalVariable); // Bisa akses variabel global
}

function second() {
  console.log(localVariable); // ERROR! Tidak bisa akses local scope fungsi lain
}

first(); // Output: Saya global
// second(); // Akan menyebabkan error
```

---

## 2. Demistifikasi Closure

_Closure_ adalah salah satu konsep paling kuat namun sering disalahpahami di JavaScript.

> **Closure** adalah kemampuan sebuah fungsi dalam (_inner function_) untuk "mengingat" dan terus mengakses variabel dari lingkup fungsi luarnya (_outer function_), bahkan setelah fungsi luar tersebut selesai dieksekusi.

Ini memungkinkan kita untuk membuat fungsi "pabrik" atau fungsi dengan _private state_.

```javascript
function createAdder(value) {
  const owner = "Eko";

  // Inner function ini adalah sebuah closure
  function add(param) {
    console.log(owner); // Masih bisa akses 'owner' dari scope luarnya
    return value + param;
  }

  return add;
}

// createAdder(2) selesai dieksekusi, tapi fungsi 'add' di dalamnya "mengingat" nilai 'value' (yaitu 2)
const addTwo = createAdder(2);

console.log(addTwo(10)); // Output: Eko, lalu 12
console.log(addTwo(20)); // Output: Eko, lalu 22
```

---

## 3. Fungsi Rekursif

> **Fungsi Rekursif** adalah fungsi yang memanggil dirinya sendiri. Ini adalah pendekatan yang elegan untuk masalah yang dapat dipecah menjadi sub-masalah yang lebih kecil dari jenis yang sama.

Contoh klasik adalah perhitungan faktorial. `5! = 5 * 4 * 3 * 2 * 1`.

**Dengan Perulangan Biasa:**

```javascript
function factorialLoop(value) {
  let result = 1;
  for (let i = 1; i <= value; i++) {
    result *= i;
  }
  return result;
}
console.log(factorialLoop(5)); // Output: 120
```

**Dengan Fungsi Rekursif:**

```javascript
function factorialRecursive(value) {
  if (value === 1) {
    return 1; // Kondisi berhenti (base case)
  } else {
    return value * factorialRecursive(value - 1); // Memanggil dirinya sendiri
  }
}
console.log(factorialRecursive(5)); // Output: 120
```

---

## 4. Function Generator dan Lazy Evaluation

> **Function Generator** (ditandai dengan `function*`) adalah jenis fungsi khusus yang eksekusinya dapat **dihentikan sementara dan dilanjutkan kembali**. Ia menghasilkan serangkaian nilai secara berurutan menggunakan kata kunci `yield`.

Karakteristik utamanya adalah **Lazy Evaluation**: nilai hanya dihasilkan ketika diminta, tidak semuanya sekaligus. Ini sangat efisien untuk bekerja dengan kumpulan data yang sangat besar.

```javascript
// Fungsi ini akan menghasilkan angka ganjil satu per satu
function* buatGanjil(value) {
  for (let i = 1; i <= value; i++) {
    if (i % 2 === 1) {
      console.log(`Menghasilkan ${i}`);
      yield i; // Mengirim nilai dan berhenti sementara
    }
  }
}

const angkaGanjil = buatGanjil(10);

// Generator belum berjalan sampai kita memintanya
console.log(angkaGanjil.next().value); // Output: Menghasilkan 1, lalu 1
console.log(angkaGanjil.next().value); // Output: Menghasilkan 3, lalu 3
console.log(angkaGanjil.next().value); // Output: Menghasilkan 5, lalu 5
```

---

## 5. Praktik Terbaik

### 5.1. Strict Mode

_Strict Mode_ adalah fitur yang dapat diaktifkan untuk memberlakukan aturan pengkodean yang lebih ketat. Ini membantu mencegah kesalahan umum dan memastikan kode lebih aman.

- **Cara Mengaktifkan**: Tambahkan string `"use strict";` di baris paling atas file JavaScript Anda atau di baris pertama sebuah fungsi.

```javascript
function useStrictMode() {
  "use strict";
  // Kode di dalam fungsi ini sekarang berjalan dalam mode strict.
  // Kesalahan yang tadinya "diam-diam" akan menjadi error yang terlihat.
}
```

Sangat direkomendasikan untuk menggunakan _strict mode_ di semua kode modern.

### 5.2. Utilitas `debugger`

Kata kunci `debugger` adalah alat yang sangat berguna untuk proses _debugging_. Anda bisa menyisipkannya di mana saja dalam kode.

> Ketika _developer tools_ browser terbuka, eksekusi kode akan **berhenti** di baris `debugger`, memungkinkan Anda untuk memeriksa nilai semua variabel pada saat itu.

```javascript
function createFullName(firstName, lastName) {
  debugger; // Eksekusi akan berhenti di sini jika DevTools terbuka
  const fullName = `${firstName} ${lastName}`;
  return fullName;
}

createFullName("Eko", "Khannedy");
```

---

## Kesimpulan dan Arah Pembelajaran Selanjutnya

Selamat! Anda telah menyelesaikan seluruh rangkaian materi dasar JavaScript. Anda telah melakukan perjalanan dari konsep fundamental seperti variabel dan tipe data, menguasai struktur kontrol, memahami kekuatan fungsi, bekerja dengan struktur data, hingga menyentuh konsep-konsep lanjutan.

Fondasi yang Anda bangun di sini adalah kunci untuk menjadi pengembang JavaScript yang mahir. Teruslah berlatih dan jangan takut untuk bereksperimen.

**Materi Selanjutnya**

Untuk memperdalam keahlian Anda, berikut adalah peta jalan pembelajaran selanjutnya di ekosistem JavaScript:

- **JavaScript Object Oriented Programming (OOP)**: Belajar tentang paradigma pemrograman berbasis objek.
- **JavaScript Modules**: Cara mengorganisir kode ke dalam file-file terpisah.
- **JavaScript Document Object Model (DOM)**: Cara memanipulasi konten dan struktur halaman web.
- **JavaScript Async**: Menangani operasi yang memakan waktu tanpa memblokir program (seperti mengambil data dari server).
- **JavaScript Web API**: Berinteraksi dengan fitur-fitur browser seperti _fetch_ (untuk permintaan jaringan), _storage_, dan lainnya.
