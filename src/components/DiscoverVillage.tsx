"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Home, MapPin, Building2, Landmark, Flag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MountainDivider } from "./MountainDivider";

const pointIcons = [Home, MapPin, Building2, Landmark, Flag];

export function DiscoverVillage() {
  const { t } = useLanguage();

  return (
    <section id="explore" className="relative overflow-hidden bg-[#2e1a10] py-28">
      <div className="absolute inset-0 opacity-25">
        <Image
          src="/images/gunung-pentuho.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2e1a10]/60" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-orange-200/70">
            {t.discover.kicker}
          </p>
          <h2 className="mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {t.discover.title}
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/75">
            {t.discover.body}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-1 md:grid-cols-2"
        >
          {t.discover.points.map((p, i) => {
            const Icon = pointIcons[i % pointIcons.length];
            return (
              <div key={p.label} className="bg-[#2e1a10] p-6">
                <Icon size={18} strokeWidth={1.5} className="mb-3 text-[#d9773f]" />
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200/60">
                  {p.label}
                </p>
                <p className="text-xl text-white">{p.value}</p>
              </div>
            );
          })}
        </motion.div>
      </div>

      <MountainDivider fill="#f6f4ee" />
    </section>
  );
}
