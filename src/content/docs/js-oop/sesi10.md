---
title: Public Class Field
---

Sesi kali ini membahas **Public Class Field** di JavaScript modern: cara deklarasi property langsung di dalam body class, di luar constructor.

## Materi: Konsep Public Class Field

Sebelum class field, property biasanya dideklarasikan dan diisi di dalam `constructor`, misalnya `this.firstName = firstName`. Fitur **public class field** memungkinkan mendeklarasikan field langsung di body class selevel dengan method, dengan atau tanpa nilai awal, membuat deklarasi state class lebih deklaratif dan bersih.

Secara konsep, field ini tetap menjadi property milik instance, tapi syntax-nya lebih ringkas dan mudah dibaca di codebase besar modern (banyak dipakai di TS class).

Fitur ini lahir dari proposal EcmaScript, namun saat ini sudah didukung luas di browser/engine modern (Chrome, Node, dll.), sehingga aman dipakai untuk project kekinian.

## Praktik

Contoh dari materi (public field tanpa dan dengan constructor):

```javascript
// Versi dengan public class field tanpa constructor
class Person {
  firstName; // default: undefined
  lastName; // default: undefined
  balance = 0; // default value
}

const sulis = new Person();
console.log(sulis);
// Person { firstName: undefined, lastName: undefined, balance: 0 }

// Versi gabungan field + constructor
class User {
  firstName;
  lastName;
  balance = 0;

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const juki = new User('Juki', 'Marlo');
console.log(juki);
// User { firstName: 'Juki', lastName: 'Marlo', balance: 0 }
```

Perhatikan: field `balance` otomatis ada dengan nilai `0` untuk semua instance, tanpa harus di-set manual di constructor, dan deklarasi struktur class jadi sangat eksplisit di bagian atas class.
