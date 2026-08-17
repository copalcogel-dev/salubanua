"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

/**
 * Backdrop tetap (fixed) untuk seluruh situs — dirender sekali di layout
 * `(site)` sehingga tidak ikut scroll dan tidak dimuat ulang saat berpindah
 * halaman. Semua section di atasnya transparan supaya latar ini terlihat.
 */
const SITE_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4";

/** Dipakai bila belum ada foto latar yang diunggah lewat Studio. */
const DEFAULT_POSTER = "/images/gunung-pentuho.jpg";

/**
 * Diputar di semua ukuran layar, termasuk HP, atas permintaan eksplisit —
 * konsistensi tampilan dianggap lebih penting daripada beban ~16 MB di
 * kuota mobile. Tetap dimatikan kalau pengguna minta animasi dikurangi.
 *
 * `getServerSnapshot` sengaja mengembalikan `false` supaya elemen <video>
 * tidak ikut terkirim dalam HTML awal dari server (baru muncul setelah
 * hydration mengecek preferensi), jadi tidak pernah mem-flash video lalu
 * menghilang untuk pengguna yang memang minta animasi dikurangi.
 */
const VIDEO_QUERY = "(prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(VIDEO_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function SiteBackground({
  posterUrl,
}: {
  /**
   * Foto latar dari Studio (khusus HP, karena video sengaja dimatikan di
   * layar kecil). `null` berarti belum diunggah — jatuh ke foto bawaan.
   */
  posterUrl: string | null;
}) {
  const showVideo = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(VIDEO_QUERY).matches,
    () => false
  );
  const poster = posterUrl ?? DEFAULT_POSTER;

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {showVideo && (
        <video
          src={SITE_VIDEO_URL}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
