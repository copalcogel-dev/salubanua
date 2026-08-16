import type { Metadata } from "next";
import { VillageStory } from "@/components/VillageStory";
import { getDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Pengelola",
  description:
    "Cerita di balik Gunung Pentuho dan PokDarWis Pentuho Malolo, pengelola wisata Desa Salubanua.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const destinations = await getDestinations();

  return <VillageStory destinations={destinations} />;
}
