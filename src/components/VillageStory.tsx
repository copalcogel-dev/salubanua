"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, MapPin, Building2, Landmark, Flag, Users2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { villageProfile } from "@/data/site";

const pointIcons = [Home, MapPin, Building2, Landmark, Flag];
const cardTints = ["#e9f2ec", "#dfece3", "#eef4ef"];

const VILLAGE_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4";

export function VillageStory() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <motion.div
              style={{ y: mediaY }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_28px_70px_rgba(21,62,42,0.24)] sm:aspect-[16/10] lg:aspect-[4/5]"
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

            <div className="absolute -bottom-6 -right-4 hidden rounded-3xl bg-white/90 px-6 py-4 shadow-[0_18px_45px_rgba(21,62,42,0.14)] backdrop-blur-sm sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4a7c59]">
                {t.discover.points[1].label}
              </p>
              <p className="text-xl font-semibold text-[#153e2a]">
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
              <p className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-white/70">
                {t.discover.kicker}
              </p>
              <h2 className="mb-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {t.discover.title}
              </h2>
              <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-white/80">
                {t.discover.body}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 md:grid-cols-3"
            >
              {t.discover.points.map((p, i) => {
                const Icon = pointIcons[i % pointIcons.length];
                return (
                  <div
                    key={p.label}
                    className="rounded-2xl border border-white/60 p-4 shadow-[0_2px_16px_rgba(21,62,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(21,62,42,0.1)]"
                    style={{ background: cardTints[i % cardTints.length] }}
                  >
                    <Icon size={16} strokeWidth={1.5} className="mb-2 text-[#4a7c59]" />
                    <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#153e2a]/55">
                      {p.label}
                    </p>
                    <p className="text-base font-semibold text-[#153e2a]">{p.value}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-6 rounded-[2rem] bg-gradient-to-br from-[#153e2a] via-[#1f5539] to-[#2a6b47] px-6 py-7 text-center shadow-[0_24px_60px_rgba(21,62,42,0.22)] sm:flex-row sm:justify-between sm:px-10 sm:text-left"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
              <Users2 size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a8cdb6]">
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
