---
title: Export dan Import Dasar
---

## Konsep Dasar

- Modul JavaScript seperti kotak tertutup yang tidak bisa diakses dari luar secara default
- **`export`** = "membuka dan menunjukkan" kode ke luar
- **`import`** = "mengambil" kode yang sudah diekspor

## Menggunakan Export

### Contoh 1: Mengekspor Fungsi

**File: `say.js`**

```javascript
export function greeting(name) {
  console.info(`Hello ${name}`);
}

export function sayGoodBye(name) {
  console.info(`Good Bye ${name}`);
}
```

### Contoh 2: Mengekspor Variabel

**Tambahkan di `say.js`:**

```javascript
export const name = "Tom Lembong";
```

### Contoh 3: Mengekspor Kelas

**Tambahkan di `say.js`:**

```javascript
export class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello(name) {
    console.info(`Hello ${name}, my name is ${this.name}`);
  }
}
```

## Menggunakan Import

### Sintaks Dasar

```javascript
import { namaFunction, namaVariable, NamaClass } from "lokasi-module.js";
```

### Contoh 1: Mengimpor Fungsi

**File: `index.html`**

```html
<script type="module">
  import { sayHello, sayGoodBye } from "./say.js";

  sayHello("Joko");
  sayGoodBye("Tingkir");
</script>
```

### Contoh 2: Mengimpor Variabel

**File: `index.html`**

```html
<script type="module">
  import { name } from "./say.js";

  console.info(name);
</script>
```

### Contoh 3: Mengimpor Kelas

**File: `index.html`**

```html
<script type="module">
  import { Person } from "./say.js";

  const person = new Person("Roberto");
  person.sayHello("Baggio");
</script>
```

## Poin Penting

1. **Named Import**: Menggunakan `{ }` untuk mengimpor fungsi/variabel/kelas tertentu
2. **Type Module**: Script yang mengimpor harus menggunakan `type="module"`
3. **Automatic Loading**: Tidak perlu tag `<script>` terpisah untuk setiap file modul
4. **Explicit Export**: Harus secara eksplisit mengekspor kode yang ingin dibagikan

## Best Practices

- Ekspor hanya yang diperlukan saja
- Gunakan nama yang deskriptif untuk fungsi/variabel yang diekspor
- Pastikan path file modul benar saat mengimpor
