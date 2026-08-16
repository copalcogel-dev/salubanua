"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mountain, Search, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SearchDialog } from "./SearchDialog";
import { duration, easeOut } from "@/lib/motion";

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Menu mobile menyimpan rute saat dibuka, bukan boolean. Dengan begitu
  // menu otomatis tertutup begitu rute berganti (termasuk lewat tombol
  // back/forward) tanpa perlu setState di dalam effect.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const closeMenu = () => setMenuPath(null);
  const toggleMenu = () => setMenuPath(open ? null : pathname);

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
    { label: t.nav.destinations, href: "/destinations" },
    { label: t.nav.stories, href: "/stories" },
    { label: t.nav.managedBy, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full text-white transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/35 py-3 backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
          >
            <Mountain size={24} strokeWidth={1.5} />
            <span className="text-sm tracking-[0.25em] uppercase">Salubanua</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group relative py-1 text-[13px] font-medium uppercase tracking-wide transition-colors duration-300"
                >
                  <span className={active ? "text-white" : "text-white/70 group-hover:text-white"}>
                    {l.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-white"
                      transition={{ duration: duration.fast, ease: easeOut }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t.search.open}
              className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
            >
              <Search size={16} />
              <span className="hidden text-xs font-medium sm:inline">
                {t.search.open}
              </span>
            </button>
            <button
              onClick={toggleLang}
              className="hidden items-center gap-1 text-[13px] font-semibold sm:flex"
              aria-label="Toggle language"
            >
              <span
                className={`transition-colors duration-300 ${lang === "id" ? "text-white" : "text-white/40"}`}
              >
                ID
              </span>
              <span className="text-white/40">|</span>
              <span
                className={`transition-colors duration-300 ${lang === "en" ? "text-white" : "text-white/40"}`}
              >
                EN
              </span>
            </button>
            <button
              className="transition-opacity duration-300 hover:opacity-70 lg:hidden"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.fast, ease: easeOut }}
            className="mx-6 mt-4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0d2a1d]/95 p-6 shadow-xl backdrop-blur-md lg:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                  pathname === l.href ? "text-white" : "text-white/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm font-semibold"
            >
              <span className={lang === "id" ? "text-white" : "text-white/40"}>ID</span>
              <span className="text-white/40">|</span>
              <span className={lang === "en" ? "text-white" : "text-white/40"}>EN</span>
            </button>
          </motion.div>
        )}
      </header>

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </>
  );
}
