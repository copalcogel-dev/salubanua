"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatArticleDate, type Article, type ArticleDetail } from "@/lib/content";
import { ArticleBody } from "./ArticleBody";
import { MountainScene } from "./MountainScene";
import { glassCard, readingSurface } from "@/lib/ui";

export function ArticleView({
  article,
  related,
}: {
  article: ArticleDetail;
  related: Article[];
}) {
  const { lang, t } = useLanguage();

  return (
    <article className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Link
          href="/stories"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition hover:text-white"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          {t.stories.backToStories}
        </Link>

        <div className={`p-6 sm:p-10 ${readingSurface}`}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4a7c59]">
            {formatArticleDate(article.publishedAt, lang)}
            {article.author ? ` · ${t.stories.byAuthor} ${article.author}` : ""}
          </p>

          <h1 className="mb-5 text-3xl font-semibold leading-tight text-[#153e2a] sm:text-4xl">
            {article[lang].title}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-[#3a4a41]">
            {article[lang].excerpt}
          </p>

          <div className="relative mb-10 h-64 overflow-hidden rounded-3xl sm:h-80">
            {article.coverImageUrl ? (
              <Image
                src={article.coverImageUrl}
                alt={article[lang].title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            ) : (
              <Image
                src="/images/gunung-pentuho.jpg"
                alt="Gunung Pentuho (Buntu Pentuho), Desa Salubanua"
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            )}
          </div>

          {article.isSample && (
            <div className="mb-10 flex items-start gap-3 rounded-2xl bg-[#fdf3e4] px-5 py-4">
              <Info size={18} className="mt-0.5 shrink-0 text-[#b9822c]" />
              <p className="text-sm leading-relaxed text-[#7a5716]">
                {t.stories.sampleNotice}
              </p>
            </div>
          )}

          <ArticleBody body={article.body[lang]} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-20 max-w-5xl px-6 lg:px-10">
          <h2 className="mb-8 text-2xl font-semibold text-white">
            {t.stories.title}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((r, i) => (
              <Link
                key={r.slug}
                href={`/stories/${r.slug}`}
                className={`group overflow-hidden ${glassCard}`}
              >
                <div className="relative h-32 overflow-hidden rounded-t-3xl">
                  {r.coverImageUrl ? (
                    <Image
                      src={r.coverImageUrl}
                      alt={r[lang].title}
                      fill
                      sizes="(min-width: 640px) 340px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <MountainScene
                      accent={["#2f6b74", "#5a5433", "#4a5d3a"][i % 3]}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08160f]/70 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    {formatArticleDate(r.publishedAt, lang)}
                  </p>
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                    {r[lang].title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
