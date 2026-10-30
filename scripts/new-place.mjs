#!/usr/bin/env node
// Asks for the fields of a new place and writes content/places/<id>.md.
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const ORIGINS = ["turkey", "turkey-berlin", "berlin-gemuese-doener", "vegan-berlin", "syria", "lebanon", "palestine", "iran", "greece", "north-africa", "mixed", "other", "unknown"];
const TYPES = ["doener", "duerum", "schawarma", "gyros", "falafel", "other"];
const BASIS = ["owner", "press", "menu", "research", "unknown"];
const ADDRESS = ["confirmed", "likely", "open"];
const STATUS = ["visited", "planned"];

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
const required = (a) => (a ? null : "required");
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const y = (s) => JSON.stringify(s);
const num = (s) => Number(s.replace(",", "."));
const today = new Date().toISOString().slice(0, 10);

console.log("\nNew place for Döner Atlas Berlin. Press Enter to accept [defaults].\n");

const name = await ask("Name", { check: required });
const id = await ask("ID (file name)", {
  def: slugify(name),
  check: (a) =>
    !/^[a-z0-9-]+$/.test(a)
      ? "lowercase letters, numbers, dashes"
      : fs.existsSync(path.join("content", "places", `${a}.md`))
        ? "a place with this id already exists"
        : null,
});
const status = await ask(`Status (${STATUS.join(", ")})`, { def: "visited", check: oneOf(STATUS) });
const address_status = await ask(`Address status (${ADDRESS.join(", ")})`, { def: "confirmed", check: oneOf(ADDRESS) });
let address = null;
let lat = null;
let lng = null;
if (address_status !== "open") {
  address = await ask("Address (Street 1, 10999 Berlin)", { check: required });
  const coords = await ask("Coordinates 'lat, lng' (from openstreetmap.org)", {
    check: (a) => {
      const [la, ln] = a.split(",").map(Number);
      return la > 52.3 && la < 52.7 && ln > 13 && ln < 13.8 ? null : "e.g. 52.4815, 13.4357 (must be in Berlin)";
    },
  });
  [lat, lng] = coords.split(",").map((n) => Number(n.trim()));
}
const bezirk = await ask("Bezirk (e.g. Neukölln)", { check: required });
const kiez = await ask("Kiez (optional)");
const visit_date =
  status === "visited"
    ? await ask("Visit date YYYY-MM-DD (Enter for today, '-' for unknown)", {
        def: today,
        check: (a) => (a === "-" || /^\d{4}-\d{2}-\d{2}$/.test(a) ? null : "YYYY-MM-DD or -"),
      })
    : "-";
const types = await ask(`Types, comma-separated (${TYPES.join(", ")})`, {
  def: "doener",
  check: (a) => (a.split(",").every((t) => TYPES.includes(t.trim())) ? null : `use: ${TYPES.join(", ")}`),
});
const origin = await ask(`Origin (${ORIGINS.join(", ")})`, { def: "unknown", check: oneOf(ORIGINS) });
const origin_basis = await ask(`How do you know? (${BASIS.join(", ")})`, { def: "unknown", check: oneOf(BASIS) });

let grade = "";
let my_note = "";
let price = "";
let priceItem = "";
let interview = "interview: null";
if (status === "visited") {
  grade = await ask("Your grade out of 10, exactly as you wrote it (Enter to skip)", {
    check: (a) => (!a || (!isNaN(num(a)) && num(a) >= 0 && num(a) <= 10) ? null : "a number from 0 to 10"),
  });
  my_note = await ask("Your note (copied exactly)");
  price = await ask("Price you paid in EUR, e.g. 6.5 (Enter to skip)", { check: (a) => (!a || !isNaN(num(a)) ? null : "a number") });
  if (price) priceItem = await ask("What was it?", { def: "Döner" });
  const hasInterview = (await ask("Interview quote with the owner's consent? (y/n)", { def: "n" })).toLowerCase() === "y";
  if (hasInterview) {
    const qde = await ask("Quote (DE)", { check: required });
    const qen = await ask("Quote (EN)", { check: required });
    interview = `interview:\n  consent: true\n  quote_de: ${y(qde)}\n  quote_en: ${y(qen)}`;
  }
}
rl.close();

const file = `---
id: ${y(id)}
name: ${y(name)}
status: ${status}
address: ${address ? y(address) : "null"}
address_status: ${address_status}
bezirk: ${y(bezirk)}
kiez: ${y(kiez)}
lat: ${lat ?? "null"}
lng: ${lng ?? "null"}
visit_date: ${visit_date === "-" ? "null" : y(visit_date)}
types: [${types.split(",").map((t) => t.trim()).join(", ")}]
origin: ${origin}
origin_basis: ${origin_basis}
grade: ${grade ? num(grade) : "null"}
grade_label: null
my_note: ${y(my_note)}
prices:${price ? `\n  - { eur: ${num(price)}, item: ${y(priceItem)}, kind: own }` : " []"}
facts: []
verdict_de: ""
verdict_en: ""
culture_note_de: ""
culture_note_en: ""
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
