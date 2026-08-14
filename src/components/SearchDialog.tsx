"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, X, Mountain, Compass, FileText, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { SearchResult } from "@/lib/searchTypes";

const typeIcon = {
  destination: Mountain,
  category: Compass,
  story: FileText,
} as const;

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const groupLabel = useCallback(
    (type: SearchResult["type"]) =>
      type === "destination"
        ? t.search.groupDestinations
        : type === "category"
          ? t.search.groupCategories
          : t.search.groupStories,
    [t],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      return;
    }
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}&lang=${lang}`,
          { signal: controller.signal },
        );
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        // permintaan dibatalkan atau gagal — biarkan hasil sebelumnya kosong
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query, lang, open]);

  const trimmed = query.trim();

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[90] flex items-start justify-center bg-[#0d2a1d]/50 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t.search.title}
      >
        <div className="flex items-center gap-3 border-b border-black/5 px-5 py-4">
          <Search size={18} className="shrink-0 text-[#3fa34d]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent text-[15px] text-[#153e2a] outline-none placeholder:text-[#153e2a]/40"
          />
          {loading && (
            <Loader2
              size={16}
              className="shrink-0 animate-spin text-[#153e2a]/40"
            />
          )}
          <button
            onClick={onClose}
            aria-label={t.search.close}
            className="shrink-0 rounded-full p-1 text-[#153e2a]/50 transition hover:bg-black/5 hover:text-[#153e2a]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {trimmed.length < 2 ? (
            <p className="px-4 py-8 text-center text-sm text-[#153e2a]/50">
              {t.search.hint}
            </p>
          ) : results.length === 0 && !loading ? (
            <p className="px-4 py-8 text-center text-sm text-[#153e2a]/50">
              {t.search.noResults} &ldquo;{trimmed}&rdquo;
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((r, i) => {
                const Icon = typeIcon[r.type];
                return (
                  <li key={`${r.href}-${i}`}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      className="flex items-start gap-3 rounded-2xl px-4 py-3 transition hover:bg-[#e6f5ea]"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e6f5ea] text-[#153e2a]">
                        <Icon size={15} strokeWidth={2} />
                      </span>
                      <span className="min-w-0">
                        <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3fa34d]">
                          {groupLabel(r.type)}
                        </span>
                        <span className="block text-sm font-semibold text-[#153e2a]">
                          {r.title}
                        </span>
                        <span className="line-clamp-1 block text-xs text-[#4a4a42]">
                          {r.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
