---
title: Struktur Data dan Iterasi Modern
---

Sejauh ini kita telah bekerja dengan tipe data primitif seperti `Number` dan `String`. Namun, dalam aplikasi nyata, kita sering kali perlu mengelola **kumpulan data**. Di sinilah struktur data berperan. Sesi ini akan fokus pada dua struktur data paling penting di JavaScript: **Array** dan **Object**.

---

## 1. Tipe Data Array

> **Array** adalah tipe data yang digunakan untuk menyimpan kumpulan data dalam satu variabel. Data di dalam array disusun secara **berurutan**.

Bayangkan Array sebagai sebuah rak buku dengan slot bernomor. Anda bisa menaruh buku (data) di setiap slot.

### 1.1. Membuat dan Mengakses Array

Array dibuat menggunakan kurung siku `[]`. Setiap item di dalamnya dipisahkan oleh koma. Urutan item di dalam array disebut **index**, dan **selalu dimulai dari 0**.

```javascript
// Membuat array
let namaBuah = ["Apel", "Jeruk", "Mangga"];

// Mengakses data menggunakan index
console.log(namaBuah[0]); // Output: "Apel"
console.log(namaBuah[1]); // Output: "Jeruk"
console.log(namaBuah[2]); // Output: "Mangga"
```

### 1.2. Operasi Umum pada Array

JavaScript menyediakan banyak cara untuk memanipulasi array.

- **`array.push(value)`**: Menambah data baru ke **akhir** array.
- **`array.length`**: Melihat jumlah total data di dalam array.
- **`array[index] = value`**: Mengubah data pada index tertentu.
- **`delete array[index]`**: Menghapus data pada index tertentu (namun akan meninggalkan "lubang" atau slot kosong).

```javascript
const names = []; // Membuat array kosong

names.push("Eko");
names.push("Kurniawan", "Khannedy"); // Bisa menambah lebih dari satu

console.table(names); // console.table() menampilkan array dalam bentuk tabel yang rapi

console.log(`Panjang array: ${names.length}`); // Output: Panjang array: 3

// Mengubah data
names[0] = "Budi";
console.table(names); // Index 0 sekarang berisi "Budi"

// Menghapus data
delete names[1];
console.table(names); // Index 1 sekarang kosong (empty)
```

---

## 2. Tipe Data Object

> **Object** adalah tipe data yang mirip dengan array, tetapi tidak menggunakan index angka. Ia menggunakan **`key`** (kunci) untuk mengidentifikasi datanya. Object adalah kumpulan dari pasangan `key: value`.

Bayangkan Object sebagai sebuah biodata, di mana `key` adalah labelnya (seperti "Nama" atau "Umur") dan `value` adalah datanya.

### 2.1. Membuat dan Mengakses Object

Object dibuat menggunakan kurung kurawal `{}`.

```javascript
const orang = {
  nama: "Eko Kurniawan",
  alamat: "Indonesia",
  umur: 30,
};

// Mengakses properti (ada 2 cara)
// 1. Dot Notation (lebih umum digunakan)
console.log(`Nama: ${orang.nama}`); // Output: Nama: Eko Kurniawan

// 2. Bracket Notation
console.log(`Alamat: ${orang["alamat"]}`); // Output: Alamat: Indonesia

// Menambah properti baru
orang.pekerjaan = "Programmer";

// Menghapus properti
delete orang.umur;

console.table(orang);
```

---

## 3. Iterasi Modern: `for...of` vs. `for...in`

Selain loop `for` biasa, JavaScript menyediakan cara yang lebih modern dan mudah dibaca untuk melakukan iterasi pada Array dan Object.

### 3.1. `for...of` (Untuk Array dan Tipe Data Iterable Lainnya)

Perulangan ini digunakan untuk melakukan iterasi pada **nilai (value)** dari sebuah data _iterable_ (seperti Array dan String). Ini adalah cara yang direkomendasikan untuk mengulang setiap item dalam sebuah array.

```javascript
const names = ["Eko", "Kurniawan", "Khannedy"];

for (const name of names) {
  console.log(name);
}
/* Output:
Eko
Kurniawan
Khannedy
*/
```

### 3.2. `for...in` (Untuk Object)

Perulangan ini digunakan untuk melakukan iterasi pada **properti (key)** dari sebuah object.

```javascript
const person = {
  firstName: "Eko",
  lastName: "Khannedy",
};

for (const property in person) {
  console.log(`Property: ${property}, Value: ${person[property]}`);
}
/* Output:
Property: firstName, Value: Eko
Property: lastName, Value: Khannedy
*/
```

> **Peringatan**: Jangan gunakan `for...in` untuk melakukan iterasi pada Array, karena ia tidak dirancang untuk itu dan dapat menyebabkan perilaku yang tidak terduga.

---

## 4. Destructuring: Membongkar Nilai dengan Elegan

> **Destructuring** adalah fitur yang memungkinkan kita untuk "membongkar" nilai-nilai dari array atau properti dari object ke dalam variabel-variabel terpisah. Ini membuat kode jauh lebih ringkas.

### 4.1. Destructuring Array

```javascript
const names = ["Adnan", "Fuadi", "Beyhaqi"];

// Cara lama
// const name1 = names[0];
// const name2 = names[1];

// Cara baru dengan destructuring
const [name1, name2, name3] = names;

console.log(name1); // Output: Adnan
console.log(name2); // Output: Fuadi
```

### 4.2. Destructuring Object

Untuk object, nama variabel harus sama dengan nama `key` di dalam object.

```javascript
const person = {
  firstName: "Eko",
  lastName: "Khannedy",
  address: {
    city: "Jakarta",
  },
};

// Cara lama
// const firstName = person.firstName;
// const lastName = person.lastName;

// Cara baru dengan destructuring
const { firstName, lastName } = person;

console.log(firstName); // Output: Eko
console.log(lastName); // Output: Khannedy
```

---

## Rangkuman Sesi 5

- **Array** digunakan untuk kumpulan data yang **terurut** dan diakses menggunakan **index** angka.
- **Object** digunakan untuk kumpulan data yang tidak terurut dalam format **`key: value`** dan diakses menggunakan `key`.
- Gunakan **`for...of`** untuk iterasi nilai pada Array.
- Gunakan **`for...in`** untuk iterasi properti (key) pada Object.
- **Destructuring** adalah cara modern untuk mengekstrak data dari Array dan Object dengan lebih ringkas.

Anda sekarang dapat mengelola data dalam bentuk kumpulan. Di sesi terakhir, kita akan membahas beberapa konsep fungsi yang lebih dalam untuk menyempurnakan pemahaman JavaScript Anda.
