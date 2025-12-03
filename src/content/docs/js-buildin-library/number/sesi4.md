---
title: Instance methods `Number`
---

Sekarang, fokus ke **instance methods `Number`**: method yang dipanggil dari nilai angka, misalnya `num.toFixed(2)` atau `num.toLocaleString()`. Ini adalah senjata utama untuk **mengubah angka jadi string** dengan format yang pas buat UI.

## Materi: Konsep instance method

Instance method dipanggil dari nilai angka (primitif atau objek `Number`), contohnya :

```js
const n = 123.456;
n.toFixed(2);
```

Saat kamu menulis `42..toFixed(2)` atau `(42).toFixed(2)`, JavaScript otomatis membungkus angka primitif itu ke objek `Number` sementara, lalu memanggil method‑nya.

Metode instance `Number` yang paling sering dipakai di web dev modern:

`toString()`, `toFixed()`, `toPrecision()`, `toExponential()`, `toLocaleString()`, dan kadang `valueOf()` untuk kasus khusus. Hampir semuanya mengembalikan **string**, kecuali `valueOf()` yang mengembalikan nilai primitif number dari objek `Number`.

## Materi: toString, toExponential, toPrecision

- `Number.prototype.toString(radix?)`

  Mengembalikan representasi string dari angka, dengan basis (radix) 2–36; default‑nya basis 10. Contoh umum: konversi ke biner/heksadesimal.

  ```js
  const n = 255;
  console.log(n.toString()); // "255"
  console.log(n.toString(2)); // "11111111"  (biner)
  console.log(n.toString(16)); // "ff"        (hex)
  ```

- `Number.prototype.toExponential(fractionDigits?)`

  Mengembalikan string dalam **notasi ilmiah** (exponential), berguna untuk angka sangat besar/kecil.

  ```js
  const n = 12345.6789;
  console.log(n.toExponential()); // misal "1.23456789e+4"
  console.log(n.toExponential(2)); // "1.23e+4"
  ```

- `Number.prototype.toPrecision(precision?)`

  Mengembalikan string dengan **jumlah digit signifikan** tertentu, bisa berpindah antara fixed‑point dan exponential sesuai skala angka.

  ```js
  const n = 123.456;
  console.log(n.toPrecision(4)); // "123.5"
  console.log(n.toPrecision(2)); // "1.2e+2"
  ```

Method ini berguna saat kamu butuh kontrol “seberapa detail” angka ditampilkan, bukan hanya jumlah digit setelah koma.

## Materi: toFixed untuk desimal tetap

`Number.prototype.toFixed(digits?)` mengembalikan string dengan **jumlah digit setelah koma desimal yang tetap**, memakai pembulatan jika perlu. Ini sangat cocok untuk tampilan angka seperti harga, diskon, atau nilai yang butuh 2 decimal konsisten.

```js
const price = 123.456;

console.log(price.toFixed()); // "123"   (dibulatkan ke integer)
console.log(price.toFixed(2)); // "123.46"
console.log(price.toFixed(6)); // "123.456000"
```

Argumen `digits` harus antara 0–100, jika tidak akan melempar `RangeError`, dan hasilnya selalu string. Karena hasilnya string, jika butuh kembali ke number, gunakan `Number(price.toFixed(2))`, tapi untuk tampilan UI biasanya string sudah cukup.

## Materi: toLocaleString untuk format lokal

`Number.prototype.toLocaleString(locale?, options?)` mengembalikan string dengan format **sensitif terhadap locale** (titik/koma, pemisah ribuan, dan opsi lain). Ini cara modern & native untuk formatting angka sesuai bahasa/negara dan bahkan style mata uang.

```js
const n = 30000.65;

// Locale default environment
console.log(n.toLocaleString());

// Format Indonesia (id-ID)
console.log(n.toLocaleString('id-ID'));
// Contoh: "30.000,65"

// Format mata uang Rupiah
console.log(
  n.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  })
);
// Contoh: "Rp30.000,65"
```

Untuk aplikasi web production, sebaiknya **selalu** pakai `toLocaleString` (atau `Intl.NumberFormat`) dibanding nulis formatter manual dengan replace/regex. Dengan opsi yang tepat, kamu bisa handle ribuan/mata uang/pembulatan sekaligus secara konsisten.

## Praktik: Latihan cepat instance methods

Coba jalankan snippet ini di Console dan amati kapan sebaiknya pakai method yang mana.

```js
const n = 12345.6789;

// 1. Representasi dasar dan basis lain
console.log('toString(10):', n.toString());
console.log('toString(2):', n.toString(2)); // biner
console.log('toString(16):', n.toString(16)); // hex

// 2. Presisi dan notasi ilmiah
console.log('toExponential():', n.toExponential());
console.log('toExponential(3):', n.toExponential(3));
console.log('toPrecision(4):', n.toPrecision(4));
console.log('toPrecision(8):', n.toPrecision(8));

// 3. Fixed decimal (cocok untuk harga)
console.log('toFixed():', n.toFixed());
console.log('toFixed(2):', n.toFixed(2));
console.log('toFixed(6):', n.toFixed(6));

// 4. Locale-aware formatting (UI)
console.log('default locale:', n.toLocaleString());
console.log('id-ID:', n.toLocaleString('id-ID'));
console.log(
  'id-ID Rupiah:',
  n.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
);
```

Kalau pola penggunaan ini sudah terasa natural, di **Sesi 5** nanti kita bahas **perangkap umum angka (floating‑point, safe integer, dsb.) dan best practice** saat menggabungkan semua yang sudah kamu pelajari dari sesi 1 - 4.
