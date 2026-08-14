"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { categories, destinations } from "@/data/site";
import { MountainScene } from "./MountainScene";
import { categoryIcons } from "@/lib/categoryIcons";

export function Hero() {
  const { lang, t } = useLanguage();

  const highlightCards = destinations.slice(0, 3);

  return (
    <section id="top" className="relative w-full overflow-hidden bg-[#f6f4ee] pt-36 pb-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-[#3fa34d]"
            >
              {t.hero.kicker}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[48px] font-bold leading-[0.95] tracking-tight text-[#153e2a] sm:text-[64px] lg:text-[76px]"
            >
              {t.hero.titleTop}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 text-2xl font-light text-[#153e2a]/80 sm:text-3xl"
            >
              {t.hero.titleBottom}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-8 max-w-md text-[15px] leading-relaxed text-[#4a4a42]"
            >
              {t.hero.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-10"
            >
              <a
                href="#destinations"
                className="inline-block rounded-full bg-[#153e2a] px-8 py-4 text-xs font-bold tracking-[0.2em] text-white transition hover:scale-105 hover:bg-[#1f5539]"
              >
                {t.hero.cta}
              </a>
            </motion.div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {categories.map((c) => (
                <span
                  key={c.key}
                  className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#153e2a]/60 transition hover:text-[#153e2a]"
                >
                  {c[lang].title}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[340px] sm:h-[440px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
            }}
          >
            <Image
              src="/images/gunung-pentuho.jpg"
              alt="Gunung Pentuho (Buntu Pentuho), Dusun Lombo' Ipo, Desa Salubanua"
              fill
              priority
              className="rounded-[2.5rem] object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {highlightCards.map((d, i) => {
            const category = categories.find((c) => c.key === d.category);
            const Icon = categoryIcons[category?.icon ?? "mountain"];
            return (
              <motion.div
                key={d.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-32 w-full">
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
                  <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#153e2a]">
                    <Icon size={16} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-base font-semibold text-[#153e2a]">
                    {d[lang].title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-[12px] leading-relaxed text-[#4a4a42]">
                    {d[lang].desc}
                  </p>
                  <a
                    href="#destinations"
                    className="mt-auto inline-block rounded-full bg-[#153e2a] px-4 py-2 text-center text-[10px] font-bold tracking-[0.15em] text-white transition hover:bg-[#1f5539]"
                  >
                    {t.destinations.readMore.toUpperCase()}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
