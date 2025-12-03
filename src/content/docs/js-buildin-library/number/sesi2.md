---
title: Static Properties Number
---

## Materi: Konsep static property

Static property artinya properti yang diakses lewat nama kelas/objek konstruktornya, bukan lewat instance. Untuk `Number`, semua properti statis diakses seperti `Number.MAX_SAFE_INTEGER`, **bukan** `someNumber.MAX_SAFE_INTEGER`.

Properti statis `Number` adalah nilai konstan yang menjelaskan batasan dan perilaku tipe angka floating‑point 64‑bit di JavaScript. Pemahaman ini penting supaya tidak kaget dengan bug angka besar dan ketidakpresisian desimal.

## Materi: Daftar static properties penting

Berikut properti statis utama pada `Number` dan fungsinya:

- `Number.EPSILON`  
  Selisih terkecil antara `1` dan angka floating‑point paling kecil yang masih lebih besar dari `1`. Sering dipakai sebagai **toleransi error** saat membandingkan angka desimal (misal hasil perhitungan uang atau diskon).

- `Number.MAX_SAFE_INTEGER`  
  Bilangan bulat positif terbesar yang masih aman direpresentasikan tanpa kehilangan presisi, nilainya `9007199254740991` $(2^{53} - 1)$. Di atas angka ini, operasi penjumlahan/pengurangan integer bisa mulai salah (contoh `x + 1 === x + 2` bisa terjadi).

- `Number.MIN_SAFE_INTEGER`  
  Kebalikan dari di atas: bilangan bulat negatif terkecil yang aman, yaitu `-9007199254740991`. Dipakai untuk mengecek apakah ID, timestamp, atau counter masih berada di rentang aman integer JavaScript.

- `Number.MAX_VALUE`  
  Angka positif terbesar yang bisa direpresentasikan `Number` sebelum berubah menjadi `Infinity`. Biasanya berguna untuk inisialisasi nilai “sangat besar” (misal untuk algoritma mencari minimum global).

- `Number.MIN_VALUE`  
  Angka positif paling kecil yang > 0, dalam rentang bilangan floating‑point normal/subnormal. Bukan angka negatif; ini lebih ke batas bawah magnitude positif yang bisa direpresentasikan.

- `Number.NaN`  
  Nilai khusus “Not‑a‑Number” yang ekuivalen dengan `NaN`. Digunakan sebagai hasil saat konversi angka gagal atau operasi matematika tidak valid; lebih aman dipakai bareng `Number.isNaN()` di sesi static methods nanti.

- `Number.POSITIVE_INFINITY`  
  Representasi infinity positif, ekuivalen dengan `Infinity`. Biasanya muncul dari overflow atau pembagian angka positif dengan `0`, dan dipakai juga sebagai nilai awal “sangat besar” di beberapa algoritma.

- `Number.NEGATIVE_INFINITY`  
  Versi negatif dari infinity; hasil dari overflow negatif atau pembagian angka negatif dengan `0`. Bisa dipakai sebagai nilai awal “sangat kecil” (misalnya untuk mencari maksimum global).

Semua properti ini **read‑only** (tidak boleh diubah) dan hanya tersedia di `Number`, sehingga pola aksesnya konsisten: `Number.<NAMA_PROPERTI>`.

## Praktik: Eksperimen static properties

Jalankan potongan kode ini di Console browser atau Node.js untuk merasakan bedanya tiap properti.

1. **Cek nilai dasar setiap properti**

   ```js
   console.log('EPSILON:', Number.EPSILON);
   console.log('MAX_SAFE_INTEGER:', Number.MAX_SAFE_INTEGER);
   console.log('MIN_SAFE_INTEGER:', Number.MIN_SAFE_INTEGER);
   console.log('MAX_VALUE:', Number.MAX_VALUE);
   console.log('MIN_VALUE:', Number.MIN_VALUE);
   console.log('NaN:', Number.NaN);
   console.log('POSITIVE_INFINITY:', Number.POSITIVE_INFINITY);
   console.log('NEGATIVE_INFINITY:', Number.NEGATIVE_INFINITY);
   ```

   Dengan ini kamu bisa melihat skala rentang angka `Number` dan nilai‑nilai spesialnya langsung di environment kamu.

2. **Lihat masalah angka besar dan safe integer**

   ```js
   const big = Number.MAX_SAFE_INTEGER;
   console.log(big); // 9007199254740991
   console.log(big + 1); // masih masuk akal
   console.log(big + 2); // di sini mulai berpotensi tidak presisi
   console.log(big + 1 === big + 2); // bisa true (berbahaya!)
   ```

   Di titik ini terlihat kenapa `MAX_SAFE_INTEGER` penting saat bekerja dengan ID besar, counter, atau data dari database yang melewati batas ini.

3. **Gunakan EPSILON untuk bandingkan desimal**

   ```js
   const x = 0.1 + 0.2;
   console.log(x); // bukan persis 0.3

   const y = 0.3;
   console.log(x === y); // false

   const almostEqual = Math.abs(x - y) < Number.EPSILON;
   console.log(almostEqual); // true -> secara praktis dianggap sama
   ```

   Ini menunjukkan pola umum: untuk membandingkan desimal, gunakan selisih dan bandingkan dengan `Number.EPSILON` sebagai toleransi error.

4. **Manfaat Infinity untuk algoritma min/max**

   ```js
   const numbers = [5, 10, -3, 100];

   let min = Number.POSITIVE_INFINITY;
   let max = Number.NEGATIVE_INFINITY;

   for (const n of numbers) {
     if (n < min) min = n;
     if (n > max) max = n;
   }

   console.log({ min, max }); // { min: -3, max: 100 }
   ```

   Di sini `POSITIVE_INFINITY` dan `NEGATIVE_INFINITY` berguna sebagai nilai awal supaya angka berapapun di array akan menggantikan nilai default tersebut.

Kalau static properties ini sudah terasa familiar, sesi berikutnya bisa lanjut ke **Static methods `Number`** untuk belajar cara parsing, validasi, dan pengecekan angka dengan benar (`Number.isNaN`, `Number.isFinite`, dan teman‑temannya).
