/**
 * Gaya permukaan bersama.
 *
 * Latar situs adalah video gelap, sehingga kartu putih solid terasa
 * "menempel" dan polos. Semua kartu memakai permukaan kaca (semi-transparan
 * + blur) dari sini supaya menyatu dengan latar dan konsisten antar halaman.
 */

/**
 * Kartu kaca standar di atas latar video.
 *
 * Dua hal menjaga agar tidak muncul garis vertikal samar di sela kartu
 * (paling kelihatan saat kartu di-hover):
 *
 *  - Bayangan memakai spread negatif, supaya jangkauan menyampingnya
 *    (spread + blur/2) lebih kecil dari jarak antar kartu.
 *  - Blur backdrop ditahan di `lg` (16px). Kernel blur menyerap piksel
 *    sampai ~1.5x radius ke luar tepi elemen, jadi radius yang terlalu
 *    besar akan ikut menyeret tepi kartu tetangga ke dalam dirinya.
 *    Jarak antar kartu harus tetap lebih besar dari angka itu.
 */
export const glassCard =
  "rounded-3xl border border-white/15 bg-white/[0.07] backdrop-blur-lg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]";

/**
 * Kartu kaca sengaja TIDAK punya efek hover pada permukaannya.
 *
 * Setiap perubahan di tepi kartu saat hover — latar, border, bayangan,
 * maupun terangkat — memunculkan garis samar di sela kartu. Penyebabnya
 * `backdrop-filter`: kernel blur kartu menyerap piksel dari luar tepinya,
 * sehingga perubahan pada satu kartu justru terlihat di kartu sebelahnya,
 * dan Chrome juga menyisakan garis tipis di batas elemen ber-backdrop-filter.
 * Melebarkan jarak antar kartu dan mengecilkan radius blur hanya menyamarkan,
 * tidak menghilangkan.
 *
 * Karena itu isyarat hover diletakkan di DALAM kartu saja (mis. panah atau
 * gambar), jauh dari tepi — lihat StoriesList/ArticleView. Kartu yang memang
 * tidak bisa diklik tidak diberi isyarat hover sama sekali.
 */

/** Varian lebih tipis, untuk elemen kecil seperti pil kategori. */
export const glassSubtle =
  "rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-md";

/**
 * Properti yang aman dianimasikan pada permukaan kaca.
 *
 * `transition-all` di sini bermasalah: ia ikut menganimasikan `backdrop-filter`
 * (tombol yang berpindah aktif/nonaktif jadi berkedip saat blur-nya
 * di-interpolasi) dan properti layout seperti `width`. Dipakai bersama
 * `duration-*` sesuai kebutuhan tiap komponen.
 */
export const surfaceTransition =
  "transition-[border-color,background-color,box-shadow,transform,color,opacity]";

/**
 * Kilau sudut untuk kartu kaca.
 *
 * Memakai radial-gradient yang meredup jadi transparan di dalam kartu,
 * bukan lingkaran ber-`blur()` yang menjorok ke luar — versi lingkaran
 * terpotong `overflow-hidden` tepat di bagian paling terangnya sehingga
 * meninggalkan garis lurus di tepi kartu. `rounded-[inherit]` menjaga
 * sudutnya tetap membulat meski induknya gagal meng-clip (bug Chrome:
 * `overflow-hidden` + `border-radius` + `backdrop-filter`).
 *
 * Kilaunya statis, tidak ikut menyala saat hover — lihat catatan di atas
 * soal perubahan terang di dekat tepi kartu.
 */
export const cardSheen =
  "pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(60%_55%_at_100%_0%,rgba(255,255,255,0.10),rgba(255,255,255,0)_70%)]";

/**
 * Permukaan buram untuk teks panjang (mis. isi artikel).
 * Teks bacaan panjang di atas kaca/video sulit dibaca, jadi bagian ini
 * sengaja tetap solid.
 */
export const readingSurface =
  "rounded-3xl bg-[#f6f4ee] shadow-[0_28px_70px_rgba(0,0,0,0.45)]";
