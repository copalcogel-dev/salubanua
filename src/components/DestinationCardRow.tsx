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
    card: "w-[280px] sm:w-[360px] lg:w-[400px]",
    image: "h-28 sm:h-52 lg:h-56",
    pad: "p-3 sm:p-5",
    title: "text-base sm:text-lg",
    desc: "line-clamp-1 text-xs sm:line-clamp-2 sm:text-sm",
  },
} as const;

/**
 * Baris kartu dengan tombol panah kiri/kanan. Panah otomatis nonaktif
 * (memudar) saat semua kartu sudah muat tanpa perlu digeser — jujur soal
 * kapan benar-benar ada lebih banyak konten untuk dilihat.
 */
export function DestinationCardRow({
  items,
  size = "compact",
}: {
  items: DestinationCardItem[];
  size?: "compact" | "large";
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
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canLeft}
        aria-label="Sebelumnya"
        className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#153e2a] shadow-lg transition disabled:pointer-events-none disabled:opacity-0 sm:flex lg:-left-5"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        style={{ scrollbarWidth: "none" }}
        className="flex justify-center gap-4 overflow-x-auto scroll-smooth pb-1 [&::-webkit-scrollbar]:hidden sm:gap-5"
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
        className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#153e2a] shadow-lg transition disabled:pointer-events-none disabled:opacity-0 sm:flex lg:-right-5"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
