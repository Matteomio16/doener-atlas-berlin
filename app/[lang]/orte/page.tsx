import type { Metadata } from "next";
import { getDict, type Lang } from "@/i18n";
import { getPlaces } from "@/lib/places";
import PlaceExplorer from "@/components/PlaceExplorer";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  return { title: getDict((await params).lang).places.title };
}

export default async function PlacesPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const d = getDict(lang);
  return (
    <>
      <header className="page-head">
        <h1>{d.places.title}</h1>
        <p>{d.places.lead}</p>
      </header>
      <PlaceExplorer places={getPlaces()} lang={lang} mode="grid" />
    </>
  );
}
