import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content";
import { siteUrl } from "@/lib/siteUrl";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/destinations", "/stories", "/about", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const articles = await getArticles();
  const articleRoutes = articles.map((a) => ({
    url: `${siteUrl}/stories/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
