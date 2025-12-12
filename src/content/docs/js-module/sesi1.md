---
title: Pengenalan JavaScript Modules
---

## Definisi

**JavaScript Modules** adalah fitur yang memungkinkan pemecahan kode JavaScript menjadi file-file kecil terpisah yang dapat digunakan berulang kali, sehingga mengurangi kompleksitas dan ukuran file.

## Alasan Penggunaan Modules

- Kode JavaScript semakin kompleks dan besar seiring populernya framework FrontEnd
- Menjaga kode tetap terstruktur dan mudah diatur
- Mencegah kode saling memengaruhi

## Cara Kerja Modules

### Dua Kata Kunci Utama:

1. **`export`** - Mengekspos kode ke modul lain
2. **`import`** - Mengambil kode dari modul lain

## Implementasi

### Tipe Script Module

```html
<script type="module" src="file.js"></script>
```

## Perbandingan Contoh

### Tanpa Module (Cara Lama)

**library.js**

```javascript
function greeting(name) {
  console.info(`Hello ${name}`);
}

function sayGoodBye(name) {
  console.info(`Good Bye ${name}`);
}
```

**index.html**

```html
<script src="library.js"></script>
<script>
  greeting("Jokowo"); // Berhasil
  sayGoodBye("Yance"); // Berhasil
</script>
```

**Kelebihan:** Semua fungsi langsung dapat diakses  
**Masalah:** Semua fungsi terekspos secara otomatis

### Dengan Module (Cara Baru)

**say.js** (sama dengan library.js)

```javascript
function greeting(name) {
  console.info(`Hello ${name}`);
}

function sayGoodBye(name) {
  console.info(`Good Bye ${name}`);
}
```

**with-module.html**

```html
<script type="module" src="say.js"></script>
<script type="module">
  greeting("Jokowo"); // Error!
  sayGoodBye("Yance"); // Error!
</script>
```

> **Hasil:** `Uncaught ReferenceError: sayHello is not defined`

## Kesimpulan

- Dengan module, kode tidak otomatis terekspos ke luar
- Perlu menggunakan `export` dan `import` secara eksplisit
- Module memberikan encapsulation yang lebih baik
