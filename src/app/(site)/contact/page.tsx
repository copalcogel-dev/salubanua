import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Kontak | Salubanua",
  description:
    "Alamat, pengelola, dan kontak Desa Salubanua, Kecamatan Mambi, Kabupaten Mamasa, Sulawesi Barat.",
};

export default function ContactPage() {
  return <Contact />;
}
