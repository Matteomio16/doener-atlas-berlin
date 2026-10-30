import Link from "next/link";
import { getDict, type Lang } from "@/i18n";
import { getPlaces } from "@/lib/places";
import { VISIT_STRETCH, VISIT_TARGET } from "@/lib/taxonomy";
import PlaceCard from "@/components/PlaceCard";
import Spit from "@/components/Spit";

export default async function Home({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const d = getDict(lang);
  const places = getPlaces();

  const menu = [
    ["karte", d.nav.map, d.home.cards.map],
    ["orte", d.nav.places, d.home.cards.places],
    ["geschichte", d.nav.history, d.home.cards.history],
    ["sorten", d.nav.types, d.home.cards.types],
    ["imbiss-deutsch", d.nav.imbiss, d.home.cards.imbiss],
    ["methode", d.nav.method, d.home.cards.method],
  ] as const;

  return (
    <>
      <section className="hero">
        <div className="hero__title">
          <h1>{d.home.hook}</h1>
          <p className="hero__intro">{d.home.intro}</p>
        </div>
        <Spit visited={Math.min(places.length, VISIT_TARGET)} target={VISIT_TARGET} stretch={VISIT_STRETCH} lang={lang} />
        <div className="question" aria-label={d.home.questionLabel}>
            {/* TODO Matteo: review German */}
            <blockquote lang="de">
              Wie wurde der Döner zu einem Symbol Berlins, und was erzählen die verschiedenen Sorten (Kebab, Döner,
              Schawarma, Dürüm) über ihre Herkunft?
            </blockquote>
            <blockquote lang="en">
              How did the döner kebab become a symbol of Berlin, and what do the different types (kebab, döner,
              shawarma, dürüm) tell us about where they come from?
            </blockquote>
        </div>
      </section>

      <nav className="board" aria-labelledby="board-title">
        <h2 id="board-title">{d.home.board}</h2>
        <ol>
          {menu.map(([slug, title, text], i) => (
            <li key={slug}>
              <Link href={`/${lang}/${slug}/`}>
                <span className="board__num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="board__title">{title}</span>
                <span className="board__desc">{text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className="section">
        <h2>{d.home.latest}</h2>
        {places.length ? (
          <div className="place-grid">
            {places.slice(0, 3).map((p) => (
              <PlaceCard key={p.id} place={p} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <strong>{d.empty.title}</strong>
            {d.empty.places}
          </div>
        )}
      </section>
    </>
  );
}
