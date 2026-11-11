#!/usr/bin/env python3
"""Strip leading non-JSON lines from z-ai image-search stdout, parse JSON."""
import json
import sys
import os
import glob

SEARCH_DIR = "/tmp/img-search"
files = sorted(glob.glob(os.path.join(SEARCH_DIR, "*.json")))

results = {}
for f in files:
    key = os.path.basename(f).replace(".json", "")
    if key.startswith("_") or key.endswith(".err"):
        continue
    try:
        with open(f, "r", encoding="utf-8") as fh:
            raw = fh.read()
        # Find first { and parse from there
        idx = raw.find("{")
        if idx < 0:
            print(f"[{key}] no JSON found")
            results[key] = []
            continue
        data = json.loads(raw[idx:])
        if not data.get("success") or not data.get("results"):
            print(f"[{key}] FAILED: {data.get('error', 'no results')}")
            results[key] = []
            continue
        urls = [r.get("original_url", "") for r in data["results"] if r.get("original_url")]
        print(f"[{key}] {len(urls)} images")
        for u in urls:
            print(f"  - {u}")
        results[key] = urls
    except Exception as e:
        print(f"[{key}] ERROR: {e}")
        results[key] = []

# Save compiled JSON
out_path = os.path.join(SEARCH_DIR, "_compiled.json")
with open(out_path, "w", encoding="utf-8") as fh:
    json.dump(results, fh, indent=2, ensure_ascii=False)
print(f"\nCompiled -> {out_path}")
print(f"Total categories: {len(results)}")
print(f"Total images: {sum(len(v) for v in results.values())}")
