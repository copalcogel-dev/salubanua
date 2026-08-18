import { defineField, defineType } from "sanity";

export const destinationType = defineType({
  name: "destination",
  title: "Destinasi",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Pendakian", value: "hiking" },
          { title: "Air Terjun", value: "waterfall" },
          { title: "Camping", value: "camping" },
          { title: "Homestay", value: "homestay" },
        ],
      },
      validation: (r) => r.required(),
    }),
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
      name: "subtitle",
      title: "Subjudul",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "text", rows: 4, validation: (r) => r.required() },
        { name: "en", title: "English", type: "text", rows: 4, validation: (r) => r.required() },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galeri Foto Tambahan",
      description:
        "Foto-foto ini, ditambah Foto Sampul di atas, tampil di tab \"Foto\" pada halaman Destinasi untuk kategori ini.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videoUrls",
      title: "Tautan Video",
      description:
        "Opsional, boleh lebih dari satu. Tautan YouTube/Vimeo — muncul di tab \"Video\" pada halaman Destinasi. Thumbnail-nya otomatis diambil dari YouTube kalau destinasi ini belum punya Foto Sampul.",
      type: "array",
      of: [{ type: "url" }],
    }),
    defineField({
      name: "available",
      title: "Informasinya sudah lengkap?",
      description: "Nonaktifkan jika destinasi ini masih dalam tahap pendataan.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      description:
        "Angka kecil tampil lebih dulu. Destinasi unggulan sebaiknya diberi angka terkecil.",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "isSample",
      title: "Ini konten contoh",
      description:
        "Aktifkan bila datanya belum dikonfirmasi. Destinasi akan diberi badge CONTOH di situs. Matikan setelah datanya benar.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Label Status (opsional)",
      description: "Contoh: 'Segera hadir' atau 'Jalur sudah dibuka'.",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
  ],
  preview: {
    select: { title: "title.id", subtitle: "category", media: "coverImage" },
  },
});
