"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, MapPin, Building2, Landmark, Flag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ImmersiveGlow } from "./ImmersiveGlow";

const pointIcons = [Home, MapPin, Building2, Landmark, Flag];
const cardTints = ["#e9f2ec", "#dfece3", "#eef4ef"];

const VILLAGE_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4";

export function DiscoverVillage() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f4ee] via-[#eef4ef] to-[#e8f1ea] py-28"
    >
      <ImmersiveGlow tone="deep" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1fr_1.05fr] lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <motion.div
            style={{ y: mediaY }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_28px_70px_rgba(21,62,42,0.24)] sm:aspect-[4/3] lg:aspect-[4/5]"
          >
            <video
              src={VILLAGE_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a1d]/45 via-transparent to-transparent" />
          </motion.div>

          <div className="absolute -bottom-8 -right-4 hidden rounded-3xl bg-white/90 px-7 py-5 shadow-[0_18px_45px_rgba(21,62,42,0.14)] backdrop-blur-sm sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4a7c59]">
              {t.discover.points[1].label}
            </p>
            <p className="text-2xl font-semibold text-[#153e2a]">
              {t.discover.points[1].value}
            </p>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-[#4a7c59]">
              {t.discover.kicker}
            </p>
            <h2 className="mb-6 text-4xl font-semibold leading-tight text-[#153e2a] sm:text-5xl">
              {t.discover.title}
            </h2>
            <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-[#4a4a42]">
              {t.discover.body}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {t.discover.points.map((p, i) => {
              const Icon = pointIcons[i % pointIcons.length];
              return (
                <div
                  key={p.label}
                  className="rounded-2xl border border-white/60 p-5 shadow-[0_2px_16px_rgba(21,62,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(21,62,42,0.1)]"
                  style={{ background: cardTints[i % cardTints.length] }}
                >
                  <Icon size={18} strokeWidth={1.5} className="mb-3 text-[#4a7c59]" />
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#153e2a]/55">
                    {p.label}
                  </p>
                  <p className="text-lg font-semibold text-[#153e2a]">{p.value}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
