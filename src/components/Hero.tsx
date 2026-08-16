"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { categoryIcons } from "@/lib/categoryIcons";
import { enterTransition, stagger } from "@/lib/motion";
import { CategorySelector } from "./CategorySelector";
import { DestinationCardRow, type DestinationCardItem } from "./DestinationCardRow";
import type { DestinationEntry } from "@/lib/destinations";
import type { CategoryEntry } from "@/lib/categories";
import type { PageContent } from "@/lib/pageContent";

export function Hero({
  content,
  categories,
  destinations,
}: {
  content: PageContent;
  categories: CategoryEntry[];
  destinations: DestinationEntry[];
}) {
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
            image: d.coverImageUrl ?? undefined,
            accent: cat.accent,
            isSample: d.isSample,
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
    <section id="top" className="relative flex flex-1 flex-col justify-start pt-4 pb-2 sm:pt-7 sm:pb-4 lg:pt-8 lg:pb-5">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(0) }}
            className="mb-1 text-[10px] font-semibold tracking-[0.32em] text-white/70 sm:mb-3"
          >
            {content.kicker[lang]}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(1) }}
            className="text-[34px] font-bold leading-[0.95] tracking-tight text-white sm:text-[58px] lg:text-[72px]"
          >
            {content.title[lang]}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(2) }}
            className="mb-2 text-sm font-light leading-snug text-white/90 sm:mb-3 sm:text-xl lg:text-2xl"
          >
            {content.subtitle[lang]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(3) }}
            className="mx-auto mb-3 max-w-xl text-xs leading-relaxed text-white/80 sm:mb-5 sm:text-sm"
          >
            {content.body[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: stagger(4) }}
          >
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[11px] font-bold tracking-[0.18em] text-[#153e2a] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_12px_36px_rgba(255,255,255,0.22)] sm:px-7 sm:py-3.5"
            >
              {content.ctaLabel[lang]}
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
          className="mx-auto mt-3 max-w-4xl sm:mt-6 lg:mt-6"
        >
          <CategorySelector
            categories={categories}
            activeKey={activeKey}
            onSelect={setActiveKey}
          />
        </motion.div>

        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enterTransition, delay: stagger(0) }}
          className="mt-3 flex justify-center sm:mt-5 lg:mt-5"
        >
          <div className="w-full max-w-6xl">
            <DestinationCardRow
              items={cards}
              size="large"
              fillHeight
              sampleLabel={t.stories.sampleBadge}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
