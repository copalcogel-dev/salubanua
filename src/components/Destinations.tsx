"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Images, PlayCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { type Lang } from "@/data/site";
import { categoryIcons } from "@/lib/categoryIcons";
import { duration, easeOut } from "@/lib/motion";
import { glassCard, glassSubtle, surfaceTransition } from "@/lib/ui";
import { MountainScene } from "./MountainScene";
import { CategorySelector } from "./CategorySelector";
import type { Article } from "@/lib/content";
import type { DestinationEntry } from "@/lib/destinations";
import type { CategoryEntry } from "@/lib/categories";
import type { PageContent } from "@/lib/pageContent";

/**
 * Artikel yang isinya benar-benar membahas kategori terkait. Kategori tanpa
 * entri di sini sengaja tidak diberi artikel paksaan — panel akan
 * menampilkan status "segera hadir" yang jujur.
 */
const categoryArticleSlug: Partial<Record<string, string>> = {
  hiking: "persiapan-mendaki-buntu-pentuho",
  homestay: "mengenal-dusun-lombo-ipo",
};

export function Destinations({
  content,
  articles,
  categories,
  destinations,
}: {
  content: PageContent;
  articles: Article[];
  categories: CategoryEntry[];
  destinations: DestinationEntry[];
}) {
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
            {content.kicker[lang]}
          </p>
          <h1 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
            {content.title[lang]}
          </h1>
          <p className="text-sm leading-relaxed text-white/80">{content.body[lang]}</p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl lg:mt-10">
          <CategorySelector
            categories={categories}
            activeKey={activeKey}
            onSelect={setActiveKey}
          />
        </div>

        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: easeOut }}
          className={`mt-8 overflow-hidden lg:mt-10 ${glassCard}`}
        >
          {active.key === "viewpoint" ? (
            <GalleryPanel
              category={active}
              destination={destination}
              lang={lang}
              sampleLabel={t.stories.sampleBadge}
            />
          ) : (
            <ArticlePanel
              category={active}
              ActiveIcon={ActiveIcon}
              destination={destination}
              article={article}
              lang={lang}
              readMoreLabel={t.destinations.readMore}
              sampleLabel={t.stories.sampleBadge}
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
  sampleLabel,
}: {
  category: CategoryEntry;
  ActiveIcon: LucideIcon;
  destination: DestinationEntry | undefined;
  article: Article | undefined;
  lang: Lang;
  readMoreLabel: string;
  sampleLabel: string;
}) {
  const statusLabel = destination?.isSample
    ? sampleLabel
    : destination
      ? destination[lang].status
      : lang === "id"
        ? "Segera hadir"
        : "Coming soon";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative h-56 overflow-hidden rounded-t-3xl sm:h-72 lg:h-full lg:min-h-[380px] lg:rounded-l-3xl lg:rounded-tr-none">
        {destination?.coverImageUrl ? (
          <Image
            src={destination.coverImageUrl}
            alt={destination[lang].title}
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        ) : (
          <MountainScene accent={category.accent} className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08160f]/75 via-[#08160f]/10 to-transparent" />
        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#153e2a]">
          <ActiveIcon size={18} strokeWidth={2} />
        </div>
        {statusLabel && (
          <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            {statusLabel}
          </span>
        )}
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
            className={`group flex items-center justify-between gap-4 !rounded-2xl p-4 ${surfaceTransition} duration-400 hover:border-white/25 hover:bg-white/[0.12] ${glassSubtle}`}
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

function GalleryPanel({
  category,
  destination,
  lang,
  sampleLabel,
}: {
  category: CategoryEntry;
  destination: DestinationEntry | undefined;
  lang: Lang;
  sampleLabel: string;
}) {
  // Foto galeri dari Studio dipakai bila ada; kalau belum, foto sampul dan
  // ilustrasi bawaan mengisi kotaknya supaya tata letaknya tetap utuh.
  const photos = destination?.galleryUrls.length
    ? destination.galleryUrls.slice(0, 4)
    : destination?.coverImageUrl
      ? [destination.coverImageUrl]
      : [];
  const placeholderAccents = [category.accent, "#7fa9a3", "#4a5d3a", "#2f5233"];
  const tiles = Array.from({ length: 4 }, (_, i) => photos[i] ?? null);
  const usingRealGallery = (destination?.galleryUrls.length ?? 0) > 0;

  return (
    <div className="p-7 sm:p-9">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
        {category[lang].title}
      </p>
      <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
        {destination ? destination[lang].title : category[lang].title}
      </h2>
      <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/75">
        {destination ? destination[lang].desc : category[lang].desc}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map((photo, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-2xl">
            {photo ? (
              <Image
                src={photo}
                alt={destination?.[lang].title ?? category[lang].title}
                fill
                sizes="(min-width: 640px) 260px, 45vw"
                className="object-cover"
              />
            ) : (
              <MountainScene
                accent={placeholderAccents[i % placeholderAccents.length]}
                className="h-full w-full object-cover"
              />
            )}
            {destination?.isSample && (
              <span className="absolute right-2 top-2 rounded-full bg-white/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                {sampleLabel}
              </span>
            )}
          </div>
        ))}

        {destination?.videoUrl ? (
          <a
            href={destination.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex aspect-square items-center justify-center overflow-hidden !rounded-2xl text-white/70 ${surfaceTransition} duration-300 hover:text-white ${glassSubtle}`}
          >
            <div className="flex flex-col items-center gap-1.5 px-3 text-center">
              <PlayCircle size={22} strokeWidth={1.5} />
              <span className="text-[9px] font-semibold uppercase tracking-wide">
                {lang === "id" ? "Tonton Video" : "Watch Video"}
              </span>
            </div>
          </a>
        ) : (
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/[0.03] text-white/50">
            <div className="flex flex-col items-center gap-1.5 px-3 text-center">
              <PlayCircle size={22} strokeWidth={1.5} />
              <span className="text-[9px] font-semibold uppercase tracking-wide">
                {lang === "id" ? "Video Menyusul" : "Video Coming Soon"}
              </span>
            </div>
          </div>
        )}
      </div>

      {!usingRealGallery && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-white/20 p-4 text-xs leading-relaxed text-white/60">
          <Images size={16} className="shrink-0 text-white/40" />
          {lang === "id"
            ? "Foto di atas masih contoh tampilan. Unggah foto galeri di dasbor admin untuk menggantikannya."
            : "The photos above are still placeholders. Upload gallery photos in the admin dashboard to replace them."}
        </div>
      )}
    </div>
  );
}
