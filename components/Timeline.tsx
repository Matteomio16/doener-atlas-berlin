"use client";

import { useState } from "react";
import { getDict, type Lang } from "@/i18n";
import { history, type FactStatus, type Source } from "@/data/history";

const STATUSES: FactStatus[] = ["preliminary", "contested", "sourced"];

export function StatusBadge({ status, lang }: { status: FactStatus; lang: Lang }) {
  const d = getDict(lang).history;
  return (
    <span className={`badge badge--${status}`} title={d.statusHelp[status]}>
      {d.status[status]}
    </span>
  );
}

export function SourceLine({ sources, lang }: { sources: Source[]; lang: Lang }) {
  const d = getDict(lang).history;
  return (
    <p className="timeline__source">
      {d.source}:{" "}
      {sources.length
        ? sources.map((s, i) => (
            <span key={s.label}>
              {i > 0 && "; "}
              {s.url ? <a href={s.url}>{s.label}</a> : s.label}
            </span>
          ))
        : d.noSource}
    </p>
  );
}

export default function Timeline({ lang }: { lang: Lang }) {
  const d = getDict(lang).history;
  const [filter, setFilter] = useState<FactStatus | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());
  const shown = history.filter((h) => !filter || h.status === filter);
  const present = STATUSES.filter((s) => history.some((h) => h.status === s));

  return (
    <>
      <div className="filters" role="group" aria-label={d.filter}>
        <div className="chips">
          <button type="button" className="chip" aria-pressed={filter === null} onClick={() => setFilter(null)}>
            {getDict(lang).filters.all}
          </button>
          {present.map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>
              {d.status[s]}
            </button>
          ))}
        </div>
      </div>
      <ol className="timeline">
        {shown.map((h) => {
          const isOpen = open.has(h.id);
          return (
            <li key={h.id} data-status={h.status}>
              <div className="timeline__year">{typeof h.year === "string" ? h.year : h.year[lang]}</div>
              <div className="timeline__card">
                <h3>{h.title[lang]}</h3>
                <StatusBadge status={h.status} lang={lang} />
                <p style={{ marginTop: 12 }}>{h.summary[lang]}</p>
                {isOpen && <p id={`${h.id}-detail`}>{h.detail[lang]}</p>}
                <button
                  type="button"
                  className="timeline__toggle"
                  aria-expanded={isOpen}
                  aria-controls={`${h.id}-detail`}
                  onClick={() => {
                    const next = new Set(open);
                    isOpen ? next.delete(h.id) : next.add(h.id);
                    setOpen(next);
                  }}
                >
                  {isOpen ? d.less : d.more}
                </button>
                <SourceLine sources={h.sources} lang={lang} />
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
