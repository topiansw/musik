# Nada

Aplikasi musik statis berbasis React, Vite, Tailwind, YouTube Data API v3 dan IFrame Player. Tidak memerlukan server aplikasi. Gunakan Node 22 LTS, lalu `npm ci`, `npm test`, `npm run build`, dan `npm run dev`. Untuk memeriksa PWA produksi, gunakan `npm run preview` setelah build di localhost atau deploy lewat HTTPS.

## Hubungkan katalog
Aktifkan YouTube Data API v3 di Google Cloud. Buat browser API key, batasi ke API tersebut dan HTTP referrer situs Anda (tambahkan localhost untuk pengujian). Masukkan key di Settings. Alternatif: salin `.env.example` ke `.env.local`, isi variabel, lalu mulai ulang Vite. Key fallback terbundel dalam JavaScript publik. Jangan memakai kredensial server atau menyimpan key di Git. Tanpa key, shell, playlist lokal dan video yang telah tersimpan masih dapat digunakan.

## Pengujian perangkat
Dari Home, tempel tautan lagu YouTube atau YouTube Music dan beri judul opsional. Kedua sumber memakai pemutar resmi yang sama, bukan katalog akun YouTube Music. Setelah lagu dimulai, gunakan riwayat untuk menambahkan ke favorit atau playlist. Pada panel video, buka **Lirik sinkron** dan pilih berkas LRC bertimestamp; lirik disimpan untuk ID lagu tersebut, di browser ini. Tidak ada pengambilan lirik otomatis atau unduhan audio.

Putar lagu, pindah tab selama satu menit, periksa suara, lalu kembali dan periksa posisi. Uji juga jeda manual: kembali ke tab tidak boleh memulai lagu yang dijeda. Aplikasi tidak menjeda saat tab disembunyikan; browser, sistem operasi atau penyedia media masih bisa menghentikannya. Uji Next/Previous, Repeat, Shuffle, seek dan sinkronisasi LRC setelah seek. Periksa mode portrait, instalasi Android/Desktop, dan Add to Home Screen di Safari. Service worker hanya menyimpan aset aplikasi, bukan hasil API atau media.

## Firefox dan filter iklan opsional
Untuk menguji ekstensi desktop, deploy terlebih dahulu ke `https://topiansw.github.io/musik/`, buka `about:debugging#/runtime/this-firefox`, pilih **Load Temporary Add-on**, lalu pilih `manifest.json` di direktori `firefox`. Klik tombol Nada. Ekstensi membuka situs dan memasang filter untuk dua domain iklan hanya pada tab tersebut. Iklan dari domain media yang sama tidak terfilter. Ekstensi sementara hilang saat Firefox ditutup; distribusi permanen memerlukan paket bertanda tangan. PWA tidak menyertakan izin ekstensi: gunakan menu instalasi bila tersedia, atau buka situs biasa. Tidak semua browser menyediakan instalasi mandiri.

## GitHub Pages

**Studio 02:** Home menampilkan meja input, statistik koleksi, dan lagu terakhir. Pilihan sumber memvalidasi tautan (bukan katalog kedua). Lirik impor menampilkan konteks sebelum/sesudah baris aktif. Pengguna keyboard dapat mengoperasikan kartu dan kontrol; latar dan panel tidak memerlukan animasi atau efek blur untuk dibaca.

**Chrome/Edge desktop:** jalankan `node scripts/chromium.mjs` dari root proyek, buka `chrome://extensions` atau `edge://extensions`, aktifkan Developer mode dan pilih **Load unpacked** pada folder `chromium`. Firefox memakai folder `firefox` seperti dijelaskan di atas. Instal hanya jika Anda menginginkan filter opsional: klik ikon ekstensi untuk membuka studio. Pada iframe YouTube di tab studio itu, ekstensi mencoba menekan tombol lewati iklan yang sudah ditampilkan dan diaktifkan YouTube. Video tanpa tombol itu tidak dipercepat. Perubahan antarmuka YouTube dapat memengaruhi fitur ini. Nonaktifkan ekstensi atau gunakan tab biasa untuk memutar tanpa bantuan ini.
Push proyek beserta lockfile ke cabang main. Pilih Settings → Pages → Source: GitHub Actions. Workflow memakai base path Pages, menjalankan test, membangun dan menerbitkan `dist`. Opsional: secret `VITE_YOUTUBE_API_KEY` menjadi key publik saat build. `HashRouter` menjaga refresh rute di project site. Untuk simulasi lokal, set `PAGES_BASE` ke `/nama-repo/` saat build. Navigasi dan Settings tetap tersedia saat offline setelah shell produksi tercache.