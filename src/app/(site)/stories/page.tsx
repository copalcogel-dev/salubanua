import type { Metadata } from "next";
import { StoriesList } from "@/components/StoriesList";
import { getArticles } from "@/lib/content";
import { getPageContent } from "@/lib/pageContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("stories");
  return {
    title: content.seoTitle ?? "Artikel",
    description:
      content.seoDescription ??
      "Catatan perjalanan, panduan praktis, dan kabar seputar pengembangan wisata Desa Salubanua.",
  };
}

export default async function StoriesPage() {
  const [content, articles] = await Promise.all([
    getPageContent("stories"),
    getArticles(),
  ]);

  return <StoriesList articles={articles} content={content} />;
}
