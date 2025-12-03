---
title: Manipulasi Elemen Lanjut
---

Jika sebelumnya kita belajar cara "melahirkan" elemen baru, sekarang kita akan belajar cara "mengoperasi" elemen yang sudah ada: Mengganti (Replace), Menggandakan (Clone), dan Menghapus (Remove).

---

## 1. Mengganti Elemen (Replacing)

Terkadang kita perlu menukar elemen lama dengan yang baru, misalnya saat user mengedit data.

- **`replaceWith()`** (Modern): Mengganti elemen itu sendiri dengan node baru.
- **`replaceChild()`** (Traditional): Mengganti anak dari parent tertentu.

```javascript
// Skenario: Ubah status teks "Pending" jadi tombol "Bayar Sekarang"
const statusText = document.querySelector('.status-pending');
const payButton = document.createElement('button');
payButton.innerText = 'Bayar Sekarang';

// Cara Modern (Langsung pada elemen target)
statusText.replaceWith(payButton);

// Cara Lama (Harus lewat parent)
// statusText.parentNode.replaceChild(payButton, statusText);
```

## 2. Menggandakan Elemen (Cloning)

Daripada membuat elemen rumit dari nol pakai `createElement`, lebih cepat meniru elemen yang sudah ada.

- **`cloneNode(deep)`**:
  - `deep = false` (Default): Hanya meng-copy tag pembungkusnya saja (kosong).
  - `deep = true`: Meng-copy tag beserta seluruh isinya (anak, teks, atribut).

```javascript
const templateCard = document.querySelector('.card-template');

// Copy elemen BESERTA isinya
const newCard = templateCard.cloneNode(true);
newCard.classList.remove('hidden'); // Tampilkan hasil copy
document.body.appendChild(newCard);
```

_Note: Hati-hati dengan `id`. Setelah cloning, pastikan mengubah `id` elemen baru agar tidak duplikat._

## 3. Menghapus Elemen (Removing)

Membersihkan elemen yang tidak lagi dibutuhkan dari DOM.

- **`remove()`** (Modern): Elemen "bunuh diri" dari DOM.
- **`removeChild()`** (Traditional): Parent "membuang" anaknya.

```javascript
const notification = document.querySelector('.alert-success');

// Hapus notifikasi setelah 3 detik
setTimeout(() => {
  if (notification) {
    notification.remove(); // Simpel & Bersih
  }
}, 3000);
```

---

## Praktik Sesi 6

Kita akan membuat **To-Do List Interaktif** yang mendukung fitur Hapus dan Duplikat.

**1. Siapkan `index.html`:**

```html
<div class="todo-app">
  <input type="text" id="input-task" placeholder="Tugas baru..." />
  <button id="btn-add">Tambah</button>

  <ul id="task-list">
    <!-- Template Item (Tersembunyi) -->
    <li class="task-item" style="display:none">
      <span class="task-text">Contoh Tugas</span>
      <button class="btn-duplicate">Copy</button>
      <button class="btn-delete">Hapus</button>
    </li>
  </ul>
</div>
```

**2. Tulis `app.js`:**

```javascript
const btnAdd = document.getElementById('btn-add');
const inputTask = document.getElementById('input-task');
const taskList = document.getElementById('task-list');

// Ambil template item pertama
const templateItem = document.querySelector('.task-item');

btnAdd.addEventListener('click', () => {
  const text = inputTask.value;
  if (!text) return alert('Isi tugas dulu!');

  // 1. CLONE: Buat item baru dari template
  const newTask = templateItem.cloneNode(true);

  // 2. MODIFIKASI: Update isi & tampilkan
  newTask.style.display = 'block'; // Munculkan
  newTask.querySelector('.task-text').innerText = text;

  // 3. INSERT: Masukkan ke list
  taskList.appendChild(newTask);

  // Reset input
  inputTask.value = '';

  // --- Tambahkan Event Listener ke Tombol Baru ---

  // Fitur Hapus (REMOVE)
  newTask.querySelector('.btn-delete').addEventListener('click', () => {
    if (confirm('Yakin hapus?')) {
      newTask.remove();
    }
  });

  // Fitur Duplikat (CLONE lagi)
  newTask.querySelector('.btn-duplicate').addEventListener('click', () => {
    const clonedTask = newTask.cloneNode(true);
    // Perlu pasang event listener lagi untuk hasil clone (atau pakai Event Delegation di sesi nanti)
    taskList.appendChild(clonedTask);
  });
});
```

**Misi Anda:**

1.  Coba tambah tugas baru.
2.  Klik "Copy" pada tugas tersebut, lihat bagaimana elemen terduplikasi persis.
3.  Klik "Hapus" untuk membuang elemen dari layar.
4.  _Tantangan_: Tombol pada hasil duplikat (item hasil copy) mungkin tidak berfungsi jika Anda klik. Kenapa? Karena event listener tidak ikut ter-copy secara default. Kita akan memperbaiki ini di sesi "Event Delegation".

Jika sudah paham, di **Sesi 7** kita akan membahas cara memanipulasi tampilan (CSS) dan atribut elemen agar aplikasi kita makin cantik dan fungsional.
