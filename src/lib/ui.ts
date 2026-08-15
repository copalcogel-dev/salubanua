/**
 * Gaya permukaan bersama.
 *
 * Latar situs adalah video gelap, sehingga kartu putih solid terasa
 * "menempel" dan polos. Semua kartu memakai permukaan kaca (semi-transparan
 * + blur) dari sini supaya menyatu dengan latar dan konsisten antar halaman.
 */

/** Kartu kaca standar di atas latar video. */
export const glassCard =
  "rounded-3xl border border-white/15 bg-white/[0.07] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]";

/** Tambahan interaksi untuk kartu yang bisa diklik. */
export const glassCardInteractive =
  "transition-all duration-500 hover:border-white/30 hover:bg-white/[0.12] hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)]";

/** Varian lebih tipis, untuk elemen kecil seperti pil kategori. */
export const glassSubtle =
  "rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-md";

/**
 * Permukaan buram untuk teks panjang (mis. isi artikel).
 * Teks bacaan panjang di atas kaca/video sulit dibaca, jadi bagian ini
 * sengaja tetap solid.
 */
export const readingSurface =
  "rounded-3xl bg-[#f6f4ee] shadow-[0_28px_70px_rgba(0,0,0,0.45)]";
