# PEGASSUS 2026

Dashboard statis HTML, CSS, dan JavaScript untuk GitHub Pages, tanpa build atau backend.

## Publikasi

Push berkas ke repository GitHub. Di Settings → Pages pilih Deploy from a branch, branch yang berisi berkas ini, dan folder / (root). Semua jalur aset relatif sehingga mendukung URL project Pages.

## Update hasil

Berikan instruksi: “Tambahkan hasil Catur Putra, perorangan, 8 peserta, Juara 1 …, Juara 2 …, Juara 3 …”. Update `data/results.json` saja, dengan timestamp WITA (+08:00). Revisi entri dengan ID/cabang/kategori yang sama; jangan menambah duplikat. Identitas resmi dan logo ada di `data/schools.json`.

`participants` harus angka bulat atau null jika belum diketahui. Medali dihitung untuk 3 peserta (emas), 4 (emas/perak), 5+ (semua). Di bawah 3 tidak dihitung. `medalsConfirmed: true` merupakan konfirmasi eksplisit panitia bahwa semua medali valid tanpa jumlah peserta; digunakan untuk kedua hasil catur awal sesuai instruksi pengguna. Hapus penanda ini jika jumlah peserta kemudian dicatat dan aturan biasa harus diterapkan.

Hasil tanpa jumlah peserta/konfirmasi tetap terlihat tetapi belum masuk klasemen. Duplikasi cabang/kategori menggunakan pembaruan terbaru. Detail sekolah menampilkan semua cabang; filter menyaring klasemen dan hasil terbaru.

## Pemeriksaan

Jalankan `node tests.mjs` untuk memeriksa aturan medali, seri, duplikasi, dan hasil awal. Preview melalui server statis (misalnya `python -m http.server 8000`), karena fetch JSON memerlukan HTTP.
