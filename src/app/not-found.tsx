import { LanguageProvider } from "@/context/LanguageContext";
import { PageIntro } from "@/components/PageIntro";
import { Grain } from "@/components/Grain";
import { SiteBackground } from "@/components/SiteBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NotFoundContent } from "@/components/NotFoundContent";
import { getSiteSettings } from "@/lib/siteSettings";

/**
 * Ini yang dipakai Next.js untuk path yang sama sekali tidak cocok dengan
 * rute manapun — grup `(site)` bukan segmen URL, jadi not-found di
 * dalamnya tidak pernah tersentuh untuk kasus ini. Kulit situs (latar,
 * navbar, footer) karena itu disusun ulang di sini secara mandiri.
 */
export default async function RootNotFound() {
  const { village, mobileBackgroundUrl } = await getSiteSettings();

  return (
    <>
      <SiteBackground posterUrl={mobileBackgroundUrl} />
      <PageIntro />
      <Grain />
      <LanguageProvider>
        <div className="relative z-10 flex min-h-svh flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col pt-20">
            <NotFoundContent />
          </main>
          <Footer village={village} />
        </div>
      </LanguageProvider>
    </>
  );
}
