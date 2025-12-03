---
title: Promise Dasar & State
---

Di Sesi 3 ini kita masuk ke **Promise dasar**: konsep, state, cara membuat, dan cara konsumsi dengan `.then()` / `.catch()`.

## Materi: Konsep & State Promise

Promise di JavaScript adalah **objek yang merepresentasikan nilai di masa depan** dari sebuah operasi asynchronous, misalnya hasil request ke server. Promise **menjanjikan bahwa nanti akan ada hasil**: bisa sukses (data) atau gagal (error).

Satu Promise punya **tiga state utama**:

- `pending`: operasi masih berjalan, hasil belum tersedia.
- `fulfilled` (resolved): operasi sukses, hasil sudah tersedia.
- `rejected`: operasi gagal, terjadi error yang perlu ditangani.

## Materi: Membuat Promise dengan `new Promise`

Secara sintaks, Promise dibuat dengan konstruktor

```js
new Promise((resolve, reject) => { ... })
```

Fungsi yang diberikan ke konstruktor ini dipanggil langsung, dan di dalamnya kamu memutuskan kapan memanggil `resolve(...)` atau `reject(...)`.

**Contoh dasar:**

```js
const myPromise = new Promise((resolve, reject) => {
  const allGood = true; // bisa boolean, number, dsb.

  if (allGood) {
    resolve('Semua berjalan lancar');
  } else {
    reject('Oops, ada error');
  }
});

console.log(myPromise);
```

Saat Promise dibuat, state awalnya `pending`, lalu berubah ke `fulfilled` jika `resolve` dipanggil, atau `rejected` jika `reject` dipanggil.

Contoh lain dengan simulasi async pakai `setTimeout`:

```js
const randomPromise = new Promise((resolve, reject) => {
  const randomNumber = Math.floor(Math.random() * 10); // 0-9

  setTimeout(() => {
    if (randomNumber < 4) {
      resolve('Well done, you guessed right');
    } else {
      reject('Oops, you guessed wrong');
    }
  }, 2000);
});

console.log(randomPromise);
```

Selama 2 detik sebelum `setTimeout` jalan, Promise berada di state `pending`.

## Materi: Mengkonsumsi Promise dengan `.then()` dan `.catch()`

Promise sendiri tidak terlalu berguna sebelum dikonsumsi, yaitu dengan method `.then()` dan `.catch()`.

- `.then(onFulfilled)` dipanggil ketika Promise _fulfilled_, dan parameter callback-nya adalah nilai yang dikirim lewat `resolve(...)`.

- `.catch(onRejected)` dipanggil ketika Promise _rejected_, dan parameter callback-nya adalah error atau pesan yang dikirim lewat `reject(...)`.

**Contoh konsumsi:**

```js {11-17}
const myPromise = new Promise((resolve, reject) => {
  const allGood = true; // bisa boolean, number, dsb.

  if (allGood) {
    resolve('Semua berjalan lancar');
  } else {
    reject('Oops, ada error');
  }
});

myPromise
  .then((value) => {
    console.log('Fulfilled:', value); // "Semua berjalan lancar"
  })
  .catch((error) => {
    console.log('Rejected:', error); // "Oops, ada error"
  });
```

Pada contoh `randomPromise`, `.then()` akan menerima pesan sukses atau `.catch()` menerima pesan gagal setelah timeout 2 detik. Pendekatan ini jauh lebih bersih dibanding callback bertingkat karena alur penanganan sukses/gagal jelas dipisahkan.

## Praktik: Latihan Promise Dasar & State

Target sesi ini: paham siklus hidup Promise dan bisa tulis Promise + `.then()` / `.catch()` sendiri.

1. **Latihan 1 – Sukses / Gagal manual**

   ```js
   const checkAge = (age) => {
     return new Promise((resolve, reject) => {
       if (age >= 18) {
         resolve('Allowed');
       } else {
         reject('Not allowed');
       }
     });
   };

   checkAge(20)
     .then((msg) => {
       console.log('Success:', msg);
     })
     .catch((err) => {
       console.log('Error:', err);
     });
   ```

   Ubah nilai `age` dan lihat berapa kali `.then()` vs `.catch()` terpanggil.

2. **Latihan 2 – Simulasi async dengan random & timeout**

   ```js
   const simulateRequest = new Promise((resolve, reject) => {
     const random = Math.random(); // 0 - 1

     console.log('Request state: pending...');

     setTimeout(() => {
       if (random < 0.5) {
         resolve(`Success with random=${random}`);
       } else {
         reject(`Failed with random=${random}`);
       }
     }, 1500);
   });

   simulateRequest
     .then((result) => {
       console.log('Fulfilled:', result);
     })
     .catch((error) => {
       console.log('Rejected:', error);
     });
   ```

   Perhatikan: saat pertama kali dibuat, Promise di state `pending`, lalu berubah jadi `fulfilled` atau `rejected` setelah timeout.

Kalau kamu sudah nyaman dengan pola dasar ini, di **Sesi 4** kita akan masuk ke **Promise lanjutan**: chaining beberapa Promise dan `Promise.all`.
