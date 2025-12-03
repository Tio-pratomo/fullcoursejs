---
title: JavaScript Data Utilities (Snippets)
---

Sebagai sesi bonus, ini adalah koleksi "Jurus Rahasia" (Code Snippets). Dalam pengembangan sehari-hari, Anda akan sering menemui masalah berulang seperti "hapus duplikat array" atau "cek properti object". Daripada menulis logika dari nol, gunakan pattern yang sudah teruji ini.

---

## 1. Array Utilities

Manipulasi array adalah roti hariannya developer JavaScript.

### A. Hapus Duplikat (Unique Array)

Cara paling modern dan cepat menggunakan `Set` (kumpulan data unik).

```javascript
const angka = [1, 2, 2, 3, 4, 4, 5];
const unik = [...new Set(angka)];

console.log(unik); // [1, 2, 3, 4, 5]
```

### B. Kosongkan Array

Ada beberapa cara, tapi mengubah `length` adalah yang paling efisien karena tidak memutus referensi memori.

```javascript
const data = ['a', 'b', 'c'];
data.length = 0; // Array langsung kosong
console.log(data); // []
```

### C. Cek Tipe Array

Jangan pakai `typeof` karena array dianggap `object`. Gunakan `Array.isArray()`.

```javascript
const list = [];
console.log(typeof list); // "object" (Salah kaprah!)
console.log(Array.isArray(list)); // true (Benar)
```

---

## 2. Object Utilities

Object adalah struktur data utama JSON.

### A. Cek Eksistensi Properti

Cara aman mengecek apakah key tertentu ada, bahkan jika nilainya `null` atau `undefined`.

```javascript
const user = { name: 'Budi', age: null };

// Cara Standard
if ('age' in user) {
  console.log('User punya properti umur');
}

// Cara Modern (Optional Chaining) - Hanya cek value
if (user?.address?.city) {
  console.log('Kota ditemukan');
}
```

### B. Merge Object (Gabung Data)

Menggabungkan setting default dengan setting user.

```javascript
const defaultSettings = { theme: 'light', notifications: true };
const userSettings = { theme: 'dark' };

// Spread Operator (...) - userSettings menimpa defaultSettings
const finalConfig = { ...defaultSettings, ...userSettings };

console.log(finalConfig); // { theme: 'dark', notifications: true }
```

---

## 3. String Utilities

Manipulasi teks untuk tampilan UI.

### A. Replace All

Mengganti semua kemunculan kata. Dulu harus pakai RegEx `/g`, sekarang ada `replaceAll()`.

```javascript
const text = 'Ayam goreng, sate ayam, bubur ayam';

// Cara Lama (RegEx)
console.log(text.replace(/ayam/gi, 'Bebek'));

// Cara Baru (ES2021)
console.log(text.replaceAll('ayam', 'Bebek'));
```

### B. Format Currency (Uang)

Jangan format manual pakai koma/titik. Gunakan `Intl.NumberFormat` bawaan browser.

```javascript
const harga = 1500000;
const formatRupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
}).format(harga);

console.log(formatRupiah); // "Rp 1.500.000,00"
```

---

## Praktik Sesi 11

Kita buat **Utility Library** sederhana di console browser Anda.

Copy kode ini dan jalankan:

```javascript
const Utils = {
  // Generate ID Unik
  uuid: () => Math.random().toString(36).substr(2, 9),

  // Format Tanggal Indonesia
  formatDate: (date) =>
    new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
    }).format(date),

  // Acak Array (Shuffle)
  shuffle: (arr) => arr.sort(() => Math.random() - 0.5),
};

// Test Drive
console.log('ID Baru:', Utils.uuid());
console.log('Hari Ini:', Utils.formatDate(new Date()));

const murid = ['Ani', 'Budi', 'Citra', 'Doni'];
console.log('Urutan Presentasi Acak:', Utils.shuffle([...murid]));
```

Snippet-snippet ini akan sangat berguna saat Anda masuk ke **Sesi 12** (Sesi Terakhir), di mana kita akan menggabungkan SEMUA ilmu (DOM, Event, Logic) menjadi **Aplikasi Nyata**.
