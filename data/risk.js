/**
 * data/risk.js — Travel risk levels
 * Levels: "extreme" | "medium" | "low"
 * Keys must match slugs in isoMap (data/index.js).
 * Last updated: 2026-06
 */
window.TRAVEL_RISK = {

  /* ═══════════════════════════════════════════════════════
     ⛔ 危险 EXTREME
     ═══════════════════════════════════════════════════════ */

  /* Asia */
  "laos":              "extreme",
  "myanmar":           "extreme",
  "afghanistan":       "extreme",
  "iran":              "extreme",
  "syria":             "extreme",
  "yemen":             "extreme",

  /* Africa */
  "libya":             "extreme",
  "sudan":             "extreme",
  "south-sudan":       "extreme",
  "somalia":           "extreme",
  "chad":              "extreme",
  "niger":             "extreme",
  "mali":              "extreme",
  "burkina-faso":      "extreme",
  "sierra-leone":      "extreme",
  "equatorial-guinea": "extreme",
  "congo":             "extreme",
  "eritrea":           "extreme",

  /* Americas */
  "haiti":             "extreme",

  /* ═══════════════════════════════════════════════════════
     ⚠️ 中等 MEDIUM
     ═══════════════════════════════════════════════════════ */

  /* Asia */
  "turkmenistan":      "medium",
  "tajikistan":        "medium",
  "uzbekistan":        "medium",
  "kyrgyzstan":        "medium",
  "kazakhstan":        "medium",
  "mongolia":          "medium",
  "north-korea":       "medium",
  "cambodia":          "medium",
  "thailand":          "medium",
  "bhutan":            "medium",
  "nepal":             "medium",
  "pakistan":          "medium",
  "iraq":              "medium",
  "jordan":            "medium",
  "lebanon":           "medium",
  "kuwait":            "medium",
  "bahrain":           "medium",
  "uae":               "medium",
  "oman":              "medium",
  "palestine":         "medium",
  "turkey":            "medium",
  "azerbaijan":        "medium",

  /* Europe */
  "russia":            "medium",
  "ukraine":           "medium",
  "belarus":           "medium",
  "bosnia":            "medium",
  "montenegro":        "medium",
  "albania":           "medium",
  "north-macedonia":   "medium",

  /* Africa */
  "mauritania":        "medium",
  "senegal":           "medium",
  "gambia":            "medium",
  "guinea":            "medium",
  "liberia":           "medium",
  "ivory-coast":       "medium",
  "ghana":             "medium",
  "togo":              "medium",
  "benin":             "medium",
  "nigeria":           "medium",
  "cameroon":          "medium",
  "gabon":             "medium",
  "drc":               "medium",
  "central-africa":    "medium",
  "uganda":            "medium",
  "ethiopia":          "medium",
  "djibouti":          "medium",
  "angola":            "medium",
  "malawi":            "medium",
  "tanzania":          "medium",
  "zimbabwe":          "medium",
  "botswana":          "medium",
  "algeria":           "medium",
  "tunisia":           "medium",
  "egypt":             "medium",
  "morocco":           "medium",
  "western-sahara":    "medium",

  /* Americas */
  "brazil":            "medium",
  "colombia":          "medium",
  "venezuela":         "medium",
  "cuba":              "medium",
  "nicaragua":         "medium",
  "guatemala":         "medium",
  "belize":            "medium",
  "jamaica":           "medium",
  "bahamas":           "medium",

  /* ═══════════════════════════════════════════════════════
     ✅ 安全 LOW (explicitly rated safe countries)
     ═══════════════════════════════════════════════════════ */

  /* Asia */
  "china":       "low",
  "japan":       "low",
  "india":       "low",

  /* Europe */
  "france":      "low",
  "italy":       "low",
  "greece":      "low",

  /* North America */
  "usa":         "low",
  "canada":      "low",
  "mexico":      "low",

  /* South America */
  "peru":        "low",
  "argentina":   "low",

  /* Africa */
  "kenya":       "low",

  /* Oceania */
  "australia":   "low",
  "new-zealand": "low",

};
