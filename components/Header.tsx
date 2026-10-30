"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDict, LANGS, type Lang } from "@/i18n";
import { saveLang } from "@/lib/langStore";

type NavKey = "home" | "map" | "places" | "history" | "types" | "imbiss" | "method" | "about";

const NAV: [string, NavKey][] = [
  ["", "home"],
  ["karte", "map"],
  ["orte", "places"],
  ["geschichte", "history"],
  ["sorten", "types"],
  ["imbiss-deutsch", "imbiss"],
  ["methode", "method"],
  ["ueber", "about"],
];

const TAB_BAR: NavKey[] = ["home", "map", "places", "imbiss"];

export default function Header({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const pathname = usePathname() ?? `/${lang}/`;
  const [sheet, setSheet] = useState(false);
  const rest = pathname.replace(/^\/(de|en)/, "");
  const section = rest.split("/").filter(Boolean)[0] ?? "";
  const href = (slug: string) => `/${lang}/${slug ? slug + "/" : ""}`;
  const current = (slug: string) => (section === slug ? "page" : undefined);
  const inSheet = NAV.filter(([, k]) => !TAB_BAR.includes(k));
  const sheetActive = inSheet.some(([s]) => s === section);

  useEffect(() => saveLang(lang), [lang]);
  useEffect(() => setSheet(false), [pathname]);
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  const langToggle = (
    <div className="lang-toggle" role="group" aria-label={d.nav.language}>
      {LANGS.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest || "/"}`}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          onClick={() => saveLang(l)}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className="fascia">
        <div className="fascia__inner">
          <Link href={href("")} className="wordmark">
            Döner Atlas <span>Berlin</span>
          </Link>
          <nav className="fascia__nav" aria-label={d.nav.menu}>
            <ul>
              {NAV.slice(1).map(([slug, key]) => (
                <li key={key}>
                  <Link href={href(slug)} aria-current={current(slug)}>
                    {d.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {langToggle}
        </div>
      </header>

      <nav className="tabbar" aria-label={d.nav.menu}>
        <ul>
          {TAB_BAR.map((key) => {
            const slug = NAV.find(([, k]) => k === key)![0];
            return (
              <li key={key}>
                <Link href={href(slug)} aria-current={current(slug)}>
                  {key === "imbiss" ? d.nav.imbissShort : d.nav[key]}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              aria-expanded={sheet}
              aria-controls="more-sheet"
              data-active={sheetActive || undefined}
              onClick={() => setSheet((s) => !s)}
            >
              {sheet ? d.nav.close : d.nav.more}
            </button>
          </li>
        </ul>
        <div id="more-sheet" className="sheet" hidden={!sheet}>
          <ul>
            {inSheet.map(([slug, key]) => (
              <li key={key}>
                <Link href={href(slug)} aria-current={current(slug)}>
                  {d.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
