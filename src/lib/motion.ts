/**
 * Token animasi bersama.
 *
 * Semua transisi di situs memakai kurva & durasi dari sini supaya gerakannya
 * terasa satu bahasa — bukan tiap komponen punya timing sendiri-sendiri.
 */

/** Kurva "ease-out" halus, dipakai untuk hampir semua transisi masuk. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.35,
  base: 0.55,
  slow: 0.8,
} as const;

/** Transisi standar untuk elemen yang muncul. */
export const enterTransition = {
  duration: duration.base,
  ease: easeOut,
};

/** Pergantian halaman: konten tengah naik lembut sambil memudar masuk. */
export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Menyusun jeda berurutan untuk sekumpulan elemen (mis. kartu), supaya
 * muncul satu per satu, bukan serentak.
 */
export function stagger(index: number, step = 0.09, base = 0) {
  return base + index * step;
}

/** Efek angkat saat kursor berada di atas kartu. */
export const cardHover = {
  y: -8,
  transition: { duration: duration.fast, ease: easeOut },
};
