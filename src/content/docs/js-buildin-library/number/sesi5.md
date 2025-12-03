---
title: '"Perangkap umum" pada angka di JavaScript'
---

Sekarang, fokus ke **perangkap umum angka di JavaScript** (floating‑point, `NaN`, `Infinity`, batas integer) dan **best practice** untuk menulis kode angka yang aman, terutama untuk aplikasi web dan finansial. Semua ini masih memakai tipe `Number` yang berbasis IEEE‑754 double‑precision.

## Floating‑point dan masalah presisi

Semua `Number` disimpan sebagai floating‑point 64‑bit, sehingga banyak bilangan desimal tidak bisa direpresentasikan persis dalam biner. Akibatnya, ekspresi seperti `0.1 + 0.2` bisa menghasilkan nilai yang _mendekati_ `0.3` tapi bukan persis, sehingga `0.1 + 0.2 === 0.3` bernilai `false`.

Best practice untuk membandingkan angka desimal: bandingkan selisih absolut dengan toleransi kecil (misalnya `Number.EPSILON` atau skala yang kamu tentukan sendiri). Contoh pola:

```js
function almostEqual(a, b, epsilon = Number.EPSILON) {
  return Math.abs(a - b) < epsilon;
}

almostEqual(0.1 + 0.2, 0.3); // true secara praktis
```

## NaN, Infinity, dan -0

`NaN` adalah nilai `Number` yang menandakan hasil operasi numerik tidak valid (misalnya parsing gagal, `0 / 0`, atau operasi lain yang undefined). `NaN` punya sifat unik: **tidak pernah sama dengan dirinya sendiri**, jadi `NaN === NaN` adalah `false`, sehingga pengecekan harus pakai `Number.isNaN`.

`Infinity` dan `-Infinity` juga bagian dari tipe `Number` dan muncul dari operasi seperti overflow atau pembagian dengan nol (`1 / 0`, `-1 / 0`). Nilai‑nilai ini bisa “menyebar” di perhitungan lanjutan, jadi untuk validasi hasil hitung yang dipakai di UI atau logika bisnis, biasakan cek `Number.isFinite(result)`.

JavaScript juga membedakan `+0` dan `-0` pada level representasi floating‑point, walaupun `+0 === -0` adalah `true`. Perbedaan ini jarang bermasalah di aplikasi biasa, tapi bisa muncul di operasi tertentu (misalnya `1 / 0 === Infinity` sedangkan `1 / -0 === -Infinity`).

## Batas safe integer dan BigInt

`Number` hanya bisa merepresentasikan bilangan bulat **dengan presisi penuh** di rentang `Number.MIN_SAFE_INTEGER` sampai `Number.MAX_SAFE_INTEGER` (\(\pm(2^{53}-1)\)). Di luar rentang ini, dua bilangan berbeda bisa “kolaps” ke representasi yang sama sehingga operasi seperti `x + 1 === x` bisa terjadi untuk angka besar.

Untuk integer yang lebih besar (misalnya ID kriptografi, perhitungan ilmiah, atau big counter), gunakan tipe `BigInt` dengan menambahkan sufiks `n` (`9007199254740993n`) atau memanggil `BigInt("9007199254740993")`. `BigInt` bisa menyimpan integer dengan magnitude arbitrer, tetapi tidak boleh dicampur langsung dengan `Number` dalam operasi matematika tanpa konversi eksplisit.

## Best practice penanganan angka

Beberapa guideline praktis saat menulis kode angka di JavaScript:

- Gunakan `Number.isNaN` dan `Number.isFinite` untuk validasi, bukan versi global yang melakukan coercion otomatis.
- Untuk input dari user (string), tentukan strategi: `Number()` untuk harus valid penuh, `Number.parseInt`/`Number.parseFloat` untuk “ambil prefix angka”, dan selalu cek hasilnya dengan `Number.isNaN`.
- Untuk angka desimal (harga, persentase), hindari logika bisnis yang bergantung pada equality strict; gunakan pembulatan (`toFixed`, `Math.round` + scaling) sebelum perbandingan atau penyimpanan.
- Untuk kasus finansial serius, pertimbangkan representasi **dalam satuan terkecil** (misal rupiah → sen) sebagai integer, atau gunakan library decimal khusus; floating‑point murni sering tidak cukup presisi.

Untuk display di UI, biasakan memakai `toLocaleString`/`Intl.NumberFormat` agar format ribuan dan mata uang mengikuti locale (misalnya `'id-ID'` dan `currency: 'IDR'`). Ini menghindari bug format manual (replace, regex) sekaligus membuat aplikasi siap internasionalisasi.

## Praktik: pola kode aman

Berikut contoh pola “aman” kecil yang menggabungkan best practice di atas untuk sebuah field harga:

```js
function parsePrice(input) {
  // input: string dari <input>, contoh "30.000,50" atau "30000.5"
  const normalized = input.replace(/\./g, '').replace(',', '.');
  const value = Number.parseFloat(normalized);

  if (!Number.isFinite(value) || value < 0) {
    throw new Error('Harga tidak valid');
  }

  // Simpan di state/db dengan 2 desimal dibulatkan
  return Number(value.toFixed(2));
}

function formatPrice(value) {
  if (!Number.isFinite(value)) return '-';
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
```

Di sesi 6 nanti, semua konsep dari sesi 1–5 akan dipakai untuk membangun **mini‑project utilitas angka** (parser, validator, dan formatter angka) yang bisa langsung kamu adaptasi ke form React/vanilla JS di aplikasi nyata.
