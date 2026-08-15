"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { categories, destinations } from "@/data/site";
import { MountainScene } from "./MountainScene";
import { categoryIcons } from "@/lib/categoryIcons";

export function Hero() {
  const { lang, t } = useLanguage();

  const highlightCards = destinations.slice(0, 3);

  return (
    <section id="top" className="relative w-full">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-10 lg:pt-40 lg:pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-white/70"
          >
            {t.hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[48px] font-bold leading-[0.95] tracking-tight text-white sm:text-[68px] lg:text-[88px]"
          >
            {t.hero.titleTop}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-5 text-xl font-light text-white/90 sm:text-2xl lg:text-[32px]"
          >
            {t.hero.titleBottom}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6 max-w-xl text-[15px] leading-relaxed text-white/85"
          >
            {t.hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/destinations"
              className="inline-block rounded-full bg-white px-8 py-4 text-xs font-bold tracking-[0.2em] text-[#153e2a] transition hover:scale-105 hover:bg-white/90"
            >
              {t.hero.cta}
            </Link>
          </motion.div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {categories.map((c) => (
              <span
                key={c.key}
                className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/75 transition hover:text-white"
              >
                {c[lang].title}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlightCards.map((d, i) => {
            const category = categories.find((c) => c.key === d.category);
            const Icon = categoryIcons[category?.icon ?? "mountain"];
            return (
              <motion.div
                key={d.key}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.12,
                  type: "spring",
                  stiffness: 130,
                  damping: 18,
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:bg-white/15 hover:shadow-2xl"
              >
                <div className="relative h-28 w-full">
                  {d.key === "pentuho" ? (
                    <Image
                      src="/images/gunung-pentuho.jpg"
                      alt={d[lang].title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <MountainScene
                      accent={category?.accent ?? "#2f5233"}
                      className="h-full w-full object-cover grayscale"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#153e2a]">
                    <Icon size={15} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-1.5 text-sm font-semibold text-white">
                    {d[lang].title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-white/80">
                    {d[lang].desc}
                  </p>
                  <Link
                    href="/destinations"
                    className="mt-auto inline-block rounded-full bg-white px-4 py-2 text-center text-[10px] font-bold tracking-[0.15em] text-[#153e2a] transition hover:bg-white/90"
                  >
                    {t.destinations.readMore.toUpperCase()}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
