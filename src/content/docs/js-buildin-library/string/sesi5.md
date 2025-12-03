---
title: Unicode & mini project utilitas string
---

Di Sesi 5 ini fokus ke **Unicode & string “sehat” (well‑formed)** lalu menutup dengan **mini utilitas string praktis** seperti slug untuk URL. Ini akan bikin pemahaman tentang `String` terasa lengkap dan siap dipakai di real project.

## Materi: Unicode, UTF‑16, dan well‑formed string

JavaScript menyimpan string sebagai urutan unit UTF‑16, artinya satu karakter Unicode bisa diwakili satu atau dua unit 16‑bit (surrogate pair), terutama untuk emoji dan karakter di luar BMP. Konsekuensinya: panjang `length` dan indeks bisa terasa “aneh” untuk emoji, karena satu simbol bisa dihitung sebagai dua unit.

`isWellFormed()` mengecek apakah string mengandung “lone surrogate” (potongan surrogate pair yang tidak lengkap); jika tidak ada, string disebut well‑formed dan method ini mengembalikan `true`. `toWellFormed()` mengembalikan string baru di mana semua lone surrogate diganti karakter pengganti Unicode `U+FFFD` (simbol ▯/�) sehingga aman dipakai di API yang mengharuskan string well‑formed seperti `encodeURI` atau `TextEncoder`.

`normalize(form?)` menyamakan representasi Unicode sehingga dua teks yang tampak sama (misalnya huruf + accent terpisah vs karakter komposit) bisa dibandingkan dengan andal. Ini penting ketika bekerja dengan teks internasional, pencarian case‑insensitive yang stabil, atau saat membuat kunci unik yang bergantung pada nama dengan karakter aksen.

## Praktik: cek dan perbaiki well‑formed string

```js
// contoh string yang berpotensi ill-formed (misalnya dari input eksternal)
const raw = 'Hello \uD800 world'; // lone surrogate

console.log(raw.isWellFormed()); // false
const safe = raw.toWellFormed();
console.log(safe.isWellFormed()); // true
console.log(safe); // "Hello � world"
```

Polanya: **cek dulu** dengan `isWellFormed()`, dan jika perlu **sanitize** dengan `toWellFormed()` sebelum menyimpan ke DB, mengirim ke API, atau menampilkan ke UI. Ini jarang dibahas di tutorial dasar, tapi sangat berguna di sistem produksi yang sering menerima input “aneh” dari berbagai platform.

## Praktik: normalisasi Unicode

```js
// dua bentuk berbeda untuk karakter yang tampak sama
const a1 = 'e\u0301'; // 'e' + combining acute accent
const a2 = '\u00E9'; // 'é' sebagai karakter tunggal

console.log(a1 === a2); // false
console.log(a1.normalize() === a2.normalize()); // true
```

Dengan `normalize()`, kedua string yang secara visual sama bisa dibandingkan dengan hasil konsisten, yang penting misalnya saat membandingkan username atau nama file lintas OS/locale. Form default adalah NFC (umum dipakai), tapi tersedia juga NFD, NFKC, dan NFKD untuk kebutuhan lebih khusus.

## Mini utilitas 1: slug URL‑friendly

Berikut contoh fungsi `slugify` sederhana yang menggabungkan beberapa hal yang sudah dibahas: lowercasing, `normalize`, pembersihan karakter, dan replace dengan regex.

```js
function slugify(input) {
  return input
    .toString()
    .trim()
    .normalize('NFKD') // pisahkan accent dari huruf
    .replace(/[\u0300-\u036f]/g, '') // hapus mark accent
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // buang karakter tidak valid
    .replace(/\s+/g, '-') // spasi -> "-"
    .replace(/-+/g, '-'); // rapikan "--" jadi "-"
}

console.log(slugify('Belajar String JavaScript ✨'));
// "belajar-string-javascript"
```

Fungsi seperti ini bisa dipakai untuk membuat URL artikel, ID HTML, atau nama file yang aman, tanpa bergantung ke library eksternal di kasus sederhana. Di project besar, bisa dialihkan ke library slugify khusus tapi konsep dasarnya tetap berangkat dari method string + regex seperti di atas.

## Mini utilitas 2: masker nomor & formatter nama

```js
// masker nomor: tampilkan 4 digit terakhir
function maskNumber(numStr) {
  const clean = String(numStr).replace(/\D/g, '');
  const visible = clean.slice(-4);
  const masked = visible.padStart(clean.length, '*');
  return masked;
}

console.log(maskNumber('4111-1111-1111-1234'));
// "************1234"

// formatter nama "first last" -> "Last, First"
function formatName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName.trim();
  const last = parts.pop();
  return `${last}, ${parts.join(' ')}`;
}

console.log(formatName('Budi Santoso'));
// "Santoso, Budi"
```

Di sini terlihat kombinasi `String()`, `replace`, `slice`, `padStart`, `trim`, dan `split` yang sudah dipelajari di sesi sebelumnya, dirangkai jadi utilitas kecil yang langsung relevan untuk form, laporan, atau tampilan UI. Latihan lanjutan yang sejalan: buat formatter username dari email, generator inisial nama, atau normalizer nomor telepon lokal ke format internasional.
