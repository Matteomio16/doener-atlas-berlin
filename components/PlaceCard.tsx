import Link from "next/link";
import { getDict, type Lang } from "@/i18n";
import { ORIGIN_STYLE, type Place } from "@/lib/taxonomy";
import Grade from "./Rating";

export default function PlaceCard({ place, lang }: { place: Place; lang: Lang }) {
  const d = getDict(lang);
  const where = [place.kiez, place.bezirk].filter(Boolean).join(", ");
  return (
    <Link href={`/${lang}/orte/${place.id}/`} className="place-card" data-status={place.status}>
      <OriginTag origin={place.origin} lang={lang} />
      <h3>{place.name}</h3>
      <span className="place-card__meta">
        {where}
        {place.address_status === "open" && <em className="place-card__flag">{d.places.addressComing}</em>}
      </span>
      <Grade place={place} lang={lang} />
    </Link>
  );
}

export function OriginTag({ origin, lang }: { origin: Place["origin"]; lang: Lang }) {
  return (
    <span className="origin-tag" style={{ color: ORIGIN_STYLE[origin].color }}>
      <span className="dot" style={{ background: ORIGIN_STYLE[origin].color }} aria-hidden="true" />
      {getDict(lang).origins[origin]}
    </span>
  );
}
