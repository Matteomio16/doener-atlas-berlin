import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { ORIGINS, TYPES, ORIGIN_BASIS, type Place } from "./taxonomy";

// YAML turns unquoted 2026-11-02 into a Date, so accept both forms.
const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD"),
);

const photo = z.object({
  src: z.string().min(1),
  alt_de: z.string().min(1, "every photo needs alt text"),
  alt_en: z.string().min(1, "every photo needs alt text"),
});

const placeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, numbers and dashes only"),
  name: z.string().min(1),
  address: z.string().min(1),
  bezirk: z.string().min(1),
  kiez: z.string().default(""),
  lat: z.number().min(52.3).max(52.7),
  lng: z.number().min(13.0).max(13.8),
  visit_date: isoDate,
  types: z.array(z.enum(TYPES)).min(1),
  origin: z.enum(ORIGINS),
  origin_basis: z.enum(ORIGIN_BASIS),
  rating: z.number().int().min(1).max(5).nullable().default(null),
  price_eur: z.number().nonnegative().nullable().default(null),
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
  return (cache = places.sort((a, b) => b.visit_date.localeCompare(a.visit_date)));
}

export function getPlace(id: string): Place | undefined {
  return getPlaces().find((p) => p.id === id);
}
