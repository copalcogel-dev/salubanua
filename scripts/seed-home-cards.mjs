/**
 * Menyalin destinasi yang sudah ada menjadi Kartu Beranda.
 *
 * Jalankan sekali:  node scripts/seed-home-cards.mjs
 *
 * Latar belakangnya: Beranda dan halaman Destinasi dulu membaca dokumen yang
 * sama, sehingga menambah foto untuk Beranda ikut menambah foto di galeri
 * Destinasi. Sekarang keduanya terpisah — Beranda memakai jenis dokumen
 * "homeCard" sendiri. Skrip ini mengisi kartu awalnya dari destinasi yang
 * sudah terlanjur diisi, supaya tidak perlu mengetik ulang semuanya.
 *
 * Setelah dijalankan, keduanya benar-benar berdiri sendiri: mengubah kartu
 * Beranda tidak lagi menyentuh destinasi, dan sebaliknya.
 *
 * Aman dijalankan ulang: tiap kartu memakai _id tetap ("home-card-<id asal>"),
 * jadi menjalankan lagi memperbarui kartu yang sama, bukan menumpuk duplikat.
 * Kartu yang Anda buat sendiri lewat Studio ber-_id acak dan tidak tersentuh.
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Membaca .env.local seadanya — tidak perlu dependensi tambahan. */
function loadEnv() {
  const file = join(root, ".env.local");
  if (!existsSync(file)) return {};
  const env = {};
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const env = { ...loadEnv(), ...process.env };
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Butuh NEXT_PUBLIC_SANITY_PROJECT_ID dan SANITY_API_TOKEN (izin Editor) di .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const existing = await client.fetch(`count(*[_type == "homeCard"])`);
if (existing > 0) {
  console.error(
    `Sudah ada ${existing} Kartu Beranda. Skrip ini hanya untuk pengisian awal —\n` +
      "hapus dulu kartu yang ada lewat Studio bila memang ingin diisi ulang dari destinasi."
  );
  process.exit(1);
}

const destinations = await client.fetch(
  `*[_type == "destination" && defined(title.id)]
     | order(coalesce(@.order, 100) asc, _createdAt asc) {
       _id, category, title, subtitle, description, coverImage, gallery, isSample, order
     }`
);

if (destinations.length === 0) {
  console.error("Tidak ada destinasi untuk disalin.");
  process.exit(1);
}

const tx = client.transaction();

for (const d of destinations) {
  // Foto sampul jadi foto pertama, disusul galeri — urutan itu yang nanti
  // dipakai kartu saat berganti-ganti foto, dan bisa diatur ulang di Studio.
  const images = [d.coverImage, ...(d.gallery ?? [])]
    .filter(Boolean)
    .map((img, i) => ({ ...img, _key: `img-${i}` }));

  if (images.length === 0) continue;

  tx.createOrReplace({
    _id: `home-card-${d._id}`,
    _type: "homeCard",
    category: d.category,
    title: d.title,
    subtitle: d.subtitle,
    description: d.description,
    images,
    isSample: d.isSample ?? false,
    order: d.order ?? 100,
  });
}

await tx.commit();
console.log(`Selesai. ${destinations.length} destinasi disalin jadi Kartu Beranda.`);
console.log("Buka Studio → Beranda untuk menata foto & urutannya.");
