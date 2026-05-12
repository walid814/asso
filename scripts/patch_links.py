#!/usr/bin/env python3
"""
Remplace les href absolus vers forumassotousensemble.org par des chemins locaux.
- Si une page locale existe dans pages/ → lien vers ce fichier .html
- Sinon → '#' (évite la redirection vers le vrai site)
"""

import re
import os

BASE_DIR  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_DIR = os.path.join(BASE_DIR, 'pages')

# Mapping : fragment de l'URL live → slug du fichier local (sans .html)
SLUG_MAP = {
    'can-juin-2025':                                     'can-juin-2025',
    'routes-de-l-esclavage-a-nos-jours-juin-2025':       'routes-de-l-esclavage-a-nos-jours-juin-2025',
    'des-routes-de-l-esclavage-a-nos-jours':             'routes-de-l-esclavage-a-nos-jours-juin-2025',
    'assainissement-d-eau-douala-septembre-2026':         'assainissement-d-eau-douala-septembre-2026',
    'plantation-bananiers-piments-bihang-2026-2027':      'plantation-bananiers-piments-bihang-2026-2027',
    'pied-des-tours-juin-2025':                          'pied-des-tours-juin-2025',
    'cultures-aux-pieds-des-tours-et-live-d-ete':        'pied-des-tours-juin-2025',
    'festival-arta-sacra':                               'festival-arta-sacra',
    'fate-vingt-cinq-ans-2026':                          'fate-vingt-cinq-ans-2026',
}

# Patterns partiels (URL encodés ou titres espaces → slugs connus)
PARTIAL_MAP = {
    'Culture%20aux%20pieds%20des%20tours':  'pied-des-tours-juin-2025',
    'Le-FATE-bient%C3%B4t':                 'fate-vingt-cinq-ans-2026',
}

DOMAIN = 'https://forumassotousensemble.org'
PATTERN = re.compile(r'href="(https://forumassotousensemble\.org[^"]*)"')


def resolve(url: str) -> str:
    """Retourne le chemin local ou '#' pour une URL absolue."""
    path = url[len(DOMAIN):]  # ex: /actualites/can-juin-2025

    # Vérifie les partiels d'abord (URL encodés, titres avec espaces)
    for fragment, slug in PARTIAL_MAP.items():
        if fragment in path:
            local_file = os.path.join(PAGES_DIR, slug + '.html')
            if os.path.exists(local_file):
                return slug + '.html'

    # Extrait le dernier segment de l'URL
    segment = path.rstrip('/').split('/')[-1]

    if segment in SLUG_MAP:
        slug = SLUG_MAP[segment]
        local_file = os.path.join(PAGES_DIR, slug + '.html')
        if os.path.exists(local_file):
            return slug + '.html'

    return '#'


def patch_file(filepath: str):
    with open(filepath, encoding='utf-8') as f:
        content = f.read()

    matches = PATTERN.findall(content)
    if not matches:
        return 0

    replaced = 0

    def replacer(m):
        nonlocal replaced
        url = m.group(1)
        local = resolve(url)
        replaced += 1
        return f'href="{local}"'

    new_content = PATTERN.sub(replacer, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return replaced


FILES = ['actualites.html', 'actions.html', 'collaborations.html']

for fname in FILES:
    fpath = os.path.join(PAGES_DIR, fname)
    if not os.path.exists(fpath):
        print(f'  — {fname} introuvable, ignoré')
        continue
    count = patch_file(fpath)
    print(f'  ✓  {fname} — {count} lien(s) patché(s)')

print('\nFait.')
