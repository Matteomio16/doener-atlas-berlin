---
# Copy this file, rename it to <id>.md (e.g. imbiss-am-kotti.md), fill it in.
# Files starting with _ are never shown on the site.
id: "my-place-slug"          # must equal the file name, lowercase-with-dashes
name: ""
status: visited              # visited | planned (planned: no grade, muted pin)
address: "Street 1, 10999 Berlin"   # null when unknown
address_status: confirmed    # confirmed (2+ sources) | likely (pin + "being checked") | open (no pin, lat/lng null)
bezirk: ""                   # e.g. Neukölln
kiez: ""                     # e.g. Sonnenallee (optional)
lat: 52.5                    # right-click the spot on openstreetmap.org -> "Show address"
lng: 13.4
visit_date: null             # "YYYY-MM-DD" or null
types: [doener]              # any of: doener, duerum, schawarma, gyros, falafel, other
origin: unknown              # turkey | turkey-berlin | berlin-gemuese-doener | vegan-berlin | syria | lebanon
                             # | palestine | iran | greece | north-africa | mixed | other | unknown
origin_basis: unknown        # owner | press | menu | research | unknown (never upgrade menu/unknown to fact)
grade: null                  # your grade out of 10, exactly as you wrote it (e.g. 7.8), or null
grade_label: null            # optional, e.g. { de: "Geschmack 6 · Größe 7", en: "taste 6 · size 7" }
my_note: ""                  # your note, copied exactly
prices: []
# prices:
#   - { eur: 6.5, item: "Döner", kind: own }
#   - { eur: 8.5, item: "Dönerbox", kind: source, delivery: true, date: "2026-10-30", url: "https://..." }
google: null                 # e.g. { rating: 4.6, reviews: 107, category: "Döner-Restaurant, 1–10 €" }
facts: []
# facts:
#   - de: "…"
#     en: "…"
#     source: { label: "Berliner Zeitung", url: "https://..." }
verdict_de: ""
verdict_en: ""
culture_note_de: ""
culture_note_en: ""
interview: null
# interview:                 # only with the owner's consent
#   consent: true
#   quote_de: ""
#   quote_en: ""
photos: []
# photos:                    # put files in public/photos/<id>/
#   - src: "/photos/my-place-slug/1.jpg"
#     alt_de: ""
#     alt_en: ""
---
