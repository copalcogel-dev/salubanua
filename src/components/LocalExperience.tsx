"use client";

import { motion } from "framer-motion";
import { Users2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { villageProfile } from "@/data/site";

export function LocalExperience() {
  const { t } = useLanguage();

  return (
    <section id="local" className="bg-[#f6f4ee] py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-[#e6f5ea] px-8 py-14 text-center sm:px-14"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#153e2a]">
              <Users2 size={24} strokeWidth={1.5} />
            </div>
          </div>
          <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-[#3fa34d]">
            {t.local.kicker}
          </p>
          <h2 className="mb-6 text-4xl font-semibold text-[#153e2a] sm:text-5xl">
            {t.local.title}
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-[15px] leading-relaxed text-[#3a4a41]">
            {t.local.body}
          </p>
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#153e2a]/50">
            {villageProfile.pengelola.nama} &times; {villageProfile.pengelola.mitra}
          </p>
          <a
            href="#cta"
            className="inline-block rounded-full bg-[#153e2a] px-8 py-4 text-xs font-bold tracking-[0.2em] text-white transition hover:scale-105 hover:bg-[#1f5539]"
          >
            {t.local.cta.toUpperCase()}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
