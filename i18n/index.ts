import de from "./de";
import en from "./en";

export const LANGS = ["de", "en"] as const;
export type Lang = (typeof LANGS)[number];
export type Dict = typeof de;

export type Bilingual = { de: string; en: string };

const dicts: Record<Lang, Dict> = { de, en };

export function getDict(lang: Lang): Dict {
  return dicts[lang] ?? de;
}

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}

export function t(text: Bilingual, lang: Lang): string {
  return text[lang];
}
