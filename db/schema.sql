-- Table principale des événements / actualités / projets / collaborations
CREATE TABLE IF NOT EXISTS event (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    slug           TEXT    NOT NULL UNIQUE,            -- nom du fichier HTML généré (ex: festival-arta-sacra)
    category       TEXT    NOT NULL,                   -- identifiant interne: actualite | action | collaboration | archive | projet
    category_label TEXT    NOT NULL,                   -- libellé affiché: Actualités | Actions | Collaborations | Archives | Projets
    category_url   TEXT    NOT NULL,                   -- lien vers la page liste (ex: actualites.html)
    page_title     TEXT    NOT NULL,                   -- titre dans l'onglet et la bannière
    item_title     TEXT    NOT NULL,                   -- titre h2 dans le corps de l'article
    subtitle       TEXT,                               -- ex: "Actualités · Juin 2025" (optionnel)
    banner_image   TEXT    NOT NULL,                   -- image de fond de la bannière (chemin depuis pages/)
    main_image     TEXT    NOT NULL,                   -- image principale de l'article (chemin depuis pages/)
    content        TEXT    NOT NULL,                   -- corps HTML de la page
    published      INTEGER NOT NULL DEFAULT 1,         -- 1 = publié, 0 = brouillon
    created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);
