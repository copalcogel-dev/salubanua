import { categories as localCategories } from "@/data/site";
import { fetchSanityCategories } from "@/sanity/lib/queries";

export type CategoryEntry = {
  key: string;
  icon: string;
  accent: string;
  id: { title: string; desc: string };
  en: { title: string; desc: string };
};

/**
 * Kategori digabung per-kolom, bukan diganti seluruhnya seperti Artikel
 * atau Destinasi.
 *
 * Alasannya: jumlah dan urutan kategori menentukan ikon serta warna yang
 * ada di kode. Kalau daftar Sanity dipakai mentah-mentah, kategori yang
 * belum dibuat di Studio akan hilang dari situs. Jadi daftarnya tetap dari
 * kode, hanya nama dan deskripsinya yang boleh ditimpa dari Studio.
 */
export async function getCategories(): Promise<CategoryEntry[]> {
  const cms = await fetchSanityCategories();
  const byKey = new Map(cms.map((c) => [c.key, c]));

  return localCategories.map((local) => {
    const override = byKey.get(local.key);
    return {
      key: local.key,
      icon: local.icon,
      accent: local.accent,
      id: {
        title: override?.title?.id?.trim() || local.id.title,
        desc: override?.description?.id?.trim() || local.id.desc,
      },
      en: {
        title: override?.title?.en?.trim() || local.en.title,
        desc: override?.description?.en?.trim() || local.en.desc,
      },
    };
  });
}
