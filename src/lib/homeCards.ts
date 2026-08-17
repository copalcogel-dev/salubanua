import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageRef } from "@/sanity/lib/queries";
import { fetchSanityDestinations, fetchSanityHomeCards } from "@/sanity/lib/queries";
import { destinations as localDestinations } from "@/data/site";

/**
 * Kartu carousel Beranda — sumbernya dokumen `homeCard` di Studio, terpisah
 * penuh dari destinasi supaya mengubah salah satu tidak pernah ikut mengubah
 * yang lain.
 */
export type HomeCardEntry = {
  key: string;
  category: string;
  isSample: boolean;
  /** Berurutan sesuai susunan di Studio; kartu berganti-ganti di antaranya. */
  imageUrls: string[];
  id: { title: string; subtitle: string; desc: string };
  en: { title: string; subtitle: string; desc: string };
};

/**
 * Sengaja hanya `.width()` tanpa `.height()`: begitu tinggi ikut diminta,
 * Sanity menambahkan crop `rect=` untuk memaksa foto masuk rasio itu. Kartu
 * Beranda menampilkan foto utuh, jadi pemotongan apa pun di sisi server
 * justru merusak yang ingin dicapai.
 */
function toFullUrl(img: SanityImageRef) {
  return urlForImage(img!).width(1200).fit("max").url();
}

function localToHomeCard(d: (typeof localDestinations)[number]): HomeCardEntry {
  return {
    key: d.key,
    category: d.category,
    isSample: d.isSample,
    imageUrls: d.key === "pentuho" ? ["/images/gunung-pentuho.jpg"] : [],
    id: { title: d.id.title, subtitle: d.id.subtitle, desc: d.id.desc },
    en: { title: d.en.title, subtitle: d.en.subtitle, desc: d.en.desc },
  };
}

export async function getHomeCards(): Promise<HomeCardEntry[]> {
  const cards = await fetchSanityHomeCards();

  if (cards.length > 0) {
    return cards.map((c) => ({
      key: c._id,
      category: c.category,
      isSample: c.isSample ?? false,
      imageUrls: (c.images ?? []).filter(Boolean).map(toFullUrl),
      id: { title: c.titleId, subtitle: c.subtitleId ?? "", desc: c.descId },
      en: { title: c.titleEn, subtitle: c.subtitleEn ?? "", desc: c.descEn },
    }));
  }

  // Selama belum ada satu pun Kartu Beranda dibuat di Studio, isinya
  // dipinjam dari destinasi supaya Beranda tidak mendadak kosong. Ini
  // sekadar jembatan satu arah — mengedit Beranda nanti tidak akan pernah
  // menulis balik ke destinasi. Begitu kartu pertama dibuat, seluruh isi
  // Beranda pindah ke dokumen `homeCard`, jadi sebaiknya semua kartu dibuat
  // sekaligus (lihat scripts/seed-home-cards.mjs).
  const fromDestinations = await fetchSanityDestinations();
  if (fromDestinations.length > 0) {
    return fromDestinations.map((d) => ({
      key: d._id,
      category: d.category,
      isSample: d.isSample ?? false,
      imageUrls: [d.coverImage, ...(d.gallery ?? [])].filter(Boolean).map(toFullUrl),
      id: { title: d.titleId, subtitle: d.subtitleId ?? "", desc: d.descId },
      en: { title: d.titleEn, subtitle: d.subtitleEn ?? "", desc: d.descEn },
    }));
  }

  return localDestinations.map(localToHomeCard);
}
