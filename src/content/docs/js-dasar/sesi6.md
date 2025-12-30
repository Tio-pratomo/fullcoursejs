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
let globalVariable = 'Saya global';

function first() {
  // 'localVariable' berada di Local Scope milik fungsi first
  let localVariable = 'Saya lokal di fungsi first';
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
  const owner = 'Willa';

  // Inner function ini adalah sebuah closure
  function add(param) {
    console.log(owner); // Masih bisa akses 'owner' dari scope luarnya
    return value + param;
  }

  return add;
}

// createAdder(2) selesai dieksekusi, tapi fungsi 'add' di dalamnya "mengingat" nilai 'value' (yaitu 2)
const addTwo = createAdder(2);

console.log(addTwo(10)); // Output: Willa, lalu 12
console.log(addTwo(20)); // Output: Willa, lalu 22
```

---

## 3. Fungsi Rekursif

Recursion adalah teknik di mana sebuah fungsi memanggil dirinya sendiri untuk menyelesaikan masalah dengan cara memecahnya menjadi submasalah yang lebih kecil, sampai mencapai kondisi paling sederhana yang disebut _base case_. Dengan pola ini, kita bisa menangani struktur yang dalam atau berulang (seperti tree, nested object, dsb.) tanpa perlu tahu kedalamannya sejak awal.

### Konsep dasar recursion

Secara umum, pola fungsi rekursif selalu terdiri dari dua bagian:

1. **Base case**  
   Kondisi berhenti, yang menghentikan pemanggilan ulang fungsi.  
   Tanpa base case, pemanggilan fungsi akan terus berulang sampai memori habis (stack overflow).

2. **Recursive case**  
   Bagian di mana fungsi memanggil dirinya sendiri dengan parameter yang “lebih sederhana/kecil” dari sebelumnya.

Contoh sederhana dalam JavaScript (countdown):

```js
const recursiveCountdown = (number) => {
  if (number < 1) {
    // base case
    return;
  }
  console.log(number); // proses sekarang
  recursiveCountdown(number - 1); // recursive case
};

recursiveCountdown(5);
// Output: 5, 4, 3, 2, 1
```

Di sini:

- `if (number < 1) return;` adalah base case.
- `recursiveCountdown(number - 1);` adalah recursive case dengan parameter yang makin kecil.

### Mengubah urutan: count up

Dengan mengganti urutan `console.log` dan pemanggilan rekursif, perilaku output bisa berubah tanpa mengubah logika dasar:

```js
const recursiveCountdown = (number) => {
  if (number < 1) {
    return;
  }
  recursiveCountdown(number - 1); // selesaikan "yang lebih kecil" dulu
  console.log(number); // lalu proses sekarang
};

recursiveCountdown(5);
// Output: 1, 2, 3, 4, 5
```

Intinya:

- Kalau `console.log` diletakkan **sebelum** pemanggilan rekursif → pola “count down”.
- Kalau `console.log` diletakkan **setelah** pemanggilan rekursif → pola “count up” (hasilnya muncul saat stack mulai dibongkar).

### Call stack dan bagaimana recursion berjalan

Untuk memahami “kenapa urutannya begitu”, perlu memahami _call stack_ JavaScript:

- Setiap kali sebuah fungsi dipanggil, JavaScript **menaruh frame baru di atas stack**.
- Saat fungsi selesai (`return`), frame tersebut **dikeluarkan dari stack**.
- Stack ini bersifat **LIFO (Last In, First Out)**: yang terakhir masuk, yang pertama keluar.

**Dengan contoh berikut:**

```js
const recursiveCountdown = (number) => {
  console.log(`Start: ${number}`);
  if (number < 1) {
    console.log('Base case, stop.');
    return;
  }
  recursiveCountdown(number - 1);
  console.log(`End: ${number}`);
};

recursiveCountdown(3);
```

**Urutan eksekusi bisa dibayangkan seperti ini:**

1.  **Panggil `recursiveCountdown(3)`**

    Masuk stack → jalankan sampai memanggil `recursiveCountdown(2)`, lalu “pause” menunggu hasilnya.

2.  **Panggil `recursiveCountdown(2)`**

    Masuk stack → jalankan sampai memanggil `recursiveCountdown(1)`.

3.  **Panggil `recursiveCountdown(1)`**

    Masuk stack → jalankan sampai memanggil `recursiveCountdown(0)`.

4.  **Panggil `recursiveCountdown(0)`**

    Kena base case → `return` → frame `0` keluar dari stack.

5.  **Lanjutkan `recursiveCountdown(1)` setelah pemanggilan rekursif**

    Jalankan `console.log("End: 1")` → `return` → frame `1` keluar.

6.  **Lanjutkan `recursiveCountdown(2)`**

    Jalankan `console.log("End: 2")` → `return` → frame `2` keluar.

7.  **Lanjutkan `recursiveCountdown(3)`**
    Jalankan `console.log("End: 3")` → `return` → frame `3` keluar.

Karena itu, semua “End” akan tampil dari angka terkecil ke terbesar (1, 2, 3).

### Kenapa butuh base case?

Tanpa base case yang bisa tercapai, fungsi akan terus memanggil dirinya sendiri:

```js
const broken = (n) => {
  console.log(n);
  broken(n - 1); // Tidak ada base case
};

broken(5); // Akan terus turun: 5, 4, 3, 2, 1, 0, -1, -2, ...
```

- Stack akan terus bertambah karena tidak ada satu pun frame yang selesai (`return`).
- Akhirnya, program akan error (stack overflow).

### Kapan sebaiknya memakai recursion?

Recursion sangat berguna saat:

- Struktur data bersifat **bercabang** atau **bertingkat**:
  - Tree (DOM tree, file system, category tree).
  - Nested object/array dalam JSON.
- Masalah yang definisinya **secara alami rekursif**:
  - Faktorial, Fibonacci, traversal tree/graph, backtracking (misalnya maze solver, N-Queens, dsb.).
- Ingin menulis solusi yang lebih **deklaratif dan ringkas**, dibanding loop yang kompleks.

Namun, untuk kasus sederhana dan iteratif (seperti loop linear besar), loop biasa (`for`, `while`) sering:

- Lebih mudah dibaca untuk pemula.
- Lebih aman dari risiko stack overflow (terutama di JavaScript yang punya batas kedalaman stack lebih rendah dibanding beberapa bahasa lain).

## Praktik: Latihan sederhana bertahap

Coba ikuti urutan latihan ini di JavaScript (Node.js atau browser console):

1.  **Latihan 1 – Countdown dasar**

    Tulis lagi `recursiveCountdown(number)` seperti contoh pertama.
    Coba panggil dengan 3, 5, dan 10.

2.  **Latihan 2 – Count up dengan recursion**

    Ubah urutan: panggil rekursi dulu, baru `console.log`.
    Pastikan output urut naik.

3.  **Latihan 3 – Debug dengan log call stack**

    Tambahkan log seperti:

    ```js
    console.log(`Start: ${number}`);
    // kode lainnya
    console.log(`End: ${number}`);
    ```

    Amati urutannya dan bayangkan isi stack pada setiap tahap.

4.  **Latihan 4 – Jumlahkan angka 1..n secara rekursif**

    Buat fungsi:

    ```js
    const sumTo = (n) => {
      // base case & recursive case
    };

    console.log(sumTo(5)); // harusnya 15
    ```

    **Tantangan:** bisa jelaskan sendiri base case dan recursive case-nya?

---

## 4. Function Generator dan Lazy Evaluation

**Function Generator** (ditandai dengan `function*`) adalah jenis fungsi khusus yang eksekusinya dapat **dihentikan sementara dan dilanjutkan kembali**. Ia menghasilkan serangkaian nilai secara berurutan menggunakan kata kunci `yield`.

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

## 5. Konsep `this`

`this` di JavaScript adalah nilai konteks yang ditentukan saat runtime, dan
nilainya bergantung pada bagaimana sebuah fungsi dipanggil (call-site), bukan
di mana fungsi itu ditulis.

Kalau salah paham, bug paling sering muncul saat method “lepas” dari objek,
atau saat mencampur function biasa dengan arrow function.

### Definisi inti

Anggap `this` sebagai “objek pemilik eksekusi saat ini” untuk sebuah pemanggilan
fungsi.

Dalam konteks method, `this` biasanya menunjuk ke objek sebelum tanda titik `.`
pada saat method itu dipanggil.

### Aturan penentuan this

Gunakan aturan praktis ini untuk membaca nilai `this` dengan benar.

- Method call: `obj.fn()` maka `this === obj`.
- Function call biasa: `fn()` maka `this` mengarah ke objek global di non-strict,
  dan `undefined` di strict mode.
- Constructor call: `new Fn()` maka `this` adalah instance baru yang dibuat.
- Event handler inline HTML: `this` menunjuk elemen yang menerima event itu.

Contoh yang wajib kamu kuasai (lihat bedanya cara panggilnya).

```js
const user = {
  name: 'Ayu',
  hi() {
    return this.name;
  },
};

user.hi(); // "Ayu"
const f = user.hi;
f(); // global / undefined (strict)
```

## Arrow function

Arrow function tidak punya `this` sendiri; dia “mewarisi” `this` dari scope
luarnya (lexical this).

Karena itu arrow function sering dipakai untuk menjaga `this` tetap konsisten
di dalam callback (misalnya di method constructor).

Contoh pola yang umum: `this` tetap mengacu ke instance.

```js
function Laptop(nama) {
  this.nama = nama;
  this.print = () => this.nama;
}

const laptop = new Laptop('Lenovo');
laptop.print(); // "Lenovo"
```

## Mengunci dan mengubah this

Kalau kamu perlu memaksa `this` ke objek tertentu, pakai `bind`, `call`, atau
`apply` untuk mengontrol konteks pemanggilan.

Aturan pakainya: `call(thisArg, ...)`, `apply(thisArg, [args])`, dan `bind`
mengembalikan fungsi baru dengan `this` yang “dikunci”.

Contoh pemaksaan konteks agar method tidak “kehilangan” objeknya.

```js
const user = {
  name: 'Ayu',
  hi() {
    return this.name;
  },
};

const hi1 = user.hi.bind(user);
hi1(); // "Ayu"

user.hi.call({ name: 'Budi' }); // "Budi"
```

## Jebakan paling sering

Hindari “method extraction” tanpa `bind`, karena `this` bisa berubah menjadi
global/undefined tergantung mode dan lingkungan runtime.

Waspadai asumsi “`this` selalu window”; itu hanya berlaku pada konteks tertentu
di browser, dan bisa berbeda di Node (global/globalThis) serta strict mode.

## 6. Praktik Terbaik

### 6.1. Strict Mode

_Strict Mode_ adalah fitur yang dapat diaktifkan untuk memberlakukan aturan pengkodean yang lebih ketat. Ini membantu mencegah kesalahan umum dan memastikan kode lebih aman.

**Cara Mengaktifkan**: Tambahkan string `"use strict";` di baris paling atas file JavaScript Anda atau di baris pertama sebuah fungsi.

```javascript
function useStrictMode() {
  'use strict';
  // Kode di dalam fungsi ini sekarang berjalan dalam mode strict.
  // Kesalahan yang tadinya "diam-diam" akan menjadi error yang terlihat.
}
```

Sangat direkomendasikan untuk menggunakan _strict mode_ di semua kode modern.

### 6.2. Utilitas `debugger`

Kata kunci `debugger` adalah alat yang sangat berguna untuk proses _debugging_. Anda bisa menyisipkannya di mana saja dalam kode.

> Ketika _developer tools_ browser terbuka, eksekusi kode akan **berhenti** di baris `debugger`, memungkinkan Anda untuk memeriksa nilai semua variabel pada saat itu.

```javascript
function createFullName(firstName, lastName) {
  debugger; // Eksekusi akan berhenti di sini jika DevTools terbuka
  const fullName = `${firstName} ${lastName}`;
  return fullName;
}

createFullName('Siva', 'Aprillia');
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
