#!/usr/bin/env python3
"""Split japan.json into per-prefecture destination files."""
import json, os

ASSIGNMENT = {
    "mount-fuji":                    "shizuoka",
    "kyoto-temples":                 "kyoto",
    "tokyo-shibuya":                 "tokyo",
    "hiroshima-miyajima":            "hiroshima",
    "osaka-castle":                  "osaka",
    "himeji-castle":                 "hyogo",
    "horyu-ji":                      "nara",
    "shirakawa-go":                  "gifu",
    "nara-monuments":                "nara",
    "nikko-shrines":                 "tochigi",
    "gusuku-ryukyu":                 "okinawa",
    "kii-pilgrimage":                "wakayama",
    "shiretoko":                     "hokkaido",
    "iwami-ginzan":                  "shimane",
    "hiraizumi":                     "iwate",
    "ogasawara":                     "tokyo",
    "tomioka-silk-mill":             "gunma",
    "meiji-industrial-revolution":   "nagasaki",
    "national-museum-western-art":   "tokyo",
    "okinoshima":                    "fukuoka",
    "nagasaki-hidden-christian":     "nagasaki",
    "mozu-furuichi-kofun":           "osaka",
    "amami-ryukyu-islands":          "kagoshima",
    "jomon-prehistoric-sites":       "aomori",
    "sado-gold-mines":               "niigata",
    "aso-geopark":                   "kumamoto",
    "toya-usu-geopark":              "hokkaido",
    "itoigawa-geopark":              "niigata",
    "izu-geopark":                   "shizuoka",
    "sanin-kaigan-geopark":          "tottori",
    "unzen-geopark":                 "nagasaki",
    "oki-islands-geopark":           "shimane",
    "muroto-geopark":                "kochi",
    "mt-apoi-geopark":               "hokkaido",
    "hakusan-tedorigawa-geopark":    "ishikawa",
    "mine-akiyoshidai-geopark":      "yamaguchi",
}

src = json.load(open("data/destinations/japan.json", encoding="utf-8"))

buckets = {}
for dest in src:
    pref = ASSIGNMENT.get(dest["id"])
    if not pref:
        print(f"WARNING: no assignment for {dest['id']}")
        continue
    dest["subdivision"] = pref
    buckets.setdefault(pref, []).append(dest)

os.makedirs("data/destinations", exist_ok=True)
for pref, dests in buckets.items():
    path = f"data/destinations/japan-{pref}.json"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(dests, f, ensure_ascii=False, indent=2)
    print(f"  {path}: {len(dests)} destination(s)")

print(f"\nDone. Created {len(buckets)} prefecture files.")
