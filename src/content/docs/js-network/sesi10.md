---
title: Long polling, SSE, WebSocket
---

Sesi ini bertujuan memberi **gambaran lengkap di luar `fetch`**: kapan cukup pakai `fetch` (HTTP biasa), kapan perlu **long polling**, **Server‑Sent Events (SSE)**, dan **WebSocket** untuk kebutuhan real‑time.

---

## Materi: Peta HTTP vs real-time

`fetch` bekerja di atas **HTTP request–response** biasa: client kirim request, server balas sekali, lalu koneksi selesai. Pola ini ideal untuk API CRUD, load data awal halaman, dan request yang sifatnya “sekali ambil, selesai”.

Untuk kebutuhan yang butuh **update terus‑menerus** (notifikasi live, harga saham, chat, game), pola satu request–satu respons jadi boros dan/atau lambat, sehingga digunakan teknik real‑time seperti long polling, SSE, atau WebSocket.

Secara singkat:

- **Long polling**: masih HTTP, tapi request dibiarkan “menggantung” sampai ada data, lalu client kirim lagi. Gampang diimplementasikan di backend lama.
- **SSE (Server‑Sent Events)**: koneksi HTTP satu arah (server → client) yang stream event teks secara terus‑menerus; cocok untuk feed notifikasi, ticker, log, dsb.
- **WebSocket**: protokol terpisah (`ws://` / `wss://`) full‑duplex, low‑latency, cocok untuk chat, multiplayer, kolaborasi real‑time, dll.

---

## Materi: Long polling & SSE dengan fetch

**Long polling** bisa dibuat hanya dengan `fetch`: client kirim request ke endpoint khusus, server menahan request sampai ada data baru atau timeout, lalu client segera mengirim request berikutnya setelah mendapat respons.

**Pattern pseudo‑code di sisi client:**

```js
async function longPoll() {
  while (true) {
    try {
      const res = await fetch('/api/updates');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      handleUpdate(data); // update UI

      // langsung loop lagi untuk update berikutnya
    } catch (e) {
      console.error('Long polling error:', e);
      await new Promise((r) => setTimeout(r, 2000)); // backoff sebelum coba lagi
    }
  }
}
```

SSE secara standar di browser biasanya diakses lewat objek `EventSource`, bukan `fetch`, karena API‑nya sudah siap pakai (`onmessage`, `onerror`, auto reconnect, dll.).

Namun, untuk kasus advance, `fetch` + `ReadableStream` juga bisa dipakai untuk menerima **HTTP response yang berisi stream event SSE** dan membaca chunk teks secara bertahap, mirip pola streaming di sesi 6.

---

## Materi: WebSocket dan kapan dipakai

WebSocket membuka koneksi **persisten dua arah** di atas TCP dengan satu handshake awal berbasis HTTP, lalu berpindah ke protokol `ws`/`wss` untuk kirim/terima pesan tanpa overhead header HTTP berulang.

Di sisi browser, API‑nya berbeda total dari `fetch`, menggunakan konstruktor `new WebSocket(url)` dan event seperti `onopen`, `onmessage`, `onclose`, serta method `send()` untuk kirim data.

**Contoh minimal:**

```js
const socket = new WebSocket('wss://example.com/ws');

socket.onopen = () => {
  console.log('Terhubung');
  socket.send(JSON.stringify({ type: 'join', room: 'general' }));
};

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  console.log('Pesan baru:', msg);
};

socket.onerror = (err) => {
  console.error('WebSocket error:', err);
};
```

Pola pemilihan praktis:

- **Tetap pakai `fetch`** untuk request yang jarang/sekali‑sekali, API REST, dan data yang bisa di‑cache (produk, profil user, dsb.).
- Tambahkan **long polling atau SSE** jika hanya butuh **aliran satu arah server → client** (ticker, notifikasi, monitoring).
- Gunakan **WebSocket** bila butuh **interaksi dua arah yang intens dan low‑latency**, misalnya chat, multiplayer game, kolaborasi dokumen, atau dashboard yang user‑nya juga mengirim banyak event ke server.

Kamu sekarang punya **peta lengkap network di browser**: `fetch` untuk HTTP biasa + streaming tertentu, dan kapan harus beralih ke long polling, SSE, atau WebSocket saat kebutuhan real‑time dan frekuensi update naik.
