"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Users2, Share2, Info, ExternalLink, Globe, type LucideIcon } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";
import { useLanguage } from "@/context/LanguageContext";
import { enterTransition, stagger } from "@/lib/motion";
import { cardSheen, glassCard } from "@/lib/ui";
import type { SiteContactInfo, VillageProfile } from "@/lib/siteSettings";
import type { PageContent } from "@/lib/pageContent";

/** Ikon platform sosial media; platform yang tidak dikenali jatuh ke ikon dunia. */
function socialIcon(platform: string): LucideIcon {
  const key = platform.trim().toLowerCase();
  if (key.includes("instagram")) return InstagramIcon as LucideIcon;
  if (key.includes("facebook")) return FacebookIcon as LucideIcon;
  return Globe;
}

function ContactCard({
  icon: Icon,
  label,
  children,
  index,
  pending = false,
  sampleBadge,
  href,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  index: number;
  pending?: boolean;
  sampleBadge?: string;
  href?: string;
}) {
  const Wrapper = href ? motion.a : motion.div;

  return (
    <Wrapper
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...enterTransition, delay: stagger(index) }}
      className={`group relative overflow-hidden p-7 ${glassCard} ${
        pending ? "border-dashed" : ""
      }`}
    >
      {/* Kilau lembut di sudut atas agar permukaan kaca terasa punya dimensi. */}
      <div aria-hidden="true" className={cardSheen} />

      {sampleBadge && (
        <span className="absolute right-5 top-5 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          {sampleBadge}
        </span>
      )}

      <span
        // Tanpa perubahan saat hover: menaikkan terang di dalam kartu kaca
        // ikut terserap kartu sebelahnya dan memunculkan garis di selanya.
        className={`relative mb-5 flex h-11 w-11 items-center justify-center rounded-2xl ${
          pending ? "bg-white/10 text-white/45" : "bg-white/15 text-white"
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
    </Wrapper>
  );
}

export function Contact({
  content,
  contactInfo,
  village,
}: {
  content: PageContent;
  contactInfo: SiteContactInfo;
  village: VillageProfile;
}) {
  const { lang, t } = useLanguage();
  const sampleBadge = contactInfo.isSample ? t.stories.sampleBadge : undefined;

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
            {content.kicker[lang]}
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {content.title[lang]}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard icon={MapPin} label={t.contact.addressLabel} index={0}>
            Dusun {village.dusun}, Desa {village.desa}
            <br />
            Kec. {village.kecamatan}, Kab. {village.kabupaten}
            <br />
            {village.provinsi}
          </ContactCard>

          <ContactCard icon={Users2} label={t.contact.managedByLabel} index={1}>
            {village.pengelola.nama}
            <br />
            {village.pengelola.mitra}
          </ContactCard>

          {contactInfo.phone ? (
            <ContactCard
              icon={Phone}
              label={t.contact.phoneLabel}
              index={2}
              sampleBadge={sampleBadge}
              href={contactInfo.whatsappUrl ?? undefined}
            >
              {contactInfo.phone}
            </ContactCard>
          ) : (
            <ContactCard icon={Phone} label={t.contact.phoneLabel} index={2} pending>
              {t.contact.phonePlaceholder}
            </ContactCard>
          )}

          {contactInfo.socials.length > 0 ? (
            <ContactCard
              icon={Share2}
              label={t.contact.socialLabel}
              index={3}
              sampleBadge={sampleBadge}
            >
              <div className="flex flex-col gap-2">
                {contactInfo.socials.map((s) => {
                  const Icon = socialIcon(s.platform);
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      // Tanpa efek hover sama sekali. Garis bawah statis yang
                      // menandakan ini tautan, bukan perubahan warna saat disorot.
                      className="flex items-center gap-2 underline decoration-white/30 underline-offset-4"
                    >
                      <Icon size={14} strokeWidth={1.8} className="shrink-0 text-white/70" />
                      <span>
                        {s.platform}: {s.handle}
                      </span>
                    </a>
                  );
                })}
              </div>
            </ContactCard>
          ) : (
            <ContactCard icon={Share2} label={t.contact.socialLabel} index={3} pending>
              {t.contact.phonePlaceholder}
            </ContactCard>
          )}
        </div>

        {contactInfo.coordinates && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...enterTransition, delay: stagger(4) }}
            className={`relative mt-7 overflow-hidden p-3 ${glassCard}`}
          >
            <div className="mb-3 flex items-center justify-between gap-3 px-2 pt-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                {t.contact.mapLabel}
              </p>
              {contactInfo.mapUrl && (
                <a
                  href={contactInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white underline decoration-white/30 underline-offset-4"
                >
                  {t.contact.openInMaps}
                  <ExternalLink size={12} strokeWidth={2.5} />
                </a>
              )}
            </div>
            <div className="h-64 overflow-hidden rounded-2xl sm:h-80">
              <iframe
                title={t.contact.mapLabel}
                src={`https://www.google.com/maps?q=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.3] contrast-[1.05]"
              />
            </div>
          </motion.div>
        )}

        {contactInfo.isSample && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...enterTransition, delay: stagger(4) }}
            className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-white/20 p-4 text-xs leading-relaxed text-white/60"
          >
            <Info size={16} className="mt-0.5 shrink-0 text-white/40" />
            {t.contact.sampleNotice}
          </motion.div>
        )}
      </div>
    </section>
  );
}
