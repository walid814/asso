#!/bin/bash
PAGES="/home/walid/.assoSTAGE/asso/pages"
HEADER="/tmp/actu_header.html"
FOOTER="/tmp/actu_footer.html"

make_page() {
  local slug="$1"
  local title="$2"
  local subtitle="$3"
  local image="$4"
  local header_text="$5"
  local body="$6"
  local other_cards="$7"

  sed "s|<title>Actualités | Forum Associatif Tous Assemble</title>|<title>${title} | Actualités | Forum Associatif Tous Ensemble</title>|" "$HEADER" > /tmp/page_header.html

  cat > /tmp/page_content.html << HTMLEND
<section class="uni-banner opacityLow" style="background-image: url('${image}'); background-position: center; background-size: cover;">
    <div class="container">
        <div class="uni-banner-text-area">
            <h1>${title}</h1>
            <ul>
                <li><a href="../index.html">Accueil</a></li>
                <li><a href="actualites.html">Actualités</a></li>
                <li>${title}</li>
            </ul>
        </div>
    </div>
</section>

<style>
.actu-detail-section { padding: 70px 0; background: #fff; }
.actu-detail-inner { max-width: 860px; margin: 0 auto; padding: 0 24px; }
.actu-detail-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; flex-wrap: wrap; }
.actu-detail-tag { background: #FFC107; color: #1a1a2e; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; padding: 5px 14px; border-radius: 50px; }
.actu-detail-date { font-size: 13px; color: #888; font-weight: 500; }
.actu-detail-hero { width: 100%; border-radius: 16px; overflow: hidden; margin-bottom: 36px; box-shadow: 0 12px 40px rgba(0,0,0,0.12); max-height: 460px; }
.actu-detail-hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
.actu-detail-h2 { font-size: clamp(22px,3vw,34px); font-weight: 800; color: #1a1a2e; line-height: 1.25; margin-bottom: 24px; }
.actu-detail-body { font-size: 15.5px; line-height: 1.85; color: #444; }
.actu-detail-body h3 { font-size: 20px; font-weight: 700; color: #1a1a2e; margin: 32px 0 14px; border-left: 4px solid #FFC107; padding-left: 14px; }
.actu-detail-body ul { padding-left: 22px; margin-bottom: 20px; }
.actu-detail-body ul li { margin-bottom: 8px; }
.actu-detail-body p { margin-bottom: 18px; }
.actu-detail-sep { border: none; border-top: 2px solid #f0f0f0; margin: 56px 0 40px; }
.actu-other-title { font-size: 24px; font-weight: 800; color: #1a1a2e; margin-bottom: 28px; text-align: center; }
.actu-other-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; margin-bottom: 50px; }
.actu-other-card { border-radius: 14px; overflow: hidden; box-shadow: 0 6px 24px rgba(0,0,0,0.10); background: #fff; transition: transform 0.3s, box-shadow 0.3s; text-decoration: none; display: block; color: inherit; }
.actu-other-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.16); text-decoration: none; color: inherit; }
.actu-other-card img { width: 100%; height: 160px; object-fit: cover; display: block; }
.actu-other-info { padding: 16px; }
.actu-other-info p { font-size: 14px; font-weight: 700; color: #1a1a2e; margin: 0; line-height: 1.4; }
.actu-back-btn { display: inline-flex; align-items: center; gap: 8px; background: #FFC107; color: #1a1a2e; font-size: 14px; font-weight: 700; padding: 12px 26px; border-radius: 50px; text-decoration: none; margin-bottom: 60px; transition: background 0.3s, transform 0.2s; }
.actu-back-btn:hover { background: #1a1a2e; color: #FFC107; transform: scale(1.04); text-decoration: none; }
</style>

<section class="actu-detail-section">
    <div class="actu-detail-inner">
        <div class="actu-detail-meta">
            <span class="actu-detail-tag">Actualité</span>
            <span class="actu-detail-date"><i class="far fa-calendar-alt"></i> &nbsp;${subtitle}</span>
        </div>
        <div class="actu-detail-hero">
            <img src="${image}" alt="${title}">
        </div>
        <h2 class="actu-detail-h2">${header_text}</h2>
        <div class="actu-detail-body">
${body}
        </div>
        <hr class="actu-detail-sep">
        <h3 class="actu-other-title">Autres actualités</h3>
        <div class="actu-other-grid">
${other_cards}
        </div>
        <div style="text-align:center;">
            <a class="actu-back-btn" href="actualites.html">
                <i class="fas fa-arrow-left"></i> Retour aux actualités
            </a>
        </div>
    </div>
</section>
HTMLEND

  cat /tmp/page_header.html /tmp/page_content.html "$FOOTER" > "${PAGES}/${slug}.html"
  echo "✓ ${slug}.html created"
}

# 1. CAN
make_page "can-juin-2025" \
  "En route pour la CAN 2025" \
  "Actualités · Juin 2025" \
  "../assets/storage/actualites/June2025/CAN2025.png" \
  "En route pour la CAN 2025 !" \
  "<p>Le Forum Associatif Tous Ensemble (FATE) se mobilise pour accompagner et soutenir les supporters et passionnés de football africain à l'occasion de la Coupe d'Afrique des Nations 2025.</p>
<p>Cet événement sportif majeur rassemble les nations africaines autour du football et constitue une occasion unique de célébrer la fraternité, la culture et l'unité africaine.</p>
<h3>Nos actions autour de la CAN 2025</h3>
<ul>
  <li>Organisation de soirées de visionnage collectives</li>
  <li>Animations culturelles et sportives</li>
  <li>Sensibilisation à la culture des pays participants</li>
  <li>Activités pour les jeunes autour du football et des valeurs sportives</li>
</ul>
<p><strong>Période :</strong> 1er juin – 1er novembre 2025<br>
<strong>Lieu :</strong> Lyon et agglomération</p>" \
  '<a class="actu-other-card" href="festival-arta-sacra.html"><img src="../assets/storage/events/expositions/arta_sacra_2025/main.jpg" alt="ARTA SACRA"><div class="actu-other-info"><p>Festival ARTA SACRA</p></div></a>
<a class="actu-other-card" href="routes-de-l-esclavage-a-nos-jours-juin-2025.html"><img src="../assets/storage/actualites/June2025/routes_esclavage.png" alt="Routes esclavage"><div class="actu-other-info"><p>Des routes de l'"'"'esclavage à nos jours</p></div></a>
<a class="actu-other-card" href="assainissement-d-eau-douala-septembre-2026.html"><img src="../assets/storage/actualites/September2022/assainissement_douala.png" alt="Eau Douala"><div class="actu-other-info"><p>Eau et assainissement Douala</p></div></a>'


# 2. Routes de l'esclavage
make_page "routes-de-l-esclavage-a-nos-jours-juin-2025" \
  "Des routes de l'esclavage à nos jours" \
  "Actualités · Mai 2025" \
  "../assets/storage/actualites/June2025/routes_esclavage.png" \
  "Des routes de l'esclavage à nos jours" \
  "<p>Ce projet ambitieux, porté par le FATE de 2024 à 2026, vise à mobiliser les habitants et les acteurs éducatifs autour de la mémoire de l'esclavage et de ses héritages contemporains.</p>
<p>À travers des outils pédagogiques innovants, des expositions itinérantes et des rencontres participatives, ce projet invite chacun à explorer l'impact économique, scientifique, culturel et sportif de la traite négrière sur nos sociétés actuelles.</p>
<h3>Objectifs du projet</h3>
<ul>
  <li>Sensibiliser les jeunes générations à l'histoire de l'esclavage</li>
  <li>Proposer des outils pédagogiques adaptés aux établissements scolaires</li>
  <li>Favoriser le dialogue interculturel et la réconciliation mémorielle</li>
  <li>Valoriser les contributions africaines et afro-descendantes à la civilisation mondiale</li>
</ul>
<h3>Calendrier</h3>
<p>Le projet se déroule de <strong>janvier 2025 à janvier 2029</strong> dans divers lieux en France et à l'international.</p>" \
  '<a class="actu-other-card" href="festival-arta-sacra.html"><img src="../assets/storage/events/expositions/arta_sacra_2025/main.jpg" alt="ARTA SACRA"><div class="actu-other-info"><p>Festival ARTA SACRA</p></div></a>
<a class="actu-other-card" href="can-juin-2025.html"><img src="../assets/storage/actualites/June2025/CAN2025.png" alt="CAN 2025"><div class="actu-other-info"><p>En route pour la CAN 2025</p></div></a>
<a class="actu-other-card" href="plantation-bananiers-piments-bihang-2026-2027.html"><img src="../assets/storage/actualites/September2026/plantations_bananiers.png" alt="Plantation"><div class="actu-other-info"><p>Plantation de bananiers plantains</p></div></a>'


# 3. Eau et assainissement
make_page "assainissement-d-eau-douala-septembre-2026" \
  "Eau et assainissement PK17-PK32 Douala" \
  "Actualités · Septembre 2022" \
  "../assets/storage/actualites/September2022/assainissement_douala.png" \
  "Eau et assainissement PK17-PK32 Douala" \
  "<p>Le FATE soutient activement l'accès à l'eau potable et à l'assainissement dans les quartiers défavorisés de Douala, au Cameroun, notamment dans les zones PK17 à PK32.</p>
<p>Ce projet humanitaire répond à un besoin fondamental des populations locales, confrontées à un manque chronique d'infrastructures sanitaires de base. En partenariat avec des associations locales, le FATE finance et accompagne la réalisation de puits, de bornes-fontaines et de latrines collectives.</p>
<h3>Impact du projet</h3>
<ul>
  <li>Accès à l'eau potable pour plus de 2 000 familles</li>
  <li>Construction et réhabilitation de points d'eau</li>
  <li>Sensibilisation à l'hygiène et aux bonnes pratiques sanitaires</li>
  <li>Renforcement des capacités des comités locaux de gestion de l'eau</li>
</ul>
<p><strong>Localisation :</strong> Douala, Cameroun – zones PK17 à PK32</p>" \
  '<a class="actu-other-card" href="routes-de-l-esclavage-a-nos-jours-juin-2025.html"><img src="../assets/storage/actualites/June2025/routes_esclavage.png" alt="Routes esclavage"><div class="actu-other-info"><p>Des routes de l'"'"'esclavage à nos jours</p></div></a>
<a class="actu-other-card" href="plantation-bananiers-piments-bihang-2026-2027.html"><img src="../assets/storage/actualites/September2026/plantations_bananiers.png" alt="Plantation"><div class="actu-other-info"><p>Plantation de bananiers plantains</p></div></a>
<a class="actu-other-card" href="festival-arta-sacra.html"><img src="../assets/storage/events/expositions/arta_sacra_2025/main.jpg" alt="ARTA SACRA"><div class="actu-other-info"><p>Festival ARTA SACRA</p></div></a>'


# 4. Plantation
make_page "plantation-bananiers-piments-bihang-2026-2027" \
  "Plantation de bananiers plantains et piments" \
  "Actualités · 2026 – 2027" \
  "../assets/storage/actualites/September2026/plantations_bananiers.png" \
  "Création d'une plantation de bananiers plantains à Bihang" \
  "<p>Le FATE lance un projet agricole structurant au village de Bihang, au Cameroun : la création d'une plantation de bananiers plantains et de piments, destinée à soutenir le développement économique local et à renforcer la souveraineté alimentaire des communautés rurales.</p>
<p>Ce projet s'inscrit dans une démarche de développement durable et solidaire, en associant les habitants, les agriculteurs locaux et les partenaires institutionnels pour construire une filière agricole viable et rentable.</p>
<h3>Objectifs</h3>
<ul>
  <li>Création d'emplois locaux pérennes dans le secteur agricole</li>
  <li>Renforcement de la sécurité alimentaire de la communauté</li>
  <li>Formation des agriculteurs aux techniques modernes de culture</li>
  <li>Développement d'une filière de commercialisation locale et régionale</li>
</ul>
<h3>Calendrier</h3>
<p><strong>Début :</strong> Janvier 2026<br>
<strong>Fin prévue :</strong> Décembre 2027<br>
<strong>Localisation :</strong> Village de Bihang, Cameroun</p>" \
  '<a class="actu-other-card" href="assainissement-d-eau-douala-septembre-2026.html"><img src="../assets/storage/actualites/September2022/assainissement_douala.png" alt="Eau Douala"><div class="actu-other-info"><p>Eau et assainissement Douala</p></div></a>
<a class="actu-other-card" href="routes-de-l-esclavage-a-nos-jours-juin-2025.html"><img src="../assets/storage/actualites/June2025/routes_esclavage.png" alt="Routes esclavage"><div class="actu-other-info"><p>Des routes de l'"'"'esclavage à nos jours</p></div></a>
<a class="actu-other-card" href="can-juin-2025.html"><img src="../assets/storage/actualites/June2025/CAN2025.png" alt="CAN 2025"><div class="actu-other-info"><p>En route pour la CAN 2025</p></div></a>'


# 5. Culture pieds des tours
make_page "pied-des-tours-juin-2025" \
  "Culture aux pieds des tours et live d'été" \
  "Actualités · Juin – Août 2025" \
  "../assets/storage/actualites/June2025/pieds_des_tours.png" \
  "Culture aux pieds des tours — Live d'été 2025" \
  "<p>Le FATE organise une nouvelle édition de son action phare « Culture aux pieds des tours », proposant tout l'été des activités gratuites et ouvertes à tous dans les quartiers prioritaires de Vaulx-en-Velin et agglomération lyonnaise.</p>
<p>Ateliers artistiques, spectacles vivants, animations sportives et musicales rythment cet été 2025 pour offrir aux habitants un accès à la culture directement dans leur quartier.</p>
<h3>Au programme</h3>
<ul>
  <li>Ateliers danse (bachata, salsa, capoeira, danses africaines)</li>
  <li>Concerts live et scènes ouvertes</li>
  <li>Ateliers graffiti et arts plastiques</li>
  <li>Activités sportives (basket, boxe, foot)</li>
  <li>Animations pour les enfants et les familles</li>
</ul>
<p><strong>Période :</strong> 27 juin – 14 août 2025<br>
<strong>Lieu :</strong> Vaulx-en-Velin et agglomération lyonnaise<br>
<strong>Accès :</strong> Gratuit et ouvert à tous</p>" \
  '<a class="actu-other-card" href="festival-arta-sacra.html"><img src="../assets/storage/events/expositions/arta_sacra_2025/main.jpg" alt="ARTA SACRA"><div class="actu-other-info"><p>Festival ARTA SACRA</p></div></a>
<a class="actu-other-card" href="can-juin-2025.html"><img src="../assets/storage/actualites/June2025/CAN2025.png" alt="CAN 2025"><div class="actu-other-info"><p>En route pour la CAN 2025</p></div></a>
<a class="actu-other-card" href="routes-de-l-esclavage-a-nos-jours-juin-2025.html"><img src="../assets/storage/actualites/June2025/routes_esclavage.png" alt="Routes esclavage"><div class="actu-other-info"><p>Des routes de l'"'"'esclavage à nos jours</p></div></a>'
