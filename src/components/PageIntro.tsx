"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mountain } from "lucide-react";

/**
 * Layar pembuka: panel menutup layar sesaat, lalu tersibak ke kiri & kanan.
 *
 * Animasi keluar dijalankan lewat state `revealed` (bukan AnimatePresence),
 * lalu komponen benar-benar di-unmount setelah animasi selesai — supaya tidak
 * ada overlay tersisa yang menghalangi klik pengguna.
 */
export function PageIntro() {
  const [mounted, setMounted] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const revealTimer = setTimeout(() => setRevealed(true), 900);
    const unmountTimer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 1900);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  const panelTransition = {
    duration: 0.85,
    ease: [0.76, 0, 0.24, 1] as const,
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#153e2a]"
        initial={{ x: 0 }}
        animate={{ x: revealed ? "-100%" : 0 }}
        transition={panelTransition}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#153e2a]"
        initial={{ x: 0 }}
        animate={{ x: revealed ? "100%" : 0 }}
        transition={panelTransition}
      />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 0.92 : 1 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Mountain size={40} strokeWidth={1.5} />
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm font-semibold uppercase tracking-[0.3em]"
        >
          Salubanua
        </motion.span>
      </motion.div>
    </div>
  );
}
