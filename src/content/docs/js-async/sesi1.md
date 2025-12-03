---
title: Sync vs Async + setTimeout
---

Sesi 1 akan fokus ke pemahaman konsep **synchronous vs asynchronous** dan contoh sederhana memakai `console.log` + `setTimeout`.

## Materi: Dasar Sync vs Async

Dalam pemrograman _synchronous_, JavaScript mengeksekusi kode baris demi baris secara berurutan:

task 1 selesai dulu ⟶ baru task 2 ⟶ lalu task 3 ⟶ dan seterusnya.

Pendekatan ini bisa menyebabkan aplikasi “nge-freeze” kalau ada proses yang lama, misalnya menunggu respons API. Itu disebabkan karena thread tunggal JavaScript ter-block dan tidak bisa mengerjakan hal lain.

Sebaliknya, _asynchronous programming_ memungkinkan aplikasi menjalankan instruksi lain sambil menunggu operasi lambat (seperti request ke server) tanpa mem-block eksekusi utama. Secara konsep, ini mirip multitasking: aplikasi bisa tetap responsif terhadap input user sambil menunggu respons jaringan.

## Materi: Contoh Alur Synchronous

Misalnya kita contohkan, “daftar langkah membuat chocolate brownies”, yang hanya di-_log_ ke console secara berurutan. Ketika semua `console.log` dieksekusi secara langsung tanpa mekanisme **async**, output di console selalu muncul urut dari langkah 1 sampai langkah terakhir.

Ini menggambarkan bahwa pada mode synchronous, JavaScript akan menyelesaikan satu tugas dulu sebelum pindah ke tugas berikutnya, sehingga alurnya mudah ditebak tapi berpotensi membuat UI tidak responsif jika satu langkah memakan waktu lama.

**Contoh sederhana:**

```js
console.log('Task 1: Siapkan bahan');
console.log('Task 2: Panaskan oven');
console.log('Task 3: Panggang kue');
// Output selalu berurutan: Task 1 ⟶ Task 2 ⟶ Task 3
```

## Materi: Contoh Alur Asynchronous dengan `setTimeout`

Untuk mengenalkan **async**, kita memakai `setTimeout` yang mengeksekusi fungsi setelah jeda waktu tertentu (dalam milidetik). Ketika beberapa `console.log` dibungkus `setTimeout` dengan delay berbeda, urutan munculnya pesan di console bisa acak dan tidak lagi mengikuti urutan penulisan kode.

Hal ini terjadi karena setiap callback `setTimeout` dijadwalkan di _event loop_, sehingga JavaScript tidak menunggu satu timeout selesai sebelum melanjutkan baris berikutnya. Inilah contoh paling dasar bagaimana asynchronous membuat eksekusi kode tidak lagi **_strictly sequential_**.

**Contoh:**

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1 (1000ms)');
}, 1000);

setTimeout(() => {
  console.log('Timeout 2 (500ms)');
}, 500);

console.log('End');

// Urutannya: "Start" ⟶ "End" ⟶ "Timeout 2" ⟶ "Timeout 1"
```

## Praktik: Latihan Kode Sesi 1

Di sesi ini, target kamu hanya dua: **melihat perbedaan urutan eksekusi** antara synchronous dan asynchronous, tanpa dulu memikirkan callback/promise.

1. Buat file `sync.js` dan tulis:

   ```js
   console.log('Step 1');
   console.log('Step 2');
   console.log('Step 3');
   ```

   Jalankan dengan Node.js atau di browser console, perhatikan urutannya.

2. Buat file `async-timeout.js`:

   ```js
   console.log('A');

   setTimeout(() => {
     console.log('B (2000ms)');
   }, 2000);

   setTimeout(() => {
     console.log('C (500ms)');
   }, 500);

   console.log('D');
   ```

   Jalankan dan catat urutan output; bandingkan dengan urutan penulisan kode.

Kalau sudah nyaman dengan perbedaan perilaku ini, di **Sesi 2** kita akan mulai masuk ke **callback** dan bagaimana mengontrol urutan eksekusi di dunia async.
