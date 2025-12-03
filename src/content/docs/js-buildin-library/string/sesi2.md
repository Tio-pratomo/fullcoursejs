---
title: Akses karakter & info dasar
---

Sesi 2 fokus ke **“gimana cara membaca karakter di dalam string”** dan **informasi dasar seperti panjang string**. Ini penting banget sebelum masuk ke operasi yang lebih kompleks seperti pencarian dan pemotongan substring.

## Materi: Akses karakter & info dasar

- **Panjang string: properti `length`**  
  Setiap string punya properti `length` yang berisi jumlah unit UTF‑16 di dalam string, dan ini sering dipakai untuk validasi panjang input (misalnya minimal 8 karakter). Ingat: untuk karakter tertentu seperti emoji, satu “simbol” bisa dihitung lebih dari 1 unit, tapi untuk sebagian besar teks Latin biasa (`a–z`, angka, simbol umum) `length` terasa sama seperti jumlah karakter.

- **Mengakses karakter dengan indeks (`[]` dan `at()`)**  
  Karakter di string diindeks mulai dari 0 sampai `str.length - 1`, jadi karakter pertama ada di indeks 0. Cara modern: `str.at(index)` (mendukung indeks negatif seperti `-1` untuk elemen terakhir), atau cara lama tapi masih umum: `str[index]`.

- **`charAt()`, `charCodeAt()`, dan `codePointAt()` (sekilas)**  
  `charAt(index)` mengembalikan karakter di posisi tertentu, mirip `str[index]` tapi lebih konsisten di lingkungan lama. `charCodeAt(index)` mengembalikan kode unit UTF‑16 (0–65535), sedangkan `codePointAt(index)` mengembalikan _Unicode code point_ penuh dan lebih akurat untuk emoji / karakter di luar BMP.

- **Iterasi string (`for...of` dan spread)**  
  String adalah _iterable_, jadi bisa di-loop dengan `for...of` sehingga tiap iterasi langsung dapat satu “karakter” (berbasis code point, lebih aman untuk emoji). Alternatif lain, bisa pakai spread `[...]` untuk mengubah string menjadi array karakter sebelum diproses.

## Praktik: Akses karakter dasar

```js
const text = 'JavaScript';

// panjang string
console.log(text.length); // 10

// akses karakter dengan indeks
console.log(text[0]); // "J"
console.log(text.at(0)); // "J"
console.log(text.at(-1)); // "t" (karakter terakhir)

// charAt (cara klasik)
console.log(text.charAt(4)); // "S"
```

Contoh di atas menunjukkan **tiga cara umum** untuk ambil karakter: `[]`, `at()`, dan `charAt()`. Untuk kode baru, `[]` + `at()` biasanya sudah cukup, `charAt()` lebih relevan saat baca kode lama atau ketika butuh perilaku yang konsisten di environment lama.

## Praktik: Melihat kode karakter

```js
const sample = 'A😊';

// kode unit UTF-16
console.log(sample.charCodeAt(0)); // 65 (kode "A")
console.log(sample.charCodeAt(1)); // bagian pertama emoji (surrogate)

// Unicode code point
console.log(sample.codePointAt(0)); // 65
console.log(sample.codePointAt(1)); // code point lengkap emoji
```

`charCodeAt()` berguna kalau ingin melihat nilai numerik unit UTF‑16, misalnya untuk algoritma lama atau debugging encoding. `codePointAt()` lebih cocok untuk dunia modern dengan emoji karena memberikan nilai code point yang benar untuk karakter di luar rentang dasar.

## Praktik: Loop karakter dalam string

```js
const message = 'Hi 😊';

// for...of: cara modern dan aman untuk iterasi karakter
for (const ch of message) {
  console.log(ch);
}

// ubah ke array karakter dengan spread
const chars = [...message];
console.log(chars); // ["H", "i", " ", "😊"]
```

`for...of` otomatis berjalan di atas iterator string sehingga setiap `ch` berisi satu unit “karakter” yang konsisten, termasuk emoji. Teknik spread `[...]` memudahkan manipulasi seperti `map`, `filter`, atau `reverse` pada level karakter.

Kalau bagian ini sudah terasa nyaman, sesi berikutnya kita bisa lanjut ke **pencarian & pemotongan teks** (`indexOf`, `includes`, `slice`, dll.) supaya mulai terasa manfaat praktisnya di kasus real seperti pencarian kata kunci atau parsing data sederhana.
