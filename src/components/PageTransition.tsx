"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { enterTransition, pageVariants } from "@/lib/motion";

/**
 * Animasi pergantian konten antar-halaman.
 *
 * Header dan footer hidup di layout sehingga tidak ikut dianimasikan —
 * hanya bagian tengah ini yang bertransisi saat menu diklik.
 *
 * Sengaja TIDAK memakai AnimatePresence: pada versi framer-motion di proyek
 * ini AnimatePresence tidak pernah melepas anaknya dari DOM (menyisakan
 * overlay yang menelan klik). Dengan mengganti `key` per rute, React yang
 * melakukan unmount/mount, dan `animate` dijamin berjalan saat mount.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={pageVariants.initial}
      animate={pageVariants.animate}
      transition={enterTransition}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
