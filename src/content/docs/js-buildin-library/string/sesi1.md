---
title: Dasar dan pembuatan string
---

Sesi ini, kita fokus ke **dasar `String` di JavaScript**: apa itu string, cara membuatnya, dan perbedaan string _primitive_ vs objek `String` (yang pakai `new`). Ini fondasi sebelum nanti masuk ke method-method instance di sesi berikutnya.

## Materi: Pengetahuan & Konsep

- **Apa itu string di JavaScript**  
  String adalah tipe data _primitive_ yang dipakai untuk menyimpan teks, misalnya nama user, email, token, dan sebagainya. Di JavaScript, string selalu berupa urutan karakter Unicode yang ditulis di antara tanda kutip.

- **String primitive vs objek `String`**  
  String _primitive_ adalah nilai biasa seperti `"hello"` atau `` `test` ``, bertipe `string` ketika dicek dengan `typeof`. Objek `String` adalah nilai yang dibuat dengan `new String("hello")`, bertipe `object`, dan hampir tidak pernah direkomendasikan di kode modern karena bisa bikin perilaku aneh (misalnya saat perbandingan atau di `eval`).

- **Cara membuat string (versi modern)**  
  String literal:
  - Single quote: `'hello'`
  - Double quote: `"hello"`
  - Template literal: `` `hello` `` yang mendukung interpolasi `${...}` dan multi-baris.
    Selain itu, fungsi `String()` bisa mengkonversi nilai lain (angka, boolean) menjadi string primitive, misalnya `String(123)` menghasilkan `"123"`.

- **Template literal & interpolasi**  
  Template literal (backtick `` ` ``) memungkinkan menyisipkan nilai JavaScript langsung ke dalam string memakai `${expr}`. Ini sangat berguna untuk membuat teks dinamis seperti pesan UI, log, atau HTML snippet tanpa perlu banyak operator `+`.

- **Sekilas tentang wrapper otomatis**  
  Walaupun string primitive bukan objek, JavaScript secara otomatis membungkusnya dengan `String` object sementara ketika kita memanggil method (misalnya `"abc".toUpperCase()`), sehingga method-method di `String.prototype` bisa dipakai tanpa perlu `new String()`. Karena itu, di praktik modern cukup selalu pakai string primitive, bukan objek `String` buatan sendiri.

## Praktik

Di sesi 1 ini, praktik fokus ke **membuat string dengan berbagai cara** dan **melihat perbedaan primitive vs objek `String`**.

```js
// 1. String literal (paling umum)
const singleQuote = 'Hello World';
const doubleQuote = 'Hello World';

// 2. Template literal (direkomendasikan untuk teks dinamis)
const name = 'Budi';
const greet = `Halo, ${name}! Selamat belajar JavaScript.`;

// 3. Konversi ke string dengan String()
const num = 42;
const bool = true;
const numStr = String(num); // "42"
const boolStr = String(bool); // "true"

// 4. Primitive vs objek String
const prim = 'text';
const obj = new String('text');

console.log(typeof prim); // "string"
console.log(typeof obj); // "object"
console.log(prim === 'text'); // true
console.log(obj === 'text'); // false (karena obj adalah object)
```

**Latihan mandiri (boleh dikerjakan di console browser / Node.js):**

- Buat tiga variabel: `firstName`, `lastName`, dan `age`, lalu buat string `profile` dengan template literal yang menghasilkan kalimat seperti: `Nama: ... , Umur: ...`.
- Coba buat satu nilai dengan `new String("abc")`, bandingkan `typeof` dan hasil `===`-nya dengan string primitive `"abc"`.
- Ambil satu nilai angka (misalnya `2025`) dan boolean (`false`), lalu konversi ke string dengan `String()`, cek hasil dan `typeof`-nya.

Kalau sudah nyaman dengan dasar ini dan tidak ada yang mengganjal, sesi berikutnya kita lanjut ke **akses karakter & informasi dasar** (`length`, `at()`, dan kawan-kawan).
