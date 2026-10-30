"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { getDict, type Lang } from "@/i18n";
import { ORIGINS, ORIGIN_STYLE, TYPES, type Origin, type Place, type PlaceType } from "@/lib/taxonomy";
import PlaceCard from "./PlaceCard";

const PlaceMap = dynamic(() => import("./PlaceMap"), {
  ssr: false,
  loading: () => <div className="map" aria-hidden="true" />,
});

function toggle<T>(set: Set<T>, v: T) {
  const next = new Set(set);
  next.has(v) ? next.delete(v) : next.add(v);
  return next;
}

export default function PlaceExplorer({ places, lang, mode }: { places: Place[]; lang: Lang; mode: "map" | "grid" }) {
  const d = getDict(lang);
  const [origins, setOrigins] = useState<Set<Origin>>(new Set());
  const [types, setTypes] = useState<Set<PlaceType>>(new Set());
  const [bezirke, setBezirke] = useState<Set<string>>(new Set());

  const allBezirke = useMemo(() => [...new Set(places.map((p) => p.bezirk))].sort(), [places]);
  const usedOrigins = mode === "map" ? ORIGINS : ORIGINS.filter((o) => places.some((p) => p.origin === o));
  const usedTypes = mode === "map" ? TYPES : TYPES.filter((t) => places.some((p) => p.types.includes(t)));

  const filtered = places.filter(
    (p) =>
      (!origins.size || origins.has(p.origin)) &&
      (!types.size || p.types.some((t) => types.has(t))) &&
      (!bezirke.size || bezirke.has(p.bezirk)),
  );
  const active = origins.size + types.size + bezirke.size > 0;

  const reset = () => {
    setOrigins(new Set());
    setTypes(new Set());
    setBezirke(new Set());
  };

  const filters = (
    <div className="filters">
      <fieldset>
        <legend>{d.filters.origin}</legend>
        <div className="chips">
          {usedOrigins.map((o) => (
            <button key={o} type="button" className="chip" aria-pressed={origins.has(o)} onClick={() => setOrigins(toggle(origins, o))}>
              <span className="dot" style={{ background: ORIGIN_STYLE[o].color }} aria-hidden="true" />
              {d.origins[o]}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{d.filters.type}</legend>
        <div className="chips">
          {usedTypes.map((t) => (
            <button key={t} type="button" className="chip" aria-pressed={types.has(t)} onClick={() => setTypes(toggle(types, t))}>
              {d.types[t]}
            </button>
          ))}
        </div>
      </fieldset>
      {allBezirke.length > 0 && (
        <fieldset>
          <legend>{d.filters.bezirk}</legend>
          <div className="chips">
            {allBezirke.map((b) => (
              <button key={b} type="button" className="chip" aria-pressed={bezirke.has(b)} onClick={() => setBezirke(toggle(bezirke, b))}>
                {b}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <div className="filters__foot">
        <span aria-live="polite">{d.filters.count(filtered.length)}</span>
        {active && (
          <button type="button" className="button button--ghost" onClick={reset}>
            {d.map.reset}
          </button>
        )}
      </div>
    </div>
  );

  const grid = filtered.length ? (
    <div className="place-grid">
      {filtered.map((p) => (
        <PlaceCard key={p.id} place={p} lang={lang} />
      ))}
    </div>
  ) : (
    <div className="empty">
      <strong>{d.empty.title}</strong>
      {places.length ? d.empty.filtered : d.empty.places}
    </div>
  );

  if (mode === "grid") {
    return (
      <>
        {places.length > 0 && filters}
        {grid}
      </>
    );
  }

  return (
    <>
      <div className="map-wrap">
        <PlaceMap places={filtered} lang={lang} />
        {!places.length && (
          <div className="map-empty" role="status">
            <strong>{d.empty.title}</strong>
            {d.empty.places}
          </div>
        )}
      </div>
      <div className="legend" aria-label={d.map.legend}>
        {ORIGINS.map((o) => (
          <span key={o}>
            <i style={{ background: ORIGIN_STYLE[o].color }} aria-hidden="true" />
            {ORIGIN_STYLE[o].code} · {d.origins[o]}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>{filters}</div>
      {places.length > 0 && (
        <section className="map-list">
          <h2>{d.map.listTitle}</h2>
          {grid}
        </section>
      )}
    </>
  );
}
