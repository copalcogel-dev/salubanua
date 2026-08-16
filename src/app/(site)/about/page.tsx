import type { Metadata } from "next";
import { VillageStory } from "@/components/VillageStory";
import { getDestinations } from "@/lib/destinations";
import { getCategories } from "@/lib/categories";
import { getSiteSettings } from "@/lib/siteSettings";
import { getPageContent } from "@/lib/pageContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("about");
  return {
    title: content.seoTitle ?? "Pengelola",
    description:
      content.seoDescription ??
      "Cerita di balik Gunung Pentuho dan PokDarWis Pentuho Malolo, pengelola wisata Desa Salubanua.",
  };
}

export default async function AboutPage() {
  const [content, categories, destinations, settings] = await Promise.all([
    getPageContent("about"),
    getCategories(),
    getDestinations(),
    getSiteSettings(),
  ]);

  return (
    <VillageStory
      content={content}
      village={settings.village}
      categories={categories}
      destinations={destinations}
    />
  );
}
