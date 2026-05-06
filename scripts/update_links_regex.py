import os
import glob
import re

files = ['index.html'] + glob.glob('pages/*.html')

replacements = [
    (r'href="(\.\./)?pages/actualites\.html"\s+class="submenuLink">\s*Festival ARTA SACRA', 
     r'href="\1pages/festival-arta-sacra.html" class="submenuLink">\n                                        Festival ARTA SACRA'),
    (r'href="(\.\./)?pages/actualites\.html"\s+class="submenuLink">\s*En route pour la CAN 2025', 
     r'href="\1pages/can-juin-2025.html" class="submenuLink">\n                                        En route pour la CAN 2025'),
    (r'href="(\.\./)?pages/actualites\.html"\s+class="submenuLink">\s*Le FATE bientôt vingt cinq ans 2001 - 2026', 
     r'href="\1pages/fate-vingt-cinq-ans-2026.html" class="submenuLink">\n                                        Le FATE bientôt vingt cinq ans 2001 - 2026'),
    (r'href="(\.\./)?pages/actualites\.html"\s+class="submenuLink">\s*Des routes de l&#039;esclavages à nos jours', 
     r'href="\1pages/routes-de-l-esclavage-a-nos-jours-juin-2025.html" class="submenuLink">\n                                        Des routes de l&#039;esclavages à nos jours'),
    (r'href="(\.\./)?pages/actualites\.html"\s+class="submenuLink">\s*Eau et assainissement PK17-PK32 Douala ', 
     r'href="\1pages/assainissement-d-eau-douala-septembre-2026.html" class="submenuLink">\n                                        Eau et assainissement PK17-PK32 Douala '),
    (r'href="(\.\./)?pages/actualites\.html"\s+class="submenuLink">\s*Création d&#039;une plantation de bananiers plantains et de piments à Bihiang-Cameroun', 
     r'href="\1pages/plantation-bananiers-piments-bihang-2026-2027.html" class="submenuLink">\n                                        Création d&#039;une plantation de bananiers plantains et de piments à Bihiang-Cameroun')
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content_mod = content
    for pattern, repl in replacements:
        content_mod = re.sub(pattern, repl, content_mod)
            
    if content != content_mod:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_mod)
        print(f"Updated {filepath}")
    else:
        print(f"No changes for {filepath}")

print("Done replacing.")
