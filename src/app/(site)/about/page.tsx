import type { Metadata } from "next";
import { VillageStory } from "@/components/VillageStory";

export const metadata: Metadata = {
  title: "Pengelola | Salubanua",
  description:
    "Cerita di balik Gunung Pentuho dan PokDarWis Pentuho Malolo, pengelola wisata Desa Salubanua.",
};

export default function AboutPage() {
  return <VillageStory />;
}
