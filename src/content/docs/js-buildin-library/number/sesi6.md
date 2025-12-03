---
title: Membuat utility angka
---

Sesi terakhir ini, kita pakai semua yang sudah dipelajari (static properties, static methods, instance methods) untuk bikin **mini utilitas angka** yang bisa langsung dipakai di form web: parser, validator, dan formatter harga/angka. Fokusnya tetap vanilla JavaScript modern supaya mudah diintegrasikan nanti ke React atau framework lain.

## Materi: Desain mini utilitas angka

Target kita: satu modul kecil berisi fungsi `parseNumber`, `validateNumber`, dan `formatCurrency`, yang menggunakan `Number.parseFloat`, `Number.isFinite`, `Number.isSafeInteger`, `toFixed`, dan `Intl.NumberFormat`. Pola seperti ini umum dipakai untuk memisahkan logika angka dari UI, sehingga form lebih mudah di-maintain dan dites.

Pendekatan parsing: normalisasi string input dulu (hapus pemisah ribuan, ubah koma ke titik), baru parse dengan `Number.parseFloat`, lalu cek hasilnya dengan `Number.isFinite`. Untuk formatting, gunakan `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })` sehingga format mengikuti aturan lokal (pemisah ribuan, simbol rupiah, jumlah desimal).

## Praktik: Implementasi parser & validator

Buat file `numberUtils.js` dan isi dengan fungsi‑fungsi berikut:

```js
// Normalisasi string angka ala Indonesia ke format JS standar
export function normalizeNumberString(input) {
  if (typeof input !== 'string') return '';
  // Hapus semua spasi
  let s = input.trim();
  // Hapus pemisah ribuan titik, ganti koma jadi titik
  s = s.replace(/\./g, '').replace(',', '.');
  return s;
}

// Parse angka umum (float) dari input
export function parseNumber(input) {
  const normalized = normalizeNumberString(input);
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) ? value : NaN;
}

// Validasi angka dengan aturan dasar
export function validateNumber(input, { min = null, max = null } = {}) {
  const value = parseNumber(input);

  if (!Number.isFinite(value)) {
    return { ok: false, value: NaN, reason: 'Bukan angka yang valid' };
  }

  if (min != null && value < min) {
    return { ok: false, value, reason: `Harus >= ${min}` };
  }

  if (max != null && value > max) {
    return { ok: false, value, reason: `Harus <= ${max}` };
  }

  return { ok: true, value, reason: '' };
}
```

`Number.parseFloat` akan membaca bagian awal string yang membentuk angka desimal dan mengembalikan `NaN` jika tidak ada digit yang bisa dibaca sama sekali, sehingga cocok dipakai setelah string dinormalisasi. `Number.isFinite` memastikan hasilnya benar‑benar angka terbatas (bukan `NaN` atau `Infinity`), yang penting sebelum nilai itu dipakai di logika bisnis.

## Praktik: Implementasi formatter angka & mata uang

Sekarang tambahkan formatter yang memakai `toFixed` dan `Intl.NumberFormat` untuk tampilan UI:

```js
// Pembulatan angka ke n desimal lalu kembalikan number
export function roundTo(value, decimals = 2) {
  if (!Number.isFinite(value)) return NaN;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

// Format angka umum dengan locale Indonesia (tanpa simbol mata uang)
export function formatNumberID(value, decimals = 2) {
  if (!Number.isFinite(value)) return '-';

  const nf = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return nf.format(value);
}

// Format sebagai mata uang Rupiah
export function formatCurrencyIDR(value) {
  if (!Number.isFinite(value)) return '-';

  const nf = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return nf.format(value);
}
```

`Intl.NumberFormat` menyediakan cara standar untuk formatting angka sensitif‑bahasa, termasuk style `'currency'` dengan opsi `currency: 'IDR'` untuk rupiah. Opsi `minimumFractionDigits` dan `maximumFractionDigits` mengontrol jumlah angka desimal yang ditampilkan, sementara rounding internal mengikuti aturan pembulatan IEEE‑754.

## Praktik: Contoh integrasi di form HTML

Sebagai contoh pemakaian cepat, berikut template HTML + JS vanilla yang memanfaatkan utilitas di atas untuk field _harga per item_ dan _jumlah_, lalu menghitung total:

```html
<form id="order-form">
  <label>
    Harga per item:
    <input id="price" type="text" placeholder="contoh: 30.000,50" />
  </label>
  <br />
  <label>
    Jumlah:
    <input id="qty" type="number" min="1" step="1" value="1" />
  </label>
  <br />
  <button type="submit">Hitung Total</button>
</form>

<p id="result"></p>

<script type="module">
  import { parseNumber, validateNumber, formatCurrencyIDR } from './numberUtils.js';

  const form = document.getElementById('order-form');
  const resultEl = document.getElementById('result');
  const priceEl = document.getElementById('price');
  const qtyEl = document.getElementById('qty');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const priceValidation = validateNumber(priceEl.value, { min: 0 });
    const qtyValidation = validateNumber(qtyEl.value, { min: 1 });

    if (!priceValidation.ok) {
      resultEl.textContent = `Harga tidak valid: ${priceValidation.reason}`;
      return;
    }

    if (!qtyValidation.ok || !Number.isSafeInteger(qtyValidation.value)) {
      resultEl.textContent = 'Jumlah harus bilangan bulat positif yang valid';
      return;
    }

    const total = priceValidation.value * qtyValidation.value;
    resultEl.textContent = `Total: ${formatCurrencyIDR(total)}`;
  });
</script>
```

Di sini `validateNumber` dipakai untuk cek range dan memastikan input bisa diparse ke angka finite, sedangkan `Number.isSafeInteger` mencegah jumlah yang keluar dari rentang integer aman. Output total diformat dengan `formatCurrencyIDR` yang di belakang layar menggunakan `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })`, sehingga tampilan rupiah konsisten dengan kebiasaan lokal.

Kalau kamu mau, sesi lanjutan di luar keenam sesi ini bisa fokus ke **refactor utilitas ini ke React custom hook** atau **menambahkan dukungan multi‑currency** dengan opsi dinamis ke `Intl.NumberFormat`.
