"use client";

import { Wrench } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { glassCard } from "@/lib/ui";

/**
 * Ditampilkan menggantikan seluruh isi situs saat Mode Perbaikan aktif
 * (diatur dari Studio → Profil Desa & Kontak → Mode Perbaikan). Sengaja
 * tanpa Navbar/Footer supaya tidak ada tautan yang mengarah ke halaman
 * yang sedang "disembunyikan".
 */
export function MaintenanceScreen({
  title,
  message,
}: {
  title: { id: string; en: string };
  message: { id: string; en: string };
}) {
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="relative z-10 flex min-h-svh items-center justify-center px-6">
      <div className={`w-full max-w-md p-8 text-center sm:p-10 ${glassCard}`}>
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
          <Wrench size={24} strokeWidth={1.6} />
        </span>
        <h1 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
          {title[lang]}
        </h1>
        <p className="text-sm leading-relaxed text-white/75">{message[lang]}</p>

        <button
          onClick={toggleLang}
          className="mx-auto mt-6 flex items-center gap-1 text-[13px] font-semibold"
          aria-label="Toggle language"
        >
          <span className={lang === "id" ? "text-white" : "text-white/40"}>ID</span>
          <span className="text-white/40">|</span>
          <span className={lang === "en" ? "text-white" : "text-white/40"}>EN</span>
        </button>
      </div>
    </div>
  );
}
