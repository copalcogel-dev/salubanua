import { dictionary } from "@/data/site";
import { fetchSanityPage } from "@/sanity/lib/queries";

export type Bilingual = { id: string; en: string };

export type PageContent = {
  kicker: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
  body: Bilingual;
  ctaLabel: Bilingual;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type PageKey = "home" | "destinations" | "stories" | "about" | "contact";

/**
 * Teks bawaan tiap halaman, diambil dari kamus yang sudah ada.
 *
 * Ini yang dipakai selama kolom di Studio masih kosong, sehingga situs tidak
 * pernah tampil tanpa judul hanya karena kontennya belum diisi.
 */
function fallbackFor(key: PageKey): PageContent {
  const id = dictionary.id;
  const en = dictionary.en;
  const empty = { id: "", en: "" };

  switch (key) {
    case "home":
      return {
        kicker: { id: id.hero.kicker, en: en.hero.kicker },
        title: { id: id.hero.titleTop, en: en.hero.titleTop },
        subtitle: { id: id.hero.titleBottom, en: en.hero.titleBottom },
        body: { id: id.hero.body, en: en.hero.body },
        ctaLabel: { id: id.hero.cta, en: en.hero.cta },
        seoTitle: null,
        seoDescription: null,
      };
    case "destinations":
      return {
        kicker: { id: id.explore.kicker, en: en.explore.kicker },
        title: { id: id.destinations.title, en: en.destinations.title },
        subtitle: empty,
        body: { id: id.explore.body, en: en.explore.body },
        ctaLabel: empty,
        seoTitle: null,
        seoDescription: null,
      };
    case "stories":
      return {
        kicker: { id: id.stories.kicker, en: en.stories.kicker },
        title: { id: id.stories.allTitle, en: en.stories.allTitle },
        subtitle: empty,
        body: { id: id.stories.body, en: en.stories.body },
        ctaLabel: empty,
        seoTitle: null,
        seoDescription: null,
      };
    case "about":
      return {
        kicker: { id: id.discover.kicker, en: en.discover.kicker },
        title: { id: id.discover.title, en: en.discover.title },
        subtitle: empty,
        body: { id: id.discover.body, en: en.discover.body },
        ctaLabel: empty,
        seoTitle: null,
        seoDescription: null,
      };
    case "contact":
      return {
        kicker: { id: id.contact.kicker, en: en.contact.kicker },
        title: { id: id.contact.title, en: en.contact.title },
        subtitle: empty,
        body: empty,
        ctaLabel: empty,
        seoTitle: null,
        seoDescription: null,
      };
  }
}

/** Pakai teks dari Sanity hanya bila benar-benar terisi di kedua bahasa. */
function merge(
  cms: { id: string | null; en: string | null } | null | undefined,
  fallback: Bilingual
): Bilingual {
  return {
    id: cms?.id?.trim() ? cms.id : fallback.id,
    en: cms?.en?.trim() ? cms.en : fallback.en,
  };
}

export async function getPageContent(key: PageKey): Promise<PageContent> {
  const fallback = fallbackFor(key);
  const cms = await fetchSanityPage(key);
  if (!cms) return fallback;

  return {
    kicker: merge(cms.kicker, fallback.kicker),
    title: merge(cms.title, fallback.title),
    subtitle: merge(cms.subtitle, fallback.subtitle),
    body: merge(cms.body, fallback.body),
    ctaLabel: merge(cms.ctaLabel, fallback.ctaLabel),
    seoTitle: cms.seoTitle?.trim() ? cms.seoTitle : null,
    seoDescription: cms.seoDescription?.trim() ? cms.seoDescription : null,
  };
}
