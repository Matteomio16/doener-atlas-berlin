import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { ADDRESS_STATUS, ORIGIN_BASIS, ORIGINS, PLACE_STATUS, TYPES, type Place } from "./taxonomy";

// YAML turns unquoted 2026-11-02 into a Date, so accept both forms.
const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}(-\d{2})?(\/\d{2})?$/, "use YYYY-MM-DD"),
);

const bilingual = z.object({ de: z.string().min(1), en: z.string().min(1) });
const source = z.object({ label: z.string().min(1), url: z.string().url().optional() });

const photo = z.object({
  src: z.string().min(1),
  alt_de: z.string().min(1, "every photo needs alt text"),
  alt_en: z.string().min(1, "every photo needs alt text"),
});

const price = z.object({
  eur: z.number().nonnegative(),
  item: z.string().min(1),
  kind: z.enum(["own", "source"]),
  delivery: z.boolean().default(false),
  date: isoDate.optional(),
  url: z.string().url().optional(),
});

const placeSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, numbers and dashes only"),
    name: z.string().min(1),
    status: z.enum(PLACE_STATUS).default("visited"),
    address: z.string().min(1).nullable().default(null),
    address_status: z.enum(ADDRESS_STATUS),
    bezirk: z.string().min(1),
    kiez: z.string().default(""),
    lat: z.number().min(52.3).max(52.7).nullable().default(null),
    lng: z.number().min(13.0).max(13.8).nullable().default(null),
    visit_date: isoDate.nullable().default(null),
    types: z.array(z.enum(TYPES)).default([]),
    origin: z.enum(ORIGINS),
    origin_basis: z.enum(ORIGIN_BASIS),
    grade: z.number().min(0).max(10).nullable().default(null),
    grade_label: bilingual.nullable().default(null),
    my_note: z.string().default(""),
    prices: z.array(price).default([]),
    google: z
      .object({ rating: z.number().min(0).max(5), reviews: z.number().int().nonnegative(), category: z.string().optional() })
      .nullable()
      .default(null),
    facts: z.array(z.object({ de: z.string().min(1), en: z.string().min(1), source: source.optional() })).default([]),
    verdict_de: z.string().default(""),
    verdict_en: z.string().default(""),
    culture_note_de: z.string().default(""),
    culture_note_en: z.string().default(""),
    interview: z
      .object({
        consent: z.literal(true, { errorMap: () => ({ message: "interviews need consent: true" }) }),
        quote_de: z.string().min(1),
        quote_en: z.string().min(1),
      })
      .nullable()
      .default(null),
    photos: z.array(photo).default([]),
  })
  .superRefine((p, ctx) => {
    if (p.address_status !== "open" && (p.address == null || p.lat == null || p.lng == null)) {
      ctx.addIssue({ code: "custom", path: ["lat"], message: "confirmed/likely places need address, lat and lng" });
    }
    if (p.address_status === "open" && (p.lat != null || p.lng != null)) {
      ctx.addIssue({ code: "custom", path: ["lat"], message: "open addresses must not have coordinates (no pin)" });
    }
    if (p.status === "planned" && (p.grade != null || p.grade_label != null)) {
      ctx.addIssue({ code: "custom", path: ["grade"], message: "planned places never show a grade" });
    }
  });

const PLACES_DIR = path.join(process.cwd(), "content", "places");

let cache: Place[] | null = null;

export function getPlaces(): Place[] {
  if (cache) return cache;
  if (!fs.existsSync(PLACES_DIR)) return (cache = []);
  const files = fs.readdirSync(PLACES_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const places = files.map((file) => {
    const { data } = matter(fs.readFileSync(path.join(PLACES_DIR, file), "utf8"));
    const parsed = placeSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
      throw new Error(`content/places/${file} has problems:\n${issues}`);
    }
    if (`${parsed.data.id}.md` !== file) {
      throw new Error(`content/places/${file}: id "${parsed.data.id}" must match the file name`);
    }
    return parsed.data as Place;
  });
  const rank = (p: Place) => (p.status === "visited" ? 0 : 1);
  return (cache = places.sort(
    (a, b) => rank(a) - rank(b) || (b.grade ?? -1) - (a.grade ?? -1) || a.name.localeCompare(b.name, "de"),
  ));
}

export function getVisited(): Place[] {
  return getPlaces().filter((p) => p.status === "visited");
}

export function getPlace(id: string): Place | undefined {
  return getPlaces().find((p) => p.id === id);
}
