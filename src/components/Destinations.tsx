"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { destinations, categories } from "@/data/site";
import { MountainScene } from "./MountainScene";
import { categoryIcons } from "@/lib/categoryIcons";

export function Destinations() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative py-16 lg:py-20">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-white/70">
              {t.explore.kicker}
            </p>
            <h2 className="mb-3 text-3xl font-semibold text-white sm:text-4xl">
              {t.destinations.title}
            </h2>
            <p className="text-sm leading-relaxed text-white/80">
              {t.explore.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c, i) => {
              const Icon = categoryIcons[c.icon];
              return (
                <motion.span
                  key={c.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-semibold text-[#153e2a] shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Icon size={13} strokeWidth={2} className="text-[#4a7c59]" />
                  {c[lang].title}
                </motion.span>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:h-[500px]">
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
                  className="group relative min-h-[280px] overflow-hidden rounded-3xl shadow-[0_2px_16px_rgba(21,62,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(21,62,42,0.22)] md:col-span-2 md:row-span-2"
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
                    <Link
                      href="/about"
                      className="inline-block rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#153e2a] transition hover:bg-white/90"
                    >
                      {t.destinations.readMore}
                    </Link>
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
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_2px_16px_rgba(21,62,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(21,62,42,0.16)]"
              >
                <div className="relative h-24 shrink-0 overflow-hidden">
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
                <div className="flex flex-1 flex-col p-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4a7c59]">
                    {d[lang].subtitle}
                  </p>
                  <h3 className="mb-1.5 text-base font-semibold text-[#153e2a]">
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
