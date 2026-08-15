"use client";

import { motion } from "framer-motion";
import { Home, MapPin, Building2, Landmark, Flag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ImmersiveGlow } from "./ImmersiveGlow";

const pointIcons = [Home, MapPin, Building2, Landmark, Flag];
const cardTints = ["#e9f2ec", "#dfece3", "#eef4ef"];

export function DiscoverVillage() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden bg-[#f6f4ee] py-28">
      <ImmersiveGlow />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-[#4a7c59]">
            {t.discover.kicker}
          </p>
          <h2 className="mb-6 text-4xl font-semibold leading-tight text-[#153e2a] sm:text-5xl">
            {t.discover.title}
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-[#4a4a42]">
            {t.discover.body}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2"
        >
          {t.discover.points.map((p, i) => {
            const Icon = pointIcons[i % pointIcons.length];
            return (
              <div
                key={p.label}
                className="rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{ background: cardTints[i % cardTints.length] }}
              >
                <Icon size={18} strokeWidth={1.5} className="mb-3 text-[#153e2a]" />
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#153e2a]/60">
                  {p.label}
                </p>
                <p className="text-xl font-semibold text-[#153e2a]">{p.value}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
