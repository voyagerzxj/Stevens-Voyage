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

/**
 * Metadata (name + flag) for countries in TRAVEL_RISK.
 * Used as a fallback when a country has no dedicated page in countries{}.
 */
window.RISK_META = {

  /* ── Extreme ─────────────────────────────────────────── */
  "laos":              { flag: "🇱🇦", name: { zh: "老挝",         en: "Laos"                     } },
  "myanmar":           { flag: "🇲🇲", name: { zh: "缅甸",         en: "Myanmar"                  } },
  "afghanistan":       { flag: "🇦🇫", name: { zh: "阿富汗",       en: "Afghanistan"              } },
  "iran":              { flag: "🇮🇷", name: { zh: "伊朗",         en: "Iran"                     } },
  "syria":             { flag: "🇸🇾", name: { zh: "叙利亚",       en: "Syria"                    } },
  "yemen":             { flag: "🇾🇪", name: { zh: "也门",         en: "Yemen"                    } },
  "libya":             { flag: "🇱🇾", name: { zh: "利比亚",       en: "Libya"                    } },
  "sudan":             { flag: "🇸🇩", name: { zh: "苏丹",         en: "Sudan"                    } },
  "south-sudan":       { flag: "🇸🇸", name: { zh: "南苏丹",       en: "South Sudan"              } },
  "somalia":           { flag: "🇸🇴", name: { zh: "索马里",       en: "Somalia"                  } },
  "chad":              { flag: "🇹🇩", name: { zh: "乍得",         en: "Chad"                     } },
  "niger":             { flag: "🇳🇪", name: { zh: "尼日尔",       en: "Niger"                    } },
  "mali":              { flag: "🇲🇱", name: { zh: "马里",         en: "Mali"                     } },
  "burkina-faso":      { flag: "🇧🇫", name: { zh: "布基纳法索",   en: "Burkina Faso"             } },
  "sierra-leone":      { flag: "🇸🇱", name: { zh: "塞拉利昂",     en: "Sierra Leone"             } },
  "equatorial-guinea": { flag: "🇬🇶", name: { zh: "赤道几内亚",   en: "Equatorial Guinea"        } },
  "congo":             { flag: "🇨🇬", name: { zh: "刚果（布）",   en: "Republic of the Congo"    } },
  "eritrea":           { flag: "🇪🇷", name: { zh: "厄立特里亚",   en: "Eritrea"                  } },
  "haiti":             { flag: "🇭🇹", name: { zh: "海地",         en: "Haiti"                    } },

  /* ── Medium ──────────────────────────────────────────── */
  "turkmenistan":      { flag: "🇹🇲", name: { zh: "土库曼斯坦",   en: "Turkmenistan"             } },
  "tajikistan":        { flag: "🇹🇯", name: { zh: "塔吉克斯坦",   en: "Tajikistan"               } },
  "uzbekistan":        { flag: "🇺🇿", name: { zh: "乌兹别克斯坦", en: "Uzbekistan"               } },
  "kyrgyzstan":        { flag: "🇰🇬", name: { zh: "吉尔吉斯斯坦", en: "Kyrgyzstan"               } },
  "kazakhstan":        { flag: "🇰🇿", name: { zh: "哈萨克斯坦",   en: "Kazakhstan"               } },
  "mongolia":          { flag: "🇲🇳", name: { zh: "蒙古",         en: "Mongolia"                 } },
  "north-korea":       { flag: "🇰🇵", name: { zh: "朝鲜",         en: "North Korea"              } },
  "cambodia":          { flag: "🇰🇭", name: { zh: "柬埔寨",       en: "Cambodia"                 } },
  "thailand":          { flag: "🇹🇭", name: { zh: "泰国",         en: "Thailand"                 } },
  "bhutan":            { flag: "🇧🇹", name: { zh: "不丹",         en: "Bhutan"                   } },
  "nepal":             { flag: "🇳🇵", name: { zh: "尼泊尔",       en: "Nepal"                    } },
  "pakistan":          { flag: "🇵🇰", name: { zh: "巴基斯坦",     en: "Pakistan"                 } },
  "iraq":              { flag: "🇮🇶", name: { zh: "伊拉克",       en: "Iraq"                     } },
  "jordan":            { flag: "🇯🇴", name: { zh: "约旦",         en: "Jordan"                   } },
  "lebanon":           { flag: "🇱🇧", name: { zh: "黎巴嫩",       en: "Lebanon"                  } },
  "kuwait":            { flag: "🇰🇼", name: { zh: "科威特",       en: "Kuwait"                   } },
  "bahrain":           { flag: "🇧🇭", name: { zh: "巴林",         en: "Bahrain"                  } },
  "uae":               { flag: "🇦🇪", name: { zh: "阿联酋",       en: "UAE"                      } },
  "oman":              { flag: "🇴🇲", name: { zh: "阿曼",         en: "Oman"                     } },
  "palestine":         { flag: "🇵🇸", name: { zh: "巴勒斯坦",     en: "Palestine"                } },
  "turkey":            { flag: "🇹🇷", name: { zh: "土耳其",       en: "Turkey"                   } },
  "azerbaijan":        { flag: "🇦🇿", name: { zh: "阿塞拜疆",     en: "Azerbaijan"               } },
  "russia":            { flag: "🇷🇺", name: { zh: "俄罗斯",       en: "Russia"                   } },
  "ukraine":           { flag: "🇺🇦", name: { zh: "乌克兰",       en: "Ukraine"                  } },
  "belarus":           { flag: "🇧🇾", name: { zh: "白俄罗斯",     en: "Belarus"                  } },
  "bosnia":            { flag: "🇧🇦", name: { zh: "波黑",         en: "Bosnia & Herzegovina"     } },
  "montenegro":        { flag: "🇲🇪", name: { zh: "黑山",         en: "Montenegro"               } },
  "albania":           { flag: "🇦🇱", name: { zh: "阿尔巴尼亚",   en: "Albania"                  } },
  "north-macedonia":   { flag: "🇲🇰", name: { zh: "北马其顿",     en: "North Macedonia"          } },
  "mauritania":        { flag: "🇲🇷", name: { zh: "毛里塔尼亚",   en: "Mauritania"               } },
  "senegal":           { flag: "🇸🇳", name: { zh: "塞内加尔",     en: "Senegal"                  } },
  "gambia":            { flag: "🇬🇲", name: { zh: "冈比亚",       en: "Gambia"                   } },
  "guinea":            { flag: "🇬🇳", name: { zh: "几内亚",       en: "Guinea"                   } },
  "liberia":           { flag: "🇱🇷", name: { zh: "利比里亚",     en: "Liberia"                  } },
  "ivory-coast":       { flag: "🇨🇮", name: { zh: "科特迪瓦",     en: "Côte d'Ivoire"            } },
  "ghana":             { flag: "🇬🇭", name: { zh: "加纳",         en: "Ghana"                    } },
  "togo":              { flag: "🇹🇬", name: { zh: "多哥",         en: "Togo"                     } },
  "benin":             { flag: "🇧🇯", name: { zh: "贝宁",         en: "Benin"                    } },
  "nigeria":           { flag: "🇳🇬", name: { zh: "尼日利亚",     en: "Nigeria"                  } },
  "cameroon":          { flag: "🇨🇲", name: { zh: "喀麦隆",       en: "Cameroon"                 } },
  "gabon":             { flag: "🇬🇦", name: { zh: "加蓬",         en: "Gabon"                    } },
  "drc":               { flag: "🇨🇩", name: { zh: "刚果（金）",   en: "DR Congo"                 } },
  "central-africa":    { flag: "🇨🇫", name: { zh: "中非",         en: "Central African Republic" } },
  "uganda":            { flag: "🇺🇬", name: { zh: "乌干达",       en: "Uganda"                   } },
  "ethiopia":          { flag: "🇪🇹", name: { zh: "埃塞俄比亚",   en: "Ethiopia"                 } },
  "djibouti":          { flag: "🇩🇯", name: { zh: "吉布提",       en: "Djibouti"                 } },
  "angola":            { flag: "🇦🇴", name: { zh: "安哥拉",       en: "Angola"                   } },
  "malawi":            { flag: "🇲🇼", name: { zh: "马拉维",       en: "Malawi"                   } },
  "tanzania":          { flag: "🇹🇿", name: { zh: "坦桑尼亚",     en: "Tanzania"                 } },
  "zimbabwe":          { flag: "🇿🇼", name: { zh: "津巴布韦",     en: "Zimbabwe"                 } },
  "botswana":          { flag: "🇧🇼", name: { zh: "博茨瓦纳",     en: "Botswana"                 } },
  "algeria":           { flag: "🇩🇿", name: { zh: "阿尔及利亚",   en: "Algeria"                  } },
  "tunisia":           { flag: "🇹🇳", name: { zh: "突尼斯",       en: "Tunisia"                  } },
  "egypt":             { flag: "🇪🇬", name: { zh: "埃及",         en: "Egypt"                    } },
  "morocco":           { flag: "🇲🇦", name: { zh: "摩洛哥",       en: "Morocco"                  } },
  "western-sahara":    { flag: "🇪🇭", name: { zh: "西撒哈拉",     en: "Western Sahara"           } },
  "brazil":            { flag: "🇧🇷", name: { zh: "巴西",         en: "Brazil"                   } },
  "colombia":          { flag: "🇨🇴", name: { zh: "哥伦比亚",     en: "Colombia"                 } },
  "venezuela":         { flag: "🇻🇪", name: { zh: "委内瑞拉",     en: "Venezuela"                } },
  "cuba":              { flag: "🇨🇺", name: { zh: "古巴",         en: "Cuba"                     } },
  "nicaragua":         { flag: "🇳🇮", name: { zh: "尼加拉瓜",     en: "Nicaragua"                } },
  "guatemala":         { flag: "🇬🇹", name: { zh: "危地马拉",     en: "Guatemala"                } },
  "belize":            { flag: "🇧🇿", name: { zh: "伯利兹",       en: "Belize"                   } },
  "jamaica":           { flag: "🇯🇲", name: { zh: "牙买加",       en: "Jamaica"                  } },
  "bahamas":           { flag: "🇧🇸", name: { zh: "巴哈马",       en: "Bahamas"                  } },

  /* ── Low (fallback for countries without a dedicated page) ── */
  "china":       { flag: "🇨🇳", name: { zh: "中国",       en: "China"        } },
  "japan":       { flag: "🇯🇵", name: { zh: "日本",       en: "Japan"        } },
  "india":       { flag: "🇮🇳", name: { zh: "印度",       en: "India"        } },
  "france":      { flag: "🇫🇷", name: { zh: "法国",       en: "France"       } },
  "italy":       { flag: "🇮🇹", name: { zh: "意大利",     en: "Italy"        } },
  "greece":      { flag: "🇬🇷", name: { zh: "希腊",       en: "Greece"       } },
  "usa":         { flag: "🇺🇸", name: { zh: "美国",       en: "USA"          } },
  "canada":      { flag: "🇨🇦", name: { zh: "加拿大",     en: "Canada"       } },
  "mexico":      { flag: "🇲🇽", name: { zh: "墨西哥",     en: "Mexico"       } },
  "peru":        { flag: "🇵🇪", name: { zh: "秘鲁",       en: "Peru"         } },
  "argentina":   { flag: "🇦🇷", name: { zh: "阿根廷",     en: "Argentina"    } },
  "kenya":       { flag: "🇰🇪", name: { zh: "肯尼亚",     en: "Kenya"        } },
  "australia":   { flag: "🇦🇺", name: { zh: "澳大利亚",   en: "Australia"    } },
  "new-zealand": { flag: "🇳🇿", name: { zh: "新西兰",     en: "New Zealand"  } },

};
