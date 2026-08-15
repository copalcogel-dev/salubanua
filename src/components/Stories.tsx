"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatArticleDate, type Article } from "@/lib/content";
import { MountainScene } from "./MountainScene";

const fallbackAccents = ["#2f6b74", "#5a5433", "#4a5d3a", "#6b4a3f"];

export function Stories({ articles }: { articles: Article[] }) {
  const { lang, t } = useLanguage();
  const featured = articles.slice(0, 4);

  return (
    <section id="stories" className="bg-[#f6f4ee] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#e8f1ea] via-[#dfece3] to-[#d6e7dc] px-6 py-12 shadow-sm sm:px-10 sm:py-14">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-[#4a7c59]">
                {t.stories.kicker}
              </p>
              <h2 className="mb-3 text-3xl font-semibold text-[#153e2a] sm:text-4xl">
                {t.stories.title}
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-[#3a4a41]">
                {t.stories.body}
              </p>
            </div>
            <Link
              href="/stories"
              className="inline-block shrink-0 rounded-full bg-[#153e2a] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition hover:scale-105 hover:bg-[#1f5539]"
            >
              {t.stories.viewAll}
            </Link>
          </div>

          {featured.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#153e2a]/60">
              {t.stories.empty}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {featured.map((a, i) => (
                <motion.article
                  key={a.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    href={`/stories/${a.slug}`}
                    className="group relative block h-56 overflow-hidden rounded-3xl"
                  >
                    {a.coverImageUrl ? (
                      <Image
                        src={a.coverImageUrl}
                        alt={a[lang].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : i === 0 ? (
                      <Image
                        src="/images/gunung-pentuho.jpg"
                        alt={a[lang].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <MountainScene
                        accent={fallbackAccents[i % fallbackAccents.length]}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a1d]/90 via-[#0d2a1d]/30 to-transparent" />

                    {a.isSample && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-bold tracking-wide text-[#153e2a]">
                        {t.stories.sampleBadge}
                      </span>
                    )}

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div className="min-w-0">
                        <h3 className="mb-1 line-clamp-2 text-lg font-semibold leading-snug text-white">
                          {a[lang].title}
                        </h3>
                        <p className="text-[11px] text-white/70">
                          {formatArticleDate(a.publishedAt, lang)}
                        </p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#153e2a] transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
