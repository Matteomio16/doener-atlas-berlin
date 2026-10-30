import Link from "next/link";
import { getDict, type Lang } from "@/i18n";
import { ORIGIN_STYLE, type Place } from "@/lib/taxonomy";
import { formatDate } from "@/lib/format";
import Rating from "./Rating";

export default function PlaceCard({ place, lang }: { place: Place; lang: Lang }) {
  const d = getDict(lang);
  return (
    <Link href={`/${lang}/orte/${place.id}/`} className="place-card">
      <OriginTag origin={place.origin} lang={lang} />
      <h3>{place.name}</h3>
      <span className="place-card__meta">
        {[place.kiez, place.bezirk].filter(Boolean).join(", ")} · {place.types.map((t) => d.types[t]).join(", ")}
      </span>
      <span className="place-card__meta">
        {formatDate(place.visit_date, lang)}
        {place.rating ? (
          <>
            {" · "}
            <Rating value={place.rating} lang={lang} />
          </>
        ) : null}
      </span>
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
