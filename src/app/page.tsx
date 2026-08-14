import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DiscoverVillage } from "@/components/DiscoverVillage";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { LocalExperience } from "@/components/LocalExperience";
import { Contact } from "@/components/Contact";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DiscoverVillage />
        <FeaturedDestinations />
        <LocalExperience />
        <Contact />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
