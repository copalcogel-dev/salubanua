"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mountain, Search, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SearchDialog } from "./SearchDialog";

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const links = [
    { label: t.nav.explore, href: "/#explore" },
    { label: t.nav.destinations, href: "/#destinations" },
    { label: t.nav.stories, href: "/stories" },
    { label: t.nav.managedBy, href: "/#local" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-2 text-[#153e2a]">
            <Mountain size={26} strokeWidth={1.5} />
            <span className="text-sm tracking-[0.25em] uppercase">Salubanua</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium uppercase tracking-wide text-[#153e2a]/80 transition hover:text-[#153e2a]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t.search.open}
              className="flex items-center gap-2 rounded-full bg-[#e6f5ea] px-4 py-2 text-[#153e2a] transition hover:bg-[#d3edda]"
            >
              <Search size={16} />
              <span className="hidden text-xs font-medium sm:inline">
                {t.search.open}
              </span>
            </button>
            <button
              onClick={toggleLang}
              className="hidden items-center gap-1 text-[13px] font-semibold text-[#153e2a] sm:flex"
              aria-label="Toggle language"
            >
              <span className={lang === "id" ? "text-[#153e2a]" : "text-[#153e2a]/40"}>
                ID
              </span>
              <span className="text-[#153e2a]/40">|</span>
              <span className={lang === "en" ? "text-[#153e2a]" : "text-[#153e2a]/40"}>
                EN
              </span>
            </button>
            <button
              className="text-[#153e2a] lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mx-6 mt-4 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg lg:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-wide text-[#153e2a]"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm font-semibold text-[#153e2a]"
            >
              <span className={lang === "id" ? "text-[#153e2a]" : "text-[#153e2a]/40"}>
                ID
              </span>
              <span className="text-[#153e2a]/40">|</span>
              <span className={lang === "en" ? "text-[#153e2a]" : "text-[#153e2a]/40"}>
                EN
              </span>
            </button>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
