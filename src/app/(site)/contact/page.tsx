import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { getSiteSettings } from "@/lib/siteSettings";
import { getPageContent } from "@/lib/pageContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent("contact");
  return {
    title: content.seoTitle ?? "Kontak",
    description:
      content.seoDescription ??
      "Alamat, pengelola, dan kontak Desa Salubanua, Kecamatan Mambi, Kabupaten Mamasa, Sulawesi Barat.",
  };
}

export default async function ContactPage() {
  const [content, settings] = await Promise.all([
    getPageContent("contact"),
    getSiteSettings(),
  ]);

  return (
    <Contact
      content={content}
      contactInfo={settings.contact}
      village={settings.village}
    />
  );
}
