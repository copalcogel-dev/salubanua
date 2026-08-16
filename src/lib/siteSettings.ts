import { fetchSanitySiteSettings } from "@/sanity/lib/queries";
import { contactInfo, villageProfile } from "@/data/site";

export type SiteContactInfo = {
  isSample: boolean;
  phone: string | null;
  whatsappUrl: string | null;
  socials: { platform: string; handle: string; url: string }[];
  mapUrl: string | null;
  coordinates: { lat: number; lng: number } | null;
};

export type VillageProfile = {
  dusun: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  pengelola: { nama: string; mitra: string };
};

export type SiteSettings = {
  contact: SiteContactInfo;
  village: VillageProfile;
};

/**
 * Profil desa dan kontak digabung per-kolom: kolom yang diisi di Studio
 * dipakai, sisanya jatuh ke data bawaan. Dengan begitu mengisi satu kolom
 * saja tidak membuat kolom lain jadi kosong.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const cms = await fetchSanitySiteSettings();

  const hasCmsContact = Boolean(cms?.phone?.trim() || cms?.socials?.length);

  const phone = cms?.phone?.trim() ? cms.phone : contactInfo.phone;
  const socials =
    cms?.socials?.length ? cms.socials : contactInfo.socials;

  /**
   * Kontak dianggap contoh bila memang belum ada di CMS, ATAU bila
   * pengelola menandainya sendiri lewat tombol "Kontak ini masih contoh".
   * Tanpa penanda kedua itu, nomor contoh yang diisikan ke CMS akan
   * tampil seolah-olah nomor resmi desa.
   */
  const isSample = hasCmsContact ? cms?.contactIsSample === true : true;

  // Lokasi peta bukan bagian dari status "contoh" di atas — koordinatnya
  // sudah data asli sejak awal, terlepas dari nomor/sosial media.
  const mapUrl = cms?.mapUrl?.trim() || contactInfo.mapUrl;
  const latitude = cms?.latitude ?? contactInfo.latitude;
  const longitude = cms?.longitude ?? contactInfo.longitude;

  return {
    contact: {
      isSample,
      phone,
      whatsappUrl: phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : null,
      socials,
      mapUrl: mapUrl || null,
      coordinates:
        typeof latitude === "number" && typeof longitude === "number"
          ? { lat: latitude, lng: longitude }
          : null,
    },
    village: {
      dusun: cms?.dusun?.trim() || villageProfile.dusun,
      desa: cms?.desa?.trim() || villageProfile.desa,
      kecamatan: cms?.kecamatan?.trim() || villageProfile.kecamatan,
      kabupaten: cms?.kabupaten?.trim() || villageProfile.kabupaten,
      provinsi: cms?.provinsi?.trim() || villageProfile.provinsi,
      pengelola: {
        nama: cms?.pengelolaNama?.trim() || villageProfile.pengelola.nama,
        mitra: cms?.pengelolaMitra?.trim() || villageProfile.pengelola.mitra,
      },
    },
  };
}
