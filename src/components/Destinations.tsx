"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, PlayCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { categoryIcons } from "@/lib/categoryIcons";
import { duration, easeOut } from "@/lib/motion";
import { glassCard, glassSubtle, surfaceTransition } from "@/lib/ui";
import { CategorySelector } from "./CategorySelector";
import { Lightbox, toEmbedUrl, toVideoThumbnail, type LightboxItem } from "./Lightbox";
import type { DestinationEntry } from "@/lib/destinations";
import type { CategoryEntry } from "@/lib/categories";
import type { PageContent } from "@/lib/pageContent";

type MediaTab = "photo" | "video";

/**
 * URL query tidak pernah berubah tanpa navigasi ulang, jadi tidak perlu
 * benar-benar berlangganan perubahan — fungsi ini cuma memenuhi bentuk API
 * `useSyncExternalStore`.
 */
function subscribeNever() {
  return () => {};
}

export function Destinations({
  content,
  categories,
  destinations,
}: {
  content: PageContent;
  categories: CategoryEntry[];
  destinations: DestinationEntry[];
}) {
  const { lang, t } = useLanguage();

  // Datang dari kartu di beranda ("?category=hiking") — kategori yang tadi
  // aktif di sana harus langsung tampil di sini juga. Dibaca lewat
  // `useSyncExternalStore` (bukan `useSearchParams`) karena hook itu
  // mewajibkan boundary <Suspense>, dan boundary itu justru gagal total di
  // versi Next.js/Turbopack proyek ini — kontennya tidak pernah selesai
  // dimuat. `getServerSnapshot` mengembalikan `null` karena server tidak
  // tahu isi URL query, sama seperti pola di SiteBackground.tsx.
  const categoryFromUrl = useSyncExternalStore(
    subscribeNever,
    () => new URLSearchParams(window.location.search).get("category"),
    () => null
  );
  const initialKey =
    categoryFromUrl && categories.some((c) => c.key === categoryFromUrl)
      ? categoryFromUrl
      : categories[0].key;

  const [manualKey, setManualKey] = useState<string | null>(null);
  const [tab, setTab] = useState<MediaTab>("photo");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeKey = manualKey ?? initialKey;
  const setActiveKey = setManualKey;

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
      categoryDestinations.flatMap((d): LightboxItem[] =>
        d.videoUrls.map((url) => ({
          type: "video",
          url,
          embedUrl: toEmbedUrl(url),
          // Foto Sampul destinasi diutamakan; kalau belum ada, jatuh ke
          // thumbnail bawaan YouTube supaya kotaknya tidak gelap polos.
          poster: d.coverImageUrl ?? toVideoThumbnail(url),
          alt: d[lang].title,
          isSample: d.isSample,
        }))
      ),
    [categoryDestinations, lang]
  );

  const activeItems = tab === "photo" ? photos : videos;

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

