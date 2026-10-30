export const ORIGINS = ["turkey", "syria", "lebanon", "iran", "north-africa", "mixed", "other"] as const;
export const TYPES = ["doener", "duerum", "schawarma", "falafel", "other"] as const;
export const ORIGIN_BASIS = ["owner", "menu", "research"] as const;

export type Origin = (typeof ORIGINS)[number];
export type PlaceType = (typeof TYPES)[number];
export type OriginBasis = (typeof ORIGIN_BASIS)[number];

export const ORIGIN_STYLE: Record<Origin, { color: string; code: string }> = {
  turkey: { color: "#c41f19", code: "TR" },
  syria: { color: "#2d7a4c", code: "SY" },
  lebanon: { color: "#a87a00", code: "LB" },
  iran: { color: "#2f62c9", code: "IR" },
  "north-africa": { color: "#8a3fc4", code: "NA" },
  mixed: { color: "#c9571a", code: "MX" },
  other: { color: "#6f6976", code: "?" },
};

export const VISIT_TARGET = 30;

export type Photo = { src: string; alt_de: string; alt_en: string };

export type Place = {
  id: string;
  name: string;
  address: string;
  bezirk: string;
  kiez: string;
  lat: number;
  lng: number;
  visit_date: string;
  types: PlaceType[];
  origin: Origin;
  origin_basis: OriginBasis;
  rating: number | null;
  price_eur: number | null;
  verdict_de: string;
  verdict_en: string;
  culture_note_de: string;
  culture_note_en: string;
  interview: { consent: true; quote_de: string; quote_en: string } | null;
  photos: Photo[];
};
