---
title: Mengontrol Alur Eksekusi Program
---

Sejauh ini, kode yang kita tulis berjalan lurus dari atas ke bawah. Namun, kekuatan sesungguhnya dari pemrograman adalah kemampuannya untuk **membuat keputusan** dan **mengulangi tugas**.

Di sesi ini, kita akan belajar cara mengontrol alur eksekusi program menggunakan struktur kontrol.

---

## Materi: Pengetahuan & Konsep

### 1. Percabangan Kondisional: Membuat Keputusan

Percabangan memungkinkan program untuk memilih jalur eksekusi yang berbeda berdasarkan kondisi tertentu.

#### 1.1. if, else if, dan else

Ini adalah struktur percabangan yang paling umum. Logikanya sederhana:

- **`if`**: Jika kondisi ini benar, jalankan blok kodenya
- **`else if`**: Jika kondisi `if` salah, coba cek kondisi ini. Jika benar, jalankan blok kodenya
- **`else`**: Jika tidak ada kondisi di atas yang benar, jalankan blok kode ini

```javascript
const nilaiUjian = 75;

if (nilaiUjian >= 80) {
  console.log('Luar biasa! Nilai Anda A.');
} else if (nilaiUjian >= 70) {
  console.log('Bagus! Nilai Anda B.');
} else if (nilaiUjian >= 60) {
  console.log('Cukup! Nilai Anda C.');
} else {
  console.log('Coba lagi ya. Nilai Anda D.');
}
// Output: Bagus! Nilai Anda B.
```

**Nested If (If Bersarang):**

```javascript
const umur = 20;
const punyaSIM = true;

if (umur >= 17) {
  if (punyaSIM) {
    console.log('Anda boleh mengemudi.');
  } else {
    console.log('Anda harus punya SIM dulu.');
  }
} else {
  console.log('Anda belum cukup umur untuk mengemudi.');
}
// Output: Anda boleh mengemudi.
```

#### 1.2. switch Statement

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
    ucapan = 'Nilai tidak valid.';
}

console.log(ucapan);
// Output: Wow, Anda lulus dengan sangat baik!
```

**Contoh Switch dengan Fall-Through:**

```javascript
const hari = 3; // 1=Senin, 2=Selasa, dst.
let jenisHari;

switch (hari) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    jenisHari = 'Hari kerja';
    break;
  case 6:
  case 7:
    jenisHari = 'Akhir pekan';
    break;
  default:
    jenisHari = 'Hari tidak valid';
}

console.log(jenisHari); // "Hari kerja"
```

**Kapan Menggunakan switch vs if-else:**

| Gunakan `switch`                                                | Gunakan `if-else`                       |
| :-------------------------------------------------------------- | :-------------------------------------- |
| Membandingkan satu variabel dengan banyak nilai tetap           | Kondisi kompleks dengan operator logika |
| Nilai yang dibandingkan adalah nilai sederhana (string, number) | Menggunakan range nilai (>, <, >=, <=)  |
| Banyak case yang menjalankan kode yang sama                     | Kondisi yang berbeda-beda               |

---

### 2. Konsep Truthy & Falsy

Ini adalah salah satu fitur unik dan penting di JavaScript. Dalam konteks boolean (seperti di dalam `if`), JavaScript secara otomatis mengonversi nilai menjadi `true` atau `false`.

#### 2.1. Nilai Falsy

**Falsy** adalah nilai yang dianggap `false` saat dievaluasi dalam konteks boolean.

Ada **enam nilai falsy** di JavaScript - Anda wajib mengingatnya!

| Data Dianggap Falsy | Keterangan                        |
| :------------------ | :-------------------------------- |
| `false`             | Nilai boolean `false` itu sendiri |
| `0`, `-0`           | Angka nol                         |
| `""` atau `''`      | String kosong                     |
| `null`              | Nilai `null`                      |
| `undefined`         | Nilai `undefined`                 |
| `NaN`               | Not a Number                      |

```javascript
// Semua ini akan masuk ke blok else
if (false) {
  console.log('TRUE');
} else {
  console.log('FALSE'); // Output ini
}

if (0) {
  console.log('TRUE');
} else {
  console.log('FALSE'); // Output ini
}

if ('') {
  console.log('TRUE');
} else {
  console.log('FALSE'); // Output ini
}

if (null) {
  console.log('TRUE');
} else {
  console.log('FALSE'); // Output ini
}
```

#### 2.2. Nilai Truthy

**Truthy** adalah nilai apa pun yang **bukan** merupakan nilai falsy.

```javascript
// Semua ini adalah truthy
if ('hello') console.log('TRUE'); // TRUE
if (123) console.log('TRUE'); // TRUE
if ([]) console.log('TRUE'); // TRUE (array kosong adalah truthy!)
if ({}) console.log('TRUE'); // TRUE (object kosong adalah truthy!)
if (' ') console.log('TRUE'); // TRUE (string dengan spasi adalah truthy!)
if (-1) console.log('TRUE'); // TRUE (angka negatif adalah truthy!)
if (new Date()) console.log('TRUE'); // TRUE
```

**Contoh Praktis dengan Truthy/Falsy:**

```javascript
// Validasi input user
function validasiNama(nama) {
  if (nama) {
    // Akan false jika nama = '', null, atau undefined
    console.log(`Halo, ${nama}!`);
  } else {
    console.log('Nama tidak boleh kosong!');
  }
}

validasiNama('Budi'); // "Halo, Budi!"
validasiNama(''); // "Nama tidak boleh kosong!"
validasiNama(null); // "Nama tidak boleh kosong!"

// Cek keberadaan array elements
const data = [1, 2, 3];
if (data.length) {
  // Akan false jika length = 0
  console.log('Array memiliki data');
} else {
  console.log('Array kosong');
}
```

---

### 3. Best Practices untuk Conditional

Menulis conditional yang bersih dan mudah dibaca adalah keterampilan penting.

#### 3.1. Early Return Pattern

Alih-alih membuat nested if yang dalam, gunakan early return untuk keluar lebih awal dari fungsi.

**Cara Buruk (Deeply Nested):**

```javascript
function cekKelayakanPinjaman(umur, penghasilan, riwayatKredit) {
  if (umur >= 21) {
    if (penghasilan >= 5000000) {
      if (riwayatKredit === 'baik') {
        return 'Pinjaman disetujui';
      } else {
        return 'Riwayat kredit buruk';
      }
    } else {
      return 'Penghasilan tidak mencukupi';
    }
  } else {
    return 'Umur tidak memenuhi syarat';
  }
}
```

**Cara Baik (Early Return):**

```javascript
function cekKelayakanPinjaman(umur, penghasilan, riwayatKredit) {
  // Guard clauses - cek kondisi gagal terlebih dahulu
  if (umur < 21) {
    return 'Umur tidak memenuhi syarat';
  }

  if (penghasilan < 5000000) {
    return 'Penghasilan tidak mencukupi';
  }

  if (riwayatKredit !== 'baik') {
    return 'Riwayat kredit buruk';
  }

  // Happy path di akhir
  return 'Pinjaman disetujui';
}
```

**Keuntungan Early Return:**

- Lebih mudah dibaca (linear flow)
- Mengurangi nesting
- Mudah menambah kondisi baru
- Error handling lebih jelas

#### 3.2. Guard Clauses

Guard clauses adalah kondisi yang mengecek kasus-kasus invalid di awal fungsi.

```javascript
function hitungDiskon(harga, persenDiskon) {
  // Guard clauses
  if (harga <= 0) {
    return 'Harga harus lebih dari 0';
  }

  if (persenDiskon < 0 || persenDiskon > 100) {
    return 'Diskon harus antara 0-100%';
  }

  // Logic utama
  const diskon = harga * (persenDiskon / 100);
  return harga - diskon;
}

console.log(hitungDiskon(100000, 10)); // 90000
console.log(hitungDiskon(-5000, 10)); // "Harga harus lebih dari 0"
console.log(hitungDiskon(100000, 150)); // "Diskon harus antara 0-100%"
```

#### 3.3. Positive Conditionals

Tulis kondisi dalam bentuk positif, bukan negatif, untuk kemudahan membaca.

**Cara Buruk:**

```javascript
if (!tidakAktif) {
  // lakukan sesuatu
}

if (!!isValid) {
  // lakukan sesuatu
}
```

**Cara Baik:**

```javascript
if (isAktif) {
  // lakukan sesuatu
}

if (isValid) {
  // lakukan sesuatu
}
```

#### 3.4. Avoid Magic Numbers

Gunakan konstanta bernama untuk nilai-nilai tetap.

**Cara Buruk:**

```javascript
if (umur >= 17 && umur <= 60) {
  console.log('Usia kerja');
}
```

**Cara Baik:**

```javascript
const USIA_KERJA_MIN = 17;
const USIA_KERJA_MAX = 60;

if (umur >= USIA_KERJA_MIN && umur <= USIA_KERJA_MAX) {
  console.log('Usia kerja');
}
```

#### 3.5. Simplify Complex Conditions

Ekstrak kondisi kompleks ke dalam variabel atau fungsi bernama.

**Cara Buruk:**

```javascript
if (user.age >= 18 && user.hasLicense && !user.hasViolations && user.experienceYears >= 2) {
  // boleh sewa mobil
}
```

**Cara Baik:**

```javascript
const isAdult = user.age >= 18;
const hasValidLicense = user.hasLicense && !user.hasViolations;
const hasEnoughExperience = user.experienceYears >= 2;
const canRentCar = isAdult && hasValidLicense && hasEnoughExperience;

if (canRentCar) {
  // boleh sewa mobil
}

// Atau gunakan fungsi
function bisaMenyewaMobil(user) {
  return user.age >= 18 && user.hasLicense && !user.hasViolations && user.experienceYears >= 2;
}

if (bisaMenyewaMobil(user)) {
  // boleh sewa mobil
}
```

---

### 4. Perulangan (Loop): Mengulangi Tugas

Perulangan digunakan untuk mengeksekusi blok kode yang sama berulang kali selama kondisi tertentu terpenuhi.

#### 4.1. for loop

Struktur perulangan klasik yang terdiri dari tiga bagian: `(inisialisasi; kondisi; post-statement)`.

```javascript
// Struktur: for (inisialisasi; kondisi; post-statement)
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

**Variasi for Loop:**

```javascript
// Loop mundur
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
// Output: 5, 4, 3, 2, 1

// Loop dengan step berbeda
for (let i = 0; i <= 10; i += 2) {
  console.log(i); // Angka genap: 0, 2, 4, 6, 8, 10
}

// Loop melalui array
const buah = ['Apel', 'Jeruk', 'Mangga'];
for (let i = 0; i < buah.length; i++) {
  console.log(`${i + 1}. ${buah[i]}`);
}
/* Output:
1. Apel
2. Jeruk
3. Mangga
*/
```

#### 4.2. while loop

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

**Contoh Praktis - Mencari Angka:**

```javascript
let angka = 1;
let target = 100;

while (angka * angka < target) {
  angka++;
}

console.log(`${angka} adalah angka terkecil yang kuadratnya >= ${target}`);
// Output: 10 adalah angka terkecil yang kuadratnya >= 100
```

**Peringatan: Infinite Loop**

```javascript
// JANGAN JALANKAN INI!
// let i = 1;
// while (i <= 5) {
//   console.log(i);
//   // Lupa increment i, loop tidak akan berhenti!
// }
```

#### 4.3. do-while loop

Mirip dengan `while`, tetapi perbedaannya adalah blok kode dieksekusi **setidaknya satu kali** sebelum kondisi dievaluasi.

```javascript
let counter = 10;
do {
  console.log(`Do-while dieksekusi pada counter: ${counter}`);
  counter++;
} while (counter <= 5); // Kondisi ini false, tapi blok do tetap jalan sekali

// Output: Do-while dieksekusi pada counter: 10
```

**Kapan Menggunakan do-while:**

Gunakan `do-while` saat Anda ingin kode dijalankan minimal satu kali, misalnya untuk menu atau validasi input.

```javascript
let pilihan;
do {
  console.log('Menu:');
  console.log('1. Lihat Produk');
  console.log('2. Beli');
  console.log('3. Keluar');
  // pilihan = dapatkanInputUser(); // Simulasi
  pilihan = 3; // Untuk contoh
} while (pilihan !== 3);
```

---

### 5. Kontrol Perulangan: break dan continue

Kita bisa mengontrol perilaku perulangan dari dalam.

#### 5.1. break - Menghentikan Loop

**`break`** digunakan untuk menghentikan **seluruh siklus perulangan** secara paksa.

```javascript
// Cari angka pertama yang habis dibagi 7
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0) {
    console.log(`Angka pertama yang habis dibagi 7: ${i}`);
    break; // Hentikan loop
  }
}
// Output: Angka pertama yang habis dibagi 7: 7
```

**Contoh Praktis - Cari dalam Array:**

```javascript
const users = ['Andi', 'Budi', 'Citra', 'Dodi'];
const cari = 'Citra';
let ditemukan = false;

for (let i = 0; i < users.length; i++) {
  if (users[i] === cari) {
    console.log(`${cari} ditemukan di index ${i}`);
    ditemukan = true;
    break; // Tidak perlu lanjut cari
  }
}

if (!ditemukan) {
  console.log(`${cari} tidak ditemukan`);
}
// Output: Citra ditemukan di index 2
```

#### 5.2. continue - Skip Iterasi

**`continue`** digunakan untuk menghentikan **iterasi saat ini saja** dan langsung melanjutkan ke iterasi berikutnya.

```javascript
// Tampilkan hanya angka ganjil
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // Skip angka genap
  }
  console.log(i); // Hanya angka ganjil yang ditampilkan
}
// Output: 1, 3, 5, 7, 9
```

#### 5.3. Kombinasi break dan continue

```javascript
// Contoh dari materi
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

### 6. Loop Performance Tips

Menulis loop yang efisien penting untuk performa aplikasi.

#### 6.1. Cache Array Length

**Cara Buruk:**

```javascript
const items = ['a', 'b', 'c', 'd', 'e'];

// Length dihitung di setiap iterasi
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

**Cara Baik:**

```javascript
const items = ['a', 'b', 'c', 'd', 'e'];
const length = items.length; // Cache length

for (let i = 0; i < length; i++) {
  console.log(items[i]);
}

// Atau inisialisasi di dalam for
for (let i = 0, len = items.length; i < len; i++) {
  console.log(items[i]);
}
```

#### 6.2. Minimize Work Inside Loop

Pindahkan kalkulasi yang tidak perlu keluar dari loop.

**Cara Buruk:**

```javascript
for (let i = 0; i < 1000; i++) {
  const multiplier = 2 * 3; // Dihitung 1000 kali (tidak perlu!)
  console.log(i * multiplier);
}
```

**Cara Baik:**

```javascript
const multiplier = 2 * 3; // Hitung sekali saja di luar loop
for (let i = 0; i < 1000; i++) {
  console.log(i * multiplier);
}
```

#### 6.3. Pilih Loop yang Tepat

| Loop Type  | Gunakan Saat                                    |
| :--------- | :---------------------------------------------- |
| `for`      | Tahu jumlah iterasi, butuh index                |
| `while`    | Tidak tahu jumlah iterasi, berbasis kondisi     |
| `do-while` | Perlu eksekusi minimal sekali                   |
| `for...of` | Iterasi nilai array (akan dipelajari di Sesi 5) |
| `forEach`  | Functional approach (akan dipelajari di Sesi 5) |

#### 6.4. Avoid Unnecessary Iterations

Gunakan `break` untuk keluar lebih awal jika memungkinkan.

```javascript
// Cari apakah ada angka genap
const numbers = [1, 3, 5, 7, 8, 9, 11];
let hasEven = false;

// BURUK: Loop terus meskipun sudah ketemu
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    hasEven = true;
    // Masih terus loop
  }
}

// BAIK: Keluar begitu ketemu
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    hasEven = true;
    break; // Keluar dari loop
  }
}
```

---

### 7. Labeled Statements (Break/Continue dengan Label)

Untuk nested loop, Anda bisa menggunakan label untuk mengontrol loop mana yang di-break atau continue.

```javascript
outerLoop: for (let i = 1; i <= 3; i++) {
  innerLoop: for (let j = 1; j <= 3; j++) {
    if (i === 2 && j === 2) {
      console.log(`Break outer loop at i=${i}, j=${j}`);
      break outerLoop; // Break loop luar
    }
    console.log(`i=${i}, j=${j}`);
  }
}
/* Output:
i=1, j=1
i=1, j=2
i=1, j=3
i=2, j=1
Break outer loop at i=2, j=2
*/
```

**Penggunaan dengan continue:**

```javascript
outerLoop: for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (j === 2) {
      continue outerLoop; // Skip ke iterasi berikutnya dari loop luar
    }
    console.log(`i=${i}, j=${j}`);
  }
}
/* Output:
i=1, j=1
i=2, j=1
i=3, j=1
*/
```

---

## Praktik

### Latihan 1: If-Else Dasar

**Tingkat**: Dasar

**Tujuan**: Memahami percabangan if-else

**Instruksi**:
Buat program yang menentukan kategori BMI (Body Mass Index):

- BMI < 18.5: Underweight
- BMI 18.5-24.9: Normal
- BMI 25-29.9: Overweight
- BMI >= 30: Obese

```javascript
const beratBadan = 70; // kg
const tinggiBadan = 1.75; // meter
// BMI = berat / (tinggi * tinggi)
```

### Latihan 2: Switch Statement

**Tingkat**: Dasar

**Tujuan**: Menggunakan switch untuk multiple cases

**Instruksi**:
Buat program konverter hari (1-7) ke nama hari:

- 1: Senin
- 2: Selasa
- dst.
- Default: Hari tidak valid

Gunakan switch statement dengan fall-through untuk weekend.

### Latihan 3: Truthy & Falsy

**Tingkat**: Menengah

**Tujuan**: Memahami konsep truthy/falsy

**Instruksi**:
Buat fungsi `validasiRegistrasi` yang menerima object user dengan properti:

- username (string)
- email (string)
- age (number)

Gunakan truthy/falsy untuk validasi (jangan gunakan length atau strict comparison). Return pesan error jika ada yang tidak valid.

### Latihan 4: Loop dengan for

**Tingkat**: Menengah

**Tujuan**: Menguasai for loop

**Instruksi**:

1. Buat loop yang mencetak tabel perkalian 5 (5x1 sampai 5x10)
2. Buat loop yang mencetak pola bintang:

```
*
**
***
****
*****
```

### Latihan 5: Early Return Pattern

**Tingkat**: Menengah

**Tujuan**: Menulis conditional yang bersih

**Instruksi**:
Refactor kode berikut menggunakan early return pattern:

```javascript
function cekDiskon(member, totalBelanja, tahunBergabung) {
  if (member) {
    if (totalBelanja >= 500000) {
      if (tahunBergabung <= 2020) {
        return 'Diskon 30%';
      } else {
        return 'Diskon 20%';
      }
    } else {
      return 'Diskon 10%';
    }
  } else {
    return 'Tidak ada diskon';
  }
}
```

### Latihan 6: break dan continue

**Tingkat**: Menengah

**Tujuan**: Menggunakan break dan continue dengan tepat

**Instruksi**:
Buat program yang:

1. Mencari bilangan prima pertama yang lebih besar dari 50
2. Menampilkan angka 1-20, tapi skip kelipatan 3 dan berhenti jika ketemu angka 17

### Tantangan: FizzBuzz dengan Twist

**Tingkat**: Lanjutan

**Tujuan**: Menggabungkan semua konsep conditional dan loop

**Instruksi**:
Buat program FizzBuzz yang lebih kompleks untuk angka 1-100:

- Jika habis dibagi 3: tampilkan "Fizz"
- Jika habis dibagi 5: tampilkan "Buzz"
- Jika habis dibagi 3 DAN 5: tampilkan "FizzBuzz"
- Jika habis dibagi 7: tampilkan "Boom"
- Jika habis dibagi 3 DAN 7: tampilkan "FizzBoom"
- Jika habis dibagi 5 DAN 7: tampilkan "BuzzBoom"
- Jika habis dibagi 3, 5, DAN 7: tampilkan "FizzBuzzBoom"
- Selain itu: tampilkan angkanya

Gunakan early continue untuk efisiensi dan cache variable untuk kondisi.

---

## Solusi dan Pembahasan

### Solusi Latihan 5: Early Return Pattern

```javascript
// Refactored dengan early return
function cekDiskon(member, totalBelanja, tahunBergabung) {
  // Guard clause: cek kondisi gagal dulu
  if (!member) {
    return 'Tidak ada diskon';
  }

  if (totalBelanja < 500000) {
    return 'Diskon 10%';
  }

  // Happy path
  if (tahunBergabung <= 2020) {
    return 'Diskon 30%';
  }

  return 'Diskon 20%';
}

// Test
console.log(cekDiskon(false, 600000, 2019)); // "Tidak ada diskon"
console.log(cekDiskon(true, 400000, 2019)); // "Diskon 10%"
console.log(cekDiskon(true, 600000, 2019)); // "Diskon 30%"
console.log(cekDiskon(true, 600000, 2021)); // "Diskon 20%"
```

### Solusi Latihan 6.1: Bilangan Prima

```javascript
function cariBilanganPrima(minimal) {
  let angka = minimal + 1;

  while (true) {
    let isPrima = true;

    // Cek apakah angka adalah prima
    for (let i = 2; i <= Math.sqrt(angka); i++) {
      if (angka % i === 0) {
        isPrima = false;
        break; // Tidak perlu cek lagi
      }
    }

    if (isPrima) {
      return angka;
    }

    angka++;
  }
}

const hasilPrima = cariBilanganPrima(50);
console.log(`Bilangan prima pertama > 50: ${hasilPrima}`); // 53
```

---

## Rangkuman Sesi 3

Anda sekarang memiliki kekuatan untuk mengontrol alur program Anda!

- Anda bisa membuat **keputusan** dengan `if-else` dan `switch`
- Anda memahami konsep **Truthy & Falsy** yang menjadi dasar dari semua kondisi di JavaScript
- Anda bisa melakukan **tugas berulang** dengan `for`, `while`, dan `do-while`
- Anda bisa **menginterupsi perulangan** dengan `break` dan `continue`
- Anda mengetahui **best practices** seperti early return, guard clauses, dan positive conditionals
- Anda memahami **loop performance tips** untuk menulis kode yang efisien

Di sesi berikutnya, kita akan belajar cara mengorganisir kode kita menjadi blok-blok yang rapi dan dapat digunakan kembali menggunakan **Fungsi**!
