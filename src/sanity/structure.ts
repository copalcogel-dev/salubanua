import type { StructureResolver } from "sanity/structure";

/**
 * Sidebar Studio dikelompokkan mengikuti menu situs (Beranda / Destinasi /
 * Artikel / Pengelola & Kontak), bukan daftar rata jenis dokumen — supaya
 * pengelola bisa langsung menemukan "isi halaman mana yang mau diedit"
 * tanpa perlu tahu istilah teknis seperti "page" atau "siteSettings".
 *
 * Dokumen "Teks Halaman" difilter per `key` lewat query, bukan dengan
 * menempelkan _id dokumen tertentu — supaya tetap benar walau dokumennya
 * suatu saat dihapus & dibuat ulang dari Studio.
 */
const pageFilter = (key: string) => `_type == "page" && key == "${key}"`;
const categoryFilter = (key: string) => `_type == "destination" && category == "${key}"`;

/**
 * Foto & video destinasi hidup di dokumen "destination", bukan di dokumen
 * "category" (yang isinya cuma nama tombol kategori) — kebingungan yang
 * sempat terjadi karena keduanya sama-sama muncul di bawah menu Destinasi.
 * Supaya klik "Pendakian" dkk. langsung menuju destinasi berisi field
 * foto/video, tiap kategori di sini didaftarkan sebagai daftar destinasi
 * yang sudah difilter, bukan dokumen kategori itu sendiri.
 */
const destinationCategories = [
  { key: "hiking", title: "Pendakian" },
  { key: "waterfall", title: "Air Terjun" },
  { key: "camping", title: "Camping" },
  { key: "homestay", title: "Homestay" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Konten Situs")
    .items([
      S.listItem()
        .title("Beranda")
        .child(
          S.documentList()
            .title("Teks Beranda")
            .filter(pageFilter("home"))
            .defaultOrdering([{ field: "_createdAt", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("Destinasi")
        .child(
          S.list()
            .title("Destinasi")
            .items([
              S.listItem()
                .title("Teks Halaman Destinasi")
                .child(
                  S.documentList()
                    .title("Teks Halaman Destinasi")
                    .filter(pageFilter("destinations"))
                ),
              S.divider(),
              ...destinationCategories.map(({ key, title }) =>
                S.listItem()
                  .title(title)
                  .schemaType("destination")
                  .child(
                    S.documentList()
                      .title(title)
                      .schemaType("destination")
                      .filter(categoryFilter(key))
                      .defaultOrdering([{ field: "order", direction: "asc" }])
                  )
              ),
              S.divider(),
              S.listItem()
                .title("Semua Destinasi")
                .schemaType("destination")
                .child(S.documentTypeList("destination").title("Semua Destinasi")),
              S.listItem()
                .title("Nama & Ikon Kategori")
                .schemaType("category")
                .child(S.documentTypeList("category").title("Nama & Ikon Kategori")),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Artikel")
        .child(
          S.list()
            .title("Artikel")
            .items([
              S.listItem()
                .title("Teks Halaman Artikel")
                .child(
                  S.documentList().title("Teks Halaman Artikel").filter(pageFilter("stories"))
                ),
              S.listItem()
                .title("Artikel / Article")
                .schemaType("post")
                .child(S.documentTypeList("post").title("Artikel / Article")),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Pengelola & Kontak")
        .child(
          S.list()
            .title("Pengelola & Kontak")
            .items([
              S.listItem()
                .title("Teks Halaman Kontak")
                .child(
                  S.documentList().title("Teks Halaman Kontak").filter(pageFilter("contact"))
                ),
              S.listItem()
                .title("Profil Desa & Kontak")
                .schemaType("siteSettings")
                .child(S.documentTypeList("siteSettings").title("Profil Desa & Kontak")),
            ])
        ),
    ]);
