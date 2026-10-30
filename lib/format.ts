import type { Lang } from "@/i18n";

const locale = (lang: Lang) => (lang === "de" ? "de-DE" : "en-GB");

export function formatDate(iso: string, lang: Lang) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(locale(lang), { day: "numeric", month: "long", year: "numeric" });
}

export function formatPrice(eur: number, lang: Lang) {
  return eur.toLocaleString(locale(lang), { style: "currency", currency: "EUR" });
}

// Keeps every digit as entered; only the decimal separator follows the language.
export function formatNumber(n: number, lang: Lang) {
  return n.toLocaleString(locale(lang), { maximumFractionDigits: 3 });
}
