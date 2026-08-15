import { Hero } from "@/components/Hero";
import { getDestinations } from "@/lib/destinations";

export const revalidate = 60;

export default async function Home() {
  const destinations = await getDestinations();

  return <Hero destinations={destinations} />;
}
