#!/usr/bin/env python3
"""
Ajoute un landmark <main> autour du contenu principal des 18 pages publiques.

Pattern :
- Le header est injecté via <div id="site-nav"></div> + <script src=".../components.js">
- Le footer est injecté via <div id="site-footer"></div>
- On enveloppe tout le contenu entre les deux dans un <main>.

Idempotent : si <main> est déjà présent, la page est ignorée.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / "index.html"] + sorted((ROOT / "pages").glob("*.html"))

SCRIPT_RE  = re.compile(r'(<script[^>]+components\.js[^>]*></script>)')
FOOTER_RE  = re.compile(r'(<div id="site-footer"></div>)')
HAS_MAIN_RE = re.compile(r'<main[\s>]')

patched = []
skipped = []

for f in PAGES:
    src = f.read_text(encoding="utf-8")
    if HAS_MAIN_RE.search(src):
        skipped.append((f, "already has <main>"))
        continue
    m_script = SCRIPT_RE.search(src)
    m_footer = FOOTER_RE.search(src)
    if not m_script or not m_footer:
        skipped.append((f, f"pattern not found (script={bool(m_script)}, footer={bool(m_footer)})"))
        continue
    new = (
        src[: m_script.end()]
        + "\n\n        <main id=\"main-content\">"
        + src[m_script.end() : m_footer.start()].rstrip()
        + "\n        </main>\n\n        "
        + src[m_footer.start() :]
    )
    f.write_text(new, encoding="utf-8")
    patched.append(f)

print(f"Patched: {len(patched)} pages")
for f in patched:
    print(f"  + {f.relative_to(ROOT)}")
if skipped:
    print(f"\nSkipped: {len(skipped)}")
    for f, reason in skipped:
        print(f"  - {f.relative_to(ROOT)} ({reason})")
