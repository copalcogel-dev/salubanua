import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
