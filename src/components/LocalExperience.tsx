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
          className="rounded-[2.5rem] bg-gradient-to-br from-[#153e2a] via-[#1f5539] to-[#2a6b47] px-8 py-16 text-center shadow-2xl sm:px-14"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
              <Users2 size={24} strokeWidth={1.5} />
            </div>
          </div>
          <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-[#a8cdb6]">
            {t.local.kicker}
          </p>
          <h2 className="mb-6 text-4xl font-semibold text-white sm:text-5xl">
            {t.local.title}
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-[15px] leading-relaxed text-white/80">
            {t.local.body}
          </p>
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {villageProfile.pengelola.nama} &times; {villageProfile.pengelola.mitra}
          </p>
          <a
            href="#cta"
            className="inline-block rounded-full bg-white px-8 py-4 text-xs font-bold tracking-[0.2em] text-[#153e2a] transition hover:scale-105 hover:bg-white/90"
          >
            {t.local.cta.toUpperCase()}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
