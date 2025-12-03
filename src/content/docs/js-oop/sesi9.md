---
title: getter dan setter class JavaScript
---

Sesi ini kita fokus ke **getter dan setter di class JavaScript (ES6)**, cara clean untuk mengontrol akses property dengan sintaks seperti property biasa.

## Materi: Konsep Getter & Setter di Class

**Getter** dan **setter** di class adalah cara mendefinisikan _akses baca/tulis_ ke suatu nilai, tapi di belakang layar dieksekusi sebagai function, bukan field biasa.

Di JavaScript class, deklarasi `get` dan `set` akan dibuat di **prototype**, bukan di instance object, jadi semua instance berbagi implementasi yang sama secara efisien.

Getter biasanya dipakai untuk menghitung nilai turunan (_computed property_) atau menyembunyikan field internal, sedangkan setter cocok untuk validasi atau normalisasi data sebelum disimpan ke field sebenarnya. Aksesnya tetap pakai sintaks property (tanpa `()`), sehingga API class terasa lebih natural saat digunakan di aplikasi.

## Praktik

Contoh class dengan getter & setter untuk mengatur dan membaca `fullName` serta validasi umur:

```javascript
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this._age = age; // gunakan _ sebagai konvensi field "internal"
  }

  // Getter: computed property dari firstName dan lastName
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Setter: dipanggil saat assign property
  set fullName(value) {
    const [first, ...rest] = value.split(' ');
    this.firstName = first;
    this.lastName = rest.join(' ');
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (value < 0) {
      throw new Error('Age must be non-negative');
    }
    this._age = value;
  }
}

const maki = new Person('Maki', 'Ungu', 30);

console.log(maki.fullName); // pakai getter -> "Maki Ungu"
maki.fullName = 'Budi Nugraha'; // pakai setter

console.log(maki.firstName); // "Budi"
console.log(maki.lastName); // "Nugraha"

maki.age = 33; // OK
// maki.age = -5; // akan throw Error
```

Jika dilihat di DevTools, getter/setter (`fullName`, `age`) akan muncul di `[[Prototype]]` (prototype class `Person`), bukan sebagai field biasa di instance. Ini membuat API rapi, mudah dipakai, dan tetap efisien secara memory.
