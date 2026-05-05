import os
import urllib.request
import re

BASE_URL = "https://forumassotousensemble.org"
OUTPUT_DIR = "/home/walid/.assoSTAGE/nouveau_siteFATE"

PAGES = {
    "/": "index.html",
    "/fate": "pages/fate.html",
    "/actualites": "pages/actualites.html",
    "/actions": "pages/actions.html",
    "/collaborations": "pages/collaborations.html",
    "/archives": "pages/archives.html",
    "/partenaires": "pages/partenaires.html",
    "/nous-contacter": "pages/contact.html",
    "/nous-soutenir": "pages/soutenir.html",
    "/adherer": "pages/adherer.html",
    "/suggestions": "pages/suggestions.html"
}

def download_and_process(url_path, local_path):
    full_url = BASE_URL + (url_path if url_path != "/" else "")
    try:
        req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
    except Exception as e:
        print(f"Error downloading {full_url}: {e}")
        return

    # Determine relative prefix for assets depending on if we are in root or pages/
    is_root = local_path == "index.html"
    asset_prefix = "assets/" if is_root else "../assets/"

    # Replace absolute asset URLs with local relative ones
    html = re.sub(r'https?://forumassotousensemble\.org/assets/', asset_prefix, html)
    
    # Also replace Voyager storage images if any (they are usually served from /storage/)
    html = re.sub(r'https?://forumassotousensemble\.org/storage/', asset_prefix + 'storage/', html)
    
    # For Voyager images that don't have the domain
    html = re.sub(r'href="/storage/', f'href="{asset_prefix}storage/', html)
    html = re.sub(r'src="/storage/', f'src="{asset_prefix}storage/', html)

    # Replace absolute page URLs with local relative ones
    for p_url, p_local in PAGES.items():
        if p_url == "/":
            # Match exactly the root URL (and avoid matching /fate, etc.)
            html = re.sub(r'https?://forumassotousensemble\.org/?(["\'\s#])', 
                          ("index.html" if is_root else "../index.html") + r'\1', html)
        else:
            # Match specific pages
            target = p_local if is_root else "../" + p_local
            html = re.sub(rf'https?://forumassotousensemble\.org{p_url}(["\'\s#])', target + r'\1', html)

    # Ensure output directory exists
    full_local_path = os.path.join(OUTPUT_DIR, local_path)
    os.makedirs(os.path.dirname(full_local_path), exist_ok=True)
    
    with open(full_local_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Processed: {local_path}")

for url_path, local_path in PAGES.items():
    download_and_process(url_path, local_path)

print("Migration completed.")
