"use client";

/**
 * Backdrop video tetap (fixed) untuk seluruh situs — dirender sekali di
 * root layout sehingga tidak ikut scroll dan tidak reload saat berpindah
 * halaman (video hidup di layout, bukan di tiap page). Semua section di
 * atasnya transparan supaya video ini selalu terlihat di baliknya.
 */
const SITE_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4";

export function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <video
        src={SITE_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
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
