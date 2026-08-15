import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { getSiteSettings } from "@/lib/siteSettings";

export const metadata: Metadata = {
  title: "Kontak | Salubanua",
  description:
    "Alamat, pengelola, dan kontak Desa Salubanua, Kecamatan Mambi, Kabupaten Mamasa, Sulawesi Barat.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const contactInfo = await getSiteSettings();

  return <Contact contactInfo={contactInfo} />;
}
