#!/usr/bin/env python3
"""
split_data.py — Split monolithic JSON data files into per-entity files.

Reads:
  data/continents.json
  data/countries.json
  data/destinations.json

Writes:
  data/index.json                      — slim index for the whole dataset
  data/countries/{id}.json             — quickFacts + info (+ subdivisions for large countries)
  data/destinations/{id}.json          — destinations array for small countries
  data/destinations/{id}-{sub}.json    — destinations filtered by subdivision for large countries

Usage: python split_data.py
"""

import json
import os

# ---------------------------------------------------------------------------
# Large-country subdivision definitions
# ---------------------------------------------------------------------------
LARGE_COUNTRY_SUBS = {
    "china": ["beijing", "shanghai", "sichuan", "yunnan", "guangdong"],
    "usa":   ["new-york", "california", "hawaii", "florida", "alaska"],
}

# Static ISO → country-id mapping (numeric ISO 3166-1)
ISO_MAP = {
    "8":   "albania",
    "156": "china",
    "392": "japan",
    "356": "india",
    "250": "france",
    "380": "italy",
    "300": "greece",
    "840": "usa",
    "124": "canada",
    "484": "mexico",
    "76":  "brazil",
    "604": "peru",
    "32":  "argentina",
    "818": "egypt",
    "404": "kenya",
    "504": "morocco",
    "36":  "australia",
    "554": "new-zealand",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def read_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def brief(text, length=150):
    """Return first `length` characters of text followed by '…'."""
    if len(text) <= length:
        return text
    return text[:length] + "…"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    base = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base, "data")

    # Create output directories
    countries_dir = os.path.join(data_dir, "countries")
    destinations_dir = os.path.join(data_dir, "destinations")
    os.makedirs(countries_dir, exist_ok=True)
    os.makedirs(destinations_dir, exist_ok=True)

    # Load source files
    continents = read_json(os.path.join(data_dir, "continents.json"))
    countries = read_json(os.path.join(data_dir, "countries.json"))
    destinations = read_json(os.path.join(data_dir, "destinations.json"))

    print(f"Loaded {len(continents)} continents, {len(countries)} countries, "
          f"{len(destinations)} country destination lists.\n")

    # ------------------------------------------------------------------
    # 1. Write data/countries/{id}.json
    # ------------------------------------------------------------------
    for cid, country in countries.items():
        is_large = country.get("isLarge", False)
        payload = {
            "quickFacts": country["quickFacts"],
            "info": country["info"],
        }
        if is_large and "subdivisions" in country:
            payload["subdivisions"] = country["subdivisions"]

        out_path = os.path.join(countries_dir, f"{cid}.json")
        write_json(out_path, payload)
        label = "(large)" if is_large else ""
        print(f"  [country]  data/countries/{cid}.json  {label}")

    print()

    # ------------------------------------------------------------------
    # 2. Write data/destinations/{id}.json (small) or
    #    data/destinations/{id}-{sub}.json (large, per subdivision)
    # ------------------------------------------------------------------
    for cid, dest_list in destinations.items():
        is_large = cid in LARGE_COUNTRY_SUBS

        if not is_large:
            # Small country — write the full array
            out_path = os.path.join(destinations_dir, f"{cid}.json")
            write_json(out_path, dest_list)
            print(f"  [dest]     data/destinations/{cid}.json  "
                  f"({len(dest_list)} destinations)")
        else:
            # Large country — split by subdivision
            subs = LARGE_COUNTRY_SUBS[cid]
            for sub in subs:
                filtered = [d for d in dest_list
                            if d.get("subdivision") == sub]
                out_path = os.path.join(destinations_dir, f"{cid}-{sub}.json")
                write_json(out_path, filtered)
                print(f"  [dest]     data/destinations/{cid}-{sub}.json  "
                      f"({len(filtered)} destinations)")

    print()

    # ------------------------------------------------------------------
    # 3. Build and write data/index.json
    # ------------------------------------------------------------------
    index_countries = {}
    for cid, country in countries.items():
        is_large = country.get("isLarge", False)

        geo_zh = country["info"]["geography"]["zh"]
        geo_en = country["info"]["geography"]["en"]

        entry = {
            "name":       country["name"],
            "flag":       country["flag"],
            "continent":  country["continent"],
            "capital":    country["capital"],
            "coverImage": country["coverImage"],
            "isLarge":    is_large,
            "brief": {
                "zh": brief(geo_zh),
                "en": brief(geo_en),
            },
        }

        if is_large and "subdivisions" in country:
            entry["subdivisions"] = country["subdivisions"]

        index_countries[cid] = entry

    index = {
        "continents": continents,
        "countries":  index_countries,
        "isoMap":     ISO_MAP,
    }

    index_path = os.path.join(data_dir, "index.json")
    write_json(index_path, index)
    print(f"  [index]    data/index.json  "
          f"({len(index_countries)} countries, {len(continents)} continents)")

    # ------------------------------------------------------------------
    # 4. Validate the written index by parsing it back
    # ------------------------------------------------------------------
    with open(index_path, encoding="utf-8") as f:
        validated = json.load(f)

    assert len(validated["continents"]) == len(continents), "continent count mismatch"
    assert len(validated["countries"]) == len(countries),   "country count mismatch"
    assert validated["isoMap"] == ISO_MAP,                   "isoMap mismatch"
    print("\nValidation passed: data/index.json parsed successfully.")
    print("\nDone! Run python convert.py to regenerate data/index.js.")


if __name__ == "__main__":
    main()
