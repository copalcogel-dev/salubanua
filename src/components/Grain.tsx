/**
 * Lapisan grain/noise halus di atas seluruh halaman.
 *
 * Memberi tekstur taktil seperti cetakan kertas — trik umum pada situs
 * editorial agar bidang warna datar tidak terasa "kosong". Wajib
 * pointer-events-none supaya tidak pernah menghalangi klik pengguna.
 */
export function Grain() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.035] mix-blend-multiply"
    >
      <filter id="salubanua-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#salubanua-grain)" />
    </svg>
  );
}
