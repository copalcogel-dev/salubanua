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
  },
};

export default nextConfig;
