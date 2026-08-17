import type { StructureBuilder, StructureResolver } from "sanity/structure";

/**
 * Sidebar Studio dikelompokkan mengikuti menu situs (Beranda / Destinasi /
 * Artikel / Pengelola & Kontak), bukan daftar rata jenis dokumen — supaya
 * pengelola bisa langsung menemukan "isi halaman mana yang mau diedit"
 * tanpa perlu tahu istilah teknis seperti "page" atau "siteSettings".
 *
 * Tiap menu berdiri sendiri: kartu di Beranda dan destinasi di halaman
 * Destinasi memakai jenis dokumen yang berbeda, jadi menambah foto di satu
 * menu tidak pernah ikut mengubah menu lain.
 */

/**
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

const CATEGORIES = [
  { key: "hiking", title: "Pendakian" },
  { key: "waterfall", title: "Air Terjun" },
  { key: "camping", title: "Camping" },
  { key: "homestay", title: "Homestay" },
];

/**
 * Daftar dokumen satu kategori. `S.initialValueTemplates` tidak dipakai di
 * sini, jadi kategori pada dokumen baru tetap perlu dipilih manual — filter
 * ini murni soal apa yang tampil, bukan apa yang tersimpan.
 */
const byCategory = (S: StructureBuilder, type: string, key: string, title: string) =>
  S.listItem()
    .title(title)
    .schemaType(type)
    .child(
      S.documentList()
        .title(title)
        .schemaType(type)
        .filter(`_type == "${type}" && category == "${key}"`)
        .defaultOrdering([{ field: "order", direction: "asc" }])
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Konten Situs")
    .items([
      S.listItem()
        .title("Beranda")
        .child(
          S.list()
            .title("Beranda")
            .items([
              pageDoc(S, "seed-page-home", "Teks Beranda"),
              S.divider(),
              ...CATEGORIES.map(({ key, title }) =>
                byCategory(S, "homeCard", key, title)
              ),
              S.divider(),
              S.listItem()
                .title("Semua Kartu Beranda")
                .schemaType("homeCard")
                .child(S.documentTypeList("homeCard").title("Semua Kartu Beranda")),
            ])
        ),

      S.divider(),

      S.listItem()
        .title("Destinasi")
        .child(
          S.list()
            .title("Destinasi")
            .items([
              pageDoc(S, "seed-page-destinations", "Teks Halaman Destinasi"),
              S.divider(),
              ...CATEGORIES.map(({ key, title }) =>
                byCategory(S, "destination", key, title)
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
              S.divider(),
              S.listItem()
                .title("Semua Artikel")
                .schemaType("post")
                .child(S.documentTypeList("post").title("Semua Artikel")),
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
              S.divider(),
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
