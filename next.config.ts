import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Foto yang diunggah lewat Sanity Studio disajikan dari cdn.sanity.io.
     * Tanpa didaftarkan di sini, `next/image` menolaknya dan halaman yang
     * memuat foto tersebut gagal dirender.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        // Thumbnail otomatis untuk video (lihat toVideoThumbnail di
        // Lightbox.tsx), dipakai saat destinasinya belum punya Foto Sampul.
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
    /**
     * Kartu destinasi minta kualitas 90 (lihat DestinationCardRow.tsx) —
     * tanpa didaftarkan di sini, Next.js menolak nilai itu dan diam-diam
     * memakai kualitas bawaan 75, membuat perbaikan ketajaman foto
     * sebelumnya tidak benar-benar berlaku di production.
     */
    qualities: [75, 90],
  },
  /**
   * Header pengerasan standar untuk seluruh rute, termasuk /studio.
   *
   * Sengaja tidak menambahkan Content-Security-Policy: Studio memuat skrip,
   * font, dan koneksi API dari banyak domain Sanity berbeda (serta popup
   * login Google/GitHub), dan halaman Destinasi menyematkan iframe
   * YouTube/Vimeo — CSP yang ketat gampang diam-diam mematahkan salah satu
   * itu tanpa uji coba yang jauh lebih menyeluruh daripada yang bisa
   * dilakukan di sini. Header di bawah ini aman untuk semua rute.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
