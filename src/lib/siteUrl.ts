/**
 * Alamat publik situs, dipakai untuk metadata, robots.txt, dan sitemap.
 *
 * Urutannya: NEXT_PUBLIC_SITE_URL (isi manual saat domain final sudah ada) →
 * domain produksi Vercel → localhost saat dikembangkan.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
