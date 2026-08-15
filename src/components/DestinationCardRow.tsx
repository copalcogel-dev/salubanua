"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MountainScene } from "./MountainScene";
import { glassCard, glassCardInteractive } from "@/lib/ui";

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

const sizeStyles = {
  compact: {
    card: "w-[240px] sm:w-[270px]",
    image: "h-24 sm:h-28",
    pad: "p-3 sm:p-4",
    title: "text-sm",
    desc: "line-clamp-1 text-xs sm:line-clamp-2",
  },
  large: {
    card: "w-[168px] sm:w-[204px] lg:w-[222px]",
    image: "h-44 sm:h-60 lg:h-56",
    pad: "p-2.5 sm:p-4",
    title: "text-sm sm:text-base",
    desc: "line-clamp-1 text-xs sm:line-clamp-2",
  },
} as const;

const arrowButtonClass =
  "hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/25 sm:flex disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:bg-white/10";

/**
 * Baris kartu dengan tombol panah kiri/kanan di luar area kartu (bukan
 * menimpa kartu), supaya tidak ada kartu yang terlihat terpotong di
 * tampilan awal maupun saat digeser. Panah tetap terlihat, hanya memudar
 * saat tak ada lagi yang bisa digeser ke arah itu.
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
  const s = sizeStyles[size];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [items]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canLeft}
        aria-label="Sebelumnya"
        className={arrowButtonClass}
      >
        <ChevronLeft size={19} strokeWidth={2} />
      </button>

      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        style={{ scrollbarWidth: "none" }}
        className="flex flex-1 gap-4 overflow-x-auto scroll-smooth pb-1 [&::-webkit-scrollbar]:hidden sm:gap-5"
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.key}
              className={`group flex shrink-0 flex-col overflow-hidden ${s.card} ${glassCard} ${glassCardInteractive}`}
            >
              <div className={`relative shrink-0 overflow-hidden ${s.image}`}>
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
              <div className={s.pad}>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {item.subtitle}
                </p>
                <h4 className={`mb-1 font-semibold text-white ${s.title}`}>{item.title}</h4>
                <p className={`leading-relaxed text-white/70 ${s.desc}`}>{item.desc}</p>
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canRight}
        aria-label="Berikutnya"
        className={arrowButtonClass}
      >
        <ChevronRight size={19} strokeWidth={2} />
      </button>
    </div>
  );
}
