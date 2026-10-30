# AI Journal

Log of AI use for the Cultural Project, as required by Dr. Strasser.
Each entry separates what Claude (AI) did from what Matteo did or decided.

---

## 2026-10-28

**Matteo (my work and decisions)**
- Wrote the project brief: research question, approach, content, page list, data model, hard rules.
- Provided the preliminary history facts (1961 agreement, 1972 contested first döner, 1970s
  Lebanese community on Sonnenallee, post-2015 Syrian shawarma, ~1,000 shops).
- Chose the name *Döner Atlas Berlin*, Netlify hosting, showing my full name, and a React-based stack.
- Approved the build plan.

**Claude (AI)**
- Proposed the stack (Next.js static export, React, Leaflet) and file structure.
- Wrote all code and the visual design.
- Turned Matteo's history facts into timeline entries with status badges; marked all as
  preliminary/contested with empty sources.
- Drafted German and English UI texts, the *Sorten* explainer texts (from general knowledge, unsourced),
  the Imbiss-Deutsch vocabulary and the ordering dialogue. All marked `TODO Matteo` for review.
- Wrote README, HOW_TO_ADD_A_PLACE, the place template and the `npm run new-place` script.

**Redesign (same day)**
- Matteo asked for a more artistic, modern and navigable design.
- Claude redesigned it around the Imbiss itself: white tile wall background, red shop-sign header,
  a backlit menu board ("Was darf's sein?") as the home navigation, a döner spit that fills one layer
  per visited place, a bottom tab bar on phones, and the timeline drawn as a skewer.

**Second redesign (same day)**
- Matteo set the direction: light background with a pattern recalling the logo printed on Berlin
  döner wrapping paper; Ferrari red, cream and a premium brown.
- Claude drew an original repeating stamp motif („Döner Kebab", spit, „Guten Appetit") for the
  background, recoloured the site and added a scalloped edge to the header.

**Still to do by Matteo**
- Review all German text (`TODO Matteo: review German`).
- Verify the *Sorten* texts and add sources (`TODO Matteo: verify`).
- Write the *Über mich* page.

---

<!-- Template for new entries:

## YYYY-MM-DD

**Matteo**
-

**Claude (AI)**
-

-->
