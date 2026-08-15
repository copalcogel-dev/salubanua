"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MapPin, Building2, Landmark, Flag, Users2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { villageProfile, categories } from "@/data/site";
import { categoryIcons } from "@/lib/categoryIcons";
import { glassCard, glassCardInteractive } from "@/lib/ui";
import { enterTransition, stagger } from "@/lib/motion";
import { DestinationCardRow, type DestinationCardItem } from "./DestinationCardRow";
import type { DestinationEntry } from "@/lib/destinations";

const pointIcons = [Home, MapPin, Building2, Landmark, Flag];

export function VillageStory({ destinations }: { destinations: DestinationEntry[] }) {
  const { lang, t } = useLanguage();

  const cards: DestinationCardItem[] = destinations.map((d) => {
    const cat = categories.find((c) => c.key === d.category);
    return {
      key: d.key,
      icon: categoryIcons[cat?.icon ?? "mountain"],
      title: d[lang].title,
      subtitle: d[lang].subtitle,
      desc: d[lang].desc,
      image: d.coverImageUrl ?? undefined,
      accent: cat?.accent ?? "#2f5233",
      isSample: d.isSample,
    };
  });

  return (
    <section className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...enterTransition, delay: stagger(0) }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-white/70">
            {t.discover.kicker}
          </p>
          <h1 className="mb-5 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:whitespace-nowrap lg:text-4xl">
            {t.discover.title}
          </h1>
          <p className="text-[15px] leading-relaxed text-white/80">{t.discover.body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...enterTransition, delay: stagger(1) }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {t.discover.points.map((p, i) => {
            const Icon = pointIcons[i % pointIcons.length];
            return (
              <div
                key={p.label}
                className={`!rounded-2xl p-4 text-center transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] ${glassCard}`}
              >
                <Icon size={16} strokeWidth={1.5} className="mx-auto mb-2 text-white/70" />
                <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  {p.label}
                </p>
                <p className="text-base font-semibold text-white">{p.value}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...enterTransition, delay: stagger(2) }}
          className="mt-14"
        >
          <DestinationCardRow items={cards} sampleLabel={t.stories.sampleBadge} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...enterTransition, delay: stagger(3) }}
          className={`mt-10 flex flex-col items-center gap-6 !rounded-[2rem] p-7 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left ${glassCard} ${glassCardInteractive}`}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
              <Users2 size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
                {t.local.kicker}
              </p>
              <p className="text-lg font-semibold text-white">{t.local.title}</p>
              <p className="text-xs text-white/55">
                {villageProfile.pengelola.nama} &times; {villageProfile.pengelola.mitra}
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-[#153e2a] transition hover:scale-105 hover:bg-white/90"
          >
            {t.local.cta.toUpperCase()}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
