---
title: Export Default
---

## Konsep Export Default

`export default` digunakan untuk mengekspor satu data utama dari modul, membuatnya sebagai ekspor "andalan" atau "bawaan" dari modul tersebut.

## Perbandingan Export vs Export Default

| **Named Export**             | **Export Default**                  |
| ---------------------------- | ----------------------------------- |
| Bisa mengekspor banyak nilai | Hanya satu nilai default per modul  |
| Import dengan `{ }`          | Import tanpa `{ }`                  |
| Harus menggunakan nama exact | Bisa memberi nama bebas saat import |

## Cara Menggunakan Export Default

### 1. Export Default Fungsi

```javascript
// Cara 1: Langsung
export default (name) => `Hello ${name}, ini adalah export default`;

// Cara 2: Setelah deklarasi
function sayHello(name) {
    return `Hello ${name}, ini adalah export default`;
}
export default sayHello;
```

### 2. Export Default Variabel

```javascript
export default "Eko";
```

### 3. Export Default Kelas

```javascript
export default class Person {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.info(`Hi, my name is ${this.name}`);
  }
}
```

## Cara Mengimport Default

### Import Default Fungsi

```javascript
import defaultFunction from "./app.js";
console.log(defaultFunction("sulis"));
```

### Import Default Variabel

```javascript
import aliasName from "./scripts/default-variable.js";
console.info(aliasName);
```

### Import Default Kelas

```javascript
import Person from "./scripts/default-class.js";
const person = new Person("Eko");
person.sayHi();
```

## Menggabungkan Default dan Named Export

### Dalam Satu Modul

```javascript
// named exports
export const title = "Belajar JavaScript Module";
const content = "Content Belajar JavaScript Module";
export { content };

// default export (hanya satu)
export default author;
```

### Import Gabungan

```javascript
import authorName, { title, content } from "./scripts/default-and-named.js";

console.info(title);
console.info(content);
console.info(authorName);
```

**Urutan Import:** Default export dulu, kemudian named export dalam `{ }`

## Best Practices dan Rekomendasi

### ✅ **Rekomendasi:**

- Gunakan **named export** jika memungkinkan
- Pisahkan default dan named export untuk kejelasan
- Beri nama yang jelas untuk default export

### ❌ **Hindari:**

- Export default tanpa nama (anonim)

```javascript
// Tidak disarankan
export default () => {}; // Sulit di-debug
```

- Menggabungkan default dan named export jika tidak diperlukan
- Lebih dari satu default export per modul

### ⚠️ **Tips Debugging:**

Fungsi anonim dengan export default sulit dilacak di tools debugging. Selalu beri nama jika memungkinkan.

## Keuntungan Export Default

- Kompatibel dengan CommonJS dan AMD
- Sintaks lebih sederhana untuk import
- Cocok untuk komponen utama/modul utama

---

**Kesimpulan:**

- Gunakan `export default` untuk nilai utama modul
- Named export untuk nilai-nilai pendukung
- Prioritaskan named export untuk konsistensi
- Hindari fungsi anonim untuk memudahkan debugging
