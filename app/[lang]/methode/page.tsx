import type { Metadata } from "next";
import { getDict, type Lang } from "@/i18n";
import { history, inventorClaims } from "@/data/history";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  return { title: getDict((await params).lang).method.title };
}

export default async function MethodPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const d = getDict(lang).method;
  const sources = [...history, ...inventorClaims].flatMap((e) => e.sources);
  const unique = [...new Map(sources.map((s) => [s.label, s])).values()];

  return (
    <>
      <header className="page-head">
        <h1>{d.title}</h1>
        <p>{d.lead}</p>
      </header>

      <section>
        <h2>{d.how}</h2>
        <ol className="list-clean">
          {d.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2>{d.rules}</h2>
        <ul className="list-clean">
          {d.rulesList.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>{d.ai}</h2>
        <div className="two-col">
          <div className="panel panel--mine">
            <h3>{d.aiMine}</h3>
            <ul className="list-clean">
              {d.aiMineList.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="panel panel--ai">
            <h3>{d.aiClaude}</h3>
            <ul className="list-clean">
              {d.aiClaudeList.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <p style={{ marginTop: 16 }}>{d.aiWhy}</p>
      </section>

      <section className="section">
        <h2>{d.sources}</h2>
        {unique.length ? (
          <ul className="list-clean">
            {unique.map((s) => (
              <li key={s.label}>{s.url ? <a href={s.url}>{s.label}</a> : s.label}</li>
            ))}
          </ul>
        ) : (
          <p className="place-card__meta">{d.sourcesEmpty}</p>
        )}
      </section>
    </>
  );
}
