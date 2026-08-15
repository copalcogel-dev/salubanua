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
  "statusEn": status.en
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
  socials: { platform: string; handle: string; url: string }[];
};

const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] { phone, socials }
`;

export async function fetchSanitySiteSettings(): Promise<SanitySiteSettings | null> {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}
