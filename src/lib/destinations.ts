import { urlForImage } from "@/sanity/lib/image";
import { fetchSanityDestinations } from "@/sanity/lib/queries";
import { destinations as localDestinations } from "@/data/site";

export type DestinationEntry = {
  key: string;
  category: string;
  isSample: boolean;
  available: boolean;
  coverImageUrl: string | null;
  /** Foto tambahan, tampil di tab "Foto" pada panel kategori terkait. */
  galleryUrls: string[];
  videoUrls: string[];
  id: { title: string; subtitle: string; desc: string; status: string };
  en: { title: string; subtitle: string; desc: string; status: string };
};

function localToDestination(d: (typeof localDestinations)[number]): DestinationEntry {
  return {
    key: d.key,
    category: d.category,
    isSample: d.isSample,
    available: d.available,
    coverImageUrl: d.key === "pentuho" ? "/images/gunung-pentuho.jpg" : null,
    galleryUrls: [],
    videoUrls: [],
    id: d.id,
    en: d.en,
  };
}

export async function getDestinations(): Promise<DestinationEntry[]> {
  const sanityItems = await fetchSanityDestinations();

  if (sanityItems.length > 0) {
    return sanityItems.map((d) => ({
      key: d._id,
      category: d.category,
      isSample: d.isSample ?? false,
      available: d.available,
      coverImageUrl: d.coverImage
        ? urlForImage(d.coverImage).width(1200).height(800).fit("max").url()
        : null,
      galleryUrls: (d.gallery ?? [])
        .filter(Boolean)
        .map((img) => urlForImage(img!).width(800).height(800).fit("max").url()),
      videoUrls: (d.videoUrls ?? []).filter(Boolean),
      id: {
        title: d.titleId,
        subtitle: d.subtitleId ?? "",
        desc: d.descId,
        status: d.statusId ?? "",
      },
      en: {
        title: d.titleEn,
        subtitle: d.subtitleEn ?? "",
        desc: d.descEn,
        status: d.statusEn ?? "",
      },
    }));
  }

  return localDestinations.map(localToDestination);
}
