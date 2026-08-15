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
          { title: "Spot Foto", value: "viewpoint" },
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
      name: "available",
      title: "Informasinya sudah lengkap?",
      description: "Nonaktifkan jika destinasi ini masih dalam tahap pendataan.",
      type: "boolean",
      initialValue: true,
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
