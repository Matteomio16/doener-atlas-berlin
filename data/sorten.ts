import type { Bilingual } from "@/i18n";
import type { Origin } from "@/lib/taxonomy";

export type Sorte = {
  id: string;
  name: Bilingual;
  origins: Origin[];
  what: Bilingual;
  from: Bilingual;
  berlin: Bilingual;
};

// TODO Matteo: verify (all texts written by Claude from general knowledge, no sources yet)
// TODO Matteo: review German
export const sorten: Sorte[] = [
  {
    id: "doener",
    name: { de: "Döner", en: "Döner" },
    origins: ["turkey"],
    what: {
      de: "Fleisch vom senkrechten Drehspieß, in dünnen Scheiben abgeschnitten. „Döner“ heißt auf Türkisch „sich drehend“.",
      en: "Meat from a vertical rotating spit, shaved off in thin slices. \"Döner\" means \"turning\" in Turkish.",
    },
    from: {
      de: "Türkische und osmanische Küche. In der Türkei isst man Döner traditionell eher auf dem Teller.",
      en: "Turkish and Ottoman cuisine. In Turkey, döner is traditionally eaten more often on a plate.",
    },
    berlin: {
      de: "Im Fladenbrot mit Salat, Rotkohl, Zwiebeln und Soße. Diese Form als Sandwich gilt als Berliner Entwicklung.",
      en: "In flatbread with salad, red cabbage, onions and sauce. This sandwich form is seen as a Berlin development.",
    },
  },
  {
    id: "duerum",
    name: { de: "Dürüm", en: "Dürüm" },
    origins: ["turkey"],
    what: {
      de: "Döner-Fleisch und Salat, in ein dünnes Fladenbrot (Yufka oder Lavash) gerollt. „Dürüm“ heißt „Rolle“.",
      en: "Döner meat and salad rolled into a thin flatbread (yufka or lavash). \"Dürüm\" means \"roll\".",
    },
    from: {
      de: "Türkei, besonders aus dem Südosten des Landes bekannt.",
      en: "Turkey, especially associated with the south-east of the country.",
    },
    berlin: {
      de: "Die Alternative zum Döner im Brot: dünner, leichter zu essen, oft gleiche Füllung.",
      en: "The alternative to döner in bread: thinner, easier to eat, often the same filling.",
    },
  },
  {
    id: "schawarma",
    name: { de: "Schawarma", en: "Shawarma" },
    origins: ["syria", "lebanon"],
    what: {
      de: "Auch Fleisch vom Drehspieß, aber anders gewürzt und mariniert. Der Name kommt wahrscheinlich vom türkischen „çevirme“ (drehen).",
      en: "Also meat from a rotating spit, but seasoned and marinated differently. The name probably comes from the Turkish \"çevirme\" (turning).",
    },
    from: {
      de: "Levante: Syrien, Libanon, Palästina, Jordanien.",
      en: "The Levant: Syria, Lebanon, Palestine, Jordan.",
    },
    berlin: {
      de: "Vor allem an der Sonnenallee: im dünnen Brot gerollt, mit Knoblauchcreme, eingelegtem Gemüse und oft Pommes.",
      en: "Especially on Sonnenallee: rolled in thin bread, with garlic cream, pickles and often fries.",
    },
  },
  {
    id: "kebab",
    name: { de: "Kebab", en: "Kebab" },
    origins: ["turkey", "iran"],
    what: {
      de: "Ein Oberbegriff für gegrilltes oder gebratenes Fleisch, oft am Spieß. Döner ist nur eine Art von Kebab.",
      en: "An umbrella term for grilled or roasted meat, often on a skewer. Döner is just one kind of kebab.",
    },
    from: {
      de: "Persische, türkische und arabische Küchen. In Iran ist „Kabab“ zum Beispiel Hackfleisch am Spieß (Koobideh) mit Reis.",
      en: "Persian, Turkish and Arab cuisines. In Iran, \"kabab\" is for example minced meat on a skewer (koobideh) with rice.",
    },
    berlin: {
      de: "Im Alltag sagen viele „Kebab“, wenn sie Döner meinen.",
      en: "In everyday speech, many people say \"kebab\" when they mean döner.",
    },
  },
  {
    id: "iskender",
    name: { de: "İskender", en: "İskender" },
    origins: ["turkey"],
    what: {
      de: "Döner-Scheiben auf Brotstücken, mit Tomatensoße, heißer Butter und Joghurt. Man isst es mit Messer und Gabel.",
      en: "Döner slices on pieces of bread, with tomato sauce, hot butter and yoghurt. Eaten with knife and fork.",
    },
    from: {
      de: "Bursa in der Türkei. Benannt nach İskender Efendi.",
      en: "Bursa, Turkey. Named after İskender Efendi.",
    },
    berlin: {
      de: "Steht in vielen türkischen Restaurants auf der Karte, seltener am schnellen Imbiss.",
      en: "On the menu at many Turkish restaurants, less often at a quick snack bar.",
    },
  },
  {
    id: "falafel",
    name: { de: "Falafel", en: "Falafel" },
    origins: ["lebanon", "syria", "north-africa"],
    what: {
      de: "Frittierte Bällchen aus Kichererbsen oder Ackerbohnen, mit Kräutern und Gewürzen. Vegetarisch.",
      en: "Deep-fried balls of chickpeas or fava beans, with herbs and spices. Vegetarian.",
    },
    from: {
      de: "Naher Osten und Ägypten. In Ägypten macht man sie oft aus Ackerbohnen und nennt sie „Ta'amiya“.",
      en: "The Middle East and Egypt. In Egypt they are often made from fava beans and called \"ta'ameya\".",
    },
    berlin: {
      de: "Fast jeder Imbiss hat sie, als Teller oder im Brot. Die vegetarische Alternative zum Döner.",
      en: "Almost every snack bar has them, on a plate or in bread. The vegetarian alternative to döner.",
    },
  },
];
