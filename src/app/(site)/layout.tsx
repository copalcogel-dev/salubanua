import { LanguageProvider } from "@/context/LanguageContext";
import { PageIntro } from "@/components/PageIntro";
import { Grain } from "@/components/Grain";
import { SiteBackground } from "@/components/SiteBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { MaintenanceScreen } from "@/components/MaintenanceScreen";
import { getSiteSettings } from "@/lib/siteSettings";

/**
 * Kulit situs yang persisten.
 *
 * Video latar, navbar, dan footer dirender di sini sehingga tidak pernah
 * di-mount ulang saat pindah halaman — hanya bagian tengah (children) yang
 * berganti, lengkap dengan animasi transisinya.
 *
 * `/studio` hidup di luar grup rute ini (lihat app/studio), jadi Mode
 * Perbaikan di bawah ini tidak pernah mempengaruhi akses ke dasbor admin.
 */
export const revalidate = 60;

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { village, contact, mobileBackgroundUrl, maintenance } = await getSiteSettings();

  return (
    <>
      <SiteBackground posterUrl={mobileBackgroundUrl} />
      <PageIntro />
      <Grain />
      <LanguageProvider>
        {maintenance.enabled ? (
          <MaintenanceScreen title={maintenance.title} message={maintenance.message} />
        ) : (
          <div className="relative z-10 flex min-h-svh flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col pt-20">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer village={village} contact={contact} />
          </div>
        )}
      </LanguageProvider>
    </>
  );
}
