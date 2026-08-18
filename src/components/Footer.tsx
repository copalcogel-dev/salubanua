"use client";

import Link from "next/link";
import { Mountain, Globe, type LucideIcon } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "./SocialIcons";
import type { VillageProfile, SiteContactInfo } from "@/lib/siteSettings";

/** Ikon platform sosial media; platform yang tidak dikenali jatuh ke ikon dunia. */
function socialIcon(platform: string): LucideIcon {
  const key = platform.trim().toLowerCase();
  if (key.includes("instagram")) return InstagramIcon as LucideIcon;
  if (key.includes("facebook")) return FacebookIcon as LucideIcon;
  return Globe;
}

/**
 * Satu footer untuk seluruh situs.
 *
 * Sengaja ringkas satu baris agar identik di setiap halaman — termasuk di
 * beranda yang dirancang muat satu layar tanpa scroll.
 *
 * Menu navigasi digantikan simbol sosial media (Instagram/Facebook/WA) —
 * navigasi ke halaman lain sudah ada di Navbar, jadi footer difokuskan
 * sebagai jalur cepat menuju kanal yang dikelola PokDarWis, konsisten
 * dengan kartu-kartu di halaman Pengelola.
 */
export function Footer({
  village,
  contact,
}: {
  village: VillageProfile;
  contact: SiteContactInfo;
}) {
  const socialLinks = contact.socials.map((s) => ({
    key: s.platform,
    label: s.platform,
    href: s.url,
    Icon: socialIcon(s.platform),
  }));

  if (contact.whatsappUrl) {
    socialLinks.push({
      key: "whatsapp",
      label: "WhatsApp",
      href: contact.whatsappUrl,
      Icon: WhatsAppIcon as LucideIcon,
    });
  }

  return (
    <footer className="shrink-0 border-t border-white/10 bg-black/20 py-4 text-white/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center lg:flex-row lg:justify-between lg:gap-6 lg:px-10 lg:text-left">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-white transition hover:opacity-80"
        >
          <Mountain size={16} strokeWidth={1.5} />
          <span className="text-[11px] tracking-[0.22em] uppercase">Salubanua</span>
        </Link>

        {socialLinks.length > 0 && (
          <nav className="flex items-center justify-center gap-4">
            {socialLinks.map(({ key, label, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/60 transition-colors duration-300 hover:text-white"
              >
                <Icon size={17} strokeWidth={1.8} />
              </a>
            ))}
          </nav>
        )}

        <p className="text-[11px] leading-tight">
          Dusun {village.dusun}, {village.desa} &middot; Kec. {village.kecamatan},{" "}
          {village.kabupaten}
        </p>

        <p className="shrink-0 text-[11px] text-white/40">
          &copy; {new Date().getFullYear()} {village.pengelola.nama}
        </p>
      </div>
    </footer>
  );
}
