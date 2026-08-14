"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { MountainDivider } from "./MountainDivider";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="cta" className="relative overflow-hidden py-32">
      <div className="absolute inset-0">
        <Image
          src="/images/gunung-pentuho.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="mb-5 text-4xl font-semibold text-white sm:text-5xl">
          {t.cta.title}
        </h2>
        <p className="mb-10 text-[15px] text-white/80">{t.cta.body}</p>
        <a
          href="#top"
          className="inline-block rounded-full bg-white px-8 py-4 text-xs font-bold tracking-[0.2em] text-[#4a2a1a] transition hover:scale-105 hover:bg-white/90"
        >
          {t.cta.button}
        </a>
      </motion.div>

      <MountainDivider fill="#2e1a10" />
    </section>
  );
}
