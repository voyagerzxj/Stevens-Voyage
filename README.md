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

## Data structure

Data is split into small per-entity JSON files for fast page loads:

```
data/
  index.json              ← slim nav index (country names, flags, ISO map…)
  index.js                ← auto-generated from index.json (run convert.py)
  coords.js               ← map centre / zoom + destination pin coordinates
  countries/
    albania.json          ← full country detail (quickFacts + 5 info tabs)
    china.json
    …  (one file per country)
  destinations/
    albania.json          ← destination list for small countries
    china-beijing.json    ← large countries split by subdivision
    china-shanghai.json
    usa-new-york.json
    …
  continents.json         ← source data for continents
  countries.json          ← source data for all countries
  destinations.json       ← source data for all destinations
```

## Updating content

### Edit a country's details
Open `data/countries/{id}.json` and edit `quickFacts` or any `info` tab. Save and push — no script needed.

### Edit destinations
Open `data/destinations/{id}.json` (or `{id}-{sub}.json` for large countries). Edit and push directly.

### Edit country names / cover images / nav info
Edit `data/index.json`, then run:
```bash
python convert.py
```
This regenerates `data/index.js` (the only auto-generated file needed on every page).

### Adding a new country
1. Add the country entry to `data/countries.json` and `data/index.json`
2. Add destinations to `data/destinations.json`
3. Run `python split_data.py` to regenerate all split files
4. Run `python convert.py` to regenerate `data/index.js`
5. Add map coordinates to `data/coords.js`
6. Add the country id to the right continent in `data/continents.json`

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
