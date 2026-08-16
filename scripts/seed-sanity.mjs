/**
 * Mengisi Sanity dengan konten awal situs.
 *
 * Jalankan sekali:  node scripts/seed-sanity.mjs
 *
 * Yang perlu diketahui:
 *  - Butuh SANITY_API_TOKEN (izin Editor) di .env.local. Token hanya dibaca
 *    dari file, tidak pernah ditulis ke mana pun oleh skrip ini.
 *  - Setiap dokumen memakai _id tetap berawalan "seed-", jadi menjalankan
 *    ulang skrip ini memperbarui dokumen yang sama — tidak menumpuk duplikat.
 *    Tanda hubung, bukan titik: Sanity menyembunyikan dokumen ber-ID bertitik
 *    dari pembaca publik (mekanisme yang sama seperti draf), sehingga situs
 *    tidak akan bisa membacanya.
 *  - Dokumen yang Anda buat sendiri lewat Studio punya _id acak, sehingga
 *    tidak akan pernah tertimpa skrip ini.
 *  - Artikel & destinasi contoh ditandai isSample: true supaya tampil dengan
 *    badge CONTOH di situs.
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

if (!projectId) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID belum diisi di .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "SANITY_API_TOKEN belum ada di .env.local.\n" +
      "Buat token dengan izin Editor di sanity.io/manage → API → Tokens,\n" +
      "lalu tambahkan barisnya ke .env.local:\n\n" +
      "  SANITY_API_TOKEN=token-anda\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

/* -------------------------------------------------------------------------
 * Data sumber — disalin dari src/data agar skrip ini bisa dijalankan mandiri
 * tanpa perlu mengompilasi TypeScript.
 * ---------------------------------------------------------------------- */

const dataFile = readFileSync(join(root, "src/data/site.ts"), "utf8");
const articlesFile = readFileSync(join(root, "src/data/articles.ts"), "utf8");

/** Mengambil literal objek/array dari file TS lalu mengevaluasinya. */
function extract(source, declaration) {
  const start = source.indexOf(declaration);
  if (start === -1) throw new Error(`Tidak menemukan ${declaration}`);
  const from = source.indexOf("=", start) + 1;
  let depth = 0;
  let end = from;
  for (let i = from; i < source.length; i++) {
    const ch = source[i];
    if (ch === "{" || ch === "[") depth++;
    else if (ch === "}" || ch === "]") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const literal = source.slice(from, end);
  return new Function(`return (${literal});`)();
}

const villageProfile = extract(dataFile, "export const villageProfile");
const categories = extract(dataFile, "export const categories");
const destinations = extract(dataFile, "export const destinations");
const contactInfo = extract(dataFile, "export const contactInfo");
const dictionary = extract(dataFile, "export const dictionary");
const localArticles = extract(articlesFile, "export const localArticles");

/* ---------------------------------------------------------------------- */

let keyCounter = 0;
const nextKey = () => `k${(keyCounter++).toString(36)}`;

/** Mengubah paragraf teks biasa menjadi blok Portable Text. */
function toBlocks(paragraphs) {
  return paragraphs.map((text) => ({
    _type: "block",
    _key: nextKey(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
  }));
}

const bilingual = (id, en) => ({ id, en });

async function uploadImage(relativePath) {
  const file = join(root, relativePath);
  if (!existsSync(file)) return null;
  const asset = await client.assets.upload("image", readFileSync(file), {
    filename: relativePath.split("/").pop(),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  console.log(`Mengisi project ${projectId} / dataset ${dataset}\n`);

  const docs = [];

  /* --- Teks halaman (konten asli, bukan karangan) --- */
  const id = dictionary.id;
  const en = dictionary.en;

  docs.push({
    _id: "seed-page-home",
    _type: "page",
    key: "home",
    kicker: bilingual(id.hero.kicker, en.hero.kicker),
    title: bilingual(id.hero.titleTop, en.hero.titleTop),
    subtitle: bilingual(id.hero.titleBottom, en.hero.titleBottom),
    body: bilingual(id.hero.body, en.hero.body),
    ctaLabel: bilingual(id.hero.cta, en.hero.cta),
  });
  docs.push({
    _id: "seed-page-destinations",
    _type: "page",
    key: "destinations",
    kicker: bilingual(id.explore.kicker, en.explore.kicker),
    title: bilingual(id.destinations.title, en.destinations.title),
    body: bilingual(id.explore.body, en.explore.body),
  });
  docs.push({
    _id: "seed-page-stories",
    _type: "page",
    key: "stories",
    kicker: bilingual(id.stories.kicker, en.stories.kicker),
    title: bilingual(id.stories.allTitle, en.stories.allTitle),
    body: bilingual(id.stories.body, en.stories.body),
  });
  docs.push({
    _id: "seed-page-about",
    _type: "page",
    key: "about",
    kicker: bilingual(id.discover.kicker, en.discover.kicker),
    title: bilingual(id.discover.title, en.discover.title),
    body: bilingual(id.discover.body, en.discover.body),
  });
  docs.push({
    _id: "seed-page-contact",
    _type: "page",
    key: "contact",
    kicker: bilingual(id.contact.kicker, en.contact.kicker),
    title: bilingual(id.contact.title, en.contact.title),
  });

  /* --- Kategori (nama asli) --- */
  for (const c of categories) {
    docs.push({
      _id: `seed-category-${c.key}`,
      _type: "category",
      key: c.key,
      title: bilingual(c.id.title, c.en.title),
      description: bilingual(c.id.desc, c.en.desc),
    });
  }

  /* --- Profil desa (data asli) + kontak yang masih ditandai contoh --- */
  docs.push({
    _id: "seed-siteSettings",
    _type: "siteSettings",
    dusun: villageProfile.dusun,
    desa: villageProfile.desa,
    kecamatan: villageProfile.kecamatan,
    kabupaten: villageProfile.kabupaten,
    provinsi: villageProfile.provinsi,
    pengelolaNama: villageProfile.pengelola.nama,
    pengelolaMitra: villageProfile.pengelola.mitra,
    contactIsSample: contactInfo.isSample === true,
    phone: contactInfo.phone,
    socials: contactInfo.socials.map((s) => ({
      _type: "social",
      _key: nextKey(),
      platform: s.platform,
      handle: s.handle,
      url: s.url,
    })),
  });

  /* --- Foto Gunung Pentuho diunggah sekali, dipakai destinasi utama --- */
  console.log("Mengunggah foto Gunung Pentuho…");
  const pentuhoImage = await uploadImage("public/images/gunung-pentuho.jpg");

  /* --- Destinasi --- */
  destinations.forEach((d, index) => {
    docs.push({
      _id: `seed-destination-${d.key}`,
      _type: "destination",
      category: d.category,
      title: bilingual(d.id.title, d.en.title),
      subtitle: bilingual(d.id.subtitle, d.en.subtitle),
      description: bilingual(d.id.desc, d.en.desc),
      status: bilingual(d.id.status, d.en.status),
      available: d.available,
      // Urutan mengikuti susunan aslinya; Gunung Pentuho tetap paling depan.
      order: index,
      isSample: d.isSample === true,
      ...(d.key === "pentuho" && pentuhoImage
        ? { coverImage: pentuhoImage }
        : {}),
    });
  });

  /* --- Artikel contoh --- */
  for (const a of localArticles) {
    docs.push({
      _id: `seed-post-${a.slug}`,
      _type: "post",
      title: bilingual(a.id.title, a.en.title),
      slug: { _type: "slug", current: a.slug },
      category: a.category,
      excerpt: bilingual(a.id.excerpt, a.en.excerpt),
      body: { id: toBlocks(a.id.body), en: toBlocks(a.en.body) },
      author: a.author,
      publishedAt: new Date(a.publishedAt).toISOString(),
      isSample: true,
    });
  }

  console.log(`Menulis ${docs.length} dokumen…\n`);

  // Versi awal skrip ini memakai ID bertitik yang tidak terbaca publik.
  // Hapus sisa-sisanya supaya tidak ada dokumen tak terpakai yang tertinggal.
  await client.delete({ query: '*[_id in path("seed.**")]' });

  let tx = client.transaction();
  for (const doc of docs) tx = tx.createOrReplace(doc);
  await tx.commit();

  const counts = docs.reduce((acc, d) => {
    acc[d._type] = (acc[d._type] ?? 0) + 1;
    return acc;
  }, {});

  for (const [type, n] of Object.entries(counts)) {
    console.log(`  ${type.padEnd(14)} ${n}`);
  }
  console.log("\nSelesai. Muat ulang Studio untuk melihat hasilnya.");
  console.log("Jangan lupa hapus SANITY_API_TOKEN setelah tidak diperlukan.");
}

run().catch((err) => {
  console.error("\nGagal:", err.message);
  process.exit(1);
});
