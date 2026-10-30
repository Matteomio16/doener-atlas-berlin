import type { Bilingual } from "@/i18n";

export type VocabCard = {
  term: string;
  meaning: string;
  example: Bilingual;
  note?: Bilingual;
};

// TODO Matteo: review German
export const vocab: VocabCard[] = [
  { term: "der Imbiss", meaning: "snack bar, takeaway", example: { de: "Wir treffen uns am Imbiss an der Ecke.", en: "Let's meet at the snack bar on the corner." } },
  { term: "die Dönerbude", meaning: "döner shop (casual)", example: { de: "Die Dönerbude hat bis drei Uhr nachts offen.", en: "The döner shop is open until 3 a.m." } },
  { term: "das Fladenbrot", meaning: "flatbread", example: { de: "Das Fladenbrot ist frisch und warm.", en: "The flatbread is fresh and warm." } },
  { term: "der Dürüm / die Yufka", meaning: "wrap / thin flatbread", example: { de: "Ich nehme lieber einen Dürüm.", en: "I'd rather have a dürüm." } },
  { term: "der Teller", meaning: "plate (dish served on a plate)", example: { de: "Einen Dönerteller mit Pommes, bitte.", en: "A döner plate with fries, please." } },
  { term: "die Box", meaning: "box (meat and fries in a box)", example: { de: "Eine Dönerbox zum Mitnehmen.", en: "A döner box to take away." } },
  { term: "die Kräutersoße", meaning: "herb sauce", example: { de: "Mit Kräutersoße, bitte.", en: "With herb sauce, please." } },
  { term: "die Knoblauchsoße", meaning: "garlic sauce", example: { de: "Nicht zu viel Knoblauchsoße!", en: "Not too much garlic sauce!" } },
  { term: "scharf", meaning: "spicy", example: { de: "Scharf oder nicht scharf?", en: "Spicy or not spicy?" } },
  {
    term: "mit allem",
    meaning: "with everything",
    example: { de: "Einmal Döner mit allem, bitte.", en: "One döner with everything, please." },
    note: { de: "In Berlin sagt man oft „mit alles“. Das ist Umgangssprache.", en: "In Berlin people often say \"mit alles\". That's colloquial." },
  },
  { term: "ohne Zwiebeln", meaning: "without onions", example: { de: "Mit allem, aber ohne Zwiebeln.", en: "With everything, but no onions." } },
  { term: "zum Mitnehmen", meaning: "to take away", example: { de: "Zum Mitnehmen, bitte.", en: "To take away, please." } },
  { term: "hier essen", meaning: "to eat in", example: { de: "Ich esse hier.", en: "I'll eat here." } },
  { term: "der Ayran", meaning: "salted yoghurt drink", example: { de: "Und einen Ayran dazu.", en: "And an ayran with it." } },
  { term: "Was darf's sein?", meaning: "What can I get you?", example: { de: "Hallo! Was darf's sein?", en: "Hi! What can I get you?" } },
  { term: "Das macht … Euro.", meaning: "That comes to … euros.", example: { de: "Das macht sieben Euro fünfzig.", en: "That's seven fifty." } },
];

export type DialogOption = {
  say: Bilingual;
  order?: string;
  tip?: Bilingual;
};

export type DialogStep = {
  seller: Bilingual;
  options: DialogOption[];
};

// The final step's price is an example for practice, not a real price.
// TODO Matteo: review German
export const dialog: DialogStep[] = [
  {
    seller: { de: "Hallo! Was darf's sein?", en: "Hi! What can I get you?" },
    options: [
      { say: { de: "Einmal Döner, bitte.", en: "One döner, please." }, order: "Einmal Döner" },
      { say: { de: "Einen Dürüm, bitte.", en: "A dürüm, please." }, order: "Einen Dürüm" },
      { say: { de: "Einen Falafel-Teller, bitte.", en: "A falafel plate, please." }, order: "Einen Falafel-Teller" },
    ],
  },
  {
    seller: { de: "Mit allem?", en: "With everything?" },
    options: [
      {
        say: { de: "Ja, mit alles!", en: "Yes, with everything!" },
        order: "mit alles",
        tip: { de: "Typisch Berlin! Standarddeutsch: „mit allem“.", en: "Typical Berlin! Standard German: \"mit allem\"." },
      },
      { say: { de: "Ja, aber ohne Zwiebeln.", en: "Yes, but no onions." }, order: "ohne Zwiebeln" },
      { say: { de: "Nur Salat, bitte.", en: "Just salad, please." }, order: "nur mit Salat" },
    ],
  },
  {
    seller: { de: "Welche Soße? Kräuter, Knoblauch oder scharf?", en: "Which sauce? Herb, garlic or spicy?" },
    options: [
      { say: { de: "Kräutersoße, bitte.", en: "Herb sauce, please." }, order: "mit Kräutersoße" },
      { say: { de: "Knoblauch, bitte.", en: "Garlic, please." }, order: "mit Knoblauchsoße" },
      { say: { de: "Alles, und scharf, bitte!", en: "All of them, and spicy, please!" }, order: "scharf" },
    ],
  },
  {
    seller: { de: "Hier essen oder zum Mitnehmen?", en: "Eat in or take away?" },
    options: [
      { say: { de: "Zum Mitnehmen.", en: "To take away." }, order: "zum Mitnehmen" },
      { say: { de: "Hier essen, bitte.", en: "To eat in, please." }, order: "zum Hier-Essen" },
    ],
  },
  {
    seller: { de: "Noch was zu trinken?", en: "Anything to drink?" },
    options: [
      { say: { de: "Ja, einen Ayran, bitte.", en: "Yes, an ayran, please." }, order: "und einen Ayran" },
      { say: { de: "Nein, danke.", en: "No, thanks." } },
    ],
  },
  {
    seller: { de: "Das macht 8 Euro 50, bitte.", en: "That's 8.50 euros, please." },
    options: [
      { say: { de: "Hier, bitte. Stimmt so!", en: "Here you go. Keep the change!" }, tip: { de: "„Stimmt so“ heißt: Der Rest ist Trinkgeld.", en: "\"Stimmt so\" means: keep the rest as a tip." } },
      { say: { de: "Kann ich mit Karte zahlen?", en: "Can I pay by card?" }, tip: { de: "Viele Imbisse nehmen nur Bargeld.", en: "Many snack bars only take cash." } },
    ],
  },
];
