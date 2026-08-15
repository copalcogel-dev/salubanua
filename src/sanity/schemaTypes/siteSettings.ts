import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Pengaturan Kontak",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Nomor WhatsApp / Telepon",
      description: "Contoh: +62 813-4567-8900",
      type: "string",
    }),
    defineField({
      name: "socials",
      title: "Sosial Media",
      type: "array",
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
    select: { title: "phone" },
    prepare: ({ title }) => ({ title: title || "Pengaturan Kontak" }),
  },
});
