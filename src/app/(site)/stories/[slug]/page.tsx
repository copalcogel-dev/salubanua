import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { getArticle, getArticles, getArticleSlugs } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Artikel | Salubanua" };

  return {
    title: `${article.id.title} | Salubanua`,
    description: article.id.excerpt,
  };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const all = await getArticles();
  const related = all.filter((a) => a.slug !== slug).slice(0, 3);

  return <ArticleView article={article} related={related} />;
}
