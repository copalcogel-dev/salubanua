import { defineField, defineType } from "sanity";

/**
 * Nama & deskripsi lima kategori wisata.
 *
 * Ikon dan warna aksennya sengaja tetap di kode — keduanya bagian dari
 * desain, bukan konten, dan salah pilih di sini akan merusak tampilan.
 * Kategori yang belum dibuat di sini otomatis memakai teks bawaan.
 */
export const categoryType = defineType({
  name: "category",
  title: "Kategori Wisata",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Kategori",
      description: "Menentukan ikon dan urutannya di situs.",
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
      title: "Nama Kategori",
      description: "Tampil di tombol kategori. Sebaiknya singkat, 1–2 kata.",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "description",
      title: "Deskripsi Singkat",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "text", rows: 2 },
        { name: "en", title: "English", type: "text", rows: 2 },
      ],
    }),
  ],
  preview: {
    select: { key: "key", title: "title.id" },
    prepare: ({ key, title }) => ({ title: title ?? key, subtitle: key }),
  },
});
