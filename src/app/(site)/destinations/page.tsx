import type { Metadata } from "next";
import { Destinations } from "@/components/Destinations";
import { getArticles } from "@/lib/content";
import { getDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destinasi | Salubanua",
  description:
    "Jelajahi kategori wisata dan destinasi pilihan Desa Salubanua, mulai dari Gunung Pentuho hingga air terjun dan camping ground.",
};

export const revalidate = 60;

export default async function DestinationsPage() {
  const [articles, destinations] = await Promise.all([getArticles(), getDestinations()]);

  return <Destinations articles={articles} destinations={destinations} />;
}
