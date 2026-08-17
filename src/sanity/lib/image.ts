import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * `.auto("format")` biar browser modern dapat WebP/AVIF (lebih kecil tanpa
 * kehilangan detail), `.quality(90)` supaya kompresi CDN tidak ikut
 * menambah pecah di atas hasil upload aslinya. `.sharpen(30)` menambah
 * ketajaman tepi secara ringan — kebanyakan foto lapangan yang diunggah
 * pengelola diambil pakai HP dalam kondisi cahaya rendah/sambil jalan, jadi
 * agak lembut aslinya; ini bukan pengganti foto sumber yang tajam, cuma
 * bantu sedikit.
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").quality(90).sharpen(30);
}
