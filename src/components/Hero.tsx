"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/site";
import { MountainScene } from "./MountainScene";
import { categoryIcons } from "@/lib/categoryIcons";
import { duration, easeOut, enterTransition, stagger } from "@/lib/motion";
import { glassCard, glassSubtle } from "@/lib/ui";

export function Hero() {
  const { lang, t } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>(categories[0].key);

  const active = categories.find((c) => c.key === activeKey) ?? categories[0];
  const ActiveIcon = categoryIcons[active.icon];

  return (
    <section id="top" className="relative flex flex-1 items-center py-6 lg:py-8">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div>
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
              className="text-[44px] font-bold leading-[0.92] tracking-tight text-white sm:text-[60px] lg:text-[76px]"
            >
              {t.hero.titleTop}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...enterTransition, delay: stagger(2) }}
              className="mb-4 text-xl font-light leading-snug text-white/90 sm:text-2xl lg:text-[30px]"
            >
              {t.hero.titleBottom}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...enterTransition, delay: stagger(3) }}
              className="mb-6 max-w-xl text-sm leading-relaxed text-white/80"
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...enterTransition, delay: stagger(3) }}
            className={`relative h-[280px] overflow-hidden sm:h-[340px] lg:h-[400px] ${glassCard}`}
          >
            <motion.div
              key={active.key}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: duration.slow, ease: easeOut }}
              className="absolute inset-0"
            >
              {active.key === "hiking" ? (
                <Image
                  src="/images/gunung-pentuho.jpg"
                  alt={active[lang].title}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <MountainScene
                  accent={active.accent}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08160f] via-[#08160f]/35 to-transparent" />
            </motion.div>

            <div className="relative flex h-full flex-col justify-end p-6 lg:p-7">
              <motion.div
                key={`${active.key}-text`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.base, ease: easeOut }}
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#153e2a]">
                  <ActiveIcon size={16} strokeWidth={2} />
                </span>
                <h3 className="mb-1.5 text-2xl font-semibold text-white lg:text-3xl">
                  {active[lang].title}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-white/80">
                  {active[lang].desc}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enterTransition, delay: stagger(5) }}
          className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-5 lg:mt-8 lg:gap-3"
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
                className={`group flex items-center gap-2.5 px-3 py-3 text-left transition-all duration-400 lg:px-4 ${
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
      </div>
    </section>
  );
}
