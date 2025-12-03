---
title: Async/Await + Error Handling
---

Di Sesi 5 ini kita fokus ke **async/await** sebagai cara modern untuk menulis kode Promise yang kelihatan lebih “synchronous”, plus penanganan error dengan `try...catch`.

## Materi: Konsep Async & Await

`async` dipakai **di depan deklarasi fungsi** untuk menandakan bahwa fungsi tersebut **selalu mengembalikan Promise**, meskipun di dalamnya tampak seperti kode biasa. Di dalam fungsi `async`, kamu bisa memakai keyword `await` untuk “menunggu” sebuah Promise selesai sebelum melanjutkan baris berikutnya.

`await` hanya boleh dipakai **di dalam** fungsi yang dideklarasikan `async`; jika tidak, JavaScript akan melempar error bahwa `await` hanya valid di dalam async function.

Tujuan utama async/await adalah membuat alur asynchronous terlihat seperti synchronous, sehingga lebih mudah dibaca dan di-_debug_.

**Contoh bentuk umum:**

```js
const getData = async () => {
  const result = await somePromise(); // menunggu sampai resolve/reject
  console.log(result);
};
```

**Atau**

```js
async function getData {
  const result = await somePromise(); // menunggu sampai resolve/reject
  console.log(result);
};
```

## Materi: Mengubah Promise ke Async/Await

Lihat contoh kode di bawah ini!

Setiap langkah (preheat oven, tambah gula, tambah tepung, bake) adalah fungsi yang mengembalikan Promise yang resolve setelah `setTimeout` dengan pesan tertentu.

**Contoh :**

```js
// 1. Panaskan oven
const preheatOven = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const preheatOvenIsReady = true;

      if (preheatOvenIsReady) {
        resolve('Preheat oven to 180°');
      } else {
        reject('Failed task: preheat oven');
      }
    }, 1000); // 1 detik
  });
};

// 2. Tambah gula & choco chips
const addSugarAndChocoChips = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stepOk = true;

      if (stepOk) {
        resolve('Place butter and chocolate chips, stir until melted and smooth');
      } else {
        reject('Failed task: add sugar and choco chips');
      }
    }, 800);
  });
};

// 3. Tambah tepung, cocoa, dan garam
const addFlourCocoaSalt = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stepOk = true;

      if (stepOk) {
        resolve('Add flour, cocoa, and salt, stir until smooth');
      } else {
        reject('Failed task: add flour, cocoa, and salt');
      }
    }, 700);
  });
};

// 4. Panggang adonan
const bakeMixture = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bakeOk = true;

      if (bakeOk) {
        resolve('Bake for 24 minutes for a really gooey center');
      } else {
        reject('Failed task: bake mixture');
      }
    }, 1200);
  });
};
```

## Materi: Async/Await dengan Beberapa Langkah

Sekarang, kita lanjutkan. Disini kita buat fungsi `bakeChocolateBrownies` ditandai sebagai `async`, lalu di dalamnya dipanggil empat fungsi Promise memakai `await` (`task1`, `task2`, `task3`, `task4`) dan setiap hasilnya di-log ke console secara berurutan.

Meskipun di balik layar tetap Promise dan event loop, secara visual kode terlihat seperti urutan synchronous: langkah 1 selesai → langkah 2 → langkah 3 → langkah 4.

Ilustrasi serupa:

```js
const bakeChocolateBrownies = async () => {
  try {
    const task1 = await preheatOven();
    console.log(task1);

    const task2 = await addSugarAndChocoChips();
    console.log(task2);

    const task3 = await addFlourCocoaSalt();
    console.log(task3);

    const task4 = await bakeMixture();
    console.log(task4);

    console.log('Enjoy your perfect chocolate brownies!');
  } catch (error) {
    console.error('Error while baking brownies:', error);
  }
};

// Panggil fungsi async-nya
bakeChocolateBrownies();
```

Pemanggilan `bakeChocolateBrownies()` akan menjalankan langkah-langkah tersebut secara berurutan, menunggu tiap Promise selesai sebelum lanjut.

Dengan gaya ini, urutan yang tadinya `promise.then(...).then(...)` menjadi beberapa baris `const task = await ...;` yang jauh lebih jelas alurnya.

## Materi: Error Handling dengan `try...catch`

Untuk menangani error pada async/await, gunakanlah blok `try...catch` yang membungkus seluruh rangkaian `await`. Jika salah satu Promise melempar `reject`, eksekusi akan lompat ke `catch`, sehingga kamu bisa menangani error di satu tempat terpusat.

Kita contohkan, salah satu langkah (misalnya `addSugarAndChocoChips`) dipaksa gagal (nilai kondisi dibuat `false`) sehingga Promise melakukan `reject("Failed task 2")`, lalu error ini tertangkap di `catch` dan di-log.

```js {4}
// 2. Tambah gula & choco chips
const addSugarAndChocoChips = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stepOk = false; // ubah ke false untuk simulasi error

      if (stepOk) {
        resolve('Place butter and chocolate chips, stir until melted and smooth');
      } else {
        reject('Failed task: add sugar and choco chips');
      }
    }, 800);
  });
};
```

Pendekatan ini mirip `try...catch` di kode synchronous, tetapi bekerja di atas Promise dan async/await.

## Praktik: Latihan Async/Await + Error

Untuk menguatkan, lakukan dua latihan ini:

1. **Refactor chain Promise ke async/await**

   Ambil contoh pada materi di atas, namun skenarionya adalah membuat kopi instan dan ubah menjadi:

   ```js
   /**
    * variabel step1 sampai step3 kalian isi sendiri
    */
   const step1 = () => /* Promise */;
   const step2 = () => /* Promise , salah satunya bisa reject */;
   const step3 = () => /* Promise */;

   const runSteps = async () => {
     try {
       const s1 = await step1();
       console.log(s1);

       const s2 = await step2();
       console.log(s2);

       const s3 = await step3();
       console.log(s3);

       console.log("All steps done");
     } catch (err) {
       console.log("Error in steps:", err);
     }
   };

   runSteps();
   ```

2. **Latihan kecil: wrapper Promise + async function**

   Buat fungsi `delay(ms)` yang mengembalikan Promise, lalu gunakan di async function:

   ```js
   const delay = (ms) =>
     new Promise((resolve) => {
       setTimeout(() => resolve(`Waited ${ms}ms`), ms);
     });

   const testDelay = async () => {
     try {
       const m1 = await delay(1000);
       console.log(m1);

       const m2 = await delay(500);
       console.log(m2);
     } catch (e) {
       console.log('Should not fail:', e);
     }
   };

   testDelay();
   ```

Jika pola ini sudah terasa natural (tulis Promise → konsumsi dengan async/await → bungkus dengan `try...catch`), kamu siap lanjut ke **Sesi 6: Fetch API (GET/POST/PUT/DELETE)** yang juga berbasis Promise dan sangat enak dipadukan dengan async/await.
