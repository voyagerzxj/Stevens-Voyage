#!/usr/bin/env python3
"""
convert_to_md.py — Convert the legacy JSON content into Markdown (.md) files.

The site now stores all content as .md files that the browser renders live
(see js/md.js). Each .md file is:

    ---
    { ...JSON metadata... }
    ---
    <!--zh--> …Chinese markdown…  <!--en--> …English markdown…

This one-off/idempotent script reads the existing data/*.json and writes the
matching .md files. The original JSON is left untouched as a backup.

Generated:
    data/countries/{id}.md          quickFacts/cuisine/bestTime + 5 info tabs
    data/destinations/{id}.md       JSON array front matter (cards)
    data/journal/{id}.md            post meta + bilingual markdown body
    data/journal/index.md           JSON array front matter (post summaries)

Usage:  python convert_to_md.py
"""
import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(ROOT, "data")

INFO_FIELDS = ["geography", "history", "economy", "population", "culture"]


def jdump(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def front_matter(meta, body=""):
    out = "---\n" + jdump(meta) + "\n---\n"
    if body:
        out += "\n" + body.rstrip() + "\n"
    return out


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


# ── Countries ─────────────────────────────────────────────
def convert_countries():
    src = os.path.join(DATA, "countries")
    n = 0
    for fn in sorted(os.listdir(src)):
        if not fn.endswith(".json"):
            continue
        d = load(os.path.join(src, fn))
        meta = {}
        for k in ("quickFacts", "cuisine", "bestTime"):
            if k in d:
                meta[k] = d[k]
        info = d.get("info", {})
        halves = {}
        for lang in ("zh", "en"):
            secs = []
            for field in INFO_FIELDS:
                val = info.get(field)
                if not val:
                    continue
                text = val.get(lang) if isinstance(val, dict) else val
                if not text:
                    continue
                secs.append(f"## {field}\n{text}")
            halves[lang] = "\n\n".join(secs)
        body = f"<!--zh-->\n{halves['zh']}\n\n<!--en-->\n{halves['en']}"
        out = os.path.join(src, fn[:-5] + ".md")
        write(out, front_matter(meta, body))
        n += 1
    print(f"  countries:    {n} files")


# ── Destinations (card data → JSON array front matter) ────
def convert_destinations():
    src = os.path.join(DATA, "destinations")
    n = 0
    for fn in sorted(os.listdir(src)):
        if not fn.endswith(".json"):
            continue
        arr = load(os.path.join(src, fn))
        out = os.path.join(src, fn[:-5] + ".md")
        write(out, front_matter(arr))
        n += 1
    print(f"  destinations: {n} files")


# ── Journal ───────────────────────────────────────────────
def _section_md(sec, lang):
    typ = sec.get("type")
    if typ == "text":
        return (sec.get("content", {}) or {}).get(lang, "")
    if typ == "image":
        cap = (sec.get("caption", {}) or {}).get(lang, "")
        return f"![{cap}]({sec.get('src','')})"
    if typ == "gallery":
        lines = ["::: gallery"]
        for img in sec.get("images", []):
            cap = (img.get("caption", {}) or {}).get(lang, "")
            lines.append(f"{img.get('src','')} | {cap}")
        lines.append(":::")
        return "\n".join(lines)
    if typ == "tip":
        body = (sec.get("content", {}) or {}).get(lang, "")
        return f"::: tip\n{body}\n:::"
    if typ == "quote":
        body = (sec.get("content", {}) or {}).get(lang, "")
        quoted = "\n".join("> " + ln for ln in body.split("\n"))
        return quoted
    return ""


def convert_journal():
    src = os.path.join(DATA, "journal")
    index = []
    try:
        index = load(os.path.join(src, "index.json"))
    except FileNotFoundError:
        pass
    excerpts = {p["id"]: p.get("excerpt") for p in index}

    n = 0
    for fn in sorted(os.listdir(src)):
        if not fn.endswith(".json") or fn == "index.json":
            continue
        d = load(os.path.join(src, fn))
        meta = {k: d[k] for k in ("id", "title", "date", "country", "continent", "coverImage", "tags") if k in d}
        if d.get("id") in excerpts and excerpts[d["id"]]:
            meta["excerpt"] = excerpts[d["id"]]
        halves = {}
        for lang in ("zh", "en"):
            blocks = [_section_md(s, lang) for s in d.get("sections", [])]
            halves[lang] = "\n\n".join(b for b in blocks if b)
        body = f"<!--zh-->\n{halves['zh']}\n\n<!--en-->\n{halves['en']}"
        out = os.path.join(src, fn[:-5] + ".md")
        write(out, front_matter(meta, body))
        n += 1
    print(f"  journal:      {n} posts")

    # index.md — array of post summaries (unchanged shape)
    if index:
        write(os.path.join(src, "index.md"), front_matter(index))
        print("  journal:      index.md")


if __name__ == "__main__":
    print("Converting JSON → Markdown…")
    convert_countries()
    convert_destinations()
    convert_journal()
    print("Done. Original JSON kept as backup.")
