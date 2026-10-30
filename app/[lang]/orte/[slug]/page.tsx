import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Lang } from "@/i18n";
import { getPlace, getPlaces } from "@/lib/places";
import { hasPin } from "@/lib/taxonomy";
import { formatDate, formatNumber, formatPrice } from "@/lib/format";
import { OriginTag } from "@/components/PlaceCard";
import Grade from "@/components/Rating";
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

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default async function PlacePage({ params }: Params) {
  const { lang, slug } = await params;
  const d = getDict(lang);
  const place = getPlace(slug);
  const back = (
    <p className="back-link">
      <Link href={`/${lang}/orte/`}>{d.places.back}</Link>
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

  const planned = place.status === "planned";
  const verdict = lang === "de" ? place.verdict_de : place.verdict_en;
  const note = lang === "de" ? place.culture_note_de : place.culture_note_en;

  return (
    <article>
      {back}
      <header className="page-head place-head">
        <OriginTag origin={place.origin} lang={lang} />
        <h1>{place.name}</h1>
        <p>{[place.kiez, place.bezirk].filter(Boolean).join(", ")}</p>
        <Grade place={place} lang={lang} />
      </header>

      <div className="place-detail">
        <div className="place-detail__main">
          {planned && <p className="notice">{d.places.plannedNote}</p>}

          {place.my_note && (
            <section>
              <h2>{d.places.myNote}</h2>
              <blockquote className="my-note" lang="en">
                {place.my_note}
              </blockquote>
              {lang === "de" && <p className="place-card__meta">{d.places.myNoteLang}</p>}
            </section>
          )}

          {verdict && (
            <section className="section">
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

          {place.facts.length > 0 && (
            <section className="section">
              <h2>{d.places.facts}</h2>
              <ul className="facts-list">
                {place.facts.map((f) => (
                  <li key={f.de}>
                    {f[lang]}
                    {f.source && (
                      <span className="source">
                        {" "}
                        {d.places.source}:{" "}
                        {f.source.url ? <a href={f.source.url}>{f.source.label}</a> : f.source.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
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
            <dd>
              {place.address ?? d.places.addressComing}
              {place.address_status === "likely" && <span className="address-flag">{d.places.addressChecking}</span>}
            </dd>
            {place.visit_date && (
              <>
                <dt>{d.places.visited}</dt>
                <dd>{formatDate(place.visit_date, lang)}</dd>
              </>
            )}
            {place.types.length > 0 && (
              <>
                <dt>{d.places.ordered}</dt>
                <dd>{place.types.map((t) => d.types[t]).join(", ")}</dd>
              </>
            )}
            <dt>{d.places.origin}</dt>
            <dd>
              {d.origins[place.origin]}
              <span className="dd-sub">{d.originBasis[place.origin_basis]}</span>
            </dd>
            {place.google && (
              <>
                <dt>{d.places.google}</dt>
                <dd>
                  {d.places.googleValue(formatNumber(place.google.rating, lang), formatNumber(place.google.reviews, lang))}
                </dd>
              </>
            )}
          </dl>

          {place.prices.length > 0 && (
            <>
              <h3 className="aside-title">{d.places.prices}</h3>
              <ul className="price-list">
                {place.prices.map((p) => (
                  <li key={`${p.item}-${p.eur}`}>
                    <span className="price-list__eur">{formatPrice(p.eur, lang)}</span>
                    <span>
                      {p.item}
                      <span className="dd-sub">
                        {p.kind === "own"
                          ? d.places.priceOwn
                          : [
                              p.delivery ? d.places.priceDelivery : null,
                              p.url ? host(p.url) : d.places.priceSource,
                              p.date,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                        {p.kind === "source" && p.url && (
                          <>
                            {" "}
                            <a href={p.url}>{d.places.source}</a>
                          </>
                        )}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="chips" style={{ marginTop: 20 }}>
            {hasPin(place) ? (
              <Link className="button" href={`/${lang}/karte/#${place.id}`}>
                {d.places.onMap}
              </Link>
            ) : (
              <p className="place-card__meta">{d.places.noPin}</p>
            )}
            <ShareButton lang={lang} />
          </div>
        </aside>
      </div>
    </article>
  );
}
