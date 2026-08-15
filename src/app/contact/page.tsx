import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Kontak | Salubanua",
  description:
    "Alamat, pengelola, dan kontak Desa Salubanua, Kecamatan Mambi, Kabupaten Mamasa, Sulawesi Barat.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
