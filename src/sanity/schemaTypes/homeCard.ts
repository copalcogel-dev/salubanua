import { defineField, defineType } from "sanity";

/**
 * Kartu yang tampil di carousel Beranda.
 *
 * Sengaja dipisah dari `destination` walau bentuknya mirip: sebelumnya
 * Beranda ikut membaca dokumen destinasi, sehingga menambah foto untuk
 * Beranda diam-diam ikut menambah foto di galeri halaman Destinasi. Dengan
 * jenis dokumen sendiri, tiap menu situs punya kontennya masing-masing dan
 * mengubah satu tidak pernah mempengaruhi yang lain.
 */
export const homeCardType = defineType({
  name: "homeCard",
  title: "Kartu Beranda",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Kategori",
      description: "Menentukan kartu ini muncul saat tombol kategori mana yang dipilih.",
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
      title: "Teks Kecil di Atas Judul",
      description: "Contoh: 'BUNTU PENTUHO'. Tampil huruf kapital kecil di atas judul.",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "description",
      title: "Deskripsi Singkat",
      description: "Cukup 1–2 kalimat. Teks yang lebih panjang akan terpotong di kartu.",
      type: "object",
      fields: [
        { name: "id", title: "Indonesia", type: "text", rows: 3, validation: (r) => r.required() },
        { name: "en", title: "English", type: "text", rows: 3, validation: (r) => r.required() },
      ],
    }),
    defineField({
      name: "images",
      title: "Foto Kartu",
      description:
        "Boleh lebih dari satu. Kalau diisi beberapa, kartu akan berganti-ganti foto otomatis sesuai urutan di sini (geser untuk mengurutkan). Foto tampil utuh tanpa dipotong, jadi ukuran potret maupun lanskap sama-sama aman.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      description: "Angka kecil tampil lebih dulu di dalam kategorinya.",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "isSample",
      title: "Ini konten contoh",
      description:
        "Aktifkan bila datanya belum dikonfirmasi. Kartu akan diberi badge CONTOH di situs. Matikan setelah datanya benar.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title.id", subtitle: "category", media: "images.0" },
  },
});
