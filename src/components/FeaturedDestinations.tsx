"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { destinations, categories } from "@/data/site";
import { MountainScene } from "./MountainScene";
import { categoryIcons } from "@/lib/categoryIcons";

export function FeaturedDestinations() {
  const { lang, t } = useLanguage();

  return (
    <section
      id="destinations"
      className="bg-gradient-to-b from-[#e8f1ea] to-[#f6f4ee] py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-[#4a7c59]">
              {t.destinations.kicker}
            </p>
            <h2 className="text-4xl font-semibold text-[#153e2a] sm:text-5xl">
              {t.destinations.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2 md:h-[560px]">
          {destinations.map((d, i) => {
            const category = categories.find((c) => c.key === d.category);
            const Icon = categoryIcons[category?.icon ?? "mountain"];
            const featured = i === 0;

            if (featured) {
              return (
                <motion.article
                  key={d.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="group relative min-h-[320px] overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:col-span-2 md:row-span-2"
                >
                  <Image
                    src="/images/gunung-pentuho.jpg"
                    alt="Gunung Pentuho (Buntu Pentuho)"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#153e2a]">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bdeecb]">
                      {d[lang].subtitle}
                    </p>
                    <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                      {d[lang].title}
                    </h3>
                    <p className="mb-5 max-w-md text-sm leading-relaxed text-white/80">
                      {d[lang].desc}
                    </p>
                    <a
                      href="#local"
                      className="inline-block rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#153e2a] transition hover:bg-white/90"
                    >
                      {t.destinations.readMore}
                    </a>
                  </div>
                </motion.article>
              );
            }

            return (
              <motion.article
                key={d.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-28 shrink-0 overflow-hidden">
                  <MountainScene
                    accent={category?.accent ?? "#2f5233"}
                    className="h-full w-full scale-100 object-cover grayscale transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#153e2a]">
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-[#153e2a]">
                    {d[lang].status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4a7c59]">
                    {d[lang].subtitle}
                  </p>
                  <h3 className="mb-2 text-lg font-semibold text-[#153e2a]">
                    {d[lang].title}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-[#4a4a42]">
                    {d[lang].desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
