"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatArticleDate, type Article } from "@/lib/content";
import { MountainScene } from "./MountainScene";
import { glassCard } from "@/lib/ui";
import type { PageContent } from "@/lib/pageContent";

const fallbackAccents = ["#2f6b74", "#5a5433", "#4a5d3a", "#6b4a3f", "#3f6b4f"];

export function StoriesList({
  articles,
  content,
}: {
  articles: Article[];
  content: PageContent;
}) {
  const { lang, t } = useLanguage();

  return (
    <section className="relative py-16 lg:py-20">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-white/70">
            {content.kicker[lang]}
          </p>
          <h1 className="mb-4 text-4xl font-semibold text-white sm:text-5xl">
            {content.title[lang]}
          </h1>
          <p className="text-[15px] leading-relaxed text-white/80">
            {content.body[lang]}
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="py-16 text-center text-sm text-white/60">
            {t.stories.empty}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <motion.article
                key={a.slug}
                initial={{ opacity: 1, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/stories/${a.slug}`}
                  // Isyarat hover ditaruh di dalam kartu (gambar & panah),
                  // bukan di permukaan/tepinya — lihat catatan di lib/ui.ts.
                  className={`group flex h-full flex-col overflow-hidden ${glassCard}`}
                >
                  <div className="relative h-44 shrink-0 overflow-hidden rounded-t-3xl">
                    {a.coverImageUrl ? (
                      <Image
                        src={a.coverImageUrl}
                        alt={a[lang].title}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : i === 0 ? (
                      <Image
                        src="/images/gunung-pentuho.jpg"
                        alt={a[lang].title}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <MountainScene
                        accent={fallbackAccents[i % fallbackAccents.length]}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08160f]/70 to-transparent" />
                    {a.isSample && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/15 px-3 py-1 text-[9px] font-bold tracking-wide text-white backdrop-blur-sm">
                        {t.stories.sampleBadge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      {formatArticleDate(a.publishedAt, lang)}
                    </p>
                    <h2 className="mb-3 text-lg font-semibold leading-snug text-white">
                      {a[lang].title}
                    </h2>
                    <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/70">
                      {a[lang].excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white">
                      {t.stories.readMore}
                      <ArrowUpRight
                        size={14}
                        strokeWidth={2.5}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
