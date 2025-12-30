---
title: Mengontrol Alur Eksekusi Program
---

Sejauh ini, kode yang kita tulis berjalan lurus dari atas ke bawah. Namun, kekuatan sesungguhnya dari pemrograman adalah kemampuannya untuk **membuat keputusan** dan **mengulangi tugas**.

Di sesi ini, kita akan belajar cara mengontrol alur eksekusi program menggunakan struktur kontrol.

---

## 1. Percabangan Kondisional: Membuat Keputusan

Percabangan memungkinkan program untuk memilih jalur eksekusi yang berbeda berdasarkan kondisi tertentu.

### 1.1. `if`, `else if`, dan `else`

Ini adalah struktur percabangan yang paling umum. Logikanya sederhana:

- **`if`**: Jika kondisi ini benar, jalankan blok kodenya.
- **`else if`**: Jika kondisi `if` salah, coba cek kondisi ini. Jika benar, jalankan blok kodenya.
- **`else`**: Jika tidak ada kondisi di atas yang benar, jalankan blok kode ini.

```javascript
const nilaiUjian = 75;

if (nilaiUjian > 80) {
  console.log('Luar biasa! Nilai Anda A.');
} else if (nilaiUjian > 70) {
  console.log('Bagus! Nilai Anda B.');
} else {
  console.log('Coba lagi ya. Nilai Anda C.');
}

// Output: Bagus! Nilai Anda B.
```

### 1.2. `switch` Statement

`switch` menyediakan alternatif yang lebih bersih untuk serangkaian `if-else if` yang panjang, khususnya ketika Anda membandingkan satu variabel dengan banyak kemungkinan nilai.

```javascript
const nilaiHuruf = 'A';
let ucapan;

switch (nilaiHuruf) {
  case 'A':
    ucapan = 'Wow, Anda lulus dengan sangat baik!';
    break; // 'break' penting untuk menghentikan pengecekan
  case 'B':
  case 'C':
    ucapan = 'Anda lulus, selamat!';
    break;
  case 'D':
    ucapan = 'Anda tidak lulus.';
    break;
  default:
    ucapan = 'Mungkin Anda salah jurusan?';
}

console.log(ucapan);
// Output: Wow, Anda lulus dengan sangat baik!
```

---

## 2. Konsep _Truthy_ & _Falsy_

Ini adalah salah satu fitur unik dan penting di JavaScript. Dalam konteks boolean (seperti di dalam `if`), JavaScript secara otomatis mengonversi nilai menjadi `true` atau `false`.

> **Falsy** adalah nilai yang dianggap `false` saat dievaluasi dalam konteks boolean.

Ada enam nilai _falsy_ di JavaScript. Anda wajib mengingatnya!

| Data Dianggap Falsy | Keterangan                         |
| :------------------ | :--------------------------------- |
| `false`             | Nilai boolean `false` itu sendiri. |
| `0`, `-0`           | Angka nol.                         |
| `""` atau `''`      | String kosong.                     |
| `null`              | Nilai `null`.                      |
| `undefined`         | Nilai `undefined`.                 |
| `NaN`               | Not a Number.                      |

> **Truthy** adalah nilai apa pun yang **bukan** merupakan nilai _falsy_.

Contohnya, string `"hello"`, angka `123`, array `[]`, dan objek `{}` semuanya adalah nilai _truthy_.

```javascript
let data = ''; // Ini adalah nilai falsy (string kosong)

if (data) {
  console.log('TRUE');
} else {
  console.log('FALSE');
}

// Output: FALSE
```

---

## 3. Perulangan (Loop): Mengulangi Tugas

Perulangan digunakan untuk mengeksekusi blok kode yang sama berulang kali selama kondisi tertentu terpenuhi.

### 3.1. `for` loop

Struktur perulangan klasik yang terdiri dari tiga bagian: `(inisialisasi; kondisi; post-statement)`.

```javascript
// Inisialisasi: let counter = 1
// Kondisi: counter <= 5
// Post-statement: counter++
for (let counter = 1; counter <= 5; counter++) {
  console.log(`Perulangan ke-${counter}`);
}
/* Output:
Perulangan ke-1
Perulangan ke-2
Perulangan ke-3
Perulangan ke-4
Perulangan ke-5
*/
```

### 3.2. `while` loop

Versi yang lebih sederhana di mana hanya kondisi yang dievaluasi sebelum setiap iterasi. Perulangan berlanjut selama kondisi bernilai `true`.

```javascript
let counter = 1;
while (counter <= 3) {
  console.log(`Iterasi while ke-${counter}`);
  counter++;
}
/* Output:
Iterasi while ke-1
Iterasi while ke-2
Iterasi while ke-3
*/
```

### 3.3. `do-while` loop

Mirip dengan `while`, tetapi perbedaannya adalah blok kode dieksekusi **setidaknya satu kali** sebelum kondisi dievaluasi.

```javascript
let counter = 10;
do {
  console.log(`Do-while dieksekusi pada counter: ${counter}`);
  counter++;
} while (counter <= 5); // Kondisi ini false, tapi blok do tetap jalan sekali.

// Output: Do-while dieksekusi pada counter: 10
```

---

## 4. Kontrol Perulangan: `break` dan `continue`

Kita bisa mengontrol perilaku perulangan dari dalam.

- **`break`**: Digunakan untuk menghentikan **seluruh siklus perulangan** secara paksa.
- **`continue`**: Digunakan untuk menghentikan **iterasi saat ini saja** dan langsung melanjutkan ke iterasi berikutnya.

```javascript
// Contoh break dan continue
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    // Jika i adalah angka genap, lewati iterasi ini
    continue;
  }

  if (i > 7) {
    // Jika i lebih dari 7, hentikan seluruh loop
    break;
  }

  console.log(`Angka ganjil: ${i}`);
}
/* Output:
Angka ganjil: 1
Angka ganjil: 3
Angka ganjil: 5
Angka ganjil: 7
*/
```

---

## Rangkuman Sesi 3

Anda sekarang memiliki kekuatan untuk mengontrol alur program Anda!

- Anda bisa membuat **keputusan** dengan `if-else` dan `switch`.
- Anda memahami konsep **Truthy & Falsy** yang menjadi dasar dari semua kondisi di JavaScript.
- Anda bisa melakukan **tugas berulang** dengan `for`, `while`, dan `do-while`.
- Anda bisa **menginterupsi perulangan** dengan `break` dan `continue`.

Di sesi berikutnya, kita akan belajar cara mengorganisir kode kita menjadi blok-blok yang rapi dan dapat digunakan kembali menggunakan **Fungsi**.
