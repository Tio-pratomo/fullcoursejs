---
title: Operator instanceof, Static Field, Static Method, dan Error
---

## Materi: Pengetahuan & Konsep

**Operator instanceof** adalah kata kunci untuk mengecek apakah suatu object merupakan instance dari class tertentu atau turunannya.

Ini mengembalikan boolean `true`/`false` dan mendukung inheritance chain, sehingga `manager instanceof Employee` akan true jika `Manager extends Employee`. Ini lebih spesifik dari `typeof` yang hanya mengembalikan "object" untuk semua instance class.

**Static Class Field & Method** adalah property dan function yang melekat ke class itu sendiri, bukan ke instance object. Deklarasi menggunakan keyword `static` sebelum nama field/method.

Aksesnya langsung lewat nama class (`ClassName.field`) tanpa perlu `new`, menjadikannya ideal untuk utility functions, constants, atau factory methods. Di belakang layar, static field tidak ada di `prototype` dan tidak diwarisi ke instance.

**Error Class** adalah superclass bawaan JavaScript untuk semua jenis error (SyntaxError, TypeError, dll.). Membuat instance `new Error('message')` tidak otomatis menghentikan program – harus dilempar dengan `throw` agar menjadi exception yang bisa ditangkap.

## Praktik

Coba lengkap di console:

```javascript
// 1. instanceof & inheritance
class Employee {}
class Manager extends Employee {}

const budi = new Manager();
console.log(budi instanceof Manager); // true
console.log(budi instanceof Employee); // true (inheritance terdeteksi)
console.log(budi instanceof Object); // true (prototype chain)

// 2. Static field & method
class MathUtil {
  static PI = 3.14159;
  static areaCircle(radius) {
    return this.PI * radius * radius;
  }
}

console.log(MathUtil.PI); // 3.14159
console.log(MathUtil.areaCircle(5)); // 78.53975
// ❌ const util = new MathUtil(); util.PI → undefined

// 3. Error & throw
function validateAge(age) {
  if (age < 0) {
    throw new Error('Age cannot be negative');
  }
  return true;
}

try {
  validateAge(-5);
} catch (error) {
  console.log(error.message); // "Age cannot be negative"
}
```

Key: `instanceof` untuk type checking, `static` untuk utility, dan `throw` untuk trigger error.
