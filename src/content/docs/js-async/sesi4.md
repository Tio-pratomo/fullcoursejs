---
title: Promise Lanjutan
---

Di Sesi 4 ini, fokus kita: **Promise lanjutan** – chaining `.then()`, menghindari “Promise hell”, dan memakai `Promise.all`.

## Materi: Promise Chaining

Alih-alih menulis callback bersarang, Promise memungkinkan kita **merangkai beberapa operasi async** dengan `.then()` berurutan. Setiap `.then()` bisa me-return Promise baru, sehingga alur menjadi linear ke bawah, bukan piramida ke kanan.

Contoh tiga Promise berantai:

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => resolve('Promise 1 done'), 1000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => resolve('Promise 2 done'), 1000);
});

const p3 = new Promise((_, reject) => {
  setTimeout(() => reject('Promise 3 failed'), 1000);
});

p1.then((value1) => {
  console.log(value1);
  return p2; // lanjut ke promise kedua
})
  .then((value2) => {
    console.log(value2);
    return p3; // lanjut ke promise ketiga
  })
  .then((value3) => {
    console.log(value3); // tidak akan terpanggil kalau p3 gagal
  })
  .catch((error) => {
    console.log('Error chain:', error); // menangkap error dari chain manapun
  });
```

Pattern ini jauh lebih mudah dibaca dibanding callback yang saling menelpon satu sama lain.

## Materi: Hindari “Promise Hell” (Nesting Promise)

Kesalahan umum pemula adalah **menulis Promise di dalam `.then()` secara bersarang**, misalnya:

```js
p1.then((v1) => {
  console.log(v1);
  p2.then((v2) => {
    console.log(v2);
    p3.then((v3) => {
      console.log(v3);
    }).catch((e3) => console.log(e3));
  }).catch((e2) => console.log(e2));
}).catch((e1) => console.log(e1));
```

Secara teknis jalan, tapi struktur seperti ini mirip callback hell: susah dibaca dan terlalu banyak `.catch()` yang tersebar. Jauh lebih baik, jika menulisnya sebagai **chain linear**:

```
p1
  .then(...)
  .then(...)
  .then(...)
  .catch(...)
```

## Materi: `Promise.all` untuk Beberapa Promise Sekaligus

Cara sebelumnya sebetulnya terlalu verbose. Ada cara yang lebih baik yakni `Promise.all`

`Promise.all([...])` menerima array Promise dan mengembalikan satu Promise yang:

- `fulfilled` ketika **semua** Promise di array berhasil, dengan hasil berupa array nilai masing-masing.
- `rejected` **jika satu saja** Promise gagal; error pertama itu yang dikirim ke `.catch()`.

**Contoh: dua Promise dengan `setTimeout`, digabung dengan `Promise.all`.**

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => resolve('P1 resolved'), 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('P2 resolved'), 1500);
  // coba ganti resolve() jadi reject("P2 rejected") untuk lihat efek error
});

Promise.all([p1, p2])
  .then((data) => {
    console.log(data[0]); // hasil p1
    console.log(data[1]); // hasil p2
  })
  .catch((error) => {
    console.log('At least one failed:', error);
  });
```

Ini sangat berguna ketika kamu ingin menjalankan beberapa request API secara paralel, tapi hanya mau lanjut kalau semuanya sukses.

## Praktik: Latihan Chaining & `Promise.all`

1. **Latihan chaining rapi**

   Buat tiga fungsi yang me-return Promise:

   ```js
   const step1 = () =>
     new Promise((resolve) => {
       setTimeout(() => resolve('Step 1'), 500);
     });

   const step2 = () =>
     new Promise((resolve) => {
       setTimeout(() => resolve('Step 2'), 700);
     });

   const step3 = () =>
     new Promise((resolve, reject) => {
       setTimeout(() => reject('Step 3 failed'), 400);
     });

   step1()
     .then((v1) => {
       console.log(v1);
       return step2();
     })
     .then((v2) => {
       console.log(v2);
       return step3();
     })
     .then((v3) => {
       console.log(v3);
     })
     .catch((err) => {
       console.log('Chain error:', err);
     });
   ```

   Perhatikan bagaimana satu `.catch()` bisa menangkap error dari semua step.

2. **Latihan `Promise.all`**

   Buat tiga Promise yang selesai di waktu berbeda, lalu:

   ```js
   Promise.all([pA, pB, pC])
     .then((results) => {
       console.log('All done:', results);
     })
     .catch((err) => {
       console.log('At least one failed:', err);
     });
   ```

   Ubah salah satu Promise agar `reject`, dan amati bahwa `.then()` tidak terpanggil dan `.catch()` langsung jalan.

Kalau konsep ini sudah nyaman, di **Sesi 5** kita akan masuk ke **async/await**, yaitu cara menulis kode Promise dengan sintaks yang terlihat lebih “synchronous” dan lebih enak dibaca.
