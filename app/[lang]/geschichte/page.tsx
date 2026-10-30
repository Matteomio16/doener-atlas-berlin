import type { Metadata } from "next";
import { getDict, type Lang } from "@/i18n";
import { inventorClaims } from "@/data/history";
import Timeline, { SourceLine, StatusBadge } from "@/components/Timeline";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  return { title: getDict((await params).lang).history.title };
}

export default async function HistoryPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const d = getDict(lang).history;
  return (
    <>
      <header className="page-head">
        <h1>{d.title}</h1>
        <p>{d.lead}</p>
      </header>

      <Timeline lang={lang} />

      <section className="inventor" aria-labelledby="inventor-title">
        <StatusBadge status="contested" lang={lang} />
        <h2 id="inventor-title" style={{ marginTop: 14 }}>
          {d.inventor.title}
        </h2>
        <p>{d.inventor.lead}</p>
        <div className="claims">
          {inventorClaims.map((c) => (
            <div className="claim" key={c.name}>
              <div className="claim__q" aria-hidden="true">
                ?
              </div>
              <h3>{c.name}</h3>
              <p>{c.claim[lang]}</p>
              <SourceLine sources={c.sources} lang={lang} />
            </div>
          ))}
        </div>
        <p className="inventor__ask">{d.inventor.ask}</p>
      </section>
    </>
  );
}
