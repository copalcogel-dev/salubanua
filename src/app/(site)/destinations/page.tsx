import type { Metadata } from "next";
import { Destinations } from "@/components/Destinations";
import { getArticles } from "@/lib/content";
import { getDestinations } from "@/lib/destinations";
import { getCategories } from "@/lib/categories";
import { getPageContent } from "@/lib/pageContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("destinations");
  return {
    title: content.seoTitle ?? "Destinasi",
    description:
      content.seoDescription ??
      "Jelajahi kategori wisata dan destinasi pilihan Desa Salubanua, mulai dari Gunung Pentuho hingga air terjun dan camping ground.",
  };
}

export default async function DestinationsPage() {
  const [content, articles, categories, destinations] = await Promise.all([
    getPageContent("destinations"),
    getArticles(),
    getCategories(),
    getDestinations(),
  ]);

  return (
    <Destinations
      content={content}
      articles={articles}
      categories={categories}
      destinations={destinations}
    />
  );
}
