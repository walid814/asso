import os
import glob

# The 17 HTML files (index.html + pages/*.html)
files = ['index.html'] + glob.glob('pages/*.html')

# Submenu replacements map
# We are replacing specific strings in the submenu list
replacements = {
    'href="../pages/actualites.html" class="submenuLink">\n                                        Festival ARTA SACRA': 'href="../pages/festival-arta-sacra.html" class="submenuLink">\n                                        Festival ARTA SACRA',
    'href="../pages/actualites.html" class="submenuLink">\n                                        En route pour la CAN 2025': 'href="../pages/can-juin-2025.html" class="submenuLink">\n                                        En route pour la CAN 2025',
    'href="../pages/actualites.html" class="submenuLink">\n                                        Le FATE bientôt vingt cinq ans 2001 - 2026': 'href="../pages/fate-vingt-cinq-ans-2026.html" class="submenuLink">\n                                        Le FATE bientôt vingt cinq ans 2001 - 2026',
    'href="../pages/actualites.html" class="submenuLink">\n                                        Des routes de l&#039;esclavages à nos jours': 'href="../pages/routes-de-l-esclavage-a-nos-jours-juin-2025.html" class="submenuLink">\n                                        Des routes de l&#039;esclavages à nos jours',
    'href="../pages/actualites.html" class="submenuLink">\n                                        Eau et assainissement PK17-PK32 Douala ': 'href="../pages/assainissement-d-eau-douala-septembre-2026.html" class="submenuLink">\n                                        Eau et assainissement PK17-PK32 Douala ',
    'href="../pages/actualites.html" class="submenuLink">\n                                        Création d&#039;une plantation de bananiers plantains et de piments à Bihiang-Cameroun': 'href="../pages/plantation-bananiers-piments-bihang-2026-2027.html" class="submenuLink">\n                                        Création d&#039;une plantation de bananiers plantains et de piments à Bihiang-Cameroun'
}

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # In index.html, the paths are "pages/..." not "../pages/..."
    if filepath == 'index.html':
        content_mod = content
        for k, v in replacements.items():
            content_mod = content_mod.replace(k.replace('../pages/', 'pages/'), v.replace('../pages/', 'pages/'))
    else:
        content_mod = content
        for k, v in replacements.items():
            content_mod = content_mod.replace(k, v)
            
    if content != content_mod:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_mod)
        print(f"Updated {filepath}")
    else:
        print(f"No changes for {filepath}")

print("Done replacing.")
