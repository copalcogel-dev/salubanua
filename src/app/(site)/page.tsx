import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { getDestinations } from "@/lib/destinations";
import { getCategories } from "@/lib/categories";
import { getPageContent } from "@/lib/pageContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("home");
  const metadata: Metadata = {};

  // Kunci hanya diisi bila ada nilainya. Mengembalikan `undefined` secara
  // eksplisit justru menimpa judul/deskripsi bawaan dari root layout dan
  // membuat tab browser jadi kosong.
  if (content.seoTitle) {
    // Beranda memakai judul apa adanya, bukan template "%s | Salubanua".
    metadata.title = { absolute: content.seoTitle };
  }
  if (content.seoDescription) {
    metadata.description = content.seoDescription;
  }

  return metadata;
}

export default async function Home() {
  const [content, categories, destinations] = await Promise.all([
    getPageContent("home"),
    getCategories(),
    getDestinations(),
  ]);

  return <Hero content={content} categories={categories} destinations={destinations} />;
}
