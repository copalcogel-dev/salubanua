import { client } from "./client";
import { isSanityConfigured } from "@/sanity/env";

export type PostSummary = {
  _id: string;
  slug: string;
  titleId: string;
  titleEn: string;
  excerptId: string;
  excerptEn: string;
  category: string;
  publishedAt: string;
  coverImage: { asset: { _ref: string } } | null;
};

const LATEST_POSTS_QUERY = /* groq */ `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) [0...3] {
    _id,
    "slug": slug.current,
    "titleId": title.id,
    "titleEn": title.en,
    "excerptId": excerpt.id,
    "excerptEn": excerpt.en,
    category,
    publishedAt,
    coverImage
  }
`;

export async function getLatestPosts(): Promise<PostSummary[]> {
  if (!isSanityConfigured || !client) return [];
  try {
    return await client.fetch(LATEST_POSTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}
