---
title: Callback & Callback Hell
---

Sesi 2 akan fokus ke **callback**:

- apa itu callback,
- cara memakainya untuk mengontrol urutan async, dan
- kenapa bisa berujung ke _callback hell_.

## Materi: Apa itu Callback?

Callback di JavaScript adalah **fungsi yang dikirim sebagai argumen ke fungsi lain**, lalu dipanggil kembali (di-_call back_) ketika suatu proses selesai. Dalam konteks asynchronous, callback dipakai agar suatu tugas berikutnya baru dijalankan setelah tugas async (misalnya `setTimeout`) selesai.

Dengan callback, kamu bisa bilang: “selesaikan task ini dulu, lalu jalankan fungsi ini berikutnya”.

Ini solusi awal untuk menghindari urutan acak yang terjadi saat menggunakan beberapa `setTimeout` dengan delay berbeda.

**Contoh bentuk callback sederhana:**

```js
const greet = (name, callback) => {
  console.log(`Hello, ${name}`);
  callback(); // dipanggil setelah greeting selesai
};

greet('Alice', () => {
  console.log('Greeting selesai.');
});

/**
 * Outputnya :
 * - Hello, Alice
 * - Greeting selesai.
 */
```

## Materi: Mengontrol Urutan dengan Callback + `setTimeout`

Sebelumnya, langkah-langkah sederhana membuat brownies pada sesi 1, hanya di `console.log`. Sekarang, kita diubah menjadi **fungsi-fungsi terpisah** yang masing-masing berisi `setTimeout`.

Setiap fungsi task menerima parameter `callback`, dan memanggil `callback()` di akhir `setTimeout` untuk men-trigger task berikutnya.

**Pola dasarnya:**

```js
const task1 = (callback) => {
  setTimeout(() => {
    console.log('Task 1 selesai');
    callback(); // lanjut ke task berikutnya
  }, 1000);
};

const task2 = (callback) => {
  setTimeout(() => {
    console.log('Task 2 selesai');
    callback();
  }, 1500);
};

const task3 = (callback) => {
  setTimeout(() => {
    console.log('Task 3 selesai');
    callback();
  }, 500);
};

// Menjalankan berurutan:
task1(() => {
  task2(() => {
    task3(() => {
      console.log('Semua task selesai');
    });
  });
});
```

Dengan pola ini, meskipun delay tiap task berbeda, urutan eksekusi tetap 1 → 2 → 3 karena masing-masing baru jalan setelah callback sebelumnya dipanggil.

## Materi: Callback Hell (Piramida Callback)

Masalah muncul ketika jumlah langkah bertambah banyak. **nested callback** akan membentuk struktur seperti piramida ke kanan, sulit dibaca dan sulit di-maintain.

Contoh sederhana: menampilkan pesan "hello world" secara asynchronous dengan beberapa fungsi kecil yang saling memanggil lewat callback.

Strukturnya kira-kira jadi seperti ini:

```js
const showMessage = (message) => {
  console.log(message);
};

const firstMessage = (callback) => {
  setTimeout(() => {
    showMessage('Hello');
    callback();
  }, 2000);
};

const secondMessage = (callback) => {
  setTimeout(() => {
    showMessage('World');
    callback();
  }, 1000);
};

// Bayangkan kalau ada thirdMessage, fourthMessage, dst:
firstMessage(() => {
  secondMessage(() => {
    // thirdMessage(() => {
    //   fourthMessage(() => {
    //     ...
    //   });
    // });
  });
});
```

Kalau kamu terus menambah langkah (third, fourth, dst.) dan setiap langkah punya callback yang memanggil fungsi berikutnya, kode akan cepat menjadi berlapis-lapis dan sulit di-follow.

Inilah yang disebut _callback hell_ dan menjadi salah satu motivasi utama lahirnya **Promise** dan **async/await**.

## Praktik: Latihan Callback & Callback Hell Ringan

Untuk sesi 2, target latihan:

1. **Latihan callback dasar (1 → 2 → 3)**  
   Buat file `callback-basic.js` dan implementasikan:

   ```js
   const step1 = (next) => {
     setTimeout(() => {
       console.log('Step 1');
       next();
     }, 1000);
   };

   const step2 = (next) => {
     setTimeout(() => {
       console.log('Step 2');
       next();
     }, 500);
   };

   const step3 = (next) => {
     setTimeout(() => {
       console.log('Step 3');
       next();
     }, 1500);
   };

   step1(() => {
     step2(() => {
       step3(() => {
         console.log('All done!');
       });
     });
   });
   ```

   Perhatikan bahwa walaupun delay acak, urutan output tetap 1 → 2 → 3 → “All done!”.

2. **Rasakan “mini callback hell”**  
   Tambahkan `step4` dan `step5` dengan pola yang sama, lalu susun:

   ```js
   step1(() => {
     step2(() => {
       step3(() => {
         step4(() => {
           step5(() => {
             console.log('Finished all 5 steps');
           });
         });
       });
     });
   });
   ```

   Lihat sendiri bagaimana struktur mulai memanjang ke kanan dan tidak enak dibaca.

Kalau latihan ini sudah nyaman dan kamu merasa mulai “muak” melihat nested callback, itu bagus.

Selanjutnya, kita akan masuk ke **Promise dasar** sebagai solusi yang lebih bersih untuk masalah ini.
