---
title: Private Class Field
---

Sekarang kita membahas **Private Class Field** (`#field`) – fitur modern untuk enkapsulasi yang kuat di JavaScript, membuat field hanya bisa diakses di dalam class.

## Materi: Konsep Private Class Field

Private class field menggunakan prefix `#` sebelum nama field, misalnya `#count`. Field ini bersifat **true private**: tidak bisa diakses, diubah, atau dilihat dari luar class, termasuk dari subclass atau instance object.

Ini berbeda dengan konvensi `_` di JavaScript lama yang hanya "suggestion". Private field dengan `#` benar-benar di-enforce oleh engine, dan akan throw `SyntaxError` jika diakses dari luar.

Fitur private ini lahir dari proposal TC39 (https://github.com/tc39/proposal-class-fields) dan sudah menjadi standar ECMAScript, didukung luas di browser/engine modern (Chrome, Node, dsb.), sehingga aman dipakai untuk production code.

## Praktik

Contoh dari materi: class `Counter` dengan private field `#count`, diakses via getter/setter:

```javascript
class Counter {
  #count = 0; // private field dengan nilai awal

  get increment() {
    this.#count++;
    return this.#count;
  }

  set increment(value) {
    this.#count = value;
  }

  get decrement() {
    this.#count--;
    return this.#count;
  }

  set decrement(value) {
    this.#count -= value;
  }
}

const count = new Counter();
console.log(count.increment); // 1
console.log(count.increment); // 2
console.log(count.increment); // 3
count.decrement = 2; // set decrement
console.log(count.decrement); // 1 (3 - 2)

// ❌ Akses dari luar akan error:
// console.log(count.#count);
// Uncaught SyntaxError: Private field '#count' must be declared in an enclosing class
```

**Coba di console**:

- `count.increment` dan `count.decrement` bekerja via getter/setter.
- Langsung akses `count.#count` akan muncul error syntax keras – bukan `undefined` atau `null`, tapi **SyntaxError**.

Ini fondasi enkapsulasi modern di JavaScript, mirip access modifier `private` di Java/C#. Sesi berikutnya: **Private Method** (`#method()`).
