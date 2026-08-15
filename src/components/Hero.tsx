"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { categories, destinations } from "@/data/site";
import { MountainScene } from "./MountainScene";
import { categoryIcons } from "@/lib/categoryIcons";
import { duration, easeOut, enterTransition, stagger } from "@/lib/motion";

export function Hero() {
  const { lang, t } = useLanguage();

  const highlightCards = destinations.slice(0, 3);

  return (
    <section
      id="top"
      className="relative flex flex-1 items-center py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(0) }}
            className="mb-3 text-[10px] font-semibold tracking-[0.32em] text-white/70"
          >
            {t.hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(1) }}
            className="text-[38px] font-bold leading-[0.94] tracking-tight text-white sm:text-[52px] lg:text-[64px]"
          >
            {t.hero.titleTop}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(2) }}
            className="mb-3 text-lg font-light text-white/90 sm:text-xl lg:text-[26px]"
          >
            {t.hero.titleBottom}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(3) }}
            className="mb-5 max-w-xl text-[13px] leading-relaxed text-white/80"
          >
            {t.hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(4) }}
            className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-bold tracking-[0.18em] text-[#153e2a] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_10px_30px_rgba(255,255,255,0.18)]"
            >
              {t.hero.cta}
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {categories.map((c) => (
                <span
                  key={c.key}
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60"
                >
                  {c[lang].title}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {highlightCards.map((d, i) => {
            const category = categories.find((c) => c.key === d.category);
            const Icon = categoryIcons[category?.icon ?? "mountain"];

            return (
              <motion.div
                key={d.key}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: duration.base,
                  ease: easeOut,
                  delay: stagger(i, 0.09, 0.5),
                }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link
                  href="/destinations"
                  className="relative flex h-36 flex-col justify-end overflow-hidden rounded-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-shadow duration-300 hover:border-white/30 hover:shadow-[0_26px_60px_rgba(0,0,0,0.55)] sm:h-44"
                >
                  {d.key === "pentuho" ? (
                    <Image
                      src="/images/gunung-pentuho.jpg"
                      alt={d[lang].title}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                  ) : (
                    <MountainScene
                      accent={category?.accent ?? "#2f5233"}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#08160f] via-[#08160f]/45 to-transparent transition-opacity duration-300 group-hover:from-[#08160f]/95" />

                  <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#153e2a] shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon size={13} strokeWidth={2} />
                  </span>

                  <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                  </span>

                  <div className="relative p-3 sm:p-4">
                    <p className="mb-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      {d[lang].subtitle}
                    </p>
                    <h3 className="truncate text-[13px] font-semibold text-white sm:text-sm">
                      {d[lang].title}
                    </h3>
                    <p className="mt-1 hidden max-h-0 overflow-hidden text-[10px] leading-snug text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100 sm:block">
                      {d[lang].desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
