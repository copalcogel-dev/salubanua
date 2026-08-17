"use client";

import Link from "next/link";
import { Compass, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { glassCard } from "@/lib/ui";

const copy = {
  id: {
    kicker: "404",
    title: "Halaman tidak ditemukan",
    body: "Halaman yang dicari mungkin sudah dipindahkan atau alamatnya salah ketik.",
    cta: "Kembali ke Beranda",
  },
  en: {
    kicker: "404",
    title: "Page not found",
    body: "The page you're looking for may have moved, or the link is mistyped.",
    cta: "Back to Home",
  },
};

export function NotFoundContent() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <div className="relative z-10 flex min-h-[70svh] items-center justify-center px-6 py-16">
      <div className={`w-full max-w-md p-8 text-center sm:p-10 ${glassCard}`}>
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
          <Compass size={24} strokeWidth={1.6} />
        </span>
        <p className="mb-2 text-[11px] font-semibold tracking-[0.3em] text-white/60">
          {t.kicker}
        </p>
        <h1 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">{t.title}</h1>
        <p className="mb-6 text-sm leading-relaxed text-white/75">{t.body}</p>

        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[11px] font-bold tracking-[0.18em] text-[#153e2a] transition-all duration-300 hover:bg-white/90"
        >
          {t.cta}
          <ArrowUpRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
