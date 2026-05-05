#!/usr/bin/env python3
"""
Patch global pour index.html — Améliorations basées sur le diagnostic FATE
1. Corriger les liens footer cassés
2. Améliorer les balises SEO <head>
3. Ajouter pop-up "Actualité du moment" (CAN 2025)
4. Ajouter mini-galerie d'activités dans la bannière gauche
"""

import re

FILE = '/home/walid/.assoSTAGE/asso/index.html'
with open(FILE, 'r', encoding='utf-8') as f:
    html = f.read()

print(f"Fichier chargé : {len(html)} caractères")

# ============================================================
# 1. CORRIGER LES LIENS FOOTER CASSÉS (guillemets manquants)
# ============================================================
# Les href sans guillemets cassent le HTML
fixes = [
    ('href=https://www.facebook.com/profile.php?id=61558231605226 target=',
     'href="https://www.facebook.com/profile.php?id=61558231605226" target='),
    # LinkedIn aussi mal fermé
    ('href="https://www.linkedin.com/company/forum-associatif-tous-ensemble/about/ target=',
     'href="https://www.linkedin.com/company/forum-associatif-tous-ensemble/about/" target='),
    ('href=https://x.com/FATEnsemble target=',
     'href="https://x.com/FATEnsemble" target='),
    ('href=https://www.instagram.com/forumassociatif_tousensemble?igsh=czgwZW1oc3FrcG1h target=',
     'href="https://www.instagram.com/forumassociatif_tousensemble?igsh=czgwZW1oc3FrcG1h" target='),
    ('href=https://www.tiktok.com/@fatensemble target=',
     'href="https://www.tiktok.com/@fatensemble" target='),
]
for old, new in fixes:
    if old in html:
        html = html.replace(old, new)
        print(f"✅ Lien corrigé : {new[:60]}...")
    else:
        print(f"⚠️  Non trouvé : {old[:60]}...")

# ============================================================
# 2. AMÉLIORER LES BALISES SEO DANS <head>
# ============================================================
OLD_HEAD_META = '''    <title>Accueil | Forum Associatif Tous Assemble</title>

    <meta name="viewport" content="width=device-width">

    
    <meta name="copyright" content="FATE - Forum Associatif Tous Ensemble" />
    <meta name="author" content="E-jabbing - e-jabbing.com" />
    <meta property="og:description" content="Crée en avril 2001, le "Forum Associatif Tous Ensemble" est un collectif de plus d'une trentaine d'Associations de Lyon et son agglomération." />

    
    
    <meta name="description" content="Crée en avril 2001, le "Forum Associatif Tous Ensemble" est un collectif de plus d'une trentaine d'Associations de Lyon et son agglomération." />
    <meta name="keywords" content="Forum, Associatif, tous ensemble, assocaition, france" />
    <meta name="robots" content="index, follow" />
    <meta name="DC.title" content="Accueil | Forum Associatif Tous Assemble" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@fate" />
    <meta name="twitter:creator" content="@fate" />
    <meta property="og:url" content="https://fatetousensemble.org/" />
    <meta property="og:title" content="Accueil | Forum Associatif Tous Assemble" />'''

NEW_HEAD_META = '''    <title>Forum Associatif Tous Ensemble (FATE) — Association loi 1901 | Lyon</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- SEO -->
    <meta name="description" content="Le Forum Associatif Tous Ensemble (FATE) est une association loi 1901 basée à Lyon, engagée pour la solidarité, le vivre-ensemble et la valorisation du patrimoine africain depuis 2001." />
    <meta name="keywords" content="FATE, Forum Associatif Tous Ensemble, association Lyon, solidarité, Afrique, diaspora africaine, vivre-ensemble, culture" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Forum Associatif Tous Ensemble (FATE)" />
    <link rel="canonical" href="https://forumassotousensemble.org/" />

    <!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:url" content="https://forumassotousensemble.org/" />
    <meta property="og:title" content="Forum Associatif Tous Ensemble (FATE) — Association loi 1901 | Lyon" />
    <meta property="og:description" content="Fondé en 2001, le FATE est un collectif d'associations lyonnaises engagées pour la solidarité locale et internationale, la culture africaine et le vivre-ensemble." />
    <meta property="og:image" content="https://forumassotousensemble.org/assets/images/logoHeader.png" />
    <meta property="og:site_name" content="Forum Associatif Tous Ensemble" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@FATEnsemble" />
    <meta name="twitter:creator" content="@FATEnsemble" />
    <meta name="twitter:title" content="Forum Associatif Tous Ensemble (FATE)" />
    <meta name="twitter:description" content="Association loi 1901 basée à Lyon, engagée pour la solidarité et la valorisation du patrimoine africain depuis 2001." />
    <meta name="twitter:image" content="https://forumassotousensemble.org/assets/images/logoHeader.png" />'''

if OLD_HEAD_META in html:
    html = html.replace(OLD_HEAD_META, NEW_HEAD_META)
    print("✅ Balises SEO améliorées")
else:
    print("⚠️  Balises SEO : ancienne structure non trouvée exactement, essai partiel...")
    html = html.replace(
        '<title>Accueil | Forum Associatif Tous Assemble</title>',
        '<title>Forum Associatif Tous Ensemble (FATE) — Association loi 1901 | Lyon</title>'
    )

# ============================================================
# 3. POP-UP "ACTUALITÉ DU MOMENT" (CAN 2025)
# ============================================================
POPUP_HTML = '''
<!-- ========== POP-UP ACTUALITÉ DU MOMENT ========== -->
<style>
#fate-popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.65);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}
#fate-popup-overlay.visible {
    opacity: 1;
    pointer-events: all;
}
#fate-popup-box {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    max-width: 520px;
    width: 90%;
    box-shadow: 0 24px 80px rgba(0,0,0,0.35);
    transform: translateY(30px) scale(0.96);
    transition: transform 0.4s ease;
    position: relative;
}
#fate-popup-overlay.visible #fate-popup-box {
    transform: translateY(0) scale(1);
}
#fate-popup-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(0,0,0,0.5);
    border: none;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: background 0.2s;
}
#fate-popup-close:hover { background: rgba(0,0,0,0.8); }
#fate-popup-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    display: block;
}
#fate-popup-body {
    padding: 24px 28px 28px;
}
#fate-popup-tag {
    display: inline-block;
    background: #FFC107;
    color: #1a1a2e;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 4px 12px;
    border-radius: 50px;
    margin-bottom: 12px;
}
#fate-popup-title {
    font-size: 22px;
    font-weight: 800;
    color: #1a1a2e;
    line-height: 1.3;
    margin-bottom: 10px;
}
#fate-popup-desc {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
}
#fate-popup-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #1a1a2e;
    color: #FFC107;
    font-size: 14px;
    font-weight: 700;
    padding: 12px 24px;
    border-radius: 50px;
    text-decoration: none;
    transition: background 0.3s, transform 0.2s;
}
#fate-popup-btn:hover {
    background: #FFC107;
    color: #1a1a2e;
    text-decoration: none;
    transform: scale(1.03);
}
</style>

<div id="fate-popup-overlay">
    <div id="fate-popup-box">
        <button id="fate-popup-close" onclick="closeFatePopup()" aria-label="Fermer">&#x2715;</button>
        <img id="fate-popup-img" src="assets/storage/actualites/June2025/CAN2025.png" alt="En route pour la CAN 2025">
        <div id="fate-popup-body">
            <span id="fate-popup-tag">&#128241; Actualité du moment</span>
            <h2 id="fate-popup-title">En route pour la CAN 2025 !</h2>
            <p id="fate-popup-desc">Le FATE suit de près la Coupe d'Afrique des Nations 2025. Retrouvez toutes nos actualités et actions autour de cet événement continental majeur.</p>
            <a id="fate-popup-btn" href="https://forumassotousensemble.org/actualites/can-juin-2025" target="_blank">
                Découvrir <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</div>
<script>
(function() {
    // N'afficher qu'une fois par session
    if (sessionStorage.getItem('fatePopupSeen')) return;
    setTimeout(function() {
        var overlay = document.getElementById('fate-popup-overlay');
        if (overlay) overlay.classList.add('visible');
    }, 1800);
})();
function closeFatePopup() {
    var overlay = document.getElementById('fate-popup-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
        setTimeout(function() { overlay.style.display = 'none'; }, 400);
        sessionStorage.setItem('fatePopupSeen', '1');
    }
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeFatePopup();
});
document.getElementById('fate-popup-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeFatePopup();
});
</script>
<!-- ========== FIN POP-UP ========== -->
'''

# Insérer juste avant </body>
if '</body>' in html:
    html = html.replace('</body>', POPUP_HTML + '\n</body>')
    print("✅ Pop-up CAN 2025 ajouté")
else:
    print("⚠️  </body> non trouvé pour le pop-up")

# ============================================================
# 4. MINI-GALERIE D'ACTIVITÉS DANS LA BANNIÈRE GAUCHE
# ============================================================
GALLERY_HTML = '''
                    <!-- Mini-galerie activités -->
                    <style>
                    .activities-gallery {
                        display: flex;
                        gap: 12px;
                        margin-top: 28px;
                        flex-wrap: nowrap;
                    }
                    .activity-thumb {
                        flex: 1;
                        position: relative;
                        border-radius: 12px;
                        overflow: hidden;
                        height: 90px;
                        box-shadow: 0 4px 16px rgba(0,0,0,0.25);
                        cursor: pointer;
                        transition: transform 0.3s ease, box-shadow 0.3s;
                    }
                    .activity-thumb:hover {
                        transform: scale(1.04);
                        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                    }
                    .activity-thumb img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        display: block;
                    }
                    .activity-thumb-label {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
                        color: #fff;
                        font-size: 10px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        padding: 6px 8px 5px;
                        text-align: center;
                    }
                    </style>
                    <div class="activities-gallery">
                        <a href="pages/actions.html" class="activity-thumb">
                            <img src="assets/storage/events/April2023/quartier_propres_et_salubres.jpg" alt="Quartiers propres et salubres">
                            <div class="activity-thumb-label">Environnement</div>
                        </a>
                        <a href="pages/actualites.html" class="activity-thumb">
                            <img src="assets/storage/events/expositions/arta_sacra_2025/main.jpg" alt="Festival ARTA SACRA">
                            <div class="activity-thumb-label">Culture</div>
                        </a>
                        <a href="pages/actions.html" class="activity-thumb">
                            <img src="assets/storage/events/December2021/inauguration_stele_mandela.jpg" alt="Inauguration stèle Mandela">
                            <div class="activity-thumb-label">Mémoire</div>
                        </a>
                    </div>'''

# Insérer juste avant les deux boutons (En savoir + / Devenir bénévole)
BUTTONS_ANCHOR = '                    <a class="default-button" href="/fate">'
if BUTTONS_ANCHOR in html:
    html = html.replace(BUTTONS_ANCHOR, GALLERY_HTML + '\n' + BUTTONS_ANCHOR, 1)
    print("✅ Mini-galerie d'activités ajoutée")
else:
    print("⚠️  Ancre boutons non trouvée pour la mini-galerie")

# ============================================================
# ÉCRITURE DU FICHIER FINAL
# ============================================================
with open(FILE, 'w', encoding='utf-8') as f:
    f.write(html)

print("\n✅✅✅ Tous les patchs appliqués avec succès !")
