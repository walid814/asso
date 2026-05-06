import os

PAGES_DIR = "/home/walid/.assoSTAGE/asso/pages"
HEADER = "/tmp/actu_header.html"
CONTENT = "/tmp/fate_25_content.html"
FOOTER = "/tmp/actu_footer.html"
OUT = os.path.join(PAGES_DIR, "fate-vingt-cinq-ans-2026.html")

with open(HEADER, "r", encoding="utf-8") as f:
    header = f.read()
    
# Replace title in header
header = header.replace("<title>Actualités | Forum Associatif Tous Assemble</title>", "<title>Le FATE bientôt 25 ans | Actualités | Forum Associatif Tous Ensemble</title>")

with open(CONTENT, "r", encoding="utf-8") as f:
    content = f.read()
    
with open(FOOTER, "r", encoding="utf-8") as f:
    footer = f.read()

with open(OUT, "w", encoding="utf-8") as f:
    f.write(header + "\n" + content + "\n" + footer)

print(f"Created {OUT}")
