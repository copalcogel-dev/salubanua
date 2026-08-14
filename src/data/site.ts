export type Lang = "id" | "en";

export const villageProfile = {
  dusun: "Lombo' Ipo",
  desa: "Salubanua",
  kecamatan: "Mambi",
  kabupaten: "Mamasa",
  provinsi: "Sulawesi Barat",
  objekWisata: {
    nama: "Gunung Pentuho",
    aliasName: "Buntu Pentuho",
  },
  pengelola: {
    nama: "PokDarWis Pentuho Malolo",
    mitra: "Pemerintah Desa Salubanua",
  },
};

export const categories = [
  {
    key: "hiking",
    icon: "mountain",
    id: { title: "Pendakian", desc: "Jelajahi jalur menuju Buntu Pentuho." },
    en: { title: "Hiking", desc: "Explore the trail to Buntu Pentuho." },
    accent: "#3f6b4f",
  },
  {
    key: "waterfall",
    icon: "waves",
    id: { title: "Air Terjun", desc: "Temukan aliran air segar pegunungan." },
    en: { title: "Waterfall", desc: "Discover fresh mountain streams." },
    accent: "#2f6b74",
  },
  {
    key: "camping",
    icon: "tent",
    id: { title: "Camping", desc: "Bermalam di bawah langit Mamasa." },
    en: { title: "Camping", desc: "Sleep under the Mamasa sky." },
    accent: "#5a5433",
  },
  {
    key: "viewpoint",
    icon: "camera",
    id: { title: "Spot Foto", desc: "Panorama lembah dan pegunungan." },
    en: { title: "Viewpoint", desc: "Panoramic valley & mountain views." },
    accent: "#4a5d3a",
  },
  {
    key: "homestay",
    icon: "home",
    id: { title: "Homestay", desc: "Menginap bersama warga Lombo' Ipo." },
    en: { title: "Homestay", desc: "Stay with the people of Lombo' Ipo." },
    accent: "#6b4a3f",
  },
] as const;

export const destinations = [
  {
    key: "pentuho",
    category: "hiking",
    id: {
      title: "Gunung Pentuho",
      subtitle: "Buntu Pentuho",
      desc: "Objek wisata utama Desa Salubanua, sebuah gunung yang menjadi jalur pendakian dan panorama andalan Dusun Lombo' Ipo. Dikelola bersama oleh PokDarWis Pentuho Malolo dan Pemerintah Desa Salubanua.",
      status: "Informasi jalur & fasilitas akan segera diperbarui",
    },
    en: {
      title: "Mount Pentuho",
      subtitle: "Buntu Pentuho",
      desc: "The main attraction of Salubanua Village — a mountain that serves as the flagship hiking trail and panorama of Lombo' Ipo Hamlet. Co-managed by PokDarWis Pentuho Malolo and the Salubanua Village Government.",
      status: "Trail & facility details coming soon",
    },
    available: true,
  },
  {
    key: "waterfall-1",
    category: "waterfall",
    id: {
      title: "Air Terjun",
      subtitle: "Segera Hadir",
      desc: "Data destinasi air terjun sedang dikumpulkan bersama PokDarWis Pentuho Malolo.",
      status: "Segera hadir",
    },
    en: {
      title: "Waterfall",
      subtitle: "Coming Soon",
      desc: "Waterfall destination data is being compiled together with PokDarWis Pentuho Malolo.",
      status: "Coming soon",
    },
    available: false,
  },
  {
    key: "camping-1",
    category: "camping",
    id: {
      title: "Camping Ground",
      subtitle: "Segera Hadir",
      desc: "Area camping di kaki Gunung Pentuho sedang dalam tahap pendataan fasilitas.",
      status: "Segera hadir",
    },
    en: {
      title: "Camping Ground",
      subtitle: "Coming Soon",
      desc: "The camping area at the foot of Mount Pentuho is currently being documented.",
      status: "Coming soon",
    },
    available: false,
  },
];

export const dictionary = {
  id: {
    nav: {
      explore: "Jelajahi",
      destinations: "Destinasi",
      managedBy: "Pengelola",
      contact: "Kontak",
    },
    hero: {
      kicker: "SALUBANUA · MAMBI · MAMASA · SULAWESI BARAT",
      titleTop: "JELAJAHI",
      titleBottom: "PEGUNUNGAN DAN KEHIDUPAN DESA",
      body: "Temukan jalur pendakian Gunung Pentuho, kehidupan Dusun Lombo' Ipo, dan keramahan masyarakat Desa Salubanua di kaki pegunungan Mamasa.",
      cta: "JELAJAHI SEKARANG",
    },
    discover: {
      kicker: "TEMUKAN CERITANYA",
      title: "CERITA DI BALIK GUNUNG PENTUHO",
      body: "Di Dusun Lombo' Ipo, Desa Salubanua, Kecamatan Mambi, Kabupaten Mamasa, berdiri Buntu Pentuho — gunung yang menjadi jantung kehidupan dan pariwisata warga sekitar. Bersama PokDarWis Pentuho Malolo dan Pemerintah Desa Salubanua, kami membangun pariwisata yang tumbuh dari dan untuk masyarakat desa.",
      points: [
        { label: "Dusun", value: "Lombo' Ipo" },
        { label: "Desa", value: "Salubanua" },
        { label: "Kecamatan", value: "Mambi" },
        { label: "Kabupaten", value: "Mamasa" },
        { label: "Provinsi", value: "Sulawesi Barat" },
      ],
    },
    destinations: {
      kicker: "DESTINASI PILIHAN",
      title: "FEATURED DESTINATIONS",
      readMore: "Baca Selengkapnya",
    },
    local: {
      kicker: "PENGELOLA WISATA",
      title: "PokDarWis Pentuho Malolo",
      body: "Kawasan wisata Gunung Pentuho direncanakan dikelola oleh Kelompok Sadar Wisata (PokDarWis) Pentuho Malolo, bekerja sama dengan Pemerintah Desa Salubanua untuk mengembangkan potensi wisata alam sekaligus ekonomi masyarakat setempat.",
      cta: "Hubungi Pengelola",
    },
    contact: {
      kicker: "HUBUNGI KAMI",
      title: "Kontak Desa Salubanua",
      addressLabel: "Alamat",
      managedByLabel: "Dikelola oleh",
      phoneLabel: "WhatsApp / Telepon",
      phonePlaceholder: "Nomor kontak akan segera ditambahkan",
    },
    cta: {
      title: "SAMPAI JUMPA DI JALUR PENDAKIAN",
      body: "Ikuti perkembangan pembangunan pariwisata Desa Salubanua.",
      button: "JELAJAHI SEKARANG",
    },
    footer: {
      address: "Alamat",
      managedBy: "Dikelola oleh",
      rights: "Seluruh hak dilindungi.",
    },
  },
  en: {
    nav: {
      explore: "Explore",
      destinations: "Destinations",
      managedBy: "Managed By",
      contact: "Contact",
    },
    hero: {
      kicker: "SALUBANUA · MAMBI · MAMASA · WEST SULAWESI",
      titleTop: "EXPLORE",
      titleBottom: "THE MOUNTAINS & VILLAGE LIFE",
      body: "Discover the Mount Pentuho hiking trail, the life of Lombo' Ipo Hamlet, and the warmth of Salubanua Village at the foot of the Mamasa mountains.",
      cta: "EXPLORE NOW",
    },
    discover: {
      kicker: "DISCOVER THE STORY",
      title: "THE STORY BEHIND MOUNT PENTUHO",
      body: "In Lombo' Ipo Hamlet, Salubanua Village, Mambi District, Mamasa Regency, stands Buntu Pentuho — a mountain that is the heart of local life and tourism. Together with PokDarWis Pentuho Malolo and the Salubanua Village Government, we are building tourism that grows from and for the village community.",
      points: [
        { label: "Hamlet", value: "Lombo' Ipo" },
        { label: "Village", value: "Salubanua" },
        { label: "District", value: "Mambi" },
        { label: "Regency", value: "Mamasa" },
        { label: "Province", value: "West Sulawesi" },
      ],
    },
    destinations: {
      kicker: "FEATURED DESTINATIONS",
      title: "FEATURED DESTINATIONS",
      readMore: "Read More",
    },
    local: {
      kicker: "TOURISM MANAGEMENT",
      title: "PokDarWis Pentuho Malolo",
      body: "The Mount Pentuho tourism area is planned to be managed by the Tourism Awareness Group (PokDarWis) Pentuho Malolo, in partnership with the Salubanua Village Government, to develop natural tourism potential and the local economy.",
      cta: "Contact the Managers",
    },
    contact: {
      kicker: "GET IN TOUCH",
      title: "Contact Salubanua Village",
      addressLabel: "Address",
      managedByLabel: "Managed by",
      phoneLabel: "WhatsApp / Phone",
      phonePlaceholder: "Contact number coming soon",
    },
    cta: {
      title: "SEE YOU ON THE TRAIL",
      body: "Follow the development of Salubanua Village tourism.",
      button: "EXPLORE NOW",
    },
    footer: {
      address: "Address",
      managedBy: "Managed by",
      rights: "All rights reserved.",
    },
  },
} as const;
