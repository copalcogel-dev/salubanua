"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MountainScene } from "./MountainScene";
import { glassCard, surfaceTransition } from "@/lib/ui";

export type DestinationCardItem = {
  key: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  /** Berurutan; kalau lebih dari satu, kartu berganti-ganti foto sendiri. */
  images?: string[];
  accent: string;
  isSample?: boolean;
};

/**
 * Jarak antar kartu per breakpoint: [mobile, sm, lg].
 *
 * Harus lebih besar dari jangkauan blur backdrop kartu (~1.5x radius blur,
 * lihat catatan di `glassCard`). Kalau terlalu rapat, tiap kartu ikut
 * menyerap tepi kartu sebelahnya — efeknya, meng-hover satu kartu justru
 * memunculkan garis di sela kartu lain. Layar besar diberi jarak paling
 * lega karena di situlah hover benar-benar dipakai; di mobile jaraknya
 * ditahan supaya tetap muat dua kartu.
 */
const GAPS = [24, 32, 40];
const ARROW_SIZE = 44;

/**
 * Lebar kartu & tinggi foto per breakpoint: [mobile, sm, lg].
 *
 * `maxPerPage` menahan jumlah kartu per halaman supaya carousel di beranda
 * tetap punya halaman berikutnya (kalau keempat kartu muat sekaligus,
 * tombol gesernya tidak ada gunanya).
 */
const preset = {
  card: [156, 206, 244],
  image: [150, 232, 246],
  text: [92, 112, 116],
  maxPerPage: 3,
} as const;

/**
 * Rasio bingkai foto (lebar ÷ tinggi) saat kartu menyesuaikan tinggi layar.
 *
 * Dipatok 3:4 — rasio foto potret bawaan hampir semua kamera HP. Karena
 * foto ditampilkan utuh (`object-contain`), bingkai yang rasionya sama
 * dengan foto berarti foto mengisi bingkai persis tanpa sisa sama sekali.
 * Sebelum ini tinggi bingkai dibiarkan menjulur mengejar tinggi layar,
 * sehingga di layar desktop yang tinggi bingkainya jadi jauh lebih jangkung
 * daripada fotonya — dan foto terlihat "membesar" karena dipotong kiri-kanan
 * demi menutupi bingkai.
 */
const FILL_ASPECT = 3 / 4;
const FILL_IMAGE_MIN = 100;
const FILL_IMAGE_MAX = 520;

/**
 * Jeda ganti foto pada kartu yang punya lebih dari satu foto, dan lama
 * cross-fade antar fotonya. Fade lebih lambat daripada jedanya sendiri
 * supaya terasa meluruh dengan tenang, bukan berkedip cepat.
 */
const ROTATE_MS = 6000;
const FADE_MS = 1800;

function pickResponsive(values: readonly number[], viewportWidth: number) {
  if (viewportWidth >= 1024) return values[2];
  if (viewportWidth >= 640) return values[1];
  return values[0];
}

/**
 * Ukuran kartu dihitung dari lebar layar, jadi pengukurannya harus terjadi
 * sebelum paint agar kartu tidak sempat tampil dengan ukuran mobile di
 * desktop. Di server `useLayoutEffect` tidak tersedia, jadi jatuh ke
 * `useEffect`.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const arrowButtonClass = `hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md ${surfaceTransition} duration-300 hover:border-white/40 hover:bg-white/25 sm:flex disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:bg-white/10`;

/**
 * Bingkai foto satu kartu.
 *
 * Foto ditampilkan utuh (`object-contain`) — tidak pernah dipotong maupun
 * diperbesar melebihi ukuran aslinya. Sisa ruang bingkai diisi salinan foto
 * yang sama dalam versi blur, jadi bidangnya tetap terisi rapi tanpa bidang
 * kosong, dan tanpa unduhan tambahan karena URL-nya persis sama.
 */
function CardFrame({
  images,
  alt,
  accent,
  height,
  width,
}: {
  images: string[];
  alt: string;
  accent: string;
  height: number;
  width: number;
}) {
  const [index, setIndex] = useState(0);
  // Foto berikutnya baru ikut dirender setelah gilirannya tiba, supaya kartu
  // dengan banyak foto tidak mengunduh semuanya sekaligus saat halaman buka.
  const [reached, setReached] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    if (images.length < 2) return;

    const advance = () => {
      const next = (indexRef.current + 1) % images.length;
      indexRef.current = next;
      setIndex(next);
      setReached((r) => Math.max(r, next));
    };

    // Jeda awal acak per kartu supaya kartu-kartu dalam satu baris tidak
    // berganti serempak seperti satu animasi besar.
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(
      () => {
        advance();
        interval = setInterval(advance, ROTATE_MS);
      },
      ROTATE_MS + Math.random() * ROTATE_MS
    );

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [images.length]);

  if (images.length === 0) {
    return <MountainScene accent={accent} className="h-full w-full object-cover" />;
  }

  return (
    <>
      {images.slice(0, reached + 1).map((src, i) => (
        <div
          key={src}
          aria-hidden={i === index ? undefined : true}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{ opacity: i === index ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
        >
          <Image
            src={src}
            alt=""
            fill
            aria-hidden
            sizes={`${width}px`}
            quality={90}
            className="scale-125 object-cover blur-2xl"
          />
          <Image
            src={src}
            alt={alt}
            fill
            // Lebar bingkai sudah pasti diketahui di sini, jadi dipakai
            // langsung. Nilai statis akan membuat Next memilih kandidat
            // srcset yang lebih kecil dari lebar sebenarnya, lalu browser
            // meng-upscale-nya lewat CSS — persis penyebab foto tampak pecah.
            sizes={`${width}px`}
            quality={90}
            style={{ maxHeight: height }}
            className="object-contain"
          />
        </div>
      ))}
    </>
  );
}

/**
 * Carousel kartu yang bergeser per halaman.
 *
 * Lebar area kartu dikunci tepat sebesar jumlah kartu yang muat penuh, dan
 * setiap geseran mendarat persis di batas kartu — jadi tidak pernah ada
 * kartu yang tampil setengah terpotong, baik saat pertama muncul maupun
 * setelah digeser. Panah diletakkan di luar area kartu supaya tidak
 * menimpa konten, dan jaraknya simetris kiri-kanan.
 */
export function DestinationCardRow({
  items,
  sampleLabel = "CONTOH",
  fillHeight = false,
  href,
}: {
  items: DestinationCardItem[];
  sampleLabel?: string;
  /**
   * Membesarkan kartu agar mengisi sisa ruang sampai footer. Dipakai di
   * beranda, yang dirancang muat tepat satu layar — tanpa ini, layar yang
   * tinggi menyisakan ruang kosong di bawah kartu.
   */
  fillHeight?: boolean;
  /**
   * Kalau diisi, tiap kartu jadi tautan ke sini (mis. halaman Destinasi
   * dengan kategori yang sama sudah aktif) — semua kartu di satu baris
   * berbagi kategori yang sama, jadi cukup satu tautan untuk semuanya.
   */
  href?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [cardW, setCardW] = useState<number>(preset.card[0]);
  const [imageH, setImageH] = useState<number>(preset.image[0]);
  const [gap, setGap] = useState<number>(GAPS[0]);
  const [perPage, setPerPage] = useState(1);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const syncArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;

    const vw = window.innerWidth;
    const baseCardW = pickResponsive(preset.card, vw);
    const baseImageH = pickResponsive(preset.image, vw);
    const nextGap = pickResponsive(GAPS, vw);

    // Panah hanya tampil mulai breakpoint `sm`; di bawah itu ruangnya utuh
    // untuk kartu. Diukur dari baris (yang selalu selebar induknya) supaya
    // lebar track tidak ikut mempengaruhi hasil pengukuran.
    const arrowsShown = vw >= 640;
    const rowGap = vw >= 640 ? 16 : 12;
    const reserved = arrowsShown ? 2 * (ARROW_SIZE + rowGap) : 0;
    const available = row.clientWidth - reserved;

    let nextCardW = baseCardW;
    let nextImageH = baseImageH;

    if (fillHeight) {
      // Sisa ruang dihitung dari posisi baris ini sampai atas footer.
      // Tinggi footer dipakai (bukan posisinya), karena posisi footer ikut
      // terdorong saat kartu membesar dan akan membuat perhitungan berputar.
      const footerH =
        document.querySelector("footer")?.getBoundingClientRect().height ?? 0;
      const rowTop = row.getBoundingClientRect().top + window.scrollY;
      const breathingRoom = 24;
      const spaceForRow = window.innerHeight - rowTop - footerH - breathingRoom;
      const textH = pickResponsive(preset.text, vw);
      const roomForImage = Math.max(spaceForRow - textH, FILL_IMAGE_MIN);

      // Lebar tumbuh mengikuti ruang vertikal yang tersedia (menjaga rasio
      // bingkai), tapi dibatasi lebar yang tersedia supaya jumlah kartu per
      // halaman tidak berkurang gara-gara kartunya melebar.
      const widthCap = Math.floor((available + nextGap) / preset.maxPerPage) - nextGap;
      nextCardW = Math.max(
        baseCardW,
        Math.min(Math.max(widthCap, baseCardW), Math.round(roomForImage * FILL_ASPECT))
      );

      // Tinggi bingkai lalu dikunci ke rasio kartu — inilah yang membuat
      // foto potret biasa mengisi bingkai persis, tanpa dipotong.
      //
      // Batas bawahnya persegi (`nextCardW`), bukan `roomForImage`: di layar
      // pendek ruang vertikal yang tersisa bisa jauh lebih kecil daripada
      // lebar kartu, dan bingkai yang melebar seperti itu membuat foto
      // potret berpalang lebar di kiri-kanan. Lebih baik kartunya sedikit
      // melewati satu layar daripada bingkainya jadi kependekan.
      nextImageH = Math.round(
        Math.min(
          nextCardW / FILL_ASPECT,
          Math.max(roomForImage, nextCardW),
          FILL_IMAGE_MAX
        )
      );
    }

    // Berapa kartu utuh yang muat di ruang tersedia — sisa ruang yang tidak
    // cukup untuk satu kartu penuh sengaja dibiarkan kosong, bukan diisi
    // kartu yang terpotong.
    const fits = Math.floor((available + nextGap) / (nextCardW + nextGap));

    setCardW(nextCardW);
    setImageH(nextImageH);
    setGap(nextGap);
    setPerPage(Math.min(Math.max(fits, 1), preset.maxPerPage, items.length));
    syncArrows();
  }, [items.length, syncArrows, fillHeight]);

  useIsomorphicLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const step = cardW + gap;
  const trackWidth = perPage * step - gap;

  const goPage = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Halaman terakhir dipatok ke (jumlah - perPage) supaya posisi berhenti
    // selalu jatuh di batas kartu, tidak pernah menyisakan kartu separuh.
    const maxStart = Math.max(0, items.length - perPage);
    const current = Math.round(el.scrollLeft / step);
    const next = Math.min(Math.max(current + dir * perPage, 0), maxStart);
    el.scrollTo({ left: next * step, behavior: "smooth" });
  };

  return (
    <div
      ref={rowRef}
      className="flex w-full items-center justify-center gap-3 sm:gap-4"
    >
      <button
        type="button"
        onClick={() => goPage(-1)}
        disabled={!canLeft}
        aria-label="Sebelumnya"
        className={arrowButtonClass}
      >
        <ChevronLeft size={19} strokeWidth={2} />
      </button>

      <div
        ref={scrollerRef}
        onScroll={syncArrows}
        style={{ width: trackWidth, gap, scrollbarWidth: "none" }}
        className="flex max-w-full snap-x snap-mandatory overflow-x-auto scroll-smooth pb-1 [&::-webkit-scrollbar]:hidden"
      >
          {items.map((item) => {
            const Icon = item.icon;
            const cardInner = (
              <>
                {/* Radius atas diulang di sini: induknya memakai
                    backdrop-filter, yang membuat clip membulatnya gagal di
                    Chrome sehingga foto tampil bersudut siku. */}
                <div
                  style={{ height: imageH }}
                  className="relative shrink-0 overflow-hidden rounded-t-3xl bg-[#0d2a1d]"
                >
                  <CardFrame
                    images={item.images ?? []}
                    alt={item.title}
                    accent={item.accent}
                    height={imageH}
                    width={cardW}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08160f]/75 to-transparent" />
                  <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#153e2a]">
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  {item.isSample && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold tracking-wide text-white backdrop-blur-sm">
                      {sampleLabel}
                    </span>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {item.subtitle}
                  </p>
                  <h4 className="mb-1 text-sm font-semibold text-white">{item.title}</h4>
                  <p className="line-clamp-1 text-xs leading-relaxed text-white/70 sm:line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </>
            );

            // Tanpa `href`, kartu memang tidak diberi isyarat hover — bukan
            // tautan, jadi tidak ada yang bisa diklik. Isyaratnya pun cukup
            // di tepi kartu: foto sengaja tidak ikut membesar saat di-hover,
            // supaya foto benar-benar selalu tampil pada ukuran aslinya.
            if (href) {
              return (
                <Link
                  key={item.key}
                  href={href}
                  style={{ width: cardW }}
                  className={`group flex shrink-0 snap-start flex-col overflow-hidden ${surfaceTransition} duration-300 hover:border-white/30 ${glassCard}`}
                >
                  {cardInner}
                </Link>
              );
            }

            return (
              <article
                key={item.key}
                style={{ width: cardW }}
                className={`flex shrink-0 snap-start flex-col overflow-hidden ${glassCard}`}
              >
                {cardInner}
              </article>
            );
          })}
      </div>

      <button
        type="button"
        onClick={() => goPage(1)}
        disabled={!canRight}
        aria-label="Berikutnya"
        className={arrowButtonClass}
      >
        <ChevronRight size={19} strokeWidth={2} />
      </button>
    </div>
  );
}
