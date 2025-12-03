---
title: Method dan Parameter di Constructor
---

## Materi: Pengetahuan & Konsep

**Method** adalah function yang disimpan di object untuk mendefinisikan _behavior_-nya (seperti fungsi "berbicara" atau "berlari" pada person).

Di constructor, method ditambah via `this.methodName = function() {}` sehingga semua instance otomatis punya behavior sama. Method bisa access property via `this`, memungkinkan interaksi data-behavior yang proper di aplikasi modern seperti event handlers di React component.

**Parameter constructor** memungkinkan pass data langsung saat instantiate object via `new`, mengubah constructor dari fixed-value blueprint, menjadi **factory fleksibel** yang customize setiap instance tanpa duplikasi.

Itu merupakan pattern essential untuk data-driven applications di web modern.

Constructor parameter + `this.property = parameter` assignment merupakan fondasi state initialization di framework seperti Vue, atau state manager Redux/Vuex.

Parameter jumlah disesuaikan kebutuhan. Function di JS itu flexible, bebas menerima banyak parameter atau destructure object untuk clarity sesuai ES6 best practice, dan improving scalability codebase.

## Praktik

Sekarang, hapus kode sebelumnya, buat kode baru seperti di bawah ini, lalu jalankan di console:

```javascript wrap
// Constructor dengan method dan parameter
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  // Method dengan akses ke this
  this.sayHello = function (nama) {
    console.log(`Halo ${nama}, nama saya ${this.firstName}`);
  };
}

const erika = new Person('Erika', 'Karlina');
const budi = new Person('Budi', 'Nugraha');

erika.sayHello('Sulis'); // Output: Halo Sulis, nama saya Eko
budi.sayHello('Tio'); // Output: Halo Tio, nama saya Budi

console.log(erika); // Person { firstName: 'Erika', lastName: 'Karlina', sayHello: [Function] }
console.log(budi); // Person { firstName: 'Budi', lastName: 'Nugraha', sayHello: [Function] }
```

Perhatikan `this.firstName` di dalam method, otomatis merujuk ke firstName object yang call method – ini `this` binding!

Parameter constructor membuat setiap instance unique dengan minimal code! Sesi depan: Constructor Inheritance via `.call()`.
