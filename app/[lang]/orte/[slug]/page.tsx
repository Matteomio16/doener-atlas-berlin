import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Lang } from "@/i18n";
import { getPlace, getPlaces } from "@/lib/places";
import { formatDate, formatPrice } from "@/lib/format";
import { OriginTag } from "@/components/PlaceCard";
import Rating from "@/components/Rating";
import ShareButton from "@/components/ShareButton";

export const dynamicParams = false;

// Static export needs at least one path, so an empty site builds a placeholder page.
const NONE = "noch-keine";

export function generateStaticParams() {
  const ids = getPlaces().map((p) => p.id);
  return (ids.length ? ids : [NONE]).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ lang: Lang; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlace(slug);
  return place ? { title: place.name } : {};
}

export default async function PlacePage({ params }: Params) {
  const { lang, slug } = await params;
  const d = getDict(lang);
  const place = getPlace(slug);
  const back = (
    <p>
      <Link href={`/${lang}/orte/`}>← {d.places.back}</Link>
    </p>
  );

  if (!place) {
    return (
      <>
        {back}
        <div className="empty">
          <strong>{d.empty.title}</strong>
          {d.places.notFound}
        </div>
      </>
    );
  }

  const verdict = lang === "de" ? place.verdict_de : place.verdict_en;
  const note = lang === "de" ? place.culture_note_de : place.culture_note_en;

  return (
    <article>
      {back}
      <header className="page-head">
        <OriginTag origin={place.origin} lang={lang} />
        <h1>{place.name}</h1>
        <p>{[place.kiez, place.bezirk].filter(Boolean).join(", ")}</p>
      </header>

      <div className="place-detail">
        <div>
          {verdict && (
            <section>
              <h2>{d.places.verdict}</h2>
              <p>{verdict}</p>
            </section>
          )}
          {note && (
            <section className="section">
              <h2>{d.places.cultureNote}</h2>
              <p>{note}</p>
            </section>
          )}
          {place.interview?.consent && (
            <section className="section interview">
              <h2>{d.places.interview}</h2>
              <blockquote lang="de">„{place.interview.quote_de}“</blockquote>
              <blockquote lang="en">“{place.interview.quote_en}”</blockquote>
              <p className="place-card__meta">{d.places.interviewNote}</p>
            </section>
          )}
          {place.photos.length > 0 && (
            <section className="section">
              <h2>{d.places.photos}</h2>
              <div className="photos">
                {place.photos.map((ph) => (
                  <img key={ph.src} src={ph.src} alt={lang === "de" ? ph.alt_de : ph.alt_en} loading="lazy" />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="panel">
          <dl className="facts">
            <dt>{d.places.address}</dt>
            <dd>{place.address}</dd>
            <dt>{d.places.visited}</dt>
            <dd>{formatDate(place.visit_date, lang)}</dd>
            <dt>{d.places.ordered}</dt>
            <dd>{place.types.map((t) => d.types[t]).join(", ")}</dd>
            <dt>{d.places.origin}</dt>
            <dd>{d.origins[place.origin]}</dd>
            <dt>{d.places.originHow}</dt>
            <dd>{d.originBasis[place.origin_basis]}</dd>
            <dt>{d.places.rating}</dt>
            <dd>{place.rating ? <Rating value={place.rating} lang={lang} /> : d.places.noRating}</dd>
            {place.price_eur != null && (
              <>
                <dt>{d.places.price}</dt>
                <dd>{formatPrice(place.price_eur, lang)}</dd>
              </>
            )}
          </dl>
          <div className="chips" style={{ marginTop: 20 }}>
            <Link className="button" href={`/${lang}/karte/#${place.id}`}>
              {d.places.onMap}
            </Link>
            <ShareButton lang={lang} />
          </div>
        </aside>
      </div>
    </article>
  );
}
