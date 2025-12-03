---
title: Manipulasi lanjutan & regex
---

Di Sesi 4 ini fokus ke **manipulasi string lanjutan**: memecah string (`split`), mengganti teks (`replace`, `replaceAll`), dan menyentuh sedikit regex lewat `match`, `matchAll`, dan `search`. Ini level di mana string mulai terasa “berdaya guna” untuk kasus real seperti parsing CSV sederhana, cleaning data, dan validasi pola teks ringan.

## Materi: Pemecahan string dengan split

`split(separator, limit?)` memecah string menjadi array substring berdasarkan `separator` (pemisah), bisa berupa string biasa atau `RegExp`. Method ini **tidak mengubah string asli**, hanya mengembalikan array baru; parameter `limit` bisa dipakai untuk membatasi jumlah potongan.

Contoh umum adalah memecah kalimat menjadi kata-kata dengan spasi, atau memecah data CSV berdasarkan koma. Kalau `separator` adalah regex dengan grup tangkap `( )`, bagian yang tertangkap bisa ikut dimasukkan ke hasil array, meski ini lebih sering dipakai di kasus yang agak advance.

## Materi: replace & replaceAll

`replace(pattern, replacement)` mengembalikan string baru dengan **satu atau beberapa** kecocokan `pattern` yang diganti `replacement`, tanpa mengubah string asli. Kalau `pattern` adalah string biasa, yang diganti hanya kemunculan pertama; kalau `pattern` adalah regex dengan flag `g`, semua kecocokan akan diganti.

`replaceAll(pattern, replacement)` hadir di spesifikasi baru dan **selalu** mengganti semua kecocokan, baik `pattern` string maupun `RegExp` (wajib pakai flag `g` kalau regex). `replacement` bisa berupa string biasa atau fungsi callback yang menerima detail match, berguna untuk transformasi yang lebih kompleks.

## Materi: regex dasar untuk string

Regular expression (regex) adalah pola teks yang dipakai untuk mencocokkan, mencari, atau mengekstrak bagian-bagian dari string. Di JavaScript, regex adalah objek `RegExp` yang biasa dipakai bersama method string seperti `match`, `matchAll`, `replace`, `replaceAll`, `search`, dan `split`.

Regex punya _flags_ seperti `g` (global), `i` (case-insensitive), dan `m` (multiline) yang mengubah cara pencarian dilakukan. Untuk sesi ini cukup gunakan pola sederhana seperti `/\d+/g` (angka berurutan) atau `/[a-z]+/i` (huruf alfabet, tidak peduli besar-kecil) agar fokus ke cara pakainya dulu, bukan sintaks regex yang rumit.

## Praktik: split dan replace sederhana

```js
const csv = 'id,name,age\n1,Budi,25\n2,Siti,30';

// split per baris
const lines = csv.split('\n');
console.log(lines);

// split kolom baris kedua
const secondRow = lines[1].split(',');
console.log(secondRow); // ["1", "Budi", "25"]
```

Contoh di atas menunjukkan `split` dipakai bertingkat: pertama per baris, lalu per kolom, sangat berguna untuk parsing data teks ringan.

```js
const text = 'JavaScript itu sulit? Belum tentu, JavaScript bisa dipelajari.';

// ganti satu kali (kemunculan pertama)
const once = text.replace('JavaScript', 'JS');

// ganti semua kemunculan
const all = text.replaceAll('JavaScript', 'JS');

console.log(once);
console.log(all);
```

`replace` cocok untuk kasus “ganti pertama saja” atau kombinasi dengan regex, sedangkan `replaceAll` lebih natural ketika ingin mengganti semua kemunculan string tanpa memikirkan regex.

## Praktik: match, matchAll, dan search

```js
const log = 'ID: 42, User: budi, Score: 99';

// match semua angka dengan regex global
const numbers = log.match(/\d+/g);
console.log(numbers); // ["42", "99"]

// cari posisi pertama kata "User"
const pos = log.search(/User/);
console.log(pos); // indeks awal "User"
```

`match` dengan regex ber-flag `g` mengembalikan array semua kecocokan, atau `null` jika tidak ada; `search` hanya mengembalikan indeks match pertama atau `-1` jika gagal.

```js
const text = 'Tag: js, Tag: web, Tag: backend';
const regex = /Tag: (\w+)/g;

// matchAll: iterator berisi semua match + grup tangkap
for (const m of text.matchAll(regex)) {
  console.log(m[1]); // nama tag di grup pertama
}
```

`matchAll` mengembalikan iterator berisi objek match yang lengkap (termasuk grup tangkap), sangat berguna ketika ingin membaca banyak kecocokan dengan informasi posisi dan grup yang rapi.

Kalau pola `split` + `replace` + `match` ini sudah mulai kebayang, Sesi 5 nanti kita tutup dengan **Unicode & utilitas string mini project** (slug, masker teks, dsb.) yang menggabungkan hampir semua method yang sudah dipelajari.
