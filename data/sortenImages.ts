import type { Bilingual } from "@/i18n";

export type SorteImage = {
  src: string;
  alt: Bilingual;
  author: string;
  license: string;
  licenseUrl: string;
  fileUrl: string;
};

// Freely licensed photos from Wikimedia Commons, resized to 960px. Not Matteo's own photos.
export const sortenImages: Record<string, SorteImage> = {
  doener: {
    src: "/images/sorten/doener.jpg",
    alt: { de: "Döner im Fladenbrot auf rot bedrucktem Einwickelpapier, Berlin 2010", en: "Döner in flatbread on red-printed wrapping paper, Berlin 2010" },
    author: "AleGranholm",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    fileUrl: "https://commons.wikimedia.org/wiki/File:D%C3%B6ner_Kebab,_Berlin,_2010_(01).jpg",
  },
  duerum: {
    src: "/images/sorten/duerum.jpg",
    alt: { de: "Kalbfleisch-Dürüm mit Pommes und Joghurtsoße", en: "Veal dürüm with fries and yoghurt sauce" },
    author: "E4024",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    fileUrl: "https://commons.wikimedia.org/wiki/File:Dana_d%C3%BCr%C3%BCm_(veal_wrap).jpg",
  },
  schawarma: {
    src: "/images/sorten/schawarma.jpg",
    alt: { de: "Geschnittenes Schawarma-Fleisch am Spieß in Aleppo, Syrien", en: "Sliced shawarma meat at the spit in Aleppo, Syria" },
    author: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    fileUrl: "https://commons.wikimedia.org/wiki/File:Shawarma_in_central_Aleppo,_Syria.jpg",
  },
  kebab: {
    src: "/images/sorten/kebab.jpg",
    alt: { de: "Persisches Kabab Koobideh", en: "Persian kabab koobideh" },
    author: "Roozitaa",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    fileUrl: "https://commons.wikimedia.org/wiki/File:Kabab_koobideh_2012.jpg",
  },
  iskender: {
    src: "/images/sorten/iskender.jpg",
    alt: { de: "İskender Kebap mit Tomatensoße und Joghurt", en: "İskender kebap with tomato sauce and yoghurt" },
    author: "Adriao",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    fileUrl: "https://commons.wikimedia.org/wiki/File:%C4%B0skender_kebap.JPG",
  },
  falafel: {
    src: "/images/sorten/falafel.jpg",
    alt: { de: "Teller mit Falafel", en: "A plate of falafel" },
    author: "Miansari66",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    fileUrl: "https://commons.wikimedia.org/wiki/File:Falafel_1.JPG",
  },
};
