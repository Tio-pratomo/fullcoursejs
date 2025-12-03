---
title: Penutup
---

Sesi terakhir ini menutup materi OOP JavaScript dengan **Error Handling lanjutan, custom class Error, dan konsep Iterable/Iterator untuk for...of**.

## Materi: Pengetahuan & Konsep

Error di JavaScript direpresentasikan oleh class bawaan `Error` dan turunannya seperti `SyntaxError`, `TypeError`, dll; error baru terjadi saat instance tersebut di-_throw_ menggunakan keyword `throw`.

Blok `try { ... } catch (error) { ... } finally { ... }` memungkinkan menangkap error tanpa menghentikan seluruh program, dan `finally` selalu dijalankan baik terjadi error maupun tidak.

Untuk kasus domain tertentu, sebaiknya membuat **custom error class** yang extend `Error`, misalnya `ValidationError`, lalu mengecek dengan `instanceof` di blok `catch`.

Ini memudahkan pemisahan logika penanganan error, misalnya bedakan antara error validasi dan error sistem umum.

**Iterable** adalah objek yang mendefinisikan method khusus `[Symbol.iterator]()` dan mengembalikan **iterator** dengan method `next()`, di mana setiap pemanggilan mengembalikan `{ value, done }`.

Semua struktur data modern seperti `Array`, `String`, `Map`, `Set` mengikuti kontrak ini sehingga bisa di-_loop_ pakai `for...of`.

## Praktik

### 1. Error handling dengan try/catch/finally

```javascript
class MathUtil {
  static sum(...numbers) {
    if (numbers.length === 0) {
      throw new Error('Harap isikan argument pada method sum');
    }

    let total = 0;
    for (const n of numbers) {
      total += n;
    }
    return total;
  }
}

try {
  console.log(MathUtil.sum()); // akan throw Error
  console.log('kode ini tidak jalan');
} catch (error) {
  console.error('Terjadi error:', error.message);
} finally {
  console.log('Program selesai (finally selalu jalan)');
}

const result = MathUtil.sum(1, 1, 1, 1);
console.log('Hasil penjumlahannya adalah', result);
```

Pola di atas sama dengan yang ada di materi: saat error terjadi di block `try`, eksekusi lompat ke `catch`, tapi kode setelah blok tersebut tetap berjalan.

### 2. Custom Error class

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

class MathUtil2 {
  static sum(...numbers) {
    if (numbers.length === 0) {
      throw new ValidationError('Harap isikan argument pada method sum', 'numbers');
    }

    return numbers.reduce((t, n) => t + n, 0);
  }
}

try {
  console.log(MathUtil2.sum());
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Terjadi error pada field ${error.field} dengan pesan: ${error.message}`);
  } else {
    console.log('Error lain:', error.message);
  }
}
```

Contoh ini mengikuti pola di PDF, di mana custom `ValidationError` memberi konteks field mana yang bermasalah saat validasi.

### 3. Iterable & Iterator custom (Counter)

```javascript
class Counter {
  constructor(start, max) {
    this.start = start;
    this.max = max;
  }

  [Symbol.iterator]() {
    let value = this.start;
    const max = this.max;

    return {
      next() {
        if (value > max) {
          return { value: undefined, done: true };
        }
        return { value: value++, done: false };
      },
    };
  }
}

const counter = new Counter(1, 5);

for (const n of counter) {
  console.log(n); // 1, 2, 3, 4, 5
}
```

Struktur ini sejalan dengan contoh _Counter Iterable_ di materi, di mana setiap iterasi membuat objek iterator baru yang aman digunakan berulang kali dengan `for...of`.

Dengan ini, kamu sudah menyentuh seluruh konsep besar OOP JavaScript modern dari constructor function, prototype, class, hingga error dan iterable.
