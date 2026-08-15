import { fetchSanitySiteSettings } from "@/sanity/lib/queries";
import { contactInfo } from "@/data/site";

export type SiteContactInfo = {
  isSample: boolean;
  phone: string | null;
  whatsappUrl: string | null;
  socials: { platform: string; handle: string; url: string }[];
};

export async function getSiteSettings(): Promise<SiteContactInfo> {
  const sanitySettings = await fetchSanitySiteSettings();

  if (sanitySettings && (sanitySettings.phone || sanitySettings.socials?.length)) {
    const phone = sanitySettings.phone ?? null;
    return {
      isSample: false,
      phone,
      whatsappUrl: phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : null,
      socials: sanitySettings.socials ?? [],
    };
  }

  return {
    isSample: contactInfo.isSample,
    phone: contactInfo.phone,
    whatsappUrl: contactInfo.whatsappUrl,
    socials: contactInfo.socials,
  };
}
