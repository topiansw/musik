# Nada

Aplikasi musik statis berbasis React, Vite, Tailwind, YouTube Data API v3 dan IFrame Player. Tidak memerlukan server aplikasi. Gunakan Node 22 LTS, lalu `npm ci`, `npm test`, `npm run build`, dan `npm run dev`. Untuk memeriksa PWA produksi, gunakan `npm run preview` setelah build di localhost atau deploy lewat HTTPS.

## Hubungkan katalog
Aktifkan YouTube Data API v3 di Google Cloud. Buat browser API key, batasi ke API tersebut dan HTTP referrer situs Anda (tambahkan localhost untuk pengujian). Masukkan key di Settings. Alternatif: salin `.env.example` ke `.env.local`, isi variabel, lalu mulai ulang Vite. Key fallback terbundel dalam JavaScript publik. Jangan memakai kredensial server atau menyimpan key di Git. Tanpa key, shell, playlist lokal dan video yang telah tersimpan masih dapat digunakan.

## Pengujian perangkat
Cari lagu, putar lewat daftar, ubah posisi/volume, jeda lewat kontrol resmi, dan pastikan bar bawah mengikuti. Pindah halaman dan cek tidak terjadi reload video. Coba Next/Previous, Repeat, dan Shuffle pada antrean beberapa lagu. Periksa mode portrait, instalasi Android/Desktop, dan Add to Home Screen di Safari. Media Session dan volume programatis mengikuti dukungan browser. Data situs dapat dihapus lewat pengaturan browser. Tidak ada background playback atau unduhan video. Service worker hanya menyimpan aset aplikasi, bukan hasil API atau media.

## GitHub Pages
Push proyek beserta lockfile ke cabang main. Pilih Settings → Pages → Source: GitHub Actions. Workflow memakai base path Pages, menjalankan test, membangun dan menerbitkan `dist`. Opsional: secret `VITE_YOUTUBE_API_KEY` menjadi key publik saat build. `HashRouter` menjaga refresh rute di project site. Untuk simulasi lokal, set `PAGES_BASE` ke `/nama-repo/` saat build. Navigasi dan Settings tetap tersedia saat offline setelah shell produksi tercache.