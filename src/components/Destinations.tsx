"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Images } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { categories, destinations, type Lang } from "@/data/site";
import { categoryIcons } from "@/lib/categoryIcons";
import { duration, easeOut } from "@/lib/motion";
import { glassCard, glassSubtle } from "@/lib/ui";
import { MountainScene } from "./MountainScene";
import { CategorySelector } from "./CategorySelector";
import type { Article } from "@/lib/content";

type Category = (typeof categories)[number];
type Destination = (typeof destinations)[number];

/**
 * Artikel yang isinya benar-benar membahas kategori terkait. Kategori tanpa
 * entri di sini sengaja tidak diberi artikel paksaan — panel akan
 * menampilkan status "segera hadir" yang jujur.
 */
const categoryArticleSlug: Partial<Record<string, string>> = {
  hiking: "persiapan-mendaki-buntu-pentuho",
  homestay: "mengenal-dusun-lombo-ipo",
};

export function Destinations({ articles }: { articles: Article[] }) {
  const { lang, t } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>(categories[0].key);

  const active = categories.find((c) => c.key === activeKey) ?? categories[0];
  const ActiveIcon = categoryIcons[active.icon];
  const destination = destinations.find((d) => d.category === activeKey);
  const articleSlug = categoryArticleSlug[activeKey];
  const article = articleSlug ? articles.find((a) => a.slug === articleSlug) : undefined;

  return (
    <section className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-white/70">
            {t.explore.kicker}
          </p>
          <h1 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
            {t.destinations.title}
          </h1>
          <p className="text-sm leading-relaxed text-white/80">{t.explore.body}</p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl lg:mt-10">
          <CategorySelector activeKey={activeKey} onSelect={setActiveKey} />
        </div>

        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: easeOut }}
          className={`mt-8 overflow-hidden lg:mt-10 ${glassCard}`}
        >
          {active.key === "viewpoint" ? (
            <GalleryPanel category={active} lang={lang} />
          ) : (
            <ArticlePanel
              category={active}
              ActiveIcon={ActiveIcon}
              destination={destination}
              article={article}
              lang={lang}
              readMoreLabel={t.destinations.readMore}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ArticlePanel({
  category,
  ActiveIcon,
  destination,
  article,
  lang,
  readMoreLabel,
}: {
  category: Category;
  ActiveIcon: LucideIcon;
  destination: Destination | undefined;
  article: Article | undefined;
  lang: Lang;
  readMoreLabel: string;
}) {
  const hasRealPhoto = destination?.key === "pentuho";
  const statusLabel = destination
    ? destination[lang].status
    : lang === "id"
      ? "Segera hadir"
      : "Coming soon";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative h-56 sm:h-72 lg:h-full lg:min-h-[380px]">
        {hasRealPhoto ? (
          <Image
            src="/images/gunung-pentuho.jpg"
            alt={destination[lang].title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <MountainScene accent={category.accent} className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08160f]/75 via-[#08160f]/10 to-transparent" />
        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#153e2a]">
          <ActiveIcon size={18} strokeWidth={2} />
        </div>
        <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          {category[lang].title}
        </p>
        <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
          {destination ? destination[lang].title : category[lang].title}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-white/75">
          {destination ? destination[lang].desc : category[lang].desc}
        </p>

        {article ? (
          <Link
            href={`/stories/${article.slug}`}
            className={`group flex items-center justify-between gap-4 !rounded-2xl p-4 transition-all duration-400 hover:border-white/25 hover:bg-white/[0.12] ${glassSubtle}`}
          >
            <div className="min-w-0">
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">
                {lang === "id" ? "Artikel terkait" : "Related article"}
              </p>
              <p className="truncate text-sm font-semibold text-white">
                {article[lang].title}
              </p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
          </Link>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 p-4 text-xs leading-relaxed text-white/60">
            {lang === "id"
              ? "Artikel terkait kategori ini akan segera ditambahkan."
              : "A related article for this category is coming soon."}
          </div>
        )}

        {article && (
          <Link
            href="/stories"
            className="mt-4 inline-flex items-center gap-1.5 self-start text-[11px] font-bold uppercase tracking-[0.15em] text-white/70 transition hover:text-white"
          >
            {readMoreLabel}
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </Link>
        )}
      </div>
    </div>
  );
}

function GalleryPanel({ category, lang }: { category: Category; lang: Lang }) {
  return (
    <div className="p-7 sm:p-9">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
        {category[lang].title}
      </p>
      <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
        {category[lang].title}
      </h2>
      <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/75">{category[lang].desc}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-2xl">
            <MountainScene accent={category.accent} className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-center text-[9px] font-semibold uppercase tracking-wide text-white/80">
              {lang === "id" ? "Segera Hadir" : "Coming Soon"}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-white/20 p-4 text-xs leading-relaxed text-white/60">
        <Images size={16} className="shrink-0 text-white/40" />
        {lang === "id"
          ? "Galeri foto dan video untuk spot foto sedang dikumpulkan bersama PokDarWis Pentuho Malolo."
          : "The photo and video gallery for this viewpoint is being compiled together with PokDarWis Pentuho Malolo."}
      </div>
    </div>
  );
}
