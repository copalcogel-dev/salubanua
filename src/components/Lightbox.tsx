"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export type LightboxItem =
  | { type: "image"; url: string; alt: string; isSample?: boolean }
  | {
      type: "video";
      url: string;
      embedUrl: string | null;
      poster: string | null;
      alt: string;
      isSample?: boolean;
    };

/**
 * Tampilan besar untuk satu foto/video dari galeri, dengan navigasi
 * sebelumnya/berikutnya — dirender hanya saat dibuka (lihat pemanggilnya),
 * jadi state-nya bersih sendiri lewat unmount, bukan lewat effect.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
  sampleLabel,
  openLabel,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  sampleLabel: string;
  openLabel: string;
}) {
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(index - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(index + 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate, index, hasPrev, hasNext]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      <button
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md"
      >
        <X size={20} />
      </button>

      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index - 1);
          }}
          aria-label="Sebelumnya"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md sm:left-6"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index + 1);
          }}
          aria-label="Berikutnya"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md sm:right-6"
        >
          <ChevronRight size={22} />
        </button>
      )}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-full max-w-4xl flex-col items-center"
      >
        {item.isSample && (
          <span className="absolute -top-8 left-0 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            {sampleLabel}
          </span>
        )}

        {item.type === "image" ? (
          <div className="relative h-[70vh] w-[90vw] max-w-3xl overflow-hidden rounded-2xl sm:w-[80vw]">
            <Image
              src={item.url}
              alt={item.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        ) : item.embedUrl ? (
          <div className="aspect-video w-[90vw] max-w-3xl overflow-hidden rounded-2xl sm:w-[80vw]">
            <iframe
              src={item.embedUrl}
              title={item.alt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#153e2a]"
          >
            {openLabel}
            <ExternalLink size={16} strokeWidth={2.5} />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Mengenali tautan YouTube/Vimeo dan mengubahnya jadi URL embed. */
export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      const shortsMatch = u.pathname.match(/\/(shorts|embed)\/([^/]+)/);
      if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[2]}`;
      return null;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}
