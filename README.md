# Döner Atlas Berlin

Cultural Project by Matteo Mio, Forward College Berlin, 2026/27 (Dr. Andreas Strasser).
How did the döner become a symbol of Berlin, and what do kebab, döner, shawarma and dürüm
tell us about where they come from?

Static site: Next.js (static export) + React + Leaflet/OpenStreetMap. No backend, no tracking, no cookies.

## Run locally

Needs Node.js 20 or newer.

```powershell
npm install
npm run dev
```

Open http://localhost:3000. To test the production build: `npm run build`, then `npm start`.

## Add a place

```powershell
npm run new-place
```

Full steps: [HOW_TO_ADD_A_PLACE.md](HOW_TO_ADD_A_PLACE.md).

## Where things live

| What | File |
|---|---|
| Places (one file per visit) | `content/places/*.md` |
| Place template | `content/places/_TEMPLATE.md` |
| Example (never rendered) | `content/examples/` |
| History timeline + inventor claims | `data/history.ts` |
| Types explainer | `data/sorten.ts` |
| Imbiss-Deutsch vocabulary + dialogue | `data/vocab.ts` |
| All interface text DE / EN | `i18n/de.ts`, `i18n/en.ts` |
| Place schema (validation) | `lib/places.ts` |
| Styles | `app/globals.css` |

### Adding a source to a history fact

In `data/history.ts`, add to the entry's `sources` and change `status` to `"sourced"`:

```ts
status: "sourced",
sources: [{ label: "Author, Title (Year), p. 12", url: "https://..." }],
```

Contested facts keep `status: "contested"` even with sources.

### Review markers

Search the project for `TODO Matteo` to find every German text and fact Claude wrote
that still needs your review.

## Deploy (Netlify)

One-time setup:

1. Create a GitHub repository and push this folder to it.
2. On netlify.com, sign up (you can use your GitHub account), then
   **Add new site → Import an existing project → GitHub** and pick the repo.
3. Netlify reads `netlify.toml` (build: `npm run build`, publish: `out`). Click **Deploy**.
4. In **Site configuration → Change site name**, set e.g. `doener-atlas` to get
   `https://doener-atlas.netlify.app`.

After that, every `git push` redeploys automatically.

## AI use

See [AI_JOURNAL.md](AI_JOURNAL.md) and the site's *Methode & KI-Nutzung* page.
