#!/usr/bin/env python3
"""Génère les pages HTML depuis la table SQLite `event` via Jinja2."""

import sqlite3
import os
from jinja2 import Environment, FileSystemLoader

BASE_DIR  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH   = os.path.join(BASE_DIR, 'db', 'events.db')
PAGES_DIR = os.path.join(BASE_DIR, 'pages')

env      = Environment(loader=FileSystemLoader(BASE_DIR))
template = env.get_template('template_page.html')


def get_related(conn, current_slug, category, limit=3):
    """Retourne jusqu'à `limit` événements liés (même catégorie en priorité)."""
    same_cat = conn.execute(
        'SELECT slug, item_title, main_image FROM event '
        'WHERE published=1 AND slug!=? AND category=? ORDER BY created_at DESC LIMIT ?',
        (current_slug, category, limit)
    ).fetchall()

    if len(same_cat) < limit:
        needed = limit - len(same_cat)
        other = conn.execute(
            'SELECT slug, item_title, main_image FROM event '
            'WHERE published=1 AND slug!=? AND category!=? ORDER BY created_at DESC LIMIT ?',
            (current_slug, category, needed)
        ).fetchall()
        same_cat = list(same_cat) + list(other)

    return [{'slug': r[0], 'item_title': r[1], 'main_image': r[2]} for r in same_cat]


def generate():
    if not os.path.exists(DB_PATH):
        print(f"Base introuvable : {DB_PATH}")
        print("Lance d'abord : python scripts/init_db.py")
        return

    conn   = sqlite3.connect(DB_PATH)
    cursor = conn.execute('SELECT * FROM event WHERE published=1 ORDER BY created_at DESC')
    cols   = [d[0] for d in cursor.description]
    events = [dict(zip(cols, row)) for row in cursor.fetchall()]

    os.makedirs(PAGES_DIR, exist_ok=True)
    count = 0

    for ev in events:
        ev['related_events'] = get_related(conn, ev['slug'], ev['category'])

        html      = template.render(**ev)
        out_path  = os.path.join(PAGES_DIR, ev['slug'] + '.html')

        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html)

        print(f"  ✓  pages/{ev['slug']}.html")
        count += 1

    conn.close()
    print(f"\n{count} page(s) générée(s).")


if __name__ == '__main__':
    generate()
