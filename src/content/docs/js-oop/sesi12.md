---
title: Private Method
---

Sesi ini membahas **Private Method** di class JavaScript: cara menyembunyikan method agar hanya bisa dipanggil di dalam class itu sendiri.

## Materi: Konsep Private Method

Private method memakai prefix `#` sebelum nama method, misalnya `#sayWithoutName()`. Seperti private field, private method **hanya bisa diakses dari dalam class yang mendeklarasikannya**, tidak bisa dipanggil dari luar, dari instance, bahkan dari subclass.

Fitur ini berasal dari proposal TC39 private methods dan sudah diadopsi di standar modern, sehingga bisa dipakai di environment JavaScript terbaru tanpa transpiler berat. Polanya mirip OOP di Java/C#: logic internal yang tidak boleh diakses konsumen class, tapi tetap reusable di dalam class.

## Praktik

Contoh adaptasi materi: method internal diprivat, dipakai lewat method publik:

```javascript
class Person {
  // Private methods
  #sayWithoutName() {
    console.log('Hello guys, seseorang di sini');
  }

  #sayWithName(name) {
    console.log(`Hello ${name}, saya di sini`);
  }

  // Public method yang menjadi interface
  say(name) {
    if (name) {
      this.#sayWithName(name); // panggil private method
    } else {
      this.#sayWithoutName(); // panggil private method
    }
  }
}

const sulis = new Person();
sulis.say('Sulis'); // Hello Sulis, saya di sini
sulis.say(); // Hello guys, seseorang di sini

// ❌ Ini akan error SyntaxError (tidak boleh akses private method dari luar):
// sulis.#sayWithoutName();
```

Di DevTools, method dengan `#` tidak terlihat sebagai method publik, dan setiap percobaan akses `instance.#method()` di luar class akan menghasilkan `SyntaxError: Private field '#sayWithoutName' must be declared in an enclosing class`. Ini memberi enkapsulasi kuat untuk logic internal, sangat berguna untuk menjaga API class tetap bersih dan stabil.
