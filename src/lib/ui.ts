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
 * Tambahan interaksi untuk kartu yang bisa diklik.
 *
 * Sengaja tidak memakai `transition-all`: kartu carousel lebarnya dihitung
 * lewat JS, dan `transition-all` ikut menganimasikan `width` sehingga kartu
 * terlihat "melar" tiap kali diukur ulang. Cukup properti visual saja.
 *
 * Latar kartu sengaja TIDAK ikut menyala saat hover. Menaikkan opacity latar
 * di atas `backdrop-filter` mempertegas batas elemen (Chrome menyisakan
 * garis tipis di tepi elemen ber-backdrop-filter), sehingga hover memunculkan
 * garis samar di sela kartu. Cukup border, bayangan, dan sedikit terangkat —
 * hover tetap terbaca tanpa mengubah kontras di tepi.
 */
export const glassCardInteractive =
  "transition-[border-color,box-shadow,transform] duration-500 hover:border-white/40 hover:shadow-[0_22px_45px_-15px_rgba(0,0,0,0.65)]";

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
 */
export const cardSheen =
  "pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(60%_55%_at_100%_0%,rgba(255,255,255,0.10),rgba(255,255,255,0)_70%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100";

/**
 * Permukaan buram untuk teks panjang (mis. isi artikel).
 * Teks bacaan panjang di atas kaca/video sulit dibaca, jadi bagian ini
 * sengaja tetap solid.
 */
export const readingSurface =
  "rounded-3xl bg-[#f6f4ee] shadow-[0_28px_70px_rgba(0,0,0,0.45)]";
