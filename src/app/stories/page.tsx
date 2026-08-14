import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoriesList } from "@/components/StoriesList";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cerita | Salubanua",
  description:
    "Catatan perjalanan, panduan praktis, dan kabar seputar pengembangan wisata Desa Salubanua.",
};

export const revalidate = 60;

export default async function StoriesPage() {
  const articles = await getArticles();

  return (
    <>
      <Navbar />
      <main>
        <StoriesList articles={articles} />
      </main>
      <Footer />
    </>
  );
}
