#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(BASE_DIR, 'pages')

HEADER = "/tmp/actu_header.html"
FOOTER = "/tmp/actu_footer.html"

with open(HEADER, 'r', encoding='utf-8') as f:
    header = f.read()

with open(FOOTER, 'r', encoding='utf-8') as f:
    footer = f.read()

ACTUALITES = [
    {
        'slug': 'festival-arta-sacra',
        'title': 'Festival ARTA SACRA',
        'subtitle': 'Actualités · Août 2025',
        'image': '../assets/storage/events/expositions/arta_sacra_2025/main.jpg',
        'banner_bg': '../assets/storage/events/expositions/arta_sacra_2025/main.jpg',
        'header_text': 'Festival ARTA SACRA 2025',
        'body': """
<p>Le Festival ARTA SACRA est un événement culturel annuel qui célèbre les arts sacrés, les traditions et la spiritualité à travers des expositions, des performances et des ateliers participatifs.</p>
<p>Organisé en partenariat avec le Forum Associatif Tous Ensemble (FATE), cet événement réunit artistes, artisans et communautés autour d'un dialogue interculturel riche et ouvert à tous.</p>
<br>
<h3>Programme</h3>
<ul>
  <li>Expositions d'arts sacrés africains et de la diaspora</li>
  <li>Concerts et performances live</li>
  <li>Ateliers pour enfants et adultes</li>
  <li>Conférences et tables rondes</li>
</ul>
<br>
<p><strong>Date :</strong> 11 août 2025<br>
<strong>Lieu :</strong> Lyon, France</p>
""",
        'other_actus': [
            ('can-juin-2025', 'En route pour la CAN 2025', '../assets/storage/actualites/June2025/CAN2025.png'),
            ('routes-de-l-esclavage-a-nos-jours-juin-2025', "Des routes de l'esclavage à nos jours", '../assets/storage/actualites/June2025/routes_esclavage.png'),
            ('pied-des-tours-juin-2025', 'Culture aux pieds des tours', '../assets/storage/actualites/June2025/pieds_des_tours.png'),
        ],
    },
    {
        'slug': 'can-juin-2025',
        'title': 'En route pour la Coupe d\'Afrique des Nations (CAN) 2025 !',
        'subtitle': 'Actualités · Juin 2025',
        'image': '../assets/storage/actualites/June2025/CAN2025.png',
        'banner_bg': '../assets/storage/actualites/June2025/CAN2025.png',
        'header_text': 'En route pour la CAN 2025 !',
        'body': """
<p>Le Forum Associatif Tous Ensemble (FATE) se mobilise pour accompagner et soutenir les supporters et passionnés de football africain à l'occasion de la Coupe d'Afrique des Nations 2025.</p>
<p>Cet événement sportif majeur rassemble les nations africaines autour du football et constitue une occasion unique de célébrer la fraternité, la culture et l'unité africaine.</p>
<br>
<h3>Nos actions autour de la CAN 2025</h3>
<ul>
  <li>Organisation de soirées de visionnage collectives</li>
  <li>Animations culturelles et sportives</li>
  <li>Sensibilisation à la culture des pays participants</li>
  <li>Activités pour les jeunes autour du football et des valeurs sportives</li>
</ul>
<br>
<p><strong>Période :</strong> 1er juin – 1er novembre 2025<br>
<strong>Lieu :</strong> Lyon et agglomération</p>
""",
        'other_actus': [
            ('festival-arta-sacra', 'Festival ARTA SACRA', '../assets/storage/events/expositions/arta_sacra_2025/main.jpg'),
            ('routes-de-l-esclavage-a-nos-jours-juin-2025', "Des routes de l'esclavage à nos jours", '../assets/storage/actualites/June2025/routes_esclavage.png'),
            ('assainissement-d-eau-douala-septembre-2026', 'Eau et assainissement PK17-PK32 Douala', '../assets/storage/actualites/September2022/assainissement_douala.png'),
        ],
    },
    {
        'slug': 'routes-de-l-esclavage-a-nos-jours-juin-2025',
        'title': "Des routes de l'esclavage à nos jours",
        'subtitle': 'Actualités · Mai 2025',
        'image': '../assets/storage/actualites/June2025/routes_esclavage.png',
        'banner_bg': '../assets/storage/actualites/June2025/routes_esclavage.png',
        'header_text': "Des routes de l'esclavage à nos jours",
        'body': """
<p>Ce projet ambitieux, porté par le FATE de 2024 à 2026, vise à mobiliser les habitants et les acteurs éducatifs autour de la mémoire de l'esclavage et de ses héritages contemporains.</p>
<p>À travers des outils pédagogiques innovants, des expositions itinérantes et des rencontres participatives, ce projet invite chacun à explorer l'impact économique, scientifique, culturel et sportif de la traite négrière sur nos sociétés actuelles.</p>
<br>
<h3>Objectifs du projet</h3>
<ul>
  <li>Sensibiliser les jeunes générations à l'histoire de l'esclavage</li>
  <li>Proposer des outils pédagogiques adaptés aux établissements scolaires</li>
  <li>Favoriser le dialogue interculturel et la réconciliation mémorielle</li>
  <li>Valoriser les contributions africaines et afro-descendantes à la civilisation mondiale</li>
</ul>
<br>
<h3>Calendrier</h3>
<p>Le projet se déroule de <strong>janvier 2025 à janvier 2029</strong> dans divers lieux en France et à l'international.</p>
<p><strong>Contact :</strong> Pour plus d'informations ou pour impliquer votre établissement, contactez-nous via notre page <a href="contact.html" style="color:#FFC107;">Contact</a>.</p>
""",
        'other_actus': [
            ('festival-arta-sacra', 'Festival ARTA SACRA', '../assets/storage/events/expositions/arta_sacra_2025/main.jpg'),
            ('can-juin-2025', 'En route pour la CAN 2025', '../assets/storage/actualites/June2025/CAN2025.png'),
            ('plantation-bananiers-piments-bihang-2026-2027', 'Plantation de bananiers plantains à Bihang', '../assets/storage/actualites/September2026/plantations_bananiers.png'),
        ],
    },
    {
        'slug': 'assainissement-d-eau-douala-septembre-2026',
        'title': "Projet d'eau et d'assainissement PK17-PK32 Douala",
        'subtitle': 'Actualités · Septembre 2022',
        'image': '../assets/storage/actualites/September2022/assainissement_douala.png',
        'banner_bg': '../assets/storage/actualites/September2022/assainissement_douala.png',
        'header_text': "Eau et assainissement PK17-PK32 Douala",
        'body': """
<p>Le FATE soutient activement l'accès à l'eau potable et à l'assainissement dans les quartiers défavorisés de Douala, au Cameroun, notamment dans les zones PK17 à PK32.</p>
<p>Ce projet humanitaire répond à un besoin fondamental des populations locales, confrontées à un manque chronique d'infrastructures sanitaires de base. En partenariat avec des associations locales, le FATE finance et accompagne la réalisation de puits, de bornes-fontaines et de latrines collectives.</p>
<br>
<h3>Impact du projet</h3>
<ul>
  <li>Accès à l'eau potable pour plus de 2 000 familles</li>
  <li>Construction et réhabilitation de points d'eau</li>
  <li>Sensibilisation à l'hygiène et aux bonnes pratiques sanitaires</li>
  <li>Renforcement des capacités des comités locaux de gestion de l'eau</li>
</ul>
<br>
<p><strong>Localisation :</strong> Douala, Cameroun – zones PK17 à PK32<br>
<strong>Partenaires :</strong> Associations locales camerounaises, collectivités territoriales</p>
<p>Pour soutenir ce projet, rendez-vous sur notre page <a href="soutenir.html" style="color:#FFC107;">Nous soutenir</a>.</p>
""",
        'other_actus': [
            ('routes-de-l-esclavage-a-nos-jours-juin-2025', "Des routes de l'esclavage à nos jours", '../assets/storage/actualites/June2025/routes_esclavage.png'),
            ('plantation-bananiers-piments-bihang-2026-2027', 'Plantation de bananiers plantains à Bihang', '../assets/storage/actualites/September2026/plantations_bananiers.png'),
            ('festival-arta-sacra', 'Festival ARTA SACRA', '../assets/storage/events/expositions/arta_sacra_2025/main.jpg'),
        ],
    },
    {
        'slug': 'plantation-bananiers-piments-bihang-2026-2027',
        'title': "Création d'une plantation de bananiers plantains et de piments à Bihang",
        'subtitle': 'Actualités · 2026 – 2027',
        'image': '../assets/storage/actualites/September2026/plantations_bananiers.png',
        'banner_bg': '../assets/storage/actualites/September2026/plantations_bananiers.png',
        'header_text': "Plantation de bananiers plantains et de piments à Bihang, Cameroun",
        'body': """
<p>Le FATE lance un projet agricole structurant au village de Bihang, au Cameroun : la création d'une plantation de bananiers plantains et de piments, destinée à soutenir le développement économique local et à renforcer la souveraineté alimentaire des communautés rurales.</p>
<p>Ce projet s'inscrit dans une démarche de développement durable et solidaire, en associant les habitants, les agriculteurs locaux et les partenaires institutionnels pour construire une filière agricole viable et rentable.</p>
<br>
<h3>Objectifs</h3>
<ul>
  <li>Création d'emplois locaux pérennes dans le secteur agricole</li>
  <li>Renforcement de la sécurité alimentaire de la communauté</li>
  <li>Formation des agriculteurs aux techniques modernes de culture</li>
  <li>Développement d'une filière de commercialisation locale et régionale</li>
</ul>
<br>
<h3>Calendrier</h3>
<p><strong>Début :</strong> Janvier 2026<br>
<strong>Fin prévue :</strong> Décembre 2027<br>
<strong>Localisation :</strong> Village de Bihang, Cameroun</p>
<p>Pour contribuer à ce projet ou en savoir plus, visitez notre page <a href="soutenir.html" style="color:#FFC107;">Nous soutenir</a>.</p>
""",
        'other_actus': [
            ('assainissement-d-eau-douala-septembre-2026', "Eau et assainissement PK17-PK32 Douala", '../assets/storage/actualites/September2022/assainissement_douala.png'),
            ('routes-de-l-esclavage-a-nos-jours-juin-2025', "Des routes de l'esclavage à nos jours", '../assets/storage/actualites/June2025/routes_esclavage.png'),
            ('can-juin-2025', 'En route pour la CAN 2025', '../assets/storage/actualites/June2025/CAN2025.png'),
        ],
    },
    {
        'slug': 'pied-des-tours-juin-2025',
        'title': "Culture aux pieds des tours et live d'été",
        'subtitle': 'Actualités · Juin – Août 2025',
        'image': '../assets/storage/actualites/June2025/pieds_des_tours.png',
        'banner_bg': '../assets/storage/actualites/June2025/pieds_des_tours.png',
        'header_text': "Culture aux pieds des tours — Live d'été 2025",
        'body': """
<p>Le FATE organise une nouvelle édition de son action phare « Culture aux pieds des tours », proposant tout l'été des activités gratuites et ouvertes à tous dans les quartiers prioritaires de Vaulx-en-Velin et agglomération lyonnaise.</p>
<p>Ateliers artistiques, spectacles vivants, animations sportives et musicales rythment cet été 2025 pour offrir aux habitants un accès à la culture directement dans leur quartier.</p>
<br>
<h3>Au programme</h3>
<ul>
  <li>Ateliers danse (bachata, salsa, capoeira, danses africaines)</li>
  <li>Concerts live et scènes ouvertes</li>
  <li>Ateliers graffiti et arts plastiques</li>
  <li>Activités sportives (basket, boxe, foot)</li>
  <li>Animations pour les enfants et les familles</li>
</ul>
<br>
<p><strong>Période :</strong> 27 juin – 14 août 2025<br>
<strong>Lieu :</strong> Vaulx-en-Velin et agglomération lyonnaise<br>
<strong>Accès :</strong> Gratuit et ouvert à tous</p>
""",
        'other_actus': [
            ('festival-arta-sacra', 'Festival ARTA SACRA', '../assets/storage/events/expositions/arta_sacra_2025/main.jpg'),
            ('can-juin-2025', 'En route pour la CAN 2025', '../assets/storage/actualites/June2025/CAN2025.png'),
            ('routes-de-l-esclavage-a-nos-jours-juin-2025', "Des routes de l'esclavage à nos jours", '../assets/storage/actualites/June2025/routes_esclavage.png'),
        ],
    },
    {
        'slug': 'fate-vingt-cinq-ans-2026',
        'title': 'Le FATE bientôt 25 ans',
        'subtitle': 'Actualités · 2001 - 2026',
        'image': '../assets/storage/background/img_actualites.jpg',
        'banner_bg': '../assets/storage/background/img_actualites.jpg',
        'header_text': 'Le FATE fêtera bientôt ses vingt cinq ans (2001 - 2026)',
        'body': """
<p>Fondé en avril 2001, le Forum Associatif Tous Ensemble (FATE) célébrera bientôt son 25ème anniversaire ! Un quart de siècle d'engagement, de solidarité et d'actions citoyennes sur le territoire français et à l'international.</p>
<p>Cet anniversaire sera l'occasion de revenir sur notre parcours, de célébrer nos réussites avec l'ensemble de nos partenaires et bénévoles, et de tracer de nouvelles perspectives pour les années à venir.</p>
<br>
<h3>Au programme des festivités (à venir)</h3>
<ul>
  <li>Gala d'anniversaire et soirée de rétrospective</li>
  <li>Exposition photo retracant 25 ans d'actions</li>
  <li>Conférences et tables rondes sur l'engagement associatif</li>
</ul>
<br>
<p>Restez connectés pour découvrir le programme détaillé de cet événement exceptionnel !</p>
""",
        'other_actus': [
            ('festival-arta-sacra', 'Festival ARTA SACRA', '../assets/storage/events/expositions/arta_sacra_2025/main.jpg'),
            ('can-juin-2025', 'En route pour la CAN 2025', '../assets/storage/actualites/June2025/CAN2025.png'),
            ('routes-de-l-esclavage-a-nos-jours-juin-2025', "Des routes de l'esclavage à nos jours", '../assets/storage/actualites/June2025/routes_esclavage.png'),
        ],
    }
]

PAGE_TEMPLATE = """
<section class="uni-banner opacityLow" style="background-image: url('{banner_bg}'); background-position: center; background-size: cover;">
    <div class="container">
        <div class="uni-banner-text-area">
            <h1>{title}</h1>
            <ul>
                <li><a href="../index.html">Accueil</a></li>
                <li><a href="actualites.html">Actualités</a></li>
                <li>{title}</li>
            </ul>
        </div>
    </div>
</section>

<section class="mainActualiteDetails d-flex justify-content-center align-items-center mt-3">
    <div class="actualiteDetails">

        <div class="actualiteContainer">
            <img class="actuImage" src="{image}" alt="{title}">
            <div class="actualitesInfo">
                <h2 class="actuTitre">{header_text}</h2>
                <div class="actuText">
{body}
                </div>
            </div>
        </div>

        <div class="horizontalLine m-3"></div>

        <span class="backgroundForm topRight"></span>
        <span class="backgroundForm bottomLeft"></span>

        <h1 class="titre fw-bold">Actualité</h1>
        <div class="autresActualitesContainer d-flex">
{other_cards}
        </div>
    </div>
</section>
"""

OTHER_CARD_TEMPLATE = """
            <a href="{slug}.html">
                <div class="actualite d-flex justify-content-center align-items-center flex-column">
                    <div class="imgContainer d-flex justify-content-center align-items-center">
                        <img class="actuImage" src="{img}" alt="{label}">
                    </div>
                    <div class="actuInfo d-flex flex-column justify-content-start align-items-start">
                        <h2 class="actuTitle">{label}</h2>
                        <p class="actuDesc"></p>
                    </div>
                </div>
            </a>
"""

for actu in ACTUALITES:
    other_cards = ""
    for slug, label, img in actu['other_actus']:
        other_cards += OTHER_CARD_TEMPLATE.format(slug=slug, label=label, img=img)

    content = PAGE_TEMPLATE.format(
        title=actu['title'],
        banner_bg=actu['banner_bg'],
        image=actu['image'],
        header_text=actu['header_text'],
        body=actu['body'],
        other_cards=other_cards
    )
    
    # Replace title in header
    page_header = header.replace("<title>Actualités | Forum Associatif Tous Assemble</title>", f"<title>{actu['title']} | Actualités | Forum Associatif Tous Ensemble</title>")
    
    full_html = page_header + content + footer
    
    out_path = os.path.join(PAGES_DIR, actu['slug'] + '.html')
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"Updated {out_path}")

print("All actualités pages regenerated with siteFATE architecture.")
