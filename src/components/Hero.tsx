"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { categories, destinations } from "@/data/site";
import { categoryIcons } from "@/lib/categoryIcons";
import { enterTransition, stagger } from "@/lib/motion";
import { glassSubtle } from "@/lib/ui";
import { DestinationCardRow, type DestinationCardItem } from "./DestinationCardRow";

export function Hero() {
  const { lang, t } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>(categories[0].key);

  const active = categories.find((c) => c.key === activeKey) ?? categories[0];
  const ActiveIcon = categoryIcons[active.icon];

  const categoryDestinations = destinations.filter((d) => d.category === activeKey);

  const cards: DestinationCardItem[] =
    categoryDestinations.length > 0
      ? categoryDestinations.map((d) => {
          const cat = categories.find((c) => c.key === d.category) ?? active;
          return {
            key: d.key,
            icon: categoryIcons[cat.icon],
            title: d[lang].title,
            subtitle: d[lang].subtitle,
            desc: d[lang].desc,
            image: d.key === "pentuho" ? "/images/gunung-pentuho.jpg" : undefined,
            accent: cat.accent,
          };
        })
      : [
          {
            key: `${active.key}-placeholder`,
            icon: ActiveIcon,
            title: active[lang].title,
            subtitle: lang === "id" ? "Segera Hadir" : "Coming Soon",
            desc: active[lang].desc,
            accent: active.accent,
          },
        ];

  return (
    <section id="top" className="relative flex flex-1 flex-col justify-center py-4 sm:py-6 lg:py-8">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(0) }}
            className="mb-2 text-[10px] font-semibold tracking-[0.32em] text-white/70 sm:mb-3"
          >
            {t.hero.kicker}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(1) }}
            className="text-[34px] font-bold leading-[0.95] tracking-tight text-white sm:text-[56px] lg:text-[68px]"
          >
            {t.hero.titleTop}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(2) }}
            className="mb-3 text-base font-light leading-snug text-white/90 sm:mb-4 sm:text-xl lg:text-2xl"
          >
            {t.hero.titleBottom}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(3) }}
            className="mx-auto mb-4 max-w-xl text-sm leading-relaxed text-white/80 sm:mb-6"
          >
            {t.hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(4) }}
          >
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[11px] font-bold tracking-[0.18em] text-[#153e2a] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_12px_36px_rgba(255,255,255,0.22)]"
            >
              {t.hero.cta}
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enterTransition, delay: stagger(5) }}
          className="mx-auto mt-5 grid max-w-3xl grid-cols-3 gap-2 sm:mt-8 sm:grid-cols-5 sm:gap-2.5 lg:mt-9"
        >
          {categories.map((c) => {
            const Icon = categoryIcons[c.icon];
            const isActive = c.key === activeKey;

            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setActiveKey(c.key)}
                aria-pressed={isActive}
                className={`group flex items-center gap-2.5 px-3 py-2.5 text-left transition-all duration-400 sm:py-3 lg:px-4 ${
                  isActive
                    ? "rounded-2xl border border-white/40 bg-white/95 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
                    : `${glassSubtle} hover:border-white/25 hover:bg-white/[0.12]`
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-400 ${
                    isActive
                      ? "bg-[#153e2a] text-white"
                      : "bg-white/15 text-white group-hover:bg-white/25"
                  }`}
                >
                  <Icon size={14} strokeWidth={2} />
                </span>
                <span
                  className={`truncate text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-400 lg:text-xs ${
                    isActive ? "text-[#153e2a]" : "text-white/75 group-hover:text-white"
                  }`}
                >
                  {c[lang].title}
                </span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enterTransition, delay: stagger(0) }}
          className="mt-4 flex justify-center sm:mt-6 lg:mt-7"
        >
          <div className="w-full max-w-4xl">
            <DestinationCardRow items={cards} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
