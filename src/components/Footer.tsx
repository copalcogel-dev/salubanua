"use client";

import Link from "next/link";
import { Mountain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { VillageProfile } from "@/lib/siteSettings";

/**
 * Satu footer untuk seluruh situs.
 *
 * Sengaja ringkas satu baris agar identik di setiap halaman — termasuk di
 * beranda yang dirancang muat satu layar tanpa scroll.
 */
export function Footer({ village }: { village: VillageProfile }) {
  const { t } = useLanguage();

  const links = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.destinations, href: "/destinations" },
    { label: t.nav.stories, href: "/stories" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="shrink-0 border-t border-white/10 bg-black/20 py-4 text-white/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center lg:flex-row lg:justify-between lg:gap-6 lg:px-10 lg:text-left">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-white transition hover:opacity-80"
        >
          <Mountain size={16} strokeWidth={1.5} />
          <span className="text-[11px] tracking-[0.22em] uppercase">Salubanua</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] uppercase tracking-wide transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-[11px] leading-tight">
          Dusun {village.dusun}, {village.desa} &middot; Kec. {village.kecamatan},{" "}
          {village.kabupaten}
        </p>

        <p className="shrink-0 text-[11px] text-white/40">
          &copy; {new Date().getFullYear()} {village.pengelola.nama}
        </p>
      </div>
    </footer>
  );
}
