"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MountainDivider } from "./MountainDivider";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="cta" className="relative overflow-hidden bg-[#f6f4ee] py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-24 text-center"
        >
          <Image src="/images/gunung-pentuho.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10">
            <h2 className="mb-5 text-4xl font-semibold text-white sm:text-5xl">
              {t.cta.title}
            </h2>
            <p className="mb-10 text-[15px] text-white/80">{t.cta.body}</p>
            <a
              href="#top"
              className="inline-block rounded-full bg-white px-8 py-4 text-xs font-bold tracking-[0.2em] text-[#153e2a] transition hover:scale-105 hover:bg-white/90"
            >
              {t.cta.button}
            </a>
          </div>
        </motion.div>
      </div>

      <MountainDivider fill="#153e2a" />
    </section>
  );
}
