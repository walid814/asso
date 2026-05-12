#!/usr/bin/env python3
"""Crée la base SQLite et insère les événements existants du site FATE."""

import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH  = os.path.join(BASE_DIR, 'db', 'events.db')
SQL_PATH = os.path.join(BASE_DIR, 'db', 'schema.sql')

conn = sqlite3.connect(DB_PATH)

with open(SQL_PATH, encoding='utf-8') as f:
    conn.executescript(f.read())

EVENTS = [
    {
        'slug':          'festival-arta-sacra',
        'category':      'actualite',
        'category_label':'Actualités',
        'category_url':  'actualites.html',
        'page_title':    'Festival ARTA SACRA',
        'item_title':    'Festival ARTA SACRA 2025',
        'subtitle':      'Actualités · Août 2025',
        'banner_image':  '../assets/storage/events/expositions/arta_sacra_2025/main.jpg',
        'main_image':    '../assets/storage/events/expositions/arta_sacra_2025/main.jpg',
        'content': """
<p>Le Festival ARTA SACRA est un événement culturel annuel qui célèbre les arts sacrés, les
traditions et la spiritualité à travers des expositions, des performances et des ateliers
participatifs.</p>
<p>Organisé en partenariat avec le Forum Associatif Tous Ensemble (FATE), cet événement
réunit artistes, artisans et communautés autour d'un dialogue interculturel riche et ouvert
à tous.</p>
<h3>Programme</h3>
<ul>
  <li>Expositions d'arts sacrés africains et de la diaspora</li>
  <li>Concerts et performances live</li>
  <li>Ateliers pour enfants et adultes</li>
  <li>Conférences et tables rondes</li>
</ul>
<p><strong>Date :</strong> 11 août 2025<br>
<strong>Lieu :</strong> Lyon, France</p>
""",
    },
    {
        'slug':          'can-juin-2025',
        'category':      'actualite',
        'category_label':'Actualités',
        'category_url':  'actualites.html',
        'page_title':    "En route pour la Coupe d'Afrique des Nations (CAN) 2025 !",
        'item_title':    "En route pour la CAN 2025 !",
        'subtitle':      'Actualités · Juin 2025',
        'banner_image':  '../assets/storage/actualites/June2025/CAN2025.png',
        'main_image':    '../assets/storage/actualites/June2025/CAN2025.png',
        'content': """
<p>Le Forum Associatif Tous Ensemble (FATE) se mobilise pour accompagner et soutenir les
supporters et passionnés de football africain à l'occasion de la Coupe d'Afrique des Nations
2025.</p>
<p>Cet événement sportif majeur rassemble les nations africaines autour du football et constitue
une occasion unique de célébrer la fraternité, la culture et l'unité africaine.</p>
<h3>Nos actions autour de la CAN 2025</h3>
<ul>
  <li>Organisation de soirées de visionnage collectives</li>
  <li>Animations culturelles et sportives</li>
  <li>Sensibilisation à la culture des pays participants</li>
  <li>Activités pour les jeunes autour du football et des valeurs sportives</li>
</ul>
<p><strong>Période :</strong> 1er juin – 1er novembre 2025<br>
<strong>Lieu :</strong> Lyon et agglomération</p>
""",
    },
    {
        'slug':          'routes-de-l-esclavage-a-nos-jours-juin-2025',
        'category':      'actualite',
        'category_label':'Actualités',
        'category_url':  'actualites.html',
        'page_title':    "Des routes de l'esclavage à nos jours",
        'item_title':    "Des routes de l'esclavage à nos jours",
        'subtitle':      'Actualités · Mai 2025',
        'banner_image':  '../assets/storage/actualites/June2025/routes_esclavage.png',
        'main_image':    '../assets/storage/actualites/June2025/routes_esclavage.png',
        'content': """
<p>Ce projet ambitieux, porté par le FATE de 2024 à 2026, vise à mobiliser les habitants et
les acteurs éducatifs autour de la mémoire de l'esclavage et de ses héritages contemporains.</p>
<p>À travers des outils pédagogiques innovants, des expositions itinérantes et des rencontres
participatives, ce projet invite chacun à explorer l'impact économique, scientifique, culturel
et sportif de la traite négrière sur nos sociétés actuelles.</p>
<h3>Objectifs du projet</h3>
<ul>
  <li>Sensibiliser les jeunes générations à l'histoire de l'esclavage</li>
  <li>Proposer des outils pédagogiques adaptés aux établissements scolaires</li>
  <li>Favoriser le dialogue interculturel et la réconciliation mémorielle</li>
  <li>Valoriser les contributions africaines et afro-descendantes à la civilisation mondiale</li>
</ul>
<h3>Calendrier</h3>
<p>Le projet se déroule de <strong>janvier 2025 à janvier 2029</strong> dans divers lieux en
France et à l'international.</p>
<p><strong>Contact :</strong> Pour plus d'informations, contactez-nous via notre page
<a href="contact.html" style="color:#FFC107;">Contact</a>.</p>
""",
    },
    {
        'slug':          'assainissement-d-eau-douala-septembre-2026',
        'category':      'actualite',
        'category_label':'Actualités',
        'category_url':  'actualites.html',
        'page_title':    "Projet d'eau et d'assainissement PK17-PK32 Douala",
        'item_title':    "Eau et assainissement PK17-PK32 Douala",
        'subtitle':      'Actualités · Septembre 2022',
        'banner_image':  '../assets/storage/actualites/September2022/assainissement_douala.png',
        'main_image':    '../assets/storage/actualites/September2022/assainissement_douala.png',
        'content': """
<p>Le FATE soutient activement l'accès à l'eau potable et à l'assainissement dans les quartiers
défavorisés de Douala, au Cameroun, notamment dans les zones PK17 à PK32.</p>
<p>En partenariat avec des associations locales, le FATE finance et accompagne la réalisation
de puits, de bornes-fontaines et de latrines collectives.</p>
<h3>Impact du projet</h3>
<ul>
  <li>Accès à l'eau potable pour plus de 2 000 familles</li>
  <li>Construction et réhabilitation de points d'eau</li>
  <li>Sensibilisation à l'hygiène et aux bonnes pratiques sanitaires</li>
  <li>Renforcement des capacités des comités locaux de gestion de l'eau</li>
</ul>
<p><strong>Localisation :</strong> Douala, Cameroun – zones PK17 à PK32<br>
<strong>Partenaires :</strong> Associations locales camerounaises, collectivités territoriales</p>
<p>Pour soutenir ce projet : <a href="soutenir.html" style="color:#FFC107;">Nous soutenir</a>.</p>
""",
    },
    {
        'slug':          'plantation-bananiers-piments-bihang-2026-2027',
        'category':      'actualite',
        'category_label':'Actualités',
        'category_url':  'actualites.html',
        'page_title':    "Création d'une plantation de bananiers plantains et de piments à Bihang",
        'item_title':    "Plantation de bananiers plantains et de piments à Bihang, Cameroun",
        'subtitle':      'Actualités · 2026 – 2027',
        'banner_image':  '../assets/storage/actualites/September2026/plantations_bananiers.png',
        'main_image':    '../assets/storage/actualites/September2026/plantations_bananiers.png',
        'content': """
<p>Le FATE lance un projet agricole structurant au village de Bihang, au Cameroun : la création
d'une plantation de bananiers plantains et de piments, destinée à soutenir le développement
économique local et à renforcer la souveraineté alimentaire des communautés rurales.</p>
<p>Ce projet s'inscrit dans une démarche de développement durable et solidaire, en associant
les habitants, les agriculteurs locaux et les partenaires institutionnels.</p>
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
<strong>Localisation :</strong> Village de Bihang, Cameroun</p>
<p>Pour contribuer : <a href="soutenir.html" style="color:#FFC107;">Nous soutenir</a>.</p>
""",
    },
    {
        'slug':          'pied-des-tours-juin-2025',
        'category':      'action',
        'category_label':'Actions',
        'category_url':  'actions.html',
        'page_title':    "Culture aux pieds des tours et live d'été",
        'item_title':    "Culture aux pieds des tours — Live d'été 2025",
        'subtitle':      'Actions · Juin – Août 2025',
        'banner_image':  '../assets/storage/actualites/June2025/pieds_des_tours.png',
        'main_image':    '../assets/storage/actualites/June2025/pieds_des_tours.png',
        'content': """
<p>Le FATE organise une nouvelle édition de son action phare « Culture aux pieds des tours »,
proposant tout l'été des activités gratuites et ouvertes à tous dans les quartiers prioritaires
de Vaulx-en-Velin et agglomération lyonnaise.</p>
<p>Ateliers artistiques, spectacles vivants, animations sportives et musicales rythment cet été
2025 pour offrir aux habitants un accès à la culture directement dans leur quartier.</p>
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
<strong>Accès :</strong> Gratuit et ouvert à tous</p>
""",
    },
    {
        'slug':          'fate-vingt-cinq-ans-2026',
        'category':      'actualite',
        'category_label':'Actualités',
        'category_url':  'actualites.html',
        'page_title':    'Le FATE bientôt 25 ans (2001 – 2026)',
        'item_title':    'Le FATE fêtera bientôt ses vingt cinq ans (2001 - 2026)',
        'subtitle':      'Actualités · 2026',
        'banner_image':  '../assets/images/placeholders/banner-25ans.svg',
        'main_image':    '../assets/images/placeholders/banner-25ans.svg',
        'content': """
<p>Fondé en avril 2001, le Forum Associatif Tous Ensemble (FATE) célébrera bientôt son 25ème
anniversaire ! Un quart de siècle d'engagement, de solidarité et d'actions citoyennes sur le
territoire français et à l'international.</p>
<p>Cet anniversaire sera l'occasion de revenir sur notre parcours, de célébrer nos réussites
avec l'ensemble de nos partenaires et bénévoles, et de tracer de nouvelles perspectives pour
les années à venir.</p>
<h3>Au programme des festivités (à venir)</h3>
<ul>
  <li>Gala d'anniversaire et soirée de rétrospective</li>
  <li>Exposition photo retraçant 25 ans d'actions</li>
  <li>Conférences et tables rondes sur l'engagement associatif</li>
</ul>
<p>Restez connectés pour découvrir le programme détaillé de cet événement exceptionnel !</p>
""",
    },
]

INSERT = '''
INSERT OR IGNORE INTO event
    (slug, category, category_label, category_url, page_title, item_title,
     subtitle, banner_image, main_image, content, published)
VALUES
    (:slug, :category, :category_label, :category_url, :page_title, :item_title,
     :subtitle, :banner_image, :main_image, :content, 1)
'''

for ev in EVENTS:
    conn.execute(INSERT, ev)

conn.commit()
conn.close()

print(f"Base créée : {DB_PATH}")
print(f"{len(EVENTS)} événements insérés.")
