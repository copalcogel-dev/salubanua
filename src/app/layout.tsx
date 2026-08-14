import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { PageIntro } from "@/components/PageIntro";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f6f4ee]">
        <PageIntro />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
