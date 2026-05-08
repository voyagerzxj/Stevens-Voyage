#!/usr/bin/env python3
"""
convert.py — Generate data/index.js from data/index.json.

Usage: python convert.py

Run split_data.py first to build data/index.json, then run this script to
produce the JS global that the website loads at startup.
"""
import json, os

with open("data/index.json", encoding="utf-8") as f:
    raw = f.read()

with open("data/index.js", "w", encoding="utf-8") as f:
    f.write("window.DB_INDEX = ")
    f.write(raw)
    f.write(";")

print("Generated data/index.js")
print("Note: Individual country/destination JSON files are served directly via HTTP fetch().")
print("They do NOT need conversion - edit them directly and push.")
