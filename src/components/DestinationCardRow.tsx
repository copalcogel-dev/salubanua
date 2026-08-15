"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MountainScene } from "./MountainScene";
import { glassCard, glassCardInteractive, surfaceTransition } from "@/lib/ui";

export type DestinationCardItem = {
  key: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  image?: string;
  accent: string;
  isSample?: boolean;
};

/**
 * Jarak antar kartu harus lebih besar dari jangkauan blur backdrop kartu
 * (~1.5x radius blur, lihat catatan di `glassCard`). Kalau tidak, tiap
 * kartu ikut menyerap tepi kartu sebelahnya dan muncul garis samar di
 * selanya saat di-hover.
 */
const GAP = 28;
const ARROW_SIZE = 44;

/**
 * Lebar kartu & tinggi foto per breakpoint: [mobile, sm, lg].
 *
 * `maxPerPage` menahan jumlah kartu per halaman supaya carousel di beranda
 * tetap punya halaman berikutnya (kalau keempat kartu muat sekaligus,
 * tombol gesernya tidak ada gunanya).
 */
const sizePresets = {
  compact: { card: [150, 186, 206], image: [166, 196, 212], maxPerPage: 6 },
  large: { card: [156, 206, 244], image: [146, 228, 242], maxPerPage: 3 },
} as const;

function pickResponsive(values: readonly number[], viewportWidth: number) {
  if (viewportWidth >= 1024) return values[2];
  if (viewportWidth >= 640) return values[1];
  return values[0];
}

/**
 * Ukuran kartu dihitung dari lebar layar, jadi pengukurannya harus terjadi
 * sebelum paint agar kartu tidak sempat tampil dengan ukuran mobile di
 * desktop. Di server `useLayoutEffect` tidak tersedia, jadi jatuh ke
 * `useEffect`.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const arrowButtonClass = `hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md ${surfaceTransition} duration-300 hover:border-white/40 hover:bg-white/25 sm:flex disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:bg-white/10`;

/**
 * Carousel kartu yang bergeser per halaman.
 *
 * Lebar area kartu dikunci tepat sebesar jumlah kartu yang muat penuh, dan
 * setiap geseran mendarat persis di batas kartu — jadi tidak pernah ada
 * kartu yang tampil setengah terpotong, baik saat pertama muncul maupun
 * setelah digeser. Panah diletakkan di luar area kartu supaya tidak
 * menimpa konten, dan jaraknya simetris kiri-kanan.
 */
export function DestinationCardRow({
  items,
  size = "compact",
  sampleLabel = "CONTOH",
}: {
  items: DestinationCardItem[];
  size?: "compact" | "large";
  sampleLabel?: string;
}) {
  const preset = sizePresets[size];
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [cardW, setCardW] = useState<number>(preset.card[0]);
  const [imageH, setImageH] = useState<number>(preset.image[0]);
  const [perPage, setPerPage] = useState(1);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const syncArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;

    const vw = window.innerWidth;
    const nextCardW = pickResponsive(preset.card, vw);
    const nextImageH = pickResponsive(preset.image, vw);

    // Panah hanya tampil mulai breakpoint `sm`; di bawah itu ruangnya utuh
    // untuk kartu. Diukur dari baris (yang selalu selebar induknya) supaya
    // lebar track tidak ikut mempengaruhi hasil pengukuran.
    const arrowsShown = vw >= 640;
    const rowGap = vw >= 640 ? 16 : 12;
    const reserved = arrowsShown ? 2 * (ARROW_SIZE + rowGap) : 0;
    const available = row.clientWidth - reserved;

    // Berapa kartu utuh yang muat di ruang tersedia — sisa ruang yang tidak
    // cukup untuk satu kartu penuh sengaja dibiarkan kosong, bukan diisi
    // kartu yang terpotong.
    const fits = Math.floor((available + GAP) / (nextCardW + GAP));

    setCardW(nextCardW);
    setImageH(nextImageH);
    setPerPage(Math.min(Math.max(fits, 1), preset.maxPerPage, items.length));
    syncArrows();
  }, [items.length, preset, syncArrows]);

  useIsomorphicLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = cardW + GAP;
  const trackWidth = perPage * step - GAP;

  const goPage = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Halaman terakhir dipatok ke (jumlah - perPage) supaya posisi berhenti
    // selalu jatuh di batas kartu, tidak pernah menyisakan kartu separuh.
    const maxStart = Math.max(0, items.length - perPage);
    const current = Math.round(el.scrollLeft / step);
    const next = Math.min(Math.max(current + dir * perPage, 0), maxStart);
    el.scrollTo({ left: next * step, behavior: "smooth" });
  };

  return (
    <div
      ref={rowRef}
      className="flex w-full items-center justify-center gap-3 sm:gap-4"
    >
      <button
        type="button"
        onClick={() => goPage(-1)}
        disabled={!canLeft}
        aria-label="Sebelumnya"
        className={arrowButtonClass}
      >
        <ChevronLeft size={19} strokeWidth={2} />
      </button>

      <div
        ref={scrollerRef}
        onScroll={syncArrows}
        style={{ width: trackWidth, gap: GAP, scrollbarWidth: "none" }}
        // `overflow-x-auto` membuat overflow-y ikut jadi `auto`, jadi tanpa
        // padding vertikal kartu yang terangkat saat hover akan terpotong.
        className="flex max-w-full snap-x snap-mandatory overflow-x-auto scroll-smooth py-1 [&::-webkit-scrollbar]:hidden"
      >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.key}
                style={{ width: cardW }}
                className={`group flex shrink-0 snap-start flex-col overflow-hidden hover:-translate-y-0.5 ${glassCard} ${glassCardInteractive}`}
              >
                {/* Radius atas diulang di sini: induknya memakai
                    backdrop-filter, yang membuat clip membulatnya gagal di
                    Chrome sehingga foto tampil bersudut siku. */}
                <div
                  style={{ height: imageH }}
                  className="relative shrink-0 overflow-hidden rounded-t-3xl"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <MountainScene
                      accent={item.accent}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08160f]/75 to-transparent" />
                  <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#153e2a]">
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  {item.isSample && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold tracking-wide text-white backdrop-blur-sm">
                      {sampleLabel}
                    </span>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {item.subtitle}
                  </p>
                  <h4 className="mb-1 text-sm font-semibold text-white">{item.title}</h4>
                  <p className="line-clamp-1 text-xs leading-relaxed text-white/70 sm:line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </article>
            );
          })}
      </div>

      <button
        type="button"
        onClick={() => goPage(1)}
        disabled={!canRight}
        aria-label="Berikutnya"
        className={arrowButtonClass}
      >
        <ChevronRight size={19} strokeWidth={2} />
      </button>
    </div>
  );
}
