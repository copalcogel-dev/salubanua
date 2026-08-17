import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Artikel / Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string", validation: (r) => r.required() },
        { name: "en", title: "English", type: "string", validation: (r) => r.required() },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title.id", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Foto Sampul",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan Singkat",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "text", rows: 3, validation: (r) => r.required() },
        { name: "en", title: "English", type: "text", rows: 3, validation: (r) => r.required() },
      ],
    }),
    defineField({
      name: "body",
      title: "Isi Artikel",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "array", of: [{ type: "block" }, { type: "image" }] },
        { name: "en", title: "English", type: "array", of: [{ type: "block" }, { type: "image" }] },
      ],
    }),
    defineField({
      name: "author",
      title: "Penulis",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal Terbit",
      type: "datetime",
    }),
    defineField({
      name: "isSample",
      title: "Ini konten contoh",
      description:
        "Aktifkan bila isinya belum resmi. Artikel akan diberi badge CONTOH di situs supaya pengunjung tahu ini bukan kabar resmi desa. Matikan setelah isinya diganti yang sebenarnya.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title.id", media: "coverImage" },
  },
});
