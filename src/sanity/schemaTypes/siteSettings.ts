import { defineField, defineType } from "sanity";

/**
 * Data desa yang dipakai di banyak tempat sekaligus — alamat di halaman
 * Kontak dan footer, kartu profil di halaman Pengelola, serta nama pengelola.
 * Cukup dibuat satu dokumen; kolom yang kosong memakai data bawaan.
 */
export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Profil Desa & Kontak",
  type: "document",
  groups: [
    { name: "profil", title: "Profil Desa", default: true },
    { name: "pengelola", title: "Pengelola" },
    { name: "kontak", title: "Kontak" },
  ],
  fields: [
    defineField({
      name: "dusun",
      title: "Dusun",
      type: "string",
      group: "profil",
    }),
    defineField({ name: "desa", title: "Desa", type: "string", group: "profil" }),
    defineField({
      name: "kecamatan",
      title: "Kecamatan",
      type: "string",
      group: "profil",
    }),
    defineField({
      name: "kabupaten",
      title: "Kabupaten",
      type: "string",
      group: "profil",
    }),
    defineField({
      name: "provinsi",
      title: "Provinsi",
      type: "string",
      group: "profil",
    }),

    defineField({
      name: "pengelolaNama",
      title: "Nama Pengelola",
      description: "Contoh: PokDarWis Pentuho Malolo",
      type: "string",
      group: "pengelola",
    }),
    defineField({
      name: "pengelolaMitra",
      title: "Mitra Pengelola",
      description: "Contoh: Pemerintah Desa Salubanua",
      type: "string",
      group: "pengelola",
    }),

    defineField({
      name: "contactIsSample",
      title: "Kontak ini masih contoh",
      description:
        "Aktifkan selama nomor & akun di bawah belum resmi. Halaman Kontak akan memberi keterangan bahwa datanya contoh. Matikan setelah nomor aslinya diisi.",
      type: "boolean",
      initialValue: false,
      group: "kontak",
    }),
    defineField({
      name: "phone",
      title: "Nomor WhatsApp / Telepon",
      description: "Contoh: +62 813-4567-8900",
      type: "string",
      group: "kontak",
    }),
    defineField({
      name: "mapUrl",
      title: "Tautan Google Maps",
      description:
        "Salin dari tombol Bagikan di Google Maps (boleh tautan pendek maps.app.goo.gl). Dipakai untuk tombol \"Buka di Google Maps\".",
      type: "url",
      group: "kontak",
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      description: "Diambil dari tautan Google Maps di atas, untuk menampilkan peta.",
      type: "number",
      group: "kontak",
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      group: "kontak",
    }),
    defineField({
      name: "socials",
      title: "Sosial Media",
      type: "array",
      group: "kontak",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "handle", title: "Nama Akun", type: "string" },
            { name: "url", title: "Tautan", type: "url" },
          ],
          preview: { select: { title: "platform", subtitle: "handle" } },
        },
      ],
    }),
  ],
  preview: {
    select: { desa: "desa" },
    prepare: ({ desa }) => ({
      title: "Profil Desa & Kontak",
      subtitle: desa ?? "Belum diisi",
    }),
  },
});
