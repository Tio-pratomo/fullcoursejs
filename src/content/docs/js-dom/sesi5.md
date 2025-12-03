---
title: Manipulasi Elemen (Creation & Insertion)
---

Selamat datang di **Sesi 5**. Kemampuan menciptakan elemen secara dinamis adalah kunci dari aplikasi modern seperti To-Do List, Feed Media Sosial, atau Keranjang Belanja yang isinya selalu berubah.

---

## 1. Membuat Elemen Baru

Langkah pertama adalah menciptakan elemennya di memori (belum tampil di layar).

```javascript
// Syntax: document.createElement('tagName')
const newCard = document.createElement('div');
const newTitle = document.createElement('h2');

// Mengisi Konten
newTitle.innerText = 'Produk Baru';
newCard.className = 'card-product'; // Tambah Class CSS

// Menyusun Struktur (Nesting)
newCard.appendChild(newTitle);
```

## 2. Menyuntikkan ke DOM (Insertion)

Setelah elemen jadi, kita harus "menempelkannya" ke halaman agar terlihat oleh user.

### A. `appendChild()`

Menambahkan elemen sebagai **anak terakhir** dari parent.

```javascript
const container = document.querySelector('.container');
container.appendChild(newCard);
```

### B. `insertBefore()`

Menyisipkan elemen **sebelum** elemen lain yang spesifik.

```javascript
// Syntax: parentNode.insertBefore(newNode, referenceNode)
const list = document.querySelector('ul');
const firstItem = list.firstElementChild;
const newItem = document.createElement('li');
newItem.innerText = 'Item Prioritas';

list.insertBefore(newItem, firstItem); // Masuk paling atas
```

### C. `append()` (Modern & Fleksibel)

Bisa menambahkan banyak node sekaligus, bahkan teks biasa.

```javascript
// Menambahkan teks dan elemen sekaligus di akhir
container.append('Deskripsi: ', document.createElement('span'));
```

### D. Posisi Presisi dengan `insertAdjacent`

Selain `appendChild`, ada metode yang lebih _powerful_ untuk menyisipkan konten string HTML atau elemen di posisi yang sangat spesifik relatif terhadap elemen target.

#### 1. Visualisasi Posisi

Bayangkan Anda punya elemen target `<div>`. Ada 4 titik di mana Anda bisa menyuntikkan konten:

```html
<!-- 1. beforebegin -->
<div id="target">
  <!-- 2. afterbegin -->
  <p>Konten Lama</p>
  <!-- 3. beforeend -->
</div>
<!-- 4. afterend -->
```

#### 2. Metode `insertAdjacentHTML`

Ini adalah cara favorit developer karena performanya tinggi (lebih cepat dari `createElement` untuk struktur kompleks) dan tidak merusak event listener pada elemen lain (tidak seperti `innerHTML = ...`).

**Syntax:**
`element.insertAdjacentHTML(position, text)`

**Pilihan Posisi:**

1.  **`'beforebegin'`**: Sebelum elemen target (menjadi saudara sebelumnya/Previous Sibling).
2.  **`'afterbegin'`**: Di dalam elemen target, paling atas (menjadi anak pertama/First Child).
3.  **`'beforeend'`**: Di dalam elemen target, paling bawah (menjadi anak terakhir/Last Child). _Mirip appendChild_.
4.  **`'afterend'`**: Setelah elemen target (menjadi saudara setelahnya/Next Sibling).

#### 3. Contoh Penggunaan

Misalkan kita punya list:

```html
<ul id="list-buah">
  <li>Apel</li>
</ul>
```

Kita manipulasi dengan JavaScript:

```javascript
const list = document.getElementById('list-buah');

// Menambah Judul DI ATAS list (di luar <ul>)
list.insertAdjacentHTML('beforebegin', '<h3>Daftar Buah:</h3>');

// Menambah Item PERTAMA (di dalam <ul>)
list.insertAdjacentHTML('afterbegin', '<li>Anggur (Item Pertama)</li>');

// Menambah Item TERAKHIR (di dalam <ul>)
list.insertAdjacentHTML('beforeend', '<li>Jeruk (Item Terakhir)</li>');

// Menambah Footer DI BAWAH list (di luar <ul>)
list.insertAdjacentHTML('afterend', '<p>Total: 3 Buah</p>');
```

#### 4. Varian Lain (Advanced)

Selain HTML string, ada juga metode untuk menyisipkan elemen DOM asli atau teks murni:

- **`insertAdjacentElement(position, element)`**: Sama posisinya, tapi inputnya harus berupa Element Object (hasil dari `document.createElement`).
- **`insertAdjacentText(position, text)`**: Hanya menyisipkan teks (aman dari XSS/kode berbahaya), tag HTML akan dianggap teks biasa.

---

#### Ringkasan Perbandingan Insert DOM

| Metode                   | Input             | Posisi        | Kelebihan                                                       |
| :----------------------- | :---------------- | :------------ | :-------------------------------------------------------------- |
| `appendChild`            | Element Node      | `beforeend`   | Standar, aman, referensi elemen terjaga.                        |
| `prepend`                | Element Node/Text | `afterbegin`  | Mudah digunakan untuk taruh di atas.                            |
| `innerHTML`              | HTML String       | Mengganti Isi | Mudah, tapi berat (re-parse) dan menghapus event listener anak. |
| **`insertAdjacentHTML`** | **HTML String**   | **4 Posisi**  | **Cepat, Fleksibel, tidak merusak elemen existing.**            |

## 3. Teknik Optimasi: DocumentFragment

Jika Anda perlu menambahkan 1000 item ke list, jangan lakukan `appendChild` 1000 kali ke DOM. Itu akan memaksa browser me-render ulang (Reflow) 1000 kali. Lambat!

Gunakan **DocumentFragment**: wadah sementara di memori.

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  let li = document.createElement('li');
  li.innerText = `Item ke-${i}`;
  fragment.appendChild(li); // Masuk ke wadah memori dulu
}

// Hanya 1 kali Reflow ke layar!
document.getElementById('myList').appendChild(fragment);
```

---

## Praktik Sesi 5

Kita akan membuat **Generator Komentar Otomatis**.

**1. Siapkan `index.html`:**

```html
<div id="comment-section">
  <h3>Komentar Netizen</h3>
  <ul id="list-komentar">
    <li>First! - by Admin</li>
  </ul>
</div>

<button id="btn-load">Load More Comments</button>
```

**2. Tulis `app.js`:**

```javascript
const btnLoad = document.getElementById('btn-load');
const listKomentar = document.getElementById('list-komentar');

// Data Dummy
const dummyComments = [
  'Wah keren banget!',
  'Tutorialnya sangat membantu.',
  'Izin share gan.',
  'Mantap jiwa!',
  'Gas lanjut part 2!',
];

btnLoad.addEventListener('click', () => {
  // 1. Buat Wadah Memori (Optimasi)
  const fragment = document.createDocumentFragment();

  // 2. Loop data dan buat elemen
  dummyComments.forEach((text) => {
    const newLi = document.createElement('li');

    // Styling via JS (Opsional)
    newLi.style.padding = '10px';
    newLi.style.borderBottom = '1px solid #eee';

    // Isi konten
    newLi.innerText = text;

    // Masukkan ke fragment
    fragment.appendChild(newLi);
  });

  // 3. Suntikkan ke DOM sekaligus
  listKomentar.appendChild(fragment);

  console.log(`${dummyComments.length} komentar baru ditambahkan.`);
});
```

**Misi Anda:**
Jalankan kode. Klik "Load More Comments" berkali-kali. Perhatikan bagaimana komentar baru terus bertambah di bawah (append). Cobalah modifikasi kode agar komentar baru muncul di **paling atas** (gunakan `prepend` atau `insertBefore`).

Jika manipulasi dasar ini sudah dikuasai, di **Sesi 6** kita akan belajar teknik manipulasi yang lebih advance seperti menghapus, mengganti, dan meng-clone elemen. Siap?
