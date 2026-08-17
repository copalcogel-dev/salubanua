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
    ],
    /**
     * Kartu destinasi minta kualitas 90 (lihat DestinationCardRow.tsx) —
     * tanpa didaftarkan di sini, Next.js menolak nilai itu dan diam-diam
     * memakai kualitas bawaan 75, membuat perbaikan ketajaman foto
     * sebelumnya tidak benar-benar berlaku di production.
     */
    qualities: [75, 90],
  },
};

export default nextConfig;
