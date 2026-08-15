import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VillageStory } from "@/components/VillageStory";

export const metadata: Metadata = {
  title: "Pengelola | Salubanua",
  description:
    "Cerita di balik Gunung Pentuho dan PokDarWis Pentuho Malolo, pengelola wisata Desa Salubanua.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 sm:pt-32">
        <VillageStory />
      </main>
      <Footer />
    </>
  );
}
