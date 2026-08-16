"use client";

import { categoryIcons } from "@/lib/categoryIcons";
import { glassSubtle, surfaceTransition } from "@/lib/ui";
import { useLanguage } from "@/context/LanguageContext";
import type { CategoryEntry } from "@/lib/categories";

/**
 * Baris tombol kategori yang dipakai di Beranda dan Destinasi, supaya
 * tampilan & perilakunya identik di kedua halaman.
 */
export function CategorySelector({
  categories,
  activeKey,
  onSelect,
  className = "",
}: {
  categories: CategoryEntry[];
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}) {
  const { lang } = useLanguage();

  return (
    // Tombol dibiarkan selebar isinya (bukan grid berkolom sama) supaya nama
    // kategori tampil utuh, tidak terpotong.
    <div className={`flex flex-wrap justify-center gap-2 sm:gap-2.5 ${className}`}>
      {categories.map((c) => {
        const Icon = categoryIcons[c.icon];
        const isActive = c.key === activeKey;

        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onSelect(c.key)}
            aria-pressed={isActive}
            className={`group flex items-center gap-2.5 px-3 py-2.5 text-left ${surfaceTransition} duration-400 sm:py-3 lg:px-4 ${
              isActive
                ? "rounded-2xl border border-white/40 bg-white/95 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
                : `${glassSubtle} hover:border-white/25 hover:bg-white/[0.12]`
            }`}
          >
            <span
              // Ikon disembunyikan di layar kecil supaya tiga tombol tetap
              // muat sebaris tanpa memotong namanya.
              className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-400 sm:flex ${
                isActive
                  ? "bg-[#153e2a] text-white"
                  : "bg-white/15 text-white group-hover:bg-white/25"
              }`}
            >
              <Icon size={14} strokeWidth={2} />
            </span>
            <span
              className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-400 lg:text-xs ${
                isActive ? "text-[#153e2a]" : "text-white/75 group-hover:text-white"
              }`}
            >
              {c[lang].title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
