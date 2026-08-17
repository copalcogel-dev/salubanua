import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { siteUrl } from "@/lib/siteUrl";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteName = "Salubanua";
const siteTitle = "Salubanua | Jelajahi Pegunungan & Kehidupan Desa";
const siteDescription =
  "Gerbang digital menuju Gunung Pentuho, Dusun Lombo' Ipo, Desa Salubanua, Kecamatan Mambi, Kabupaten Mamasa, Sulawesi Barat.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    // Judul tiap halaman ("Destinasi", "Kontak", …) otomatis diberi akhiran.
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Desa Salubanua",
    "Gunung Pentuho",
    "Buntu Pentuho",
    "Dusun Lombo' Ipo",
    "Mambi",
    "Mamasa",
    "Sulawesi Barat",
    "wisata desa",
    "PokDarWis Pentuho Malolo",
  ],
  // Pratinjau saat tautan dibagikan di WhatsApp, Facebook, dll.
  openGraph: {
    type: "website",
    siteName,
    locale: "id_ID",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Gunung Pentuho (Buntu Pentuho), Desa Salubanua",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
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
