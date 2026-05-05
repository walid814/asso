import os
import urllib.request
import re

BASE_URL = "https://forumassotousensemble.org/storage/"
OUTPUT_DIR = "/home/walid/.assoSTAGE/nouveau_siteFATE"
STORAGE_DIR = os.path.join(OUTPUT_DIR, "assets", "storage")

def download_file(url, local_path):
    if os.path.exists(local_path):
        return
    try:
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            with open(local_path, "wb") as f:
                f.write(response.read())
        print(f"Downloaded: {url}")
    except Exception as e:
        print(f"Error downloading {url}: {e}")

# Find all assets/storage/ links in html files
html_files = []
for root, _, files in os.walk(OUTPUT_DIR):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

downloaded = set()
for html_file in html_files:
    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We replaced storage links with 'assets/storage/...' or '../assets/storage/...'
    # Regex to find 'storage/...' paths
    matches = re.findall(r'(?:assets|\.\./assets)/storage/([^"\'\s]+)', content)
    for m in matches:
        if m in downloaded:
            continue
        downloaded.add(m)
        url = BASE_URL + m
        local_path = os.path.join(STORAGE_DIR, m)
        download_file(url, local_path)

print(f"Downloaded {len(downloaded)} storage files.")
