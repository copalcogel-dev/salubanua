"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/site";
import { MountainScene } from "./MountainScene";
import { categoryIcons } from "@/lib/categoryIcons";

export function CategoryGrid() {
  const { lang, t } = useLanguage();

  return (
    <section id="explore" className="bg-[#f6f4ee] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-[#3fa34d]">
            {t.explore.kicker}
          </p>
          <h2 className="mb-4 text-4xl font-semibold text-[#153e2a] sm:text-5xl">
            {t.explore.title}
          </h2>
          <p className="text-[15px] leading-relaxed text-[#4a4a42]">
            {t.explore.body}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => {
            const Icon = categoryIcons[c.icon];
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group cursor-default"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-3xl">
                  {c.key === "hiking" ? (
                    <Image
                      src="/images/gunung-pentuho.jpg"
                      alt={c[lang].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <MountainScene
                      accent={c.accent}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a1d]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#153e2a] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={16} strokeWidth={2} />
                  </div>

                  <p className="absolute inset-x-3 bottom-3 translate-y-2 text-[11px] leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {c[lang].desc}
                  </p>
                </div>

                <p className="text-center text-sm font-semibold text-[#153e2a]">
                  {c[lang].title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
