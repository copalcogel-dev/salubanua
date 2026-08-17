import type { PortableTextBlock } from "next-sanity";
import { localArticles } from "@/data/articles";
import { urlForImage } from "@/sanity/lib/image";
import {
  fetchSanityPost,
  fetchSanityPosts,
  fetchSanitySlugs,
} from "@/sanity/lib/queries";

/**
 * Satu bentuk data artikel untuk seluruh UI, dari dua sumber:
 *  - Sanity  → dipakai begitu NEXT_PUBLIC_SANITY_PROJECT_ID tersedia
 *  - lokal   → artikel contoh (isSample) sebagai fallback saat CMS belum tersambung
 */
export type ArticleBody =
  | { kind: "plain"; paragraphs: string[] }
  | { kind: "portable"; blocks: PortableTextBlock[] };

export type Article = {
  slug: string;
  publishedAt: string;
  author: string | null;
  coverImageUrl: string | null;
  isSample: boolean;
  id: { title: string; excerpt: string };
  en: { title: string; excerpt: string };
};

export type ArticleDetail = Article & {
  body: { id: ArticleBody; en: ArticleBody };
};

function localToArticle(a: (typeof localArticles)[number]): Article {
  return {
    slug: a.slug,
    publishedAt: a.publishedAt,
    author: a.author,
    coverImageUrl: null,
    isSample: true,
    id: { title: a.id.title, excerpt: a.id.excerpt },
    en: { title: a.en.title, excerpt: a.en.excerpt },
  };
}

export async function getArticles(): Promise<Article[]> {
  const sanityPosts = await fetchSanityPosts();

  if (sanityPosts.length > 0) {
    return sanityPosts.map((p) => ({
      slug: p.slug,
      publishedAt: p.publishedAt,
      author: p.author,
      coverImageUrl: p.coverImage
        ? urlForImage(p.coverImage).width(1200).height(800).fit("max").url()
        : null,
      isSample: p.isSample ?? false,
      id: { title: p.titleId, excerpt: p.excerptId },
      en: { title: p.titleEn, excerpt: p.excerptEn },
    }));
  }

  return localArticles.map(localToArticle);
}

export async function getArticle(slug: string): Promise<ArticleDetail | null> {
  const post = await fetchSanityPost(slug);

  if (post) {
    return {
      slug: post.slug,
      publishedAt: post.publishedAt,
      author: post.author,
      coverImageUrl: post.coverImage
        ? urlForImage(post.coverImage).width(1600).height(900).fit("max").url()
        : null,
      isSample: post.isSample ?? false,
      id: { title: post.titleId, excerpt: post.excerptId },
      en: { title: post.titleEn, excerpt: post.excerptEn },
      body: {
        id: { kind: "portable", blocks: post.bodyId ?? [] },
        en: { kind: "portable", blocks: post.bodyEn ?? [] },
      },
    };
  }

  const local = localArticles.find((a) => a.slug === slug);
  if (!local) return null;

  return {
    ...localToArticle(local),
    body: {
      id: { kind: "plain", paragraphs: local.id.body },
      en: { kind: "plain", paragraphs: local.en.body },
    },
  };
}

export async function getArticleSlugs(): Promise<string[]> {
  const sanitySlugs = await fetchSanitySlugs();
  if (sanitySlugs.length > 0) return sanitySlugs;
  return localArticles.map((a) => a.slug);
}

export function formatArticleDate(iso: string, lang: "id" | "en") {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
