"use client";

import { Mountain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { villageProfile } from "@/data/site";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#163a2b] py-14 text-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-3 lg:px-10">
        <div>
          <div className="mb-4 flex items-center gap-2 text-white">
            <Mountain size={22} strokeWidth={1.5} />
            <span className="text-sm tracking-[0.25em] uppercase">
              Salubanua
            </span>
          </div>
          <p className="text-xs leading-relaxed">
            {villageProfile.objekWisata.nama} ({villageProfile.objekWisata.aliasName})
          </p>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            {t.footer.address}
          </p>
          <p className="text-xs leading-relaxed">
            Dusun {villageProfile.dusun}, Desa {villageProfile.desa}
            <br />
            Kec. {villageProfile.kecamatan}, Kab. {villageProfile.kabupaten}
            <br />
            {villageProfile.provinsi}
          </p>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            {t.footer.managedBy}
          </p>
          <p className="text-xs leading-relaxed">
            {villageProfile.pengelola.nama}
            <br />
            {villageProfile.pengelola.mitra}
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-[11px] text-white/40 lg:px-10">
        &copy; {new Date().getFullYear()} Desa Salubanua. {t.footer.rights}
      </div>
    </footer>
  );
}
