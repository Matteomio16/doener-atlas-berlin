import type { Bilingual } from "@/i18n";

export type FactStatus = "preliminary" | "sourced" | "contested";

export type Source = { label: string; url?: string };

export type HistoryEntry = {
  id: string;
  year: string | Bilingual;
  title: Bilingual;
  summary: Bilingual;
  detail: Bilingual;
  status: FactStatus;
  sources: Source[];
};

// Facts from Matteo's preliminary research. Add a source, then set status to "sourced".
// TODO Matteo: review German
export const history: HistoryEntry[] = [
  {
    id: "anwerbeabkommen-1961",
    year: "1961",
    title: {
      de: "Anwerbeabkommen mit der Türkei",
      en: "Labour recruitment agreement with Turkey",
    },
    summary: {
      de: "Die Bundesrepublik und die Türkei schließen ein Anwerbeabkommen. Ab den 1960er-Jahren kommen türkische „Gastarbeiter“ nach Westdeutschland.",
      en: "West Germany and Turkey sign a labour recruitment agreement. From the 1960s, Turkish \"guest workers\" (Gastarbeiter) arrive in West Germany.",
    },
    detail: {
      de: "Viele kamen nach West-Berlin. Ohne diese Migration gäbe es den Berliner Döner, wie wir ihn kennen, wahrscheinlich nicht.",
      en: "Many came to West Berlin. Without this migration, the Berlin döner as we know it probably wouldn't exist.",
    },
    status: "preliminary",
    sources: [],
  },
  {
    id: "erster-doener-1972",
    year: "1972",
    title: {
      de: "Der erste Döner im Brot?",
      en: "The first döner in bread?",
    },
    summary: {
      de: "Kadir Nurman wird am häufigsten genannt: Er soll 1972 am Bahnhof Zoo den ersten Döner im Brot verkauft haben. Andere sagen, sie waren früher.",
      en: "Kadir Nurman is most often credited with selling the first döner sandwich near Bahnhof Zoo in 1972. Others say they were earlier.",
    },
    detail: {
      de: "Mehmet Aygün und Nevzat Salim behaupten ebenfalls, den Döner erfunden zu haben. Siehe unten: „Wer hat den Döner erfunden?“",
      en: "Mehmet Aygün and Nevzat Salim also claim to have invented it. See below: \"Who invented the döner?\"",
    },
    status: "contested",
    sources: [],
  },
  {
    id: "libanesen-sonnenallee-1970er",
    year: { de: "1970er", en: "1970s" },
    title: {
      de: "Libanesische Community an der Sonnenallee",
      en: "A Lebanese community on Sonnenallee",
    },
    summary: {
      de: "In den 1970er-Jahren entsteht eine libanesische Community rund um die Sonnenallee in Neukölln.",
      en: "In the 1970s, a Lebanese community forms around Sonnenallee in Neukölln.",
    },
    detail: {
      de: "Wie hat diese Community die Berliner Imbisskultur geprägt? Das ist eine Frage für meine Besuche.",
      en: "How did this community shape Berlin's snack-bar culture? That's a question for my visits.",
    },
    status: "preliminary",
    sources: [],
  },
  {
    id: "syrische-schawarma-2015",
    year: { de: "ab 2015", en: "from 2015" },
    title: {
      de: "Syrisches Schawarma an der Sonnenallee",
      en: "Syrian shawarma on Sonnenallee",
    },
    summary: {
      de: "Nach 2015 eröffnen viele syrische Schawarma-Läden an der Sonnenallee.",
      en: "After 2015, many Syrian shawarma places open on Sonnenallee.",
    },
    detail: {
      de: "Hier sieht man, wie neue Migration die Berliner Imbisskultur verändert. Das will ich vor Ort genauer verstehen.",
      en: "This shows how new migration keeps changing Berlin's snack-bar culture. I want to understand it better on site.",
    },
    status: "preliminary",
    sources: [],
  },
  {
    id: "anzahl-doenerlaeden",
    year: { de: "heute", en: "today" },
    title: {
      de: "Über 1.000 Dönerläden?",
      en: "Over 1,000 döner shops?",
    },
    summary: {
      de: "Berlin soll über 1.000 Dönerläden haben. Die Zahlen gehen aber weit auseinander.",
      en: "Berlin is said to have over 1,000 döner shops. Figures vary widely, though.",
    },
    detail: {
      de: "Eine verlässliche Zahl suche ich noch.",
      en: "I'm still looking for a reliable figure.",
    },
    status: "preliminary",
    sources: [],
  },
];

export type InventorClaim = {
  name: string;
  claim: Bilingual;
  sources: Source[];
};

// Only what Matteo's research says so far. Add details (year, place) once sourced.
// TODO Matteo: verify
export const inventorClaims: InventorClaim[] = [
  {
    name: "Kadir Nurman",
    claim: {
      de: "Wird am häufigsten genannt. Soll 1972 am Bahnhof Zoo den ersten Döner im Brot verkauft haben.",
      en: "The name heard most often. Said to have sold the first döner sandwich near Bahnhof Zoo in 1972.",
    },
    sources: [],
  },
  {
    name: "Mehmet Aygün",
    claim: {
      de: "Behauptet ebenfalls, den Döner im Brot erfunden zu haben.",
      en: "Also claims to have invented the döner sandwich.",
    },
    sources: [],
  },
  {
    name: "Nevzat Salim",
    claim: {
      de: "Behauptet ebenfalls, den Döner im Brot erfunden zu haben.",
      en: "Also claims to have invented the döner sandwich.",
    },
    sources: [],
  },
];
