#!/usr/bin/env python3
"""
Script de patch pour index.html :
1. Remplace la section blog (actualités en cartes) par un carrousel pleine largeur avec images + overlay
2. Supprime le long paragraphe de description dans la bannière
3. Ajoute ce texte proprement sous la vidéo YouTube (côté droit)
"""

import re

FILE = '/home/walid/.assoSTAGE/asso/index.html'

with open(FILE, 'r', encoding='utf-8') as f:
    html = f.read()

# ===========================================================
# 1. REMPLACER LA SECTION BLOG PAR LE CARROUSEL ACTU
# ===========================================================
OLD_SECTION_PATTERN = r'<section class="blog ptb-100 bg-f9fbfe">.*?</section>'

NEW_ACTU_SECTION = '''<style>
.actu-strip-section { padding: 70px 0; background: #f0f4f8; overflow: hidden; }
.actu-strip-title { text-align: center; margin-bottom: 40px; }
.actu-strip-title h3 { font-size: 36px; font-weight: 800; color: #1a1a2e; display: inline-block; position: relative; }
.actu-strip-title h3::after { content: \\'\\'; display: block; width: 60px; height: 4px; background: #FFC107; margin: 10px auto 0; border-radius: 2px; }
.actu-marquee-wrapper { width: 100%; overflow: hidden; padding: 10px 0 20px; }
.actu-marquee-track { display: flex; gap: 24px; animation: actuScroll 35s linear infinite; width: max-content; }
.actu-marquee-track:hover { animation-play-state: paused; }
@keyframes actuScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.actu-card { position: relative; width: 380px; height: 280px; border-radius: 16px; overflow: hidden; flex-shrink: 0; box-shadow: 0 8px 32px rgba(0,0,0,0.18); transition: transform 0.3s ease, box-shadow 0.3s ease; }
.actu-card:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 16px 48px rgba(0,0,0,0.28); }
.actu-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
.actu-card:hover img { transform: scale(1.07); }
.actu-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,30,0.92) 0%, rgba(10,10,30,0.4) 55%, rgba(10,10,30,0.0) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px 22px; }
.actu-card-date { font-size: 12px; font-weight: 600; color: #FFC107; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.actu-card-date i { margin-right: 6px; }
.actu-card-title { font-size: 17px; font-weight: 700; color: #fff; line-height: 1.4; margin-bottom: 16px; }
.actu-card-btn { display: inline-flex; align-items: center; gap: 8px; background: #FFC107; color: #1a1a2e; font-size: 13px; font-weight: 700; padding: 8px 18px; border-radius: 50px; text-decoration: none; transition: background 0.3s, transform 0.2s; width: fit-content; }
.actu-card-btn:hover { background: #fff; color: #1a1a2e; text-decoration: none; transform: scale(1.05); }
.actu-strip-footer { text-align: center; margin-top: 40px; }
</style>

<section class="actu-strip-section">
    <div class="actu-strip-title"><h3>Actualit&eacute;s</h3></div>
    <div class="actu-marquee-wrapper">
        <div class="actu-marquee-track">
            <div class="actu-card">
                <img src="assets/storage/events/expositions/arta_sacra_2025/main.jpg" alt="Festival ARTA SACRA">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> 11 ao&ucirc;t 2025</span>
                    <p class="actu-card-title">Festival ARTA SACRA</p>
                    <a class="actu-card-btn" href="https://forumassotousensemble.org/actualites/festival-arta-sacra" target="_blank">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="actu-card">
                <img src="assets/storage/actualites/June2025/CAN2025.png" alt="CAN 2025">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> 05 mai 2025</span>
                    <p class="actu-card-title">En route pour la Coupe d&apos;Afrique des Nations (CAN) 2025 !</p>
                    <a class="actu-card-btn" href="https://forumassotousensemble.org/actualites/can-juin-2025" target="_blank">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="actu-card">
                <img src="assets/storage/actualites/June2025/routes_esclavage.png" alt="Routes de l&apos;esclavage">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> 05 mai 2025</span>
                    <p class="actu-card-title">Des routes de l&apos;esclavage &agrave; nos jours</p>
                    <a class="actu-card-btn" href="https://forumassotousensemble.org/actualites/routes-de-l-esclavage-a-nos-jours-juin-2025" target="_blank">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="actu-card">
                <img src="assets/storage/actualites/September2022/assainissement_douala.png" alt="Douala">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> Septembre 2022</span>
                    <p class="actu-card-title">Eau et assainissement PK17-PK32 Douala</p>
                    <a class="actu-card-btn" href="pages/actualites.html">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="actu-card">
                <img src="assets/storage/actualites/September2026/plantations_bananiers.png" alt="Plantation bananiers">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> 2026 - 2027</span>
                    <p class="actu-card-title">Plantation de bananiers plantains &agrave; Bihiang, Cameroun</p>
                    <a class="actu-card-btn" href="https://forumassotousensemble.org/actualites/plantation-bananiers-piments-bihang-2026-2027" target="_blank">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <!-- Duplicate for seamless loop -->
            <div class="actu-card">
                <img src="assets/storage/events/expositions/arta_sacra_2025/main.jpg" alt="Festival ARTA SACRA">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> 11 ao&ucirc;t 2025</span>
                    <p class="actu-card-title">Festival ARTA SACRA</p>
                    <a class="actu-card-btn" href="https://forumassotousensemble.org/actualites/festival-arta-sacra" target="_blank">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="actu-card">
                <img src="assets/storage/actualites/June2025/CAN2025.png" alt="CAN 2025">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> 05 mai 2025</span>
                    <p class="actu-card-title">En route pour la Coupe d&apos;Afrique des Nations (CAN) 2025 !</p>
                    <a class="actu-card-btn" href="https://forumassotousensemble.org/actualites/can-juin-2025" target="_blank">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="actu-card">
                <img src="assets/storage/actualites/June2025/routes_esclavage.png" alt="Routes de l&apos;esclavage">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> 05 mai 2025</span>
                    <p class="actu-card-title">Des routes de l&apos;esclavage &agrave; nos jours</p>
                    <a class="actu-card-btn" href="https://forumassotousensemble.org/actualites/routes-de-l-esclavage-a-nos-jours-juin-2025" target="_blank">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="actu-card">
                <img src="assets/storage/actualites/September2022/assainissement_douala.png" alt="Douala">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> Septembre 2022</span>
                    <p class="actu-card-title">Eau et assainissement PK17-PK32 Douala</p>
                    <a class="actu-card-btn" href="pages/actualites.html">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="actu-card">
                <img src="assets/storage/actualites/September2026/plantations_bananiers.png" alt="Plantation bananiers">
                <div class="actu-card-overlay">
                    <span class="actu-card-date"><i class="far fa-calendar-alt"></i> 2026 - 2027</span>
                    <p class="actu-card-title">Plantation de bananiers plantains &agrave; Bihiang, Cameroun</p>
                    <a class="actu-card-btn" href="https://forumassotousensemble.org/actualites/plantation-bananiers-piments-bihang-2026-2027" target="_blank">En savoir + <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="actu-strip-footer">
        <a class="read-more-btn" href="pages/actualites.html">Voir toutes les actualit&eacute;s</a>
    </div>
</section>'''

html, count = re.subn(OLD_SECTION_PATTERN, NEW_ACTU_SECTION, html, flags=re.DOTALL)
print(f"Section blog remplacée: {count} fois")

# ===========================================================
# 2. SUPPRIMER LE PARAGRAPHE DE DESCRIPTION DANS LA BANNIÈRE
# ===========================================================
DESC_PATTERN = r'\s*<p class="main-description-justified">.*?</p>'
html, count2 = re.subn(DESC_PATTERN, '', html, flags=re.DOTALL)
print(f"Paragraphe description supprimé: {count2} fois")

# ===========================================================
# 3. AJOUTER LE TEXTE PROPREMENT SOUS LA VIDÉO
# ===========================================================
# On cherche la fin du video-wrapper et on insère le bloc de texte juste après
VIDEO_CLOSE = '</div>\n                    \n\n                </div>'

TEXT_BLOCK = '''</div>

                    <div class="description-sous-video" style="background: rgba(255,255,255,0.88); border-radius: 12px; padding: 22px 24px; margin-top: 20px; box-shadow: 0 4px 18px rgba(0,0,0,0.07);">
                        <p style="font-size: 14.5px; line-height: 1.75; color: #444; margin: 0;">
                            Fond&eacute; en avril 2001, le Forum Associatif Tous Ensemble (F.A.T.E) est un collectif cr&eacute;&eacute; &agrave; l&apos;initiative de Roger Tonye Aguiar. C&apos;est une association loi 1901 d&apos;int&eacute;r&ecirc;t g&eacute;n&eacute;ral, &eacute;ligible au m&eacute;c&eacute;nat, d&eacute;ployant ses actions aussi bien localement qu&apos;&agrave; l&apos;international pour valoriser la contribution de l&apos;Afrique au patrimoine culturel mondial.
                        </p>
                    </div>

                </div>'''

if VIDEO_CLOSE in html:
    html = html.replace(VIDEO_CLOSE, TEXT_BLOCK, 1)
    print("Texte sous la vidéo ajouté")
else:
    print("ATTENTION: anchor pour vidéo non trouvé - texte non ajouté")

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Patch terminé avec succès !")
