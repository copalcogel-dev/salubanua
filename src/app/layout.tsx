import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Salubanua | Jelajahi Pegunungan & Kehidupan Desa",
  description:
    "Gerbang digital menuju Gunung Pentuho, Dusun Lombo' Ipo, Desa Salubanua, Kecamatan Mambi, Kabupaten Mamasa, Sulawesi Barat.",
};

/**
 * Root layout sengaja minimal: hanya html/body/font.
 *
 * Seluruh "kulit" situs (video latar, navbar, footer) hidup di
 * app/(site)/layout.tsx supaya rute di luar situs — terutama Sanity Studio
 * di /studio — tidak ikut terbungkus navbar, footer, dan overlay intro.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0d2a1d]">{children}</body>
    </html>
  );
}
