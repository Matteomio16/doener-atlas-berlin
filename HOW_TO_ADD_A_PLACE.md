# How to add a place (about 5 minutes)

## Fastest: the script

1. Open a terminal in the project folder.
2. Run `npm run new-place` and answer the questions. Press Enter to skip optional ones.
3. It creates `content/places/<id>.md` and an empty folder `public/photos/<id>/`.
4. Copy your photos into that folder (e.g. `1.jpg`, `2.jpg`). Keep them under ~500 KB each.
5. Open the new `.md` file and list the photos, each with alt text in German and English:
   ```yaml
   photos:
     - src: "/photos/<id>/1.jpg"
       alt_de: "Döner im Fladenbrot auf dem Tresen"
       alt_en: "Döner in flatbread on the counter"
   ```
6. Run `npm run dev` and open http://localhost:3000/de/orte/ to check it.
7. Commit and push. Netlify publishes it in about a minute.

## By hand

1. Copy `content/places/_TEMPLATE.md` to `content/places/<id>.md`.
   The id must match the file name: lowercase, dashes, no umlauts (`doener-mueller`).
2. Fill in the fields. The comments in the template explain each one.
3. Continue from step 4 above.

## Getting coordinates

On openstreetmap.org, right-click the shop and choose "Show address". The URL and the
left panel show `lat, lng`, for example `52.4815, 13.4357`.

## If the build fails

The site checks every place file. If something is wrong, `npm run dev` or the Netlify
build shows a message like:

```
content/places/doener-mueller.md has problems:
  - rating: Number must be less than or equal to 5
```

Fix that field and try again. Nothing broken ever reaches the live site.

## Rules (from the brief)

- Only places you actually visited.
- Rating and verdict are yours.
- Interview quotes only with the owner's consent (`consent: true`).
- `origin_basis` says how you know the origin: `owner`, `menu` or `research`.
