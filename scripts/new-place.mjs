#!/usr/bin/env node
// Asks for the fields of a new place and writes content/places/<id>.md.
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const ORIGINS = ["turkey", "syria", "lebanon", "iran", "north-africa", "mixed", "other"];
const TYPES = ["doener", "duerum", "schawarma", "falafel", "other"];
const BASIS = ["owner", "menu", "research"];

const rl = readline.createInterface({ input: stdin, output: stdout });

async function ask(q, { def = "", check } = {}) {
  for (;;) {
    const a = (await rl.question(`${q}${def ? ` [${def}]` : ""}: `)).trim() || def;
    const err = check?.(a);
    if (!err) return a;
    console.log(`  ! ${err}`);
  }
}

const oneOf = (list) => (a) => (list.includes(a) ? null : `one of: ${list.join(", ")}`);
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const yamlStr = (s) => JSON.stringify(s);
const today = new Date().toISOString().slice(0, 10);

console.log("\nNew place for Döner Atlas Berlin. Press Enter to accept [defaults].\n");

const name = await ask("Name", { check: (a) => (a ? null : "required") });
const id = await ask("ID (file name)", {
  def: slugify(name),
  check: (a) =>
    !/^[a-z0-9-]+$/.test(a)
      ? "lowercase letters, numbers, dashes"
      : fs.existsSync(path.join("content", "places", `${a}.md`))
        ? "a place with this id already exists"
        : null,
});
const address = await ask("Address", { check: (a) => (a ? null : "required") });
const bezirk = await ask("Bezirk (e.g. Neukölln)", { check: (a) => (a ? null : "required") });
const kiez = await ask("Kiez (optional)");
const coords = await ask("Coordinates 'lat, lng' (from openstreetmap.org)", {
  check: (a) => {
    const [lat, lng] = a.split(",").map(Number);
    return lat > 52.3 && lat < 52.7 && lng > 13 && lng < 13.8 ? null : "e.g. 52.4815, 13.4357 (must be in Berlin)";
  },
});
const [lat, lng] = coords.split(",").map((n) => Number(n.trim()));
const visit_date = await ask("Visit date YYYY-MM-DD", { def: today, check: (a) => (/^\d{4}-\d{2}-\d{2}$/.test(a) ? null : "YYYY-MM-DD") });
const types = await ask(`Types, comma-separated (${TYPES.join(", ")})`, {
  def: "doener",
  check: (a) => (a.split(",").every((t) => TYPES.includes(t.trim())) ? null : `use: ${TYPES.join(", ")}`),
});
const origin = await ask(`Origin (${ORIGINS.join(", ")})`, { check: oneOf(ORIGINS) });
const origin_basis = await ask(`How do you know? (${BASIS.join(", ")})`, { def: "owner", check: oneOf(BASIS) });
const rating = await ask("Your rating 1-5 (Enter to skip)", { check: (a) => (!a || /^[1-5]$/.test(a) ? null : "1-5") });
const price = await ask("Price paid in EUR, e.g. 7.5 (Enter to skip)", { check: (a) => (!a || !isNaN(Number(a.replace(",", "."))) ? null : "a number") });
const verdict_de = await ask("Verdict (DE)");
const verdict_en = await ask("Verdict (EN)");
const culture_note_de = await ask("Kultur-Notiz (DE)");
const culture_note_en = await ask("Culture note (EN)");
const hasInterview = (await ask("Interview quote with the owner's consent? (y/n)", { def: "n" })).toLowerCase() === "y";
let interview = "interview: null";
if (hasInterview) {
  const qde = await ask("Quote (DE)", { check: (a) => (a ? null : "required") });
  const qen = await ask("Quote (EN)", { check: (a) => (a ? null : "required") });
  interview = `interview:\n  consent: true\n  quote_de: ${yamlStr(qde)}\n  quote_en: ${yamlStr(qen)}`;
}
rl.close();

const file = `---
id: ${yamlStr(id)}
name: ${yamlStr(name)}
address: ${yamlStr(address)}
bezirk: ${yamlStr(bezirk)}
kiez: ${yamlStr(kiez)}
lat: ${lat}
lng: ${lng}
visit_date: ${yamlStr(visit_date)}
types: [${types.split(",").map((t) => t.trim()).join(", ")}]
origin: ${yamlStr(origin)}
origin_basis: ${yamlStr(origin_basis)}
rating: ${rating || "null"}
price_eur: ${price ? Number(price.replace(",", ".")) : "null"}
verdict_de: ${yamlStr(verdict_de)}
verdict_en: ${yamlStr(verdict_en)}
culture_note_de: ${yamlStr(culture_note_de)}
culture_note_en: ${yamlStr(culture_note_en)}
${interview}
photos: []
# photos:
#   - src: "/photos/${id}/1.jpg"
#     alt_de: ""
#     alt_en: ""
---
`;

const out = path.join("content", "places", `${id}.md`);
fs.writeFileSync(out, file);
fs.mkdirSync(path.join("public", "photos", id), { recursive: true });
console.log(`\nSaved ${out}`);
console.log(`Put photos in public/photos/${id}/ and list them in the file.`);
console.log("Check it with: npm run dev\n");
