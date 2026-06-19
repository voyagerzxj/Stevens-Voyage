# Stevens World Travel 🌍

A static travel website covering countries across all six continents — geography, history, economy, demographics, culture, and tourist destinations. Hosted on GitHub Pages.

## Features

- 6 continents · 18 countries · 83 tourist destinations
- Interactive **world map** — click any highlighted country to jump to its page
- **Search** bar in nav and homepage — instant country/continent lookup (Chinese & English)
- Each country: Geography / History / Economy / Demographics / Culture tabs + Leaflet map with destination pins
- Large countries (China, USA) broken down by province/state with per-region filtering
- Bilingual: **Simplified Chinese** (default) + English toggle
- Fully static — no build step, no server required for production

## Content model — Markdown, rendered live

All written content lives in **Markdown (`.md`) files**. The browser fetches each
`.md` and renders it to HTML at view time via [`js/md.js`](js/md.js) — no build step,
no server-side rendering. Each file is a **JSON front matter** block (structured fields)
fenced by `---`, followed by a **bilingual Markdown body**:

```
---
{ ...JSON metadata... }      ← structured fields (object OR array)
---
<!--zh-->  …Chinese markdown…   <!--en-->  …English markdown…
```

```
data/
  index.json / index.js   ← nav catalog (names, flags, ISO map…) — generated, sync global
  coords.js               ← map centre / zoom + destination pin coordinates (sync global)
  countries/
    japan.md              ← front matter: quickFacts / cuisine / bestTime
                            body: ## geography / history / economy / population / culture
  destinations/
    albania.md            ← front matter: JSON array of destination cards
    china-beijing.md      ← large countries split by subdivision
  journal/
    japan-spring-2026.md  ← front matter: post meta; body: markdown prose,
                            with ![](img), > quote, ::: tip, ::: gallery
    index.md              ← front matter: JSON array of post summaries
```

> The nav catalog (`index.js`) and map coordinates (`coords.js`) stay as JS globals —
> they are a generated index/config loaded synchronously at page bootstrap, not prose.

### Body syntax (journal posts)
- Paragraph → text section · `![caption](url)` → image · `> line` → quote
- ` ::: gallery ` … `src | caption` per line … ` ::: ` → image gallery
- ` ::: tip ` … markdown … ` ::: ` → highlighted travel tip
- Languages are separated by `<!--zh-->` and `<!--en-->` fences.

## Updating content

### Edit a country's details
Open `data/countries/{id}.md`. Edit `quickFacts` / `cuisine` / `bestTime` in the JSON
front matter, or the `## geography` … `## culture` sections in the body. Save and push.

### Edit destinations
Open `data/destinations/{id}.md` (or `{id}-{sub}.md` for large countries) and edit the
JSON array in the front matter. Save and push.

### Add or edit a journal post
Create `data/journal/{id}.md` with front matter (id, title, date, country, continent,
coverImage, tags, excerpt) and a Markdown body, then add a summary entry to
`data/journal/index.md`.

### Regenerating `.md` from the legacy JSON
The original JSON is kept as a backup. To rebuild every `.md` from it:
```bash
python convert_to_md.py
```

### Edit country names / cover images / nav info
Edit `data/index.json`, then run:
```bash
python convert.py
```
This regenerates `data/index.js` (the only auto-generated file needed on every page).

### Adding a new country
1. Add the country entry to `data/index.json` (nav: name, flag, capital, cover…)
2. Create `data/countries/{id}.md` (quickFacts/cuisine/bestTime + info sections)
3. Create `data/destinations/{id}.md` (JSON array of destination cards)
4. Run `python convert.py` to regenerate `data/index.js`
5. Add map coordinates to `data/coords.js`
6. Add the country id to the right continent in `data/index.json`

### Replacing placeholder images
Each destination has an `"image"` field. To use local images:
1. Create `images/destinations/{country-id}/` folder
2. Put the image file there (e.g. `berat.jpg`)
3. Change the `"image"` field to `"images/destinations/albania/berat.jpg"`
4. Save and push — no script needed

## Local development

The site uses `fetch()` for detail pages, so open via a local HTTP server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## GitHub Pages deployment

1. Push to GitHub
2. **Settings → Pages → Source → Deploy from branch → main / (root)**
3. Site live at `https://<username>.github.io/<repo-name>/`

## License

© 2026 Stevens. Original content licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Commercial use prohibited without authorization.
