"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Users2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { villageProfile } from "@/data/site";
import { ImmersiveGlow } from "./ImmersiveGlow";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#eef4ef] to-[#f6f4ee] py-28"
    >
      <ImmersiveGlow tone="warm" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-[#4a7c59]">
            {t.contact.kicker}
          </p>
          <h2 className="mb-14 text-4xl font-semibold text-[#153e2a] sm:text-5xl">
            {t.contact.title}
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_2px_16px_rgba(21,62,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(21,62,42,0.14)]">
              <MapPin size={22} strokeWidth={1.5} className="mb-4 text-[#4a7c59]" />
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#153e2a]/60">
                {t.contact.addressLabel}
              </p>
              <p className="text-sm leading-relaxed text-[#153e2a]">
                Dusun {villageProfile.dusun}, Desa {villageProfile.desa}
                <br />
                Kec. {villageProfile.kecamatan}, Kab. {villageProfile.kabupaten}
                <br />
                {villageProfile.provinsi}
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_2px_16px_rgba(21,62,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(21,62,42,0.14)]">
              <Users2 size={22} strokeWidth={1.5} className="mb-4 text-[#4a7c59]" />
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#153e2a]/60">
                {t.contact.managedByLabel}
              </p>
              <p className="text-sm leading-relaxed text-[#153e2a]">
                {villageProfile.pengelola.nama}
                <br />
                {villageProfile.pengelola.mitra}
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-black/20 bg-white/60 p-6">
              <Phone size={22} strokeWidth={1.5} className="mb-4 text-[#153e2a]/40" />
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#153e2a]/60">
                {t.contact.phoneLabel}
              </p>
              <p className="text-sm leading-relaxed text-[#153e2a]/60">
                {t.contact.phonePlaceholder}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
