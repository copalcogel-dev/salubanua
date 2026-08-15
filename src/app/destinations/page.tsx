import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Destinations } from "@/components/Destinations";

export const metadata: Metadata = {
  title: "Destinasi | Salubanua",
  description:
    "Jelajahi kategori wisata dan destinasi pilihan Desa Salubanua, mulai dari Gunung Pentuho hingga air terjun dan camping ground.",
};

export default function DestinationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <Destinations />
      </main>
      <Footer />
    </>
  );
}
