import type { PortableTextBlock } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "@/sanity/env";

export type SanityImageRef = { asset: { _ref: string } } | null;

export type SanityPostSummary = {
  _id: string;
  slug: string;
  titleId: string;
  titleEn: string;
  excerptId: string;
  excerptEn: string;
  category: string | null;
  publishedAt: string;
  author: string | null;
  coverImage: SanityImageRef;
};

export type SanityPostDetail = SanityPostSummary & {
  bodyId: PortableTextBlock[] | null;
  bodyEn: PortableTextBlock[] | null;
};

const POST_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  "titleId": title.id,
  "titleEn": title.en,
  "excerptId": excerpt.id,
  "excerptEn": excerpt.en,
  category,
  publishedAt,
  author,
  coverImage
`;

const ALL_POSTS_QUERY = /* groq */ `
  *[_type == "post" && defined(publishedAt) && defined(slug.current)]
    | order(publishedAt desc) { ${POST_FIELDS} }
`;

const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    "bodyId": body.id,
    "bodyEn": body.en
  }
`;

const SLUGS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current)].slug.current
`;

export async function fetchSanityPosts(): Promise<SanityPostSummary[]> {
  if (!isSanityConfigured || !client) return [];
  try {
    return await client.fetch(ALL_POSTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

export async function fetchSanityPost(
  slug: string
): Promise<SanityPostDetail | null> {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function fetchSanitySlugs(): Promise<string[]> {
  if (!isSanityConfigured || !client) return [];
  try {
    return await client.fetch(SLUGS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

export type SanityDestination = {
  _id: string;
  category: string;
  titleId: string;
  titleEn: string;
  subtitleId: string | null;
  subtitleEn: string | null;
  descId: string;
  descEn: string;
  coverImage: SanityImageRef;
  available: boolean;
  statusId: string | null;
  statusEn: string | null;
  gallery: SanityImageRef[] | null;
  videoUrl: string | null;
};

const DESTINATION_FIELDS = /* groq */ `
  _id,
  category,
  "titleId": title.id,
  "titleEn": title.en,
  "subtitleId": subtitle.id,
  "subtitleEn": subtitle.en,
  "descId": description.id,
  "descEn": description.en,
  coverImage,
  available,
  "statusId": status.id,
  "statusEn": status.en,
  gallery,
  videoUrl
`;

const ALL_DESTINATIONS_QUERY = /* groq */ `
  *[_type == "destination" && defined(title.id)] | order(_createdAt asc) { ${DESTINATION_FIELDS} }
`;

export async function fetchSanityDestinations(): Promise<SanityDestination[]> {
  if (!isSanityConfigured || !client) return [];
  try {
    return await client.fetch(ALL_DESTINATIONS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

export type SanitySiteSettings = {
  phone: string | null;
  socials: { platform: string; handle: string; url: string }[] | null;
  dusun: string | null;
  desa: string | null;
  kecamatan: string | null;
  kabupaten: string | null;
  provinsi: string | null;
  pengelolaNama: string | null;
  pengelolaMitra: string | null;
};

const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] {
    phone, socials,
    dusun, desa, kecamatan, kabupaten, provinsi,
    pengelolaNama, pengelolaMitra
  }
`;

export async function fetchSanitySiteSettings(): Promise<SanitySiteSettings | null> {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

type SanityBilingual = { id: string | null; en: string | null } | null;

export type SanityPage = {
  key: string;
  kicker: SanityBilingual;
  title: SanityBilingual;
  subtitle: SanityBilingual;
  body: SanityBilingual;
  ctaLabel: SanityBilingual;
  seoTitle: string | null;
  seoDescription: string | null;
};

const PAGE_QUERY = /* groq */ `
  *[_type == "page" && key == $key][0] {
    key, kicker, title, subtitle, body, ctaLabel, seoTitle, seoDescription
  }
`;

export async function fetchSanityPage(key: string): Promise<SanityPage | null> {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch(PAGE_QUERY, { key }, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export type SanityCategory = {
  key: string;
  title: SanityBilingual;
  description: SanityBilingual;
};

const CATEGORIES_QUERY = /* groq */ `
  *[_type == "category" && defined(key)] { key, title, description }
`;

export async function fetchSanityCategories(): Promise<SanityCategory[]> {
  if (!isSanityConfigured || !client) return [];
  try {
    return await client.fetch(CATEGORIES_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}
