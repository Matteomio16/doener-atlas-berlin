export const ORIGINS = [
  "turkey",
  "turkey-berlin",
  "berlin-gemuese-doener",
  "vegan-berlin",
  "syria",
  "lebanon",
  "palestine",
  "iran",
  "greece",
  "north-africa",
  "mixed",
  "other",
  "unknown",
] as const;
export const TYPES = ["doener", "duerum", "schawarma", "gyros", "falafel", "other"] as const;
export const ORIGIN_BASIS = ["owner", "press", "menu", "research", "unknown"] as const;
export const ADDRESS_STATUS = ["confirmed", "likely", "open"] as const;
export const PLACE_STATUS = ["visited", "planned"] as const;

export type Origin = (typeof ORIGINS)[number];
export type PlaceType = (typeof TYPES)[number];
export type OriginBasis = (typeof ORIGIN_BASIS)[number];
export type AddressStatus = (typeof ADDRESS_STATUS)[number];
export type PlaceStatus = (typeof PLACE_STATUS)[number];

export const ORIGIN_STYLE: Record<Origin, { color: string; code: string }> = {
  turkey: { color: "#d40000", code: "TR" },
  "turkey-berlin": { color: "#9e2a14", code: "TB" },
  "berlin-gemuese-doener": { color: "#4f7a28", code: "GD" },
  "vegan-berlin": { color: "#2d6a3e", code: "VG" },
  syria: { color: "#1f6f6a", code: "SY" },
  lebanon: { color: "#a87a00", code: "LB" },
  palestine: { color: "#3c5a2a", code: "PS" },
  iran: { color: "#2f62c9", code: "IR" },
  greece: { color: "#2a5c9e", code: "GR" },
  "north-africa": { color: "#8a3fc4", code: "NA" },
  mixed: { color: "#c9571a", code: "MX" },
  other: { color: "#6f6976", code: "?" },
  unknown: { color: "#8a7d70", code: "?" },
};

export const VISIT_TARGET = 50;
export const VISIT_STRETCH = 100;
// Places visited but not yet entered on the site. The counter uses whichever is higher.
export const VISITS_LOGGED = 15;

export type Photo = { src: string; alt_de: string; alt_en: string };
export type Bilingual = { de: string; en: string };
export type Source = { label: string; url?: string };

export type Price = {
  eur: number;
  item: string;
  kind: "own" | "source";
  delivery: boolean;
  date?: string;
  url?: string;
};

export type Fact = { de: string; en: string; source?: Source };

export type Place = {
  id: string;
  name: string;
  status: PlaceStatus;
  address: string | null;
  address_status: AddressStatus;
  bezirk: string;
  kiez: string;
  lat: number | null;
  lng: number | null;
  visit_date: string | null;
  types: PlaceType[];
  origin: Origin;
  origin_basis: OriginBasis;
  grade: number | null;
  grade_label: Bilingual | null;
  my_note: string;
  prices: Price[];
  google: { rating: number; reviews: number; category?: string } | null;
  facts: Fact[];
  verdict_de: string;
  verdict_en: string;
  culture_note_de: string;
  culture_note_en: string;
  interview: { consent: true; quote_de: string; quote_en: string } | null;
  photos: Photo[];
};

export function hasPin(p: Place): p is Place & { lat: number; lng: number } {
  return p.address_status !== "open" && p.lat != null && p.lng != null;
}
