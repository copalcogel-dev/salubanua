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
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Adventure", value: "adventure" },
          { title: "Travel Guide", value: "travel-guide" },
          { title: "Nature", value: "nature" },
          { title: "Culture", value: "culture" },
          { title: "Tips", value: "tips" },
          { title: "Events", value: "events" },
        ],
      },
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
  ],
  preview: {
    select: { title: "title.id", media: "coverImage" },
  },
});
