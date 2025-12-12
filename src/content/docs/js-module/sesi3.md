---
title: Menggunakan Alias dalam JavaScript Modules
---

## Konsep Alias

**Alias** digunakan untuk mengubah nama variabel, fungsi, atau kelas saat melakukan export atau import untuk menghindari bentrokan nama antara modul yang berbeda.

## Alias Saat Export

### Contoh: Export dengan Alias

**File: `app.js`**

```javascript
const company = "Aila";
const sum = (number1, number2) => number1 + number2;
class Company {}

export { company as perusahaan, sum as penjumlahan, Company as Perusahaan };
```

### Import dari Export dengan Alias

**File: `index.html`**

```html
<script type="module">
  import { perusahaan, penjumlahan, Perusahaan } from "./app.js";

  console.log(perusahaan);
  console.log(penjumlahan(3, 7));
  const newPerusahaan = new Perusahaan();
  console.log(newPerusahaan);
</script>
```

?> **Keterangan:** Harus menggunakan **nama alias** saat mengimpor

## Alias Saat Import (Direkomendasikan)

### Contoh: Export Tanpa Alias

**File: `app.js`**

```javascript
const company = "Aila";
const sum = (number1, number2) => number1 + number2;
class Company {}

export { company, sum, Company };
```

### Import dengan Alias

**File: `index.html`**

```html
<script type="module">
  import {
    company as perusahaan,
    sum as penjumlahan,
    Company as Perusahaan,
  } from "./app.js";

  console.log(perusahaan);
  console.log(penjumlahan(3, 7));
  const newPerusahaan = new Perusahaan();
  console.log(newPerusahaan);
</script>
```

## Perbandingan Metode

### Export dengan Alias

- ✅ Modul import lebih sederhana
- ❌ Modul export harus menentukan alias
- ❌ Kurang fleksibel untuk penggunaan berbeda

### Import dengan Alias (Direkomendasikan)

- ✅ Modul export tetap menggunakan nama asli
- ✅ Fleksibel - setiap import bisa punya alias berbeda
- ✅ Lebih mudah dikelola dan dimengerti
- ❌ Kode import sedikit lebih panjang

## Sintaks Alias

```javascript
// Export alias
export { originalName as aliasName };

// Import alias
import { originalName as aliasName } from "./module.js";
```

## Use Case Alias

1. **Menghindari nama duplikat** dari modul berbeda
2. **Translasi nama** ke bahasa lain
3. **Standardisasi naming convention** di project
4. **Membuat nama lebih deskriptif**

## Best Practices

- Gunakan alias saat import daripada export
- Pilih nama alias yang konsisten dan jelas
- Dokumentasikan perubahan nama yang signifikan
- Pertahankan konsistensi di seluruh project
