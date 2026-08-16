"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { dictionary, type Lang } from "@/data/site";

const STORAGE_KEY = "salubanua-lang";

/**
 * Pilihan bahasa disimpan di localStorage dan dibaca lewat
 * `useSyncExternalStore`, bukan lewat `useState` + effect.
 *
 * Membaca localStorage di dalam effect lalu memanggil setState memicu render
 * bertingkat (render awal dengan bahasa salah, lalu render ulang). Dengan
 * store eksternal, React membaca nilainya langsung saat render di klien dan
 * memakai `getServerSnapshot` saat render di server, sehingga hasil hidrasi
 * tetap cocok.
 */
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // Ikut mendengarkan perubahan dari tab lain.
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): Lang {
  return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "id";
}

/** Server tidak punya localStorage, jadi selalu merender bahasa default. */
function getServerSnapshot(): Lang {
  return "id";
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (typeof dictionary)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    listeners.forEach((notify) => notify());
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "id" ? "en" : "id"),
      t: dictionary[lang],
    }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
