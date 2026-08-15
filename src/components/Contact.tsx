"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Users2, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { villageProfile } from "@/data/site";
import { enterTransition, stagger } from "@/lib/motion";
import { glassCard, glassCardInteractive } from "@/lib/ui";

function ContactCard({
  icon: Icon,
  label,
  children,
  index,
  pending = false,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  index: number;
  pending?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...enterTransition, delay: stagger(index) }}
      className={`group relative overflow-hidden p-7 ${glassCard} ${
        pending
          ? "border-dashed"
          : `${glassCardInteractive} hover:-translate-y-1.5`
      }`}
    >
      {/* Kilau lembut di sudut atas agar permukaan kaca terasa punya dimensi. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.07] blur-2xl transition-opacity duration-500 group-hover:bg-white/[0.12]"
      />

      <span
        className={`relative mb-5 flex h-11 w-11 items-center justify-center rounded-2xl transition-colors duration-500 ${
          pending
            ? "bg-white/10 text-white/45"
            : "bg-white/15 text-white group-hover:bg-white/25"
        }`}
      >
        <Icon size={19} strokeWidth={1.6} />
      </span>

      <p className="relative mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
        {label}
      </p>

      <div
        className={`relative text-sm leading-relaxed ${pending ? "text-white/50" : "text-white/85"}`}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-16 lg:py-20">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={enterTransition}
          className="mb-10"
        >
          <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-white/70">
            {t.contact.kicker}
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {t.contact.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <ContactCard icon={MapPin} label={t.contact.addressLabel} index={0}>
            Dusun {villageProfile.dusun}, Desa {villageProfile.desa}
            <br />
            Kec. {villageProfile.kecamatan}, Kab. {villageProfile.kabupaten}
            <br />
            {villageProfile.provinsi}
          </ContactCard>

          <ContactCard icon={Users2} label={t.contact.managedByLabel} index={1}>
            {villageProfile.pengelola.nama}
            <br />
            {villageProfile.pengelola.mitra}
          </ContactCard>

          <ContactCard icon={Phone} label={t.contact.phoneLabel} index={2} pending>
            {t.contact.phonePlaceholder}
          </ContactCard>
        </div>
      </div>
    </section>
  );
}
