---
title: Number
---

## Materi: Number & tipe angka

`Number` adalah tipe data angka standar di JavaScript yang memakai format floating‑point 64‑bit (IEEE 754), sama kelasnya dengan `double` di bahasa seperti Java atau C#. Artinya satu tipe ini dipakai untuk bilangan bulat dan pecahan, misalnya `42`, `3.14`, atau `-0.5`.

JavaScript tidak punya tipe integer terpisah seperti `int` di banyak bahasa lain; semua “angka biasa” menggunakan `Number`. Bilangan bulat hanya aman direpresentasikan tanpa kehilangan presisi pada rentang sekitar $-2^{53} - 1$ sampai $2^{53} - 1$, yang diekspos lewat `Number.MIN_SAFE_INTEGER` dan `Number.MAX_SAFE_INTEGER`.

Selain `Number`, JavaScript punya tipe `BigInt` untuk bilangan bulat yang sangat besar, tapi ini bukan pengganti `Number` untuk kebutuhan umum sehari‑hari. Pada sesi ini fokus tetap ke `Number` karena semua API web dan mayoritas library modern mengasumsikan tipe ini.

Angka bisa ditulis dalam beberapa bentuk literal: desimal biasa (`123`), biner (`0b1111011`), heksadesimal (`0x7B`), dan oktal (`0o173`), dan semuanya direpresentasikan kembali sebagai `Number`. Secara internal, angka ini dipecah menjadi sign, exponent, dan mantissa; kombinasi ketiganya membatasi rentang dan presisi sehingga operasi desimal bisa kelihatan “aneh” (misalnya hasil tidak persis karena pembulatan biner).

Objek global `Number` menyediakan konstruktor dan fungsi konversi: memanggil `Number(value)` _tanpa_ `new` akan mencoba mengubah `value` menjadi angka primitif. Jika string atau nilai lain tidak bisa dikonversi, hasilnya adalah `NaN` (Not‑a‑Number), sebuah nilai khusus yang menandakan kegagalan operasi numerik.

JavaScript juga memiliki nilai khusus `Infinity` dan `-Infinity` untuk mewakili hasil overflow atau pembagian dengan nol dalam konteks tertentu. Nilai‑nilai ini tetap bertipe `Number`, sehingga bisa muncul di operasi matematika seperti angka lainnya, meski punya perilaku khusus di beberapa kasus.

Banyak operasi built‑in akan melakukan “coercion” ke `Number`:

- Boolean: `true` → `1`, `false` → `0`.
- `null` → `0`, sementara `undefined` → `NaN`.
- String angka seperti `"123"` atau `"3.14"` biasanya dikonversi ke angka, sedangkan string non‑angka seperti `"abc"` menghasilkan `NaN`.

Coercion yang sama terjadi saat memakai unary plus (`+value`) atau fungsi `Number(value)`, sehingga dua cara ini sering dipakai untuk mengubah input user menjadi angka. Untuk pemula, memahami pola konversi dasar ini penting sebelum menyentuh detail seperti static properties atau metode format angka.

## Praktik: Eksperimen singkat Number

Untuk latihan cepat, gunakan **DevTools Console** di browser (F12 → tab Console) atau terminal Node.js, lalu jalankan contoh berikut langkah demi langkah.

1. **Mengenal literal Number dan tipe dasarnya**

   ```js
   const a = 42;
   const b = 3.14;
   const c = 0b101010; // biner
   const d = 0x2a; // heksadesimal

   console.log(typeof a); // "number"
   console.log(c, d); // cek hasil biner & hex
   ```

   Semua variabel di atas akan ber-tipe `"number"` karena JavaScript hanya punya satu tipe angka utama, meskipun cara penulisannya berbeda.

2. **Membedakan primitif vs objek Number**

   ```js
   const x = 123; // primitif
   const y = Number(123); // juga primitif
   const z = new Number(123); // objek Number (hindari di kode sehari-hari)

   console.log(typeof x); // "number"
   console.log(typeof y); // "number"
   console.log(typeof z); // "object"
   ```

   Biasakan pakai nilai primitif (`123`, `Number(123)`) dan hindari `new Number()` kecuali benar‑benar paham efek sampingnya.

3. **Eksperimen konversi ke Number (coercion eksplisit)**

   ```js
   console.log(Number('123')); // 123
   console.log(Number('3.5')); // 3.5
   console.log(Number('abc')); // NaN

   console.log(Number(true)); // 1
   console.log(Number(false)); // 0
   console.log(Number(null)); // 0
   console.log(Number(undefined)); // NaN
   ```

   Perhatikan bedanya `null` dan `undefined`: `null` jadi `0`, sementara `undefined` menjadi `NaN`, yang sering jadi sumber bug jika tidak di-handle.

4. **Mengecek `NaN`, `Infinity`, dan rentang aman integer**

   ```js
   const bad = Number('100abc');
   console.log(bad); // NaN
   console.log(Number.isNaN(bad)); // true (akan dibahas detail di sesi static methods)

   console.log(1 / 0); // Infinity
   console.log(-1 / 0); // -Infinity

   console.log(Number.MAX_SAFE_INTEGER);
   console.log(Number.MIN_SAFE_INTEGER);
   ```

   Di atas terlihat bahwa operasi tidak valid menghasilkan `NaN`, dan pembagian dengan 0 dapat memunculkan `Infinity`/`-Infinity`, sedangkan konstanta safe integer menunjukkan batas bilangan bulat yang presisi.

Kalau sudah nyaman dengan konsep di sesi 1 ini (terutama konversi ke `Number` dan nilai khusus `NaN`/`Infinity`), sesi berikutnya akan masuk ke **Sesi 2: Static properties `Number` (konstanta angka penting)** dan akan dibedah dengan contoh penggunaan di kasus real seperti formatting harga, batas integer, dan perhitungan presisi.
