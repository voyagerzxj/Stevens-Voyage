/**
 * data/risk.js — Travel risk levels for each country
 *
 * Levels: "extreme" | "high" | "medium" | "low"
 * Keys must match the country IDs in data/index.js
 *
 * Edit this file to set or update risk ratings.
 * Only countries listed here will appear in the risk map legend;
 * all other countries will show as grey ("No Data") on the map.
 */
window.TRAVEL_RISK = {

  /* ── Asia ─────────────────────────────────────────── */
  "china":       "low",
  "japan":       "low",
  "india":       "low",

  /* ── Europe ───────────────────────────────────────── */
  "albania":     "low",
  "france":      "low",
  "italy":       "low",
  "greece":      "low",

  /* ── North America ────────────────────────────────── */
  "usa":         "low",
  "canada":      "low",
  "mexico":      "low",

  /* ── South America ────────────────────────────────── */
  "brazil":      "low",
  "peru":        "low",
  "argentina":   "low",

  /* ── Africa ───────────────────────────────────────── */
  "egypt":       "low",
  "kenya":       "low",
  "morocco":     "low",

  /* ── Oceania ──────────────────────────────────────── */
  "australia":   "low",
  "new-zealand": "low",

};
