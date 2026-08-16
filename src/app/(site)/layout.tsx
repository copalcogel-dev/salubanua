import { LanguageProvider } from "@/context/LanguageContext";
import { PageIntro } from "@/components/PageIntro";
import { Grain } from "@/components/Grain";
import { SiteBackground } from "@/components/SiteBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { getSiteSettings } from "@/lib/siteSettings";

/**
 * Kulit situs yang persisten.
 *
 * Video latar, navbar, dan footer dirender di sini sehingga tidak pernah
 * di-mount ulang saat pindah halaman — hanya bagian tengah (children) yang
 * berganti, lengkap dengan animasi transisinya.
 */
export const revalidate = 60;

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { village } = await getSiteSettings();

  return (
    <>
      <SiteBackground />
      <PageIntro />
      <Grain />
      <LanguageProvider>
        <div className="relative z-10 flex min-h-svh flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer village={village} />
        </div>
      </LanguageProvider>
    </>
  );
}
