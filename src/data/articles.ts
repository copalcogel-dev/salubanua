/**
 * Artikel contoh (dummy) untuk mengisi tampilan sebelum konten asli tersedia.
 *
 * Semua entri di sini ditandai `isSample: true` sehingga tampil dengan badge
 * "CONTOH"/"SAMPLE" di UI. Begitu Sanity Studio tersambung dan artikel asli
 * dipublikasikan, konten Sanity otomatis menggantikan data ini
 * (lihat src/lib/content.ts) dan badge tersebut hilang dengan sendirinya.
 */

export type LocalArticle = {
  slug: string;
  category: string;
  publishedAt: string;
  author: string;
  isSample: true;
  id: { title: string; excerpt: string; body: string[] };
  en: { title: string; excerpt: string; body: string[] };
};

export const localArticles: LocalArticle[] = [
  {
    slug: "persiapan-mendaki-buntu-pentuho",
    category: "tips",
    publishedAt: "2026-07-28",
    author: "PokDarWis Pentuho Malolo",
    isSample: true,
    id: {
      title: "Persiapan Dasar Sebelum Mendaki Buntu Pentuho",
      excerpt:
        "Panduan singkat mengenai perlengkapan, waktu terbaik, dan etika pendakian yang perlu disiapkan sebelum menuju puncak.",
      body: [
        "Buntu Pentuho merupakan objek wisata utama Desa Salubanua yang berada di Dusun Lombo' Ipo. Sebelum memulai pendakian, persiapan yang matang akan membuat perjalanan terasa jauh lebih nyaman dan aman.",
        "Perlengkapan dasar yang disarankan meliputi sepatu dengan grip yang baik, jaket tahan angin, air minum yang cukup, serta senter apabila berencana berangkat sebelum matahari terbit. Cuaca pegunungan dapat berubah dengan cepat, sehingga membawa jas hujan ringan selalu menjadi pilihan bijak.",
        "Selain perlengkapan, hal yang tidak kalah penting adalah etika selama berada di kawasan wisata. Bawa kembali seluruh sampah yang Anda hasilkan, hindari merusak vegetasi di sepanjang jalur, dan hormati aturan yang ditetapkan oleh pengelola serta masyarakat setempat.",
        "Untuk informasi jalur, kondisi terkini, dan pendampingan pemandu lokal, pengunjung dapat menghubungi PokDarWis Pentuho Malolo yang bekerja sama dengan Pemerintah Desa Salubanua.",
      ],
    },
    en: {
      title: "Basic Preparation Before Hiking Buntu Pentuho",
      excerpt:
        "A short guide on gear, the best time to go, and the hiking etiquette to prepare before heading for the summit.",
      body: [
        "Buntu Pentuho is the main attraction of Salubanua Village, located in Lombo' Ipo Hamlet. Before starting the hike, thorough preparation will make the journey far more comfortable and safe.",
        "Recommended basic gear includes shoes with good grip, a windproof jacket, sufficient drinking water, and a flashlight if you plan to depart before sunrise. Mountain weather can change quickly, so bringing a light raincoat is always a wise choice.",
        "Beyond gear, equally important is your conduct within the tourism area. Carry back all the waste you produce, avoid damaging vegetation along the trail, and respect the rules set by the managers and the local community.",
        "For trail information, current conditions, and local guide assistance, visitors may contact PokDarWis Pentuho Malolo, which works together with the Salubanua Village Government.",
      ],
    },
  },
  {
    slug: "mengenal-dusun-lombo-ipo",
    category: "culture",
    publishedAt: "2026-07-15",
    author: "Tim Desa Salubanua",
    isSample: true,
    id: {
      title: "Mengenal Kehidupan Masyarakat Dusun Lombo' Ipo",
      excerpt:
        "Sekilas tentang keseharian, keramahan, dan kearifan lokal masyarakat yang tinggal di kaki Gunung Pentuho.",
      body: [
        "Dusun Lombo' Ipo berada di Desa Salubanua, Kecamatan Mambi, Kabupaten Mamasa, Sulawesi Barat. Kehidupan masyarakatnya berjalan berdampingan dengan alam pegunungan yang mengelilinginya.",
        "Keramahan menjadi salah satu hal yang paling terasa ketika berkunjung. Interaksi dengan warga bukan sekadar pelengkap perjalanan, melainkan bagian penting dari pengalaman wisata itu sendiri.",
        "Melalui pengembangan pariwisata yang dikelola bersama PokDarWis Pentuho Malolo, harapannya potensi alam dan budaya desa dapat memberikan manfaat ekonomi yang langsung dirasakan oleh masyarakat setempat.",
      ],
    },
    en: {
      title: "Getting to Know Life in Lombo' Ipo Hamlet",
      excerpt:
        "A glimpse of the daily life, warmth, and local wisdom of the community living at the foot of Mount Pentuho.",
      body: [
        "Lombo' Ipo Hamlet is located in Salubanua Village, Mambi District, Mamasa Regency, West Sulawesi. Community life here runs side by side with the surrounding mountain landscape.",
        "Warmth is one of the things most felt when visiting. Interacting with residents is not merely a supplement to the journey, but an essential part of the travel experience itself.",
        "Through tourism development managed together with PokDarWis Pentuho Malolo, the hope is that the village's natural and cultural potential can bring economic benefits felt directly by the local community.",
      ],
    },
  },
  {
    slug: "menjaga-kelestarian-kawasan-wisata",
    category: "nature",
    publishedAt: "2026-06-30",
    author: "PokDarWis Pentuho Malolo",
    isSample: true,
    id: {
      title: "Menjaga Kelestarian Kawasan Wisata Pentuho",
      excerpt:
        "Pariwisata yang tumbuh berkelanjutan dimulai dari kesadaran bersama antara pengunjung, pengelola, dan masyarakat.",
      body: [
        "Kawasan wisata yang lestari tidak terbentuk dengan sendirinya. Ia lahir dari kesepakatan bersama antara pengunjung, pengelola, dan masyarakat yang tinggal di sekitarnya.",
        "Prinsip sederhana seperti membawa pulang sampah, tidak mengambil apa pun selain foto, dan tidak meninggalkan apa pun selain jejak, menjadi fondasi utama dalam menjaga kawasan Gunung Pentuho.",
        "Dengan menjaga kelestarian sejak awal pengembangan, keindahan yang dinikmati hari ini diharapkan tetap dapat dinikmati oleh generasi berikutnya.",
      ],
    },
    en: {
      title: "Preserving the Pentuho Tourism Area",
      excerpt:
        "Sustainable tourism starts with shared awareness among visitors, managers, and the local community.",
      body: [
        "A well-preserved tourism area does not come about by itself. It is born from a shared commitment among visitors, managers, and the community living around it.",
        "Simple principles such as carrying your waste home, taking nothing but photographs, and leaving nothing but footprints form the main foundation for protecting the Mount Pentuho area.",
        "By maintaining preservation from the earliest stage of development, the beauty enjoyed today is expected to remain enjoyable for generations to come.",
      ],
    },
  },
  {
    slug: "rencana-pengembangan-wisata-desa",
    category: "travel-guide",
    publishedAt: "2026-06-12",
    author: "Pemerintah Desa Salubanua",
    isSample: true,
    id: {
      title: "Arah Pengembangan Wisata Desa Salubanua",
      excerpt:
        "Dari pendataan destinasi hingga penyiapan homestay, berikut gambaran arah pengembangan yang sedang disiapkan.",
      body: [
        "Pengembangan pariwisata Desa Salubanua dilakukan secara bertahap. Tahap awal difokuskan pada pendataan destinasi, penyiapan informasi jalur, serta penguatan kelembagaan pengelola.",
        "Selain Gunung Pentuho sebagai objek utama, potensi lain seperti air terjun, area camping, dan spot panorama masih dalam proses pendataan bersama PokDarWis Pentuho Malolo.",
        "Penyiapan homestay dan pengalaman wisata berbasis masyarakat menjadi bagian dari rencana selanjutnya, agar kunjungan wisatawan dapat memberi dampak ekonomi yang lebih luas bagi warga desa.",
      ],
    },
    en: {
      title: "The Direction of Salubanua Village Tourism Development",
      excerpt:
        "From mapping destinations to preparing homestays, here is an outline of the development direction being prepared.",
      body: [
        "Tourism development in Salubanua Village is carried out in stages. The initial stage focuses on mapping destinations, preparing trail information, and strengthening the managing organisation.",
        "Besides Mount Pentuho as the main attraction, other potential sites such as waterfalls, camping areas, and panoramic viewpoints are still being documented together with PokDarWis Pentuho Malolo.",
        "Preparing homestays and community-based tourism experiences is part of the next plan, so that visits can bring broader economic impact for village residents.",
      ],
    },
  },
];
