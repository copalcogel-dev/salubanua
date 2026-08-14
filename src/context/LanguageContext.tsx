"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionary, type Lang } from "@/data/site";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (typeof dictionary)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem("salubanua-lang");
    if (stored === "id" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("salubanua-lang", next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "id" ? "en" : "id"),
      t: dictionary[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
