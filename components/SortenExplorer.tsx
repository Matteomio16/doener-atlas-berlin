"use client";

import { useState } from "react";
import { getDict, type Lang } from "@/i18n";
import { sorten } from "@/data/sorten";
import { OriginTag } from "./PlaceCard";

export default function SortenExplorer({ lang }: { lang: Lang }) {
  const d = getDict(lang).sorten;
  const [picked, setPicked] = useState<string[]>(["doener", "schawarma"]);
  const pick = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p.slice(-1), id]));
  const compared = sorten.filter((s) => picked.includes(s.id));
  const rows = [
    ["what", d.what],
    ["from", d.from],
    ["berlin", d.berlin],
  ] as const;

  return (
    <>
      <div className="sorten">
        {sorten.map((s) => (
          <article key={s.id} className="sorte" data-selected={picked.includes(s.id)}>
            <h2>{s.name[lang]}</h2>
            <div className="sorte__origins">
              {s.origins.map((o) => (
                <OriginTag key={o} origin={o} lang={lang} />
              ))}
            </div>
            {rows.map(([key, label]) => (
              <div key={key}>
                <h3>{label}</h3>
                <p>{s[key][lang]}</p>
              </div>
            ))}
            <button
              type="button"
              className="chip"
              style={{ alignSelf: "flex-start", marginTop: "auto" }}
              aria-pressed={picked.includes(s.id)}
              onClick={() => pick(s.id)}
            >
              {d.compare}
            </button>
          </article>
        ))}
      </div>

      <section className="section" aria-labelledby="compare-title">
        <h2 id="compare-title">{d.compare}</h2>
        {compared.length < 2 ? (
          <p className="place-card__meta">{d.pick}</p>
        ) : (
          <div className="table-scroll">
            <table className="compare-table">
              <thead>
                <tr>
                  <td />
                  {compared.map((s) => (
                    <th key={s.id} scope="col">
                      {s.name[lang]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([key, label]) => (
                  <tr key={key}>
                    <th scope="row">{label}</th>
                    {compared.map((s) => (
                      <td key={s.id}>{s[key][lang]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
