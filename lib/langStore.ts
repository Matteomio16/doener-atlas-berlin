import { isLang, type Lang } from "@/i18n";

const KEY = "doener-atlas-lang";

export function readLang(): Lang | null {
  try {
    const v = localStorage.getItem(KEY);
    return v && isLang(v) ? v : null;
  } catch {
    return null;
  }
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {}
}
