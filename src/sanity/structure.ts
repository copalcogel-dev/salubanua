import type { StructureBuilder } from "sanity/structure";
import type { StructureResolver } from "sanity/structure";

/**
 * Sidebar Studio dikelompokkan mengikuti menu situs (Beranda / Destinasi /
 * Artikel / Pengelola & Kontak), bukan daftar rata jenis dokumen — supaya
 * pengelola bisa langsung menemukan "isi halaman mana yang mau diedit"
 * tanpa perlu tahu istilah teknis seperti "page" atau "siteSettings".
 *
 * "Teks Halaman X" dan "Profil Desa & Kontak" masing-masing cuma boleh ada
 * SATU dokumen — kode di `src/lib` selalu mengambil dokumen pertama yang
 * cocok, jadi kalau editor sampai membuat dokumen kedua secara tidak
 * sengaja, situs bisa diam-diam memakai yang salah tanpa ada peringatan.
 * Makanya di sini dibuka langsung ke _id tetap (`S.document().documentId`),
 * bukan daftar dengan tombol "+ Buat baru" — jalan satu-satunya untuk
 * menambah dokumen baru pun otomatis tertutup.
 */
const pageDoc = (S: StructureBuilder, id: string, title: string) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType("page").documentId(id).title(title));

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
      pageDoc(S, "seed-page-home", "Teks Beranda"),

      S.divider(),

      S.listItem()
        .title("Destinasi")
        .child(
          S.list()
            .title("Destinasi")
            .items([
              pageDoc(S, "seed-page-destinations", "Teks Halaman Destinasi"),
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
              pageDoc(S, "seed-page-stories", "Teks Halaman Artikel"),
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
              pageDoc(S, "seed-page-contact", "Teks Halaman Kontak"),
              S.listItem()
                .title("Profil Desa & Kontak")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("seed-siteSettings")
                    .title("Profil Desa & Kontak")
                ),
            ])
        ),
    ]);
