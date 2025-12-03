---
title: Static methods Number
---

Sekarang, fokus ke **static methods `Number`**: fungsi yang dipanggil lewat `Number.<namaMethod>` untuk cek/validasi angka dan parsing string ke angka. Dengan ini kamu bisa menulis logic angka yang jauh lebih aman dibanding pakai versi global lama seperti `isNaN` atau `parseInt` tanpa radix.

## Materi: Static methods Number

Kelompok **cek/validasi angka**:

- `Number.isNaN(value)`

  Mengembalikan `true` hanya jika `value` bertipe `number` dan nilainya benar‑benar `NaN`. Berbeda dengan global `isNaN()`, method ini **tidak melakukan coercion**, jadi `Number.isNaN("abc")` adalah `false` sementara `isNaN("abc")` adalah `true`.

- `Number.isFinite(value)`

  Mengembalikan `true` hanya jika `value` bertipe `number`, bukan `NaN`, dan bukan `Infinity` atau `-Infinity`. Berbeda dengan global `isFinite()` yang akan mengubah input ke angka dulu (sehingga `isFinite("123")` bisa `true`), `Number.isFinite("123")` langsung `false` karena string bukan number.

- `Number.isInteger(value)`

  Mengecek apakah `value` bertipe `number` dan bernilai bilangan bulat (tanpa pecahan), misalnya `1` atau `-10`, tetapi bukan `1.5`. Nilai seperti `NaN`, `Infinity`, atau string akan selalu menghasilkan `false`.

- `Number.isSafeInteger(value)`  
  Mirip `isInteger`, tapi juga memastikan nilai ada di dalam rentang aman integer JavaScript dari `Number.MIN_SAFE_INTEGER` sampai `Number.MAX_SAFE_INTEGER`. Ini penting saat bekerja dengan ID besar, timestamp, atau counter yang tidak boleh kehilangan presisi.

Kelompok **parsing string ke angka**:

- `Number.parseInt(string, radix?)`

  Mem‑parse `string` dan mengembalikan integer dengan basis (radix) tertentu; jika menemukan karakter non‑digit sesuai basis, parsing berhenti di sana. `radix` sebaiknya **selalu diisi** (misalnya `10` untuk desimal) supaya tidak ada perilaku ambigu pada format seperti awalan `0x` yang akan dianggap heksadesimal.

- `Number.parseFloat(string)`

  Mem‑parse `string` menjadi floating‑point, membaca bagian awal yang bisa dipahami sebagai angka desimal dan mengabaikan sisa karakter setelahnya. Keduanya (`Number.parseInt` dan `Number.parseFloat`) secara spesifikasi modern adalah alias dari versi global, tapi gaya penulisan `Number.parseInt` lebih eksplisit dan idiomatik.

Perbedaan penting dengan `Number(value)` sebagai converter umum: `Number()` mencoba mengkonversi keseluruhan nilai ke angka dan akan menghasilkan `NaN` jika tidak sepenuhnya valid, sedangkan `parseInt`/`parseFloat` bisa mengambil **prefix angka valid** dari string seperti `"42px"` dan tetap mengembalikan `42`.

## Praktik: Latihan static methods

Jalankan potongan berikut di Console browser/Node.js dan perhatikan outputnya.

1. **`Number.isNaN` vs global `isNaN`**

   ```js
   console.log(isNaN('hello')); // true (di-coerce jadi NaN)
   console.log(Number.isNaN('hello')); // false (bukan tipe number)

   const bad = Number('abc');
   console.log(bad); // NaN
   console.log(Number.isNaN(bad)); // true
   ```

   **Pola best practice:** untuk cek NaN, pakai **`Number.isNaN`**, hindari `isNaN` kecuali butuh perilaku coercion lama.

2. **`Number.isFinite` vs global `isFinite`**

   ```js
   console.log(isFinite('123')); // true (string di-coerce ke 123)
   console.log(Number.isFinite('123')); // false (bukan number)

   console.log(Number.isFinite(123)); // true
   console.log(Number.isFinite(Infinity)); // false
   console.log(Number.isFinite(NaN)); // false
   ```

   Untuk validasi angka dari input user, `Number.isFinite` biasanya lebih aman karena non‑number selalu dianggap tidak valid.

3. **Pakai `isInteger` dan `isSafeInteger` untuk validasi ID/counter**

   ```js
   console.log(Number.isInteger(10)); // true
   console.log(Number.isInteger(10.5)); // false
   console.log(Number.isInteger('10')); // false

   console.log(Number.isSafeInteger(42)); // true
   console.log(Number.isSafeInteger(1e16)); // false di banyak engine
   console.log(Number.isSafeInteger(NaN)); // false
   ```

   Kombinasi `Number.isSafeInteger(id)` adalah cara modern untuk memastikan nilai seperti ID database benar‑benar integer dalam rentang aman.

4. **Pakai `parseInt`/`parseFloat` untuk input string**

   ```js
   console.log(Number.parseInt('42px', 10)); // 42
   console.log(Number.parseInt('0xFF', 16)); // 255
   console.log(Number.parseInt('010', 10)); // 10 (jelas karena radix = 10)

   console.log(Number.parseFloat('3.14kg')); // 3.14
   console.log(Number('3.14kg')); // NaN (harus seluruh string valid)
   ```

   **Pola umum di UI:** ambil `event.target.value` (selalu string), lalu pilih `Number.parseInt` jika butuh integer dari string campuran, atau `Number()`/`Number.parseFloat` jika seluruh string seharusnya angka murni.

Kalau sudah nyaman dengan semua static methods ini, sesi berikutnya akan masuk ke **Instance methods `Number`** untuk membahas cara mengubah angka menjadi string format tertentu (`toFixed`, `toLocaleString`, dan lain‑lain) yang sangat berguna untuk tampilan UI seperti harga dan jumlah.
