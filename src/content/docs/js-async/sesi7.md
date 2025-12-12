---
title: Mini Projects dengan Fetch + Async/Await
---

Sesi ini adalah sesi terakhir: kita pakai semua konsep async/await + Promise + Fetch API untuk membangun **3 mini project**: Chuck Norris Joke App, Weather App, dan Pokedex simplifikasi.

## Chuck Norris Joke App

Di materi, Chuck Norris Joke App terdiri dari struktur HTML sederhana: judul, paragraf untuk teks joke, tombol "Load another", dan gambar Chuck Norris di sisi bawah. Logika utamanya adalah memanggil sebuah endpoint API joke ketika tombol diklik, lalu menuliskan hasilnya ke elemen paragraf menggunakan `fetch` + async/await.

Contoh JS (versi dipermudah namun utuh):

```js
// app.js
const jokeText = document.getElementById('joke-text');
const loadJokeBtn = document.getElementById('load-joke-btn');

const loadJoke = async () => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    jokeText.innerHTML = data.value; // property 'value' berisi text joke
  } catch (error) {
    jokeText.innerHTML = 'Gagal memuat joke. Coba lagi.';
    console.error(error);
  }
};

loadJokeBtn.addEventListener('click', loadJoke);

// Opsional: load satu joke saat pertama kali halaman dibuka
loadJoke();
```

Struktur HTML minimal yang kamu butuh:

```html
<h2>Chuck Norris API</h2>
<div id="joke-container">
  <p id="joke-text">Press "Load another" for a joke.</p>
  <button id="load-joke-btn">Load another</button>
</div>
<img src="chuck.png" alt="Chuck Norris" />
```

Ini langsung mengulang pola: **fetch → `await response.json()` → tulis ke DOM**, sama seperti yang dijelaskan di Sesi 6.

## Weather App (OpenWeather)

Weather App di materi menggunakan input teks + tombol search untuk memasukkan nama kota, lalu menampilkan: tanggal, nama kota, icon cuaca, deskripsi singkat, temperatur saat ini, dan high/low. Data diambil dari OpenWeather API dengan API key (kamu perlu signup gratis dan menaruh key di query string).

Contoh JS (dipadatkan):

```js
// app.js
const dateEl = document.getElementById('date');
const cityEl = document.getElementById('city');
const descEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const tempMaxEl = document.getElementById('temp-max');
const tempMinEl = document.getElementById('temp-min');
const iconEl = document.getElementById('temp-image');
const searchInput = document.getElementById('search-input');

const API_KEY = 'YOUR_API_KEY_HERE'; // ganti pakai API key-mu

// Set tanggal sekali di awal
const now = new Date();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
dateEl.innerHTML = `${months[now.getUTCMonth()]} ${now.getUTCDate()}, ${now.getUTCFullYear()}`;

const getWeather = async () => {
  const cityName = searchInput.value.trim();
  if (!cityName) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`City not found: ${response.status}`);
    }

    const data = await response.json();

    cityEl.innerHTML = data.name;
    descEl.innerHTML = data.weather[0].main;
    tempEl.innerHTML = `${Math.round(data.main.temp)}°C`;
    tempMaxEl.innerHTML = `${Math.round(data.main.temp_max)}°C`;
    tempMinEl.innerHTML = `${Math.round(data.main.temp_min)}°C`;

    const iconCode = data.weather[0].icon;
    iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" />`;
  } catch (error) {
    console.error(error);
    descEl.innerHTML = 'Tidak bisa menemukan kota.';
    tempEl.innerHTML = '-';
    tempMaxEl.innerHTML = '-';
    tempMinEl.innerHTML = '-';
    iconEl.innerHTML = '';
  }
};
```

HTML minimal:

```html
<div id="app">
  <div id="search-bar">
    <input id="search-input" type="text" placeholder="City" />
    <button onclick="getWeather()">Search</button>
  </div>

  <p id="date"></p>
  <h3 id="city"></h3>
  <div id="temp-image"></div>
  <p id="description"></p>
  <h2 id="temp"></h2>

  <div id="extra-info">
    <div>
      <h5>Highs</h5>
      <p id="temp-max"></p>
    </div>
    <div>
      <h5>Lows</h5>
      <p id="temp-min"></p>
    </div>
  </div>
</div>
```

Struktur ini sejalan dengan materi asli: ambil data `name`, `weather[0].main`, `main.temp`, `temp_max`, `temp_min`, dan icon.

## Pokedex (PokéAPI)

Pokedex versi materi: dua panel (kiri mirip device Pokedex, kanan ada search bar), input nama Pokémon, lalu layar menampilkan gambar Pokémon yang diambil dari PokéAPI. Yang penting untuk konsep async adalah: **ambil nilai input**, panggil endpoint `pokemon/{name}`, cek error, ambil URL sprite, dan set ke tag `<img>`.

Contoh JS yang ringkas dan jelas:

```js
// app.js
const searchNameInput = document.getElementById('search-name');
const pokemonImg = document.getElementById('pokemon-image');

const getPokemon = async () => {
  const rawName = searchNameInput.value.trim();
  if (!rawName) return;

  const pokemonName = rawName.toLowerCase();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error('Could not find Pokémon');
    }

    const data = await response.json();
    const spriteUrl = data.sprites.front_default;

    if (!spriteUrl) {
      throw new Error('Pokémon has no default sprite');
    }

    pokemonImg.src = spriteUrl;
    pokemonImg.style.display = 'block';
  } catch (error) {
    console.error(error);
    pokemonImg.style.display = 'none';
    alert('Pokémon tidak ditemukan.');
  }
};
```

HTML minimal:

```html
<div id="pokedex">
  <div id="screen">
    <img id="pokemon-image" style="display:none;" />
  </div>

  <div id="search-bar">
    <input id="search-name" type="text" placeholder="Pokemon name" />
    <button onclick="getPokemon()">Search</button>
  </div>
</div>
```

Ini mengikuti pola dari materi: ambil `sprites.front_default` dari respons JSON dan taruh sebagai `src` untuk `<img id="pokemon-image">`.

---

Dengan tiga project ini, kamu sudah mempraktikkan semua fondasi yang dibangun dari Sesi 1–6:

- Mengerti perbedaan sync/async, callback, Promise, async/await.
- Menggunakan `fetch()` untuk GET/POST dan mengubah response ke JSON.
- Menggabungkan async/await + Fetch API + manipulasi DOM untuk membangun aplikasi web nyata yang berbasis data dari API eksternal.

Kalau kamu mau, sesi berikutnya (di luar kurikulum 7 sesi ini) bisa fokus ke: struktur folder proyek yang rapi, refactor ke modul ES6, atau menggabungkan ini dengan framework frontend modern seperti React/Vue/Svelte.
