#!/usr/bin/env python3
"""
Lie fate-a11y-fixes.css à chaque page HTML, juste après le
fate-responsive-fixes.css existant. Idempotent.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / "index.html"] + sorted((ROOT / "pages").glob("*.html"))

RESP_RE = re.compile(
    r'(<link[^>]+fate-responsive-fixes\.css[^>]*>)'
)
A11Y_FILENAME = "fate-a11y-fixes.css"

patched, skipped = [], []
for f in PAGES:
    src = f.read_text(encoding="utf-8")
    if A11Y_FILENAME in src:
        skipped.append((f, "already linked"))
        continue
    m = RESP_RE.search(src)
    if not m:
        skipped.append((f, "no responsive link found"))
        continue
    resp_tag = m.group(1)
    # Reproduit l'indentation et le chemin (./assets vs ../assets)
    is_pages = "pages/" in str(f)
    base = "../" if is_pages else "./"
    new_tag = f'<link rel="stylesheet" href="{base}assets/css/fate-a11y-fixes.css">'
    src2 = src.replace(resp_tag, resp_tag + "\n    " + new_tag, 1)
    f.write_text(src2, encoding="utf-8")
    patched.append(f)

print(f"Patched: {len(patched)}")
for f in patched:
    print(f"  + {f.relative_to(ROOT)}")
if skipped:
    print(f"Skipped: {len(skipped)}")
    for f, reason in skipped:
        print(f"  - {f.relative_to(ROOT)} ({reason})")
