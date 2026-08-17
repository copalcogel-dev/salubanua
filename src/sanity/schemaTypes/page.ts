import { defineField, defineType } from "sanity";

const PAGE_KEY_LABELS: Record<string, string> = {
  home: "Beranda",
  destinations: "Destinasi",
  stories: "Artikel",
  contact: "Pengelola (halaman Kontak)",
};

/**
 * Teks pembuka tiap halaman (kicker, judul, paragraf) beserta teks SEO-nya.
 *
 * Satu dokumen untuk satu halaman, dipilih lewat kolom `key`. Kolom yang
 * dikosongkan otomatis memakai teks bawaan dari kode, jadi halaman tidak
 * pernah tampil kosong meski belum diisi.
 */
export const pageType = defineType({
  name: "page",
  title: "Teks Halaman",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Halaman",
      type: "string",
      options: {
        list: [
          { title: "Beranda", value: "home" },
          { title: "Destinasi", value: "destinations" },
          { title: "Artikel", value: "stories" },
          { title: "Pengelola (halaman Kontak)", value: "contact" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kicker",
      title: "Teks Kecil di Atas Judul",
      description: "Contoh: 'TEMUKAN CERITANYA'. Kosongkan untuk memakai teks bawaan.",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "title",
      title: "Judul Utama",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "subtitle",
      title: "Anak Judul",
      description: "Hanya dipakai di Beranda — baris di bawah kata 'JELAJAHI'.",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "body",
      title: "Paragraf Pengantar",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "text", rows: 4 },
        { name: "en", title: "English", type: "text", rows: 4 },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "Tulisan di Tombol",
      description: "Hanya dipakai di Beranda — contoh: 'JELAJAHI SEKARANG'.",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Judul untuk Google",
      description:
        "Judul yang muncul di hasil pencarian & tab browser. Kosongkan untuk memakai judul bawaan.",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Deskripsi untuk Google",
      description:
        "Ringkasan 1–2 kalimat yang muncul di bawah judul pada hasil pencarian.",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { key: "key", title: "title.id" },
    prepare: ({ key, title }) => ({
      title: PAGE_KEY_LABELS[key as string] ?? key ?? "Halaman",
      subtitle: title ?? "Belum ada judul",
    }),
  },
});
