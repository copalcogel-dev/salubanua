"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Camera, PlayCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { categoryIcons } from "@/lib/categoryIcons";
import { duration, easeOut } from "@/lib/motion";
import { glassCard, glassSubtle, surfaceTransition } from "@/lib/ui";
import { CategorySelector } from "./CategorySelector";
import { Lightbox, toEmbedUrl, type LightboxItem } from "./Lightbox";
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

type MediaTab = "photo" | "video";

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
  const [tab, setTab] = useState<MediaTab>("photo");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const active = categories.find((c) => c.key === activeKey) ?? categories[0];
  const ActiveIcon = categoryIcons[active.icon];
  const categoryDestinations = useMemo(
    () => destinations.filter((d) => d.category === activeKey),
    [destinations, activeKey]
  );

  const photos: LightboxItem[] = useMemo(
    () =>
      categoryDestinations.flatMap((d): LightboxItem[] => {
        const urls = [d.coverImageUrl, ...d.galleryUrls].filter(
          (u): u is string => Boolean(u)
        );
        return urls.map((url) => ({
          type: "image",
          url,
          alt: d[lang].title,
          isSample: d.isSample,
        }));
      }),
    [categoryDestinations, lang]
  );

  const videos: LightboxItem[] = useMemo(
    () =>
      categoryDestinations
        .filter((d) => d.videoUrl)
        .map(
          (d): LightboxItem => ({
            type: "video",
            url: d.videoUrl!,
            embedUrl: toEmbedUrl(d.videoUrl!),
            poster: d.coverImageUrl,
            alt: d[lang].title,
            isSample: d.isSample,
          })
        ),
    [categoryDestinations, lang]
  );

  const activeItems = tab === "photo" ? photos : videos;
  const articleSlug = categoryArticleSlug[activeKey];
  const article = articleSlug ? articles.find((a) => a.slug === articleSlug) : undefined;

  const selectCategory = (key: string) => {
    setActiveKey(key);
    setTab("photo");
  };

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
            onSelect={selectCategory}
          />
        </div>

        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: easeOut }}
          className={`mt-8 overflow-hidden p-6 sm:p-8 lg:mt-10 ${glassCard}`}
        >
          <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#153e2a]">
                <ActiveIcon size={19} strokeWidth={2} />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  {active[lang].title}
                </h2>
                <p className="text-xs leading-relaxed text-white/60 sm:text-sm">
                  {active[lang].desc}
                </p>
              </div>
            </div>

            {/* Tab Foto/Video — mirip Instagram, memisahkan galeri foto dari video. */}
            <div className={`flex shrink-0 gap-1 !rounded-full p-1 ${glassSubtle}`}>
              <button
                type="button"
                onClick={() => setTab("photo")}
                aria-pressed={tab === "photo"}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide ${surfaceTransition} duration-300 ${
                  tab === "photo" ? "bg-white text-[#153e2a]" : "text-white/70"
                }`}
              >
                <Camera size={13} strokeWidth={2} />
                {t.destinations.photoTab} ({photos.length})
              </button>
              <button
                type="button"
                onClick={() => setTab("video")}
                aria-pressed={tab === "video"}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide ${surfaceTransition} duration-300 ${
                  tab === "video" ? "bg-white text-[#153e2a]" : "text-white/70"
                }`}
              >
                <PlayCircle size={13} strokeWidth={2} />
                {t.destinations.videoTab} ({videos.length})
              </button>
            </div>
          </div>

          {activeItems.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 sm:gap-2">
              {activeItems.map((item, i) => (
                <button
                  key={`${item.url}-${i}`}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl"
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.url}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 200px, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      {item.poster ? (
                        <Image
                          src={item.poster}
                          alt={item.alt}
                          fill
                          sizes="(min-width: 1024px) 200px, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#0d2a1d]" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <PlayCircle size={28} strokeWidth={1.5} className="text-white" />
                      </div>
                    </>
                  )}
                  {item.isSample && (
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-white/15 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                      {t.stories.sampleBadge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/20 p-6 text-center text-sm text-white/60">
              {tab === "photo" ? t.destinations.noPhotos : t.destinations.noVideos}
            </p>
          )}

          {article && (
            <Link
              href={`/stories/${article.slug}`}
              className={`group mt-6 flex items-center justify-between gap-4 !rounded-2xl p-4 ${surfaceTransition} duration-400 hover:border-white/25 hover:bg-white/[0.12] ${glassSubtle}`}
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
          )}
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={activeItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          sampleLabel={t.stories.sampleBadge}
          openLabel={t.destinations.watchVideo}
        />
      )}
    </section>
  );
}

