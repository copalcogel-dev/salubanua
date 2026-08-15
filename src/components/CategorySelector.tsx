"use client";

import { categories } from "@/data/site";
import { categoryIcons } from "@/lib/categoryIcons";
import { glassSubtle, surfaceTransition } from "@/lib/ui";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Baris tombol kategori yang dipakai di Beranda dan Destinasi, supaya
 * tampilan & perilakunya identik di kedua halaman.
 */
export function CategorySelector({
  activeKey,
  onSelect,
  className = "",
}: {
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}) {
  const { lang } = useLanguage();

  return (
    <div className={`grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-2.5 ${className}`}>
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
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-400 ${
                isActive
                  ? "bg-[#153e2a] text-white"
                  : "bg-white/15 text-white group-hover:bg-white/25"
              }`}
            >
              <Icon size={14} strokeWidth={2} />
            </span>
            <span
              className={`truncate text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-400 lg:text-xs ${
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
