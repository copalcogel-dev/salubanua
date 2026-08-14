"use client";

import { useEffect, useState } from "react";
import { Mountain, Search, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.explore, href: "#explore" },
    { label: t.nav.destinations, href: "#destinations" },
    { label: t.nav.managedBy, href: "#local" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-black/30 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-2 text-white">
          <Mountain size={26} strokeWidth={1.5} />
          <span className="text-sm tracking-[0.25em] uppercase">
            Salubanua
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium uppercase tracking-wide text-white/90 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="hidden items-center gap-1 text-[13px] font-semibold text-white sm:flex"
            aria-label="Toggle language"
          >
            <span className={lang === "id" ? "text-white" : "text-white/50"}>ID</span>
            <span className="text-white/50">|</span>
            <span className={lang === "en" ? "text-white" : "text-white/50"}>EN</span>
          </button>
          <button className="hidden text-white sm:block" aria-label="Search">
            <Search size={18} />
          </button>
          <button
            className="text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-6 mt-4 flex flex-col gap-4 rounded-2xl bg-black/70 p-6 backdrop-blur-md lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium uppercase tracking-wide text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-sm font-semibold text-white"
          >
            <span className={lang === "id" ? "text-white" : "text-white/50"}>ID</span>
            <span className="text-white/50">|</span>
            <span className={lang === "en" ? "text-white" : "text-white/50"}>EN</span>
          </button>
        </div>
      )}
    </header>
  );
}
