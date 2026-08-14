import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { DiscoverVillage } from "@/components/DiscoverVillage";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { LocalExperience } from "@/components/LocalExperience";
import { Stories } from "@/components/Stories";
import { Contact } from "@/components/Contact";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { getArticles } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const articles = await getArticles();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <DiscoverVillage />
        <FeaturedDestinations />
        <LocalExperience />
        <Stories articles={articles} />
        <Contact />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
