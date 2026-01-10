---
title: Konsep Lanjutan dan Praktik Terbaik
---

Selamat datang di sesi terakhir sebelum Clean Code! Di sini kita akan membahas beberapa konsep lanjutan yang membedakan programmer pemula dan mahir. Konsep-konsep ini memungkinkan penulisan kode yang lebih kuat, efisien, dan elegan.

---

## Materi: Pengetahuan & Konsep

### 1. Memahami Scope

> **Scope** menentukan di mana saja sebuah variabel atau fungsi dapat diakses dalam kode.

Ada beberapa jenis scope utama di JavaScript:

#### 1.1. Global Scope

Variabel yang dideklarasikan di luar fungsi mana pun. Variabel ini dapat diakses dari mana saja dalam program.

```javascript
// 'globalVariable' berada di Global Scope
let globalVariable = 'Saya global';

function first() {
  console.log(globalVariable); // Bisa akses variabel global
}

function second() {
  console.log(globalVariable); // Bisa akses dari sini juga
}

first(); // Output: Saya global
second(); // Output: Saya global
```

#### 1.2. Local Scope (Function Scope)

Setiap kali sebuah fungsi dibuat, ia menciptakan local scope baru. Variabel yang dideklarasikan di dalam fungsi ini hanya dapat diakses dari dalam fungsi tersebut (dan fungsi lain di dalamnya).

```javascript
function first() {
  // 'localVariable' berada di Local Scope milik fungsi first
  let localVariable = 'Saya lokal di fungsi first';
  console.log(localVariable); // Bisa akses
}

function second() {
  // console.log(localVariable); // ERROR! Tidak bisa akses local scope fungsi lain
}

first(); // Output: Saya lokal di fungsi first
// console.log(localVariable); // ERROR! Tidak bisa akses dari luar
```

#### 1.3. Block Scope

`let` dan `const` memiliki block scope - terbatas pada `{}` di mana mereka dideklarasikan.

```javascript
if (true) {
  let blockScoped = 'Hanya dalam block ini';
  const alsoBlockScoped = 'Saya juga';
  var notBlockScoped = 'Saya function scoped';

  console.log(blockScoped); // Bisa akses di dalam block
}

// console.log(blockScoped); // ERROR!
// console.log(alsoBlockScoped); // ERROR!
console.log(notBlockScoped); // BISA! var tidak block scoped

// Block scope juga berlaku untuk loop
for (let i = 0; i < 3; i++) {
  let loopVar = `Iterasi ${i}`;
  console.log(loopVar); // Bisa akses di sini
}
// console.log(loopVar); // ERROR!
// console.log(i); // ERROR!
```

#### 1.4. Lexical Scope (Static Scope)

JavaScript menggunakan lexical scoping - fungsi inner dapat mengakses variabel dari fungsi outer.

```javascript
function outer() {
  const outerVar = 'Dari outer';

  function inner() {
    const innerVar = 'Dari inner';
    console.log(outerVar); // Bisa akses outer
    console.log(innerVar); // Bisa akses inner
  }

  inner();
  // console.log(innerVar); // ERROR! Tidak bisa akses inner
}

outer();
```

**Nested Functions dan Scope Chain:**

```javascript
const global = 'Global';

function level1() {
  const var1 = 'Level 1';

  function level2() {
    const var2 = 'Level 2';

    function level3() {
      const var3 = 'Level 3';

      // Level 3 bisa akses semua variabel di atasnya
      console.log(global); // "Global"
      console.log(var1); // "Level 1"
      console.log(var2); // "Level 2"
      console.log(var3); // "Level 3"
    }

    level3();
    // console.log(var3); // ERROR! Tidak bisa akses child scope
  }

  level2();
}

level1();
```

---

### 2. Demistifikasi Closure

Closure adalah salah satu konsep paling kuat namun sering disalahpahami di JavaScript.

> **Closure** adalah kemampuan sebuah fungsi dalam (inner function) untuk "mengingat" dan terus mengakses variabel dari lingkup fungsi luarnya (outer function), bahkan setelah fungsi luar tersebut selesai dieksekusi.

#### 2.1. Konsep Dasar Closure

```javascript
function createAdder(value) {
  const owner = 'Willa';

  // Inner function ini adalah sebuah closure
  function add(param) {
    console.log(owner); // Masih bisa akses 'owner' dari scope luarnya
    return value + param;
  }

  return add;
}

// createAdder(2) selesai dieksekusi, tapi fungsi 'add' di dalamnya "mengingat" nilai 'value' (yaitu 2)
const addTwo = createAdder(2);

console.log(addTwo(10)); // Output: Willa, lalu 12
console.log(addTwo(20)); // Output: Willa, lalu 22
```

**Apa yang Terjadi?**

1. `createAdder(2)` dipanggil, membuat scope dengan `value = 2` dan `owner = 'Willa'`
2. Function `add` dibuat di dalam scope ini
3. `createAdder` return function `add` dan selesai eksekusi
4. Normalnya, scope `createAdder` akan dihapus, tapi `add` masih "mengingat" variable dari scope parent-nya
5. Setiap kali `addTwo` dipanggil, ia masih bisa akses `value` dan `owner`

#### 2.2. Closure untuk Private Variables

```javascript
function createCounter() {
  let count = 0; // Variable "private"

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1

// count tidak bisa diakses langsung!
console.log(counter.count); // undefined
```

#### 2.3. Closure dalam Loop (Common Pitfall)

**Masalah dengan var:**

```javascript
// MASALAH: Semua akan print 3
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3
  }, 1000);
}
// Kenapa? Karena var tidak block-scoped, semua closure share variable i yang sama
```

**Solusi 1: Gunakan let (block-scoped):**

```javascript
// BENAR: Print 0, 1, 2
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2
  }, 1000);
}
// Setiap iterasi punya scope sendiri untuk i
```

**Solusi 2: IIFE (Immediately Invoked Function Expression):**

```javascript
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // 0, 1, 2
    }, 1000);
  })(i);
}
```

#### 2.4. Praktik Closure

**Function Factory:**

```javascript
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**Currying dengan Closure:**

```javascript
function greet(greeting) {
  return function (name) {
    return function (punctuation) {
      return `${greeting}, ${name}${punctuation}`;
    };
  };
}

// Bisa dipanggil bertahap
const helloGreet = greet('Hello');
const helloJohn = helloGreet('John');
console.log(helloJohn('!')); // "Hello, John!"

// Atau sekaligus
console.log(greet('Hi')('Jane')('.')); // "Hi, Jane."

// Dengan arrow function lebih ringkas
const greetArrow = (greeting) => (name) => (punctuation) => `${greeting}, ${name}${punctuation}`;
```

---

### 3. Fungsi Rekursif

Recursion adalah teknik di mana sebuah fungsi memanggil dirinya sendiri untuk menyelesaikan masalah.

#### 3.1. Konsep Dasar Recursion

Secara umum, pola fungsi rekursif selalu terdiri dari dua bagian:

1. **Base case** - Kondisi berhenti
2. **Recursive case** - Pemanggilan diri sendiri dengan parameter yang lebih sederhana

```javascript
const recursiveCountdown = (number) => {
  if (number < 1) {
    // base case
    return;
  }
  console.log(number); // proses sekarang
  recursiveCountdown(number - 1); // recursive case
};

recursiveCountdown(5);
// Output: 5, 4, 3, 2, 1
```

#### 3.2. Mengubah Urutan: Count Up

Dengan mengganti urutan `console.log` dan pemanggilan rekursif, perilaku output bisa berubah:

```javascript
const recursiveCountup = (number) => {
  if (number < 1) {
    return;
  }
  recursiveCountup(number - 1); // selesaikan "yang lebih kecil" dulu
  console.log(number); // lalu proses sekarang
};

recursiveCountup(5);
// Output: 1, 2, 3, 4, 5
```

#### 3.3. Call Stack dan Recursion

Untuk memahami "kenapa urutannya begitu", perlu memahami call stack:

```javascript
const recursiveCountdown = (number) => {
  console.log(`Start: ${number}`);
  if (number < 1) {
    console.log('Base case, stop.');
    return;
  }
  recursiveCountdown(number - 1);
  console.log(`End: ${number}`);
};

recursiveCountdown(3);
/* Output:
Start: 3
Start: 2
Start: 1
Start: 0
Base case, stop.
End: 1
End: 2
End: 3
*/
```

**Visualisasi Call Stack:**

```
Call Stack (LIFO - Last In First Out):

1. recursiveCountdown(3) masuk stack
   ↓ panggil recursiveCountdown(2)

2. recursiveCountdown(2) masuk stack
   ↓ panggil recursiveCountdown(1)

3. recursiveCountdown(1) masuk stack
   ↓ panggil recursiveCountdown(0)

4. recursiveCountdown(0) masuk stack
   ↓ base case tercapai, return
   ← recursiveCountdown(0) keluar dari stack

5. Lanjutkan recursiveCountdown(1) dari baris setelah recursive call
   ← recursiveCountdown(1) keluar dari stack

6. Lanjutkan recursiveCountdown(2)
   ← recursiveCountdown(2) keluar dari stack

7. Lanjutkan recursiveCountdown(3)
   ← recursiveCountdown(3) keluar dari stack
```

#### 3.4. Contoh Praktis Recursion

**Faktorial:**

```javascript
function factorial(n) {
  // Base case
  if (n <= 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
// 5 * factorial(4)
// 5 * 4 * factorial(3)
// 5 * 4 * 3 * factorial(2)
// 5 * 4 * 3 * 2 * factorial(1)
// 5 * 4 * 3 * 2 * 1 = 120
```

**Fibonacci:**

```javascript
function fibonacci(n) {
  // Base cases
  if (n <= 0) return 0;
  if (n === 1) return 1;

  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8
// Sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...
```

**Jumlahkan Array Recursively:**

```javascript
function sumArray(arr) {
  // Base case: array kosong
  if (arr.length === 0) {
    return 0;
  }

  // Recursive case: elemen pertama + sum sisanya
  return arr[0] + sumArray(arr.slice(1));
}

console.log(sumArray([1, 2, 3, 4, 5])); // 15
```

**Flatten Nested Array:**

```javascript
function flatten(arr) {
  let result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      // Recursive case: jika item adalah array, flatten dulu
      result = result.concat(flatten(item));
    } else {
      // Base case: jika bukan array, tambahkan langsung
      result.push(item);
    }
  }

  return result;
}

const nested = [1, [2, 3], [4, [5, 6]], 7];
console.log(flatten(nested)); // [1, 2, 3, 4, 5, 6, 7]
```

#### 3.5. Kapan Menggunakan Recursion

Recursion sangat berguna saat:

- Struktur data bersifat **bercabang** atau **bertingkat** (tree, nested object/array)
- Masalah yang definisinya **secara alami rekursif** (faktorial, fibonacci, traversal)
- Ingin menulis solusi yang lebih **deklaratif dan ringkas**

**Peringatan:**

- Recursion bisa menyebabkan **stack overflow** jika terlalu dalam
- Untuk kasus sederhana dan iteratif, loop biasa lebih efisien

---

### 4. Error Handling

Error handling adalah cara untuk menangani kesalahan yang mungkin terjadi saat runtime.

#### 4.1. Try-Catch-Finally

**Sintaks Dasar:**

```javascript
try {
  // Kode yang mungkin error
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // Tangani error
  console.log('Terjadi error:', error.message);
} finally {
  // Selalu dijalankan (opsional)
  console.log('Cleanup atau logging');
}
```

**Contoh Praktis:**

```javascript
function bagi(a, b) {
  try {
    if (b === 0) {
      throw new Error('Tidak bisa dibagi dengan nol!');
    }
    return a / b;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  } finally {
    console.log('Operasi pembagian selesai');
  }
}

console.log(bagi(10, 2)); // 5
console.log(bagi(10, 0)); // Error: Tidak bisa dibagi dengan nol! → null
```

#### 4.2. Error Types

JavaScript memiliki beberapa built-in error types:

```javascript
// ReferenceError - variabel tidak ditemukan
try {
  console.log(variabelTidakAda);
} catch (e) {
  console.log(e.name); // "ReferenceError"
}

// TypeError - operasi pada tipe yang salah
try {
  null.toString();
} catch (e) {
  console.log(e.name); // "TypeError"
}

// SyntaxError - syntax tidak valid (biasanya tidak bisa di-catch)
// eval('hallo world');

// RangeError - nilai di luar range
try {
  const arr = new Array(-1);
} catch (e) {
  console.log(e.name); // "RangeError"
}
```

#### 4.3. Custom Errors

Anda bisa membuat custom error class:

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateAge(age) {
  if (typeof age !== 'number') {
    throw new ValidationError('Age harus berupa number');
  }

  if (age < 0 || age > 150) {
    throw new ValidationError('Age harus antara 0-150');
  }

  return true;
}

try {
  validateAge('25');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation error:', error.message);
  } else {
    console.log('Unknown error:', error);
  }
}
```

#### 4.4. Best Practices Error Handling

**1. Specific Error Handling:**

```javascript
function processData(data) {
  try {
    // Parse JSON
    const parsed = JSON.parse(data);

    // Validate
    if (!parsed.name) {
      throw new ValidationError('Name is required');
    }

    // Process
    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON format');
    } else if (error instanceof ValidationError) {
      console.error('Validation failed:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
}
```

**2. Fail Fast:**

```javascript
// BAIK: Check dan throw error segera
function divide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }

  if (b === 0) {
    throw new Error('Division by zero');
  }

  return a / b;
}
```

**3. Don't Swallow Errors:**

```javascript
// BURUK: Silent failure
try {
  riskyOperation();
} catch (e) {
  // Tidak ada apa-apa - error "ditelan"
}

// BAIK: Minimal log error
try {
  riskyOperation();
} catch (e) {
  console.error('Operation failed:', e);
  // Atau re-throw
  throw e;
}
```

#### 4.5. Kapan Menggunakan Try-Catch

**Gunakan try-catch untuk:**

- External API calls
- JSON parsing
- File operations (di Node.js)
- User input validation
- Operations yang mungkin fail di runtime

**Jangan gunakan try-catch untuk:**

- Flow control biasa (gunakan if-else)
- Validasi yang bisa dicek dengan if
- Setiap operasi (impact performance)

---

### 5. Event Loop dan Call Stack

Memahami bagaimana JavaScript menjalankan kode secara asynchronous.

#### 5.1. Call Stack

**Call stack** adalah struktur data yang melacak eksekusi fungsi. Sifatnya LIFO (Last In, First Out).

```javascript
function third() {
  console.log('3. Executing third');
}

function second() {
  console.log('2. Executing second');
  third();
  console.log('4. Back to second');
}

function first() {
  console.log('1. Executing first');
  second();
  console.log('5. Back to first');
}

first();
console.log('6. Back to global');

/* Call Stack Visualization:
   
   [third]        ← 3. third masuk, eksekusi, keluar
   [second]       ← 2. second masuk
   [first]        ← 1. first masuk
   [global]       ← 0. mulai
   
   Kemudian stack dibongkar dari atas:
   4. Lanjut second
   5. Lanjut first  
   6. Lanjut global
*/
```

#### 5.2. Stack Overflow

Terjadi ketika call stack penuh:

```javascript
function recursive() {
  recursive(); // Tidak ada base case!
}

// recursive(); // RangeError: Maximum call stack size exceeded
```

#### 5.3. Event Loop (Pengenalan)

JavaScript adalah **single-threaded** tapi bisa melakukan operasi asynchronous berkat **event loop**.

**Komponen Utama:**

1. **Call Stack** - menjalankan kode synchronous
2. **Web APIs** - handle operasi async (setTimeout, fetch, dll)
3. **Callback Queue** - antrian callback yang siap dieksekusi
4. **Event Loop** - mengecek apakah stack kosong, jika ya, pindahkan callback dari queue ke stack

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. Timeout callback');
}, 0);

console.log('3. End');

/* Output:
1. Start
3. End
2. Timeout callback

Kenapa? Meskipun timeout 0ms, callback tetap masuk queue
dan baru dieksekusi setelah stack kosong.
*/
```

**Visualisasi Event Loop:**

```javascript
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');

/* Output: A, D, C, B

Urutan eksekusi:
1. "A" - sync, langsung eksekusi
2. setTimeout - masuk Web API, callback ke Callback Queue
3. Promise - callback masuk Microtask Queue (prioritas lebih tinggi)
4. "D" - sync, langsung eksekusi
5. Stack kosong, Event Loop cek Microtask Queue dulu → "C"
6. Kemudian cek Callback Queue → "B"
*/
```

#### 5.4. Blocking vs Non-Blocking

```javascript
// BLOCKING - Stack tidak bisa handle hal lain
function blockingOperation() {
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // Block selama 3 detik
  }
  console.log('Blocking done');
}

// NON-BLOCKING - Tidak block stack
function nonBlockingOperation() {
  setTimeout(() => {
    console.log('Non-blocking done');
  }, 3000);
}

console.log('Start');
nonBlockingOperation();
console.log('After non-blocking'); // Tidak perlu tunggu 3 detik
```

---

### 6. Function Generator dan Lazy Evaluation

**Function Generator** adalah jenis fungsi khusus yang eksekusinya dapat dihentikan sementara dan dilanjutkan kembali.

#### 6.1. Sintaks Dasar Generator

```javascript
// Fungsi generator ditandai dengan *
function* buatGanjil(value) {
  for (let i = 1; i <= value; i++) {
    if (i % 2 === 1) {
      console.log(`Menghasilkan ${i}`);
      yield i; // Mengirim nilai dan berhenti sementara
    }
  }
}

const angkaGanjil = buatGanjil(10);

// Generator belum berjalan sampai kita memintanya
console.log(angkaGanjil.next().value); // Menghasilkan 1, lalu 1
console.log(angkaGanjil.next().value); // Menghasilkan 3, lalu 3
console.log(angkaGanjil.next().value); // Menghasilkan 5, lalu 5
```

#### 6.2. Generator dengan next()

```javascript
function* numberGenerator() {
  console.log('Mulai generator');
  yield 1;
  console.log('Setelah yield 1');
  yield 2;
  console.log('Setelah yield 2');
  yield 3;
  console.log('Selesai');
}

const gen = numberGenerator();

console.log('Sebelum next() pertama');
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

#### 6.3. Infinite Generator

```javascript
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const seq = infiniteSequence();
console.log(seq.next().value); // 0
console.log(seq.next().value); // 1
console.log(seq.next().value); // 2
// Bisa terus tanpa habis!
```

#### 6.4. Kapan Menggunakan Generator

- Lazy evaluation - generate nilai on-demand
- Infinite sequences
- Iterasi yang bisa di-pause
- Memory efficient untuk data besar

---

### 7. Konsep this

`this` di JavaScript adalah nilai konteks yang ditentukan saat runtime.

#### 7.1. Aturan Penentuan this

**1. Method Call:**

```javascript
const user = {
  name: 'Ayu',
  greet() {
    return this.name; // this = user
  },
};

console.log(user.greet()); // "Ayu"
```

**2. Function Call Biasa:**

```javascript
function show() {
  console.log(this);
}

show(); // window (non-strict) / undefined (strict mode)
```

**3. Constructor Call:**

```javascript
function Person(name) {
  this.name = name; // this = instance baru
}

const person = new Person('Andi');
console.log(person.name); // "Andi"
```

**4. Method Extraction (Common Pitfall):**

```javascript
const user = {
  name: 'Ayu',
  hi() {
    return this.name;
  },
};

user.hi(); // "Ayu" - this = user

const f = user.hi; // Extract method
f(); // undefined - this tidak lagi user!
```

#### 7.2. Arrow Function dan this

Arrow function tidak punya `this` sendiri. Dia mewarisi `this` dari scope luarnya (lexical this).

```javascript
const obj = {
  name: 'Test',

  // Regular function
  regularFunc: function () {
    console.log('Regular:', this.name);
  },

  // Arrow function
  arrowFunc: () => {
    console.log('Arrow:', this.name);
  },
};

obj.regularFunc(); // "Regular: Test"
obj.arrowFunc(); // "Arrow: undefined" (this bukan obj!)
```

**Manfaat Arrow Function - Lexical this:**

```javascript
function Timer(seconds) {
  this.seconds = seconds;

  // Regular function - this berubah!
  // setInterval(function() {
  //   this.seconds--; // ERROR: this bukan Timer!
  //   console.log(this.seconds);
  // }, 1000);

  // Arrow function - this tetap Timer
  setInterval(() => {
    this.seconds--;
    console.log(this.seconds);
  }, 1000);
}

new Timer(5);
```

#### 7.3. Mengunci this dengan bind, call, apply

```javascript
const user = {
  name: 'Ayu',
  hi() {
    return this.name;
  },
};

// bind - return fungsi baru dengan this terkunci
const hi1 = user.hi.bind(user);
console.log(hi1()); // "Ayu"

// call - panggil langsung dengan this tertentu
console.log(user.hi.call({ name: 'Budi' })); // "Budi"

// apply - sama seperti call, tapi arguments dalam array
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

console.log(introduce.call({ name: 'Citra' }, 'Hi', '!'));
// "Hi, I'm Citra!"

console.log(introduce.apply({ name: 'Dodi' }, ['Hello', '.']));
// "Hello, I'm Dodi."
```

---

### 8. Praktik Terbaik

#### 8.1. Strict Mode

Strict mode memberlakukan aturan pengkodean yang lebih ketat.

```javascript
'use strict';

// Strict mode mencegah kesalahan umum:

// 1. Tidak bisa gunakan variabel tanpa deklarasi
// x = 10; // ReferenceError

// 2. Tidak bisa delete variabel
// let y = 20;
// delete y; // SyntaxError

// 3. Parameter function tidak boleh duplicate
// function sum(a, a, c) {} // SyntaxError

// 4. this dalam function biasa = undefined (bukan window)
function test() {
  console.log(this); // undefined
}
```

**Aktifkan untuk setiap file modern:**

```javascript
'use strict';

// Semua kode Anda di sini
```

#### 8.2. Utilitas debugger

Kata kunci `debugger` adalah alat debugging yang sangat berguna.

```javascript
function createFullName(firstName, lastName) {
  debugger; // Eksekusi akan berhenti di sini jika DevTools terbuka
  const fullName = `${firstName} ${lastName}`;
  return fullName;
}

createFullName('Siva', 'Aprillia');
```

**Cara pakai:**

1. Buka DevTools browser (F12)
2. Refresh page atau jalankan fungsi
3. Eksekusi akan pause di `debugger`
4. Inspect variabel, step through code

---

## Praktik

### Latihan 1: Closure untuk Module Pattern

**Tingkat**: Menengah

**Tujuan**: Membuat private variables dengan closure

**Instruksi**:
Buat `bankAccount` module dengan:

- Private variable `balance`
- Method: `deposit(amount)`, `withdraw(amount)`, `getBalance()`
- Validasi: amount harus positif, withdraw tidak boleh lebih dari balance

### Latihan 2: Recursion - Directory Tree

**Tingkat**: Menengah

**Tujuan**: Traverse nested structure

**Instruksi**:
Diberikan struktur:

```javascript
const fileSystem = {
  name: 'root',
  type: 'folder',
  children: [
    { name: 'file1.txt', type: 'file' },
    {
      name: 'documents',
      type: 'folder',
      children: [
        { name: 'doc1.pdf', type: 'file' },
        { name: 'doc2.pdf', type: 'file' },
      ],
    },
  ],
};
```

Buat fungsi rekursif `countFiles(node)` yang hitung total files.

### Latihan 3: Error Handling

**Tingkat**: Menengah

**Tujuan**: Proper error handling

**Instruksi**:
Buat fungsi `safeJSONParse(jsonString)` yang:

- Parse JSON string
- Return parsed object jika berhasil
- Return `{ error: true, message: '...' }` jika gagal
- Jangan throw error, tapi return error object

### Latihan 4: this Binding

**Tingkat**: Menengah

**Tujuan**: Menguasai this keyword

**Instruksi**:
Fix kode berikut agar berfungsi:

```javascript
const calculator = {
  value: 0,
  add: function (n) {
    setTimeout(function () {
      this.value += n;
      console.log(this.value);
    }, 100);
  },
};

calculator.add(5); // Harus print 5, tapi this.value undefined!
```

Solusi dengan 3 cara berbeda.

### Latihan 5: Generator untuk Pagination

**Tingkat**: Lanjutan

**Tujuan**: Menggunakan generator

**Instruksi**:
Buat generator `paginate(array, pageSize)` yang:

- Yield satu page array setiap kali
- Contoh: `paginate([1,2,3,4,5], 2)` yield,,

### Tantangan: Task Runner dengan Closure & Error Handling

**Tingkat**: Lanjutan

**Tujuan**: Menggabungkan closure, error handling, dan best practices

**Instruksi**:
Buat `TaskRunner` yang:

```javascript
const runner = TaskRunner();

// Add tasks
runner.addTask('task1', () => {
  console.log('Task 1 executed');
  return 'Result 1';
});

runner.addTask('task2', () => {
  throw new Error('Task 2 failed');
});

// Run all tasks
runner.runAll();
// Harus handle error dan lanjut ke task berikutnya

// Get results
runner.getResults();
// Return array dengan { name, status: 'success'|'failed', result|error }
```

Requirements:

- Gunakan closure untuk private task storage
- Proper error handling
- Method chaining untuk addTask

---

## Rangkuman Sesi 6

Selamat! Anda telah menguasai konsep-konsep lanjutan JavaScript:

- **Scope** - global, local, block, dan lexical scope
- **Closure** - fungsi yang "mengingat" scope luarnya
- **Recursion** - fungsi yang memanggil dirinya sendiri
- **Error Handling** - try-catch-finally untuk robust code
- **Event Loop** - bagaimana JavaScript handle async operations
- **Generator** - lazy evaluation dan pausable functions
- **this** - context binding dan cara mengontrolnya
- **Best Practices** - strict mode dan debugging

Di sesi berikutnya (Sesi 7), kita akan fokus pada **Clean Code & Best Practices** untuk menulis kode yang maintainable dan professional!
