$path = 'c:\Users\etulyon1\Downloads\asso\index.html'
$content = [IO.File]::ReadAllText($path)

# 1. Supprimer les icones reseaux sociaux du hero slider
$socialsPattern = '(?s)\s*<!-- R.seaux sociaux.*?</div>\s*'
$content = [regex]::Replace($content, '(?s)    <!-- R.seaux sociaux -->\s*<div class="fate-hero-socials">.*?</div>', '')

# 2. Supprimer l'ancien bloc de style de redesign si jamais il reste
# 3. Ajouter le nouveau mega-style du branding dans le head
$brandingStyle = @'
    <!-- === BRANDING KIT FATE - DARK PREMIUM HEADER === -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <style>
    /* ======= RESET & BASE ======= */
    body { font-family: 'Open Sans', sans-serif; }
    h1,h2,h3,h4,h5,h6 { font-family: 'Montserrat', sans-serif; }

    /* ======= TOPBAR MASQUEE ======= */
    .topbarSection { display: none !important; }

    /* ======= HEADER DARK SOLIDE ======= */
    .headerWrapper {
        position: fixed !important;
        top: 0; left: 0; width: 100%;
        background: #111827 !important;
        z-index: 9999 !important;
        box-shadow: 0 2px 20px rgba(0,0,0,0.4) !important;
        border-bottom: none !important;
        padding: 0 !important;
        min-height: 68px;
        display: flex;
        align-items: center;
    }

    /* Logo - filtre blanc pour s'adapter au fond sombre */
    .headerWrapper .logoImage {
        filter: brightness(0) invert(1) !important;
        height: 44px !important;
        width: auto !important;
        object-fit: contain;
        transition: opacity 0.2s;
    }
    .headerWrapper .logoImage:hover { opacity: 0.85; }

    /* Masquer les flags de langue dans le header (trop chargé) */
    #languageContainer { display: none !important; }

    /* Nav links blancs */
    .headerWrapper .navLinkStrong,
    .headerWrapper .navLink,
    .mainNav .navLinkStrong {
        color: #fff !important;
        font-family: 'Montserrat', sans-serif !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: color 0.25s !important;
    }
    .headerWrapper .navLinkStrong:hover,
    .headerWrapper .navLink:hover,
    .mainNav .navLinkStrong:hover {
        color: #EAB308 !important;
    }

    /* Dropdown menu dark */
    .submenuList {
        background: #1a2234 !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 8px !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
        padding: 8px 0 !important;
    }
    .submenuLink {
        color: rgba(255,255,255,0.85) !important;
        font-size: 13px !important;
        padding: 10px 20px !important;
        transition: background 0.2s, color 0.2s !important;
    }
    .submenuLink:hover {
        background: rgba(234,179,8,0.15) !important;
        color: #EAB308 !important;
    }
    .horizontalLine {
        background: rgba(255,255,255,0.08) !important;
        height: 1px !important;
        margin: 0 !important;
    }
    .dropdownIcon { color: #EAB308 !important; }

    /* ======= BOUTONS HEADER ======= */
    /* Adhérer - contour blanc */
    a[href*="adherer"].buttonNav,
    .navLinkStrong.buttonNav[href*="adherer"] {
        border: 2px solid rgba(255,255,255,0.6) !important;
        border-radius: 50px !important;
        padding: 8px 22px !important;
        color: #fff !important;
        font-weight: 700 !important;
        margin-left: 8px;
        background: transparent !important;
        transition: all 0.3s !important;
    }
    a[href*="adherer"].buttonNav:hover {
        background: rgba(255,255,255,0.15) !important;
        border-color: #fff !important;
    }

    /* Soutenir - fond jaune */
    a[href*="soutenir"].buttonNav,
    .navLinkStrong.buttonNav[href*="soutenir"] {
        background: #EAB308 !important;
        border-radius: 50px !important;
        padding: 8px 22px !important;
        color: #111827 !important;
        font-weight: 800 !important;
        margin-left: 6px;
        border: 2px solid #EAB308 !important;
        box-shadow: 0 4px 14px rgba(234,179,8,0.4) !important;
        transition: all 0.3s !important;
    }
    a[href*="soutenir"].buttonNav:hover {
        background: #FBBF24 !important;
        border-color: #FBBF24 !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 20px rgba(234,179,8,0.5) !important;
    }

    /* Mobile toggle blanc */
    .mobileNavToggle {
        color: #fff !important;
        font-size: 26px !important;
    }

    /* ======= COMPENSATION HEADER FIXE ======= */
    .conteneur-banniere { padding-top: 0 !important; }
    .fate-hero { margin-top: 0; }

    /* ======= COULEURS BRANDING SUR LE HERO ======= */
    .fate-hero-overtitle { color: #EAB308 !important; }
    .fate-hero-dot.active { background: #EAB308 !important; border-color: #EAB308 !important; }
    .fate-hero-btn-primary { background: #EAB308 !important; color: #111827 !important; }
    .fate-hero-btn-primary:hover { background: #FBBF24 !important; }
    .fate-hero-arrow:hover { color: #EAB308 !important; }

    /* ======= SECTION TAG BRANDING ======= */
    .section-tag { color: #EAB308 !important; }
    .fate-about-text .section-tag { color: #EAB308 !important; }

    /* ======= TITRES DE SECTIONS ======= */
    .actu-strip-title h3::after { background: #EAB308 !important; }
    .actu-card-date { color: #EAB308 !important; }
    .actu-card-btn { background: #EAB308 !important; color: #111827 !important; }

    /* ======= BOUTON READ-MORE GLOBAL ======= */
    .read-more-btn {
        background: #111827 !important;
        color: #EAB308 !important;
        border-radius: 50px !important;
        padding: 10px 28px !important;
        font-weight: 700 !important;
        font-family: 'Montserrat', sans-serif !important;
        transition: all 0.3s !important;
    }
    .read-more-btn:hover {
        background: #EAB308 !important;
        color: #111827 !important;
    }

    /* ======= MOBILE NAV ======= */
    .mainNav.navOpen {
        background: #111827 !important;
    }
    @media (max-width: 991px) {
        .mainNav {
            background: #111827 !important;
        }
        .headerWrapper { min-height: 60px; }
    }
    </style>
'@

$content = $content -replace '</head>', "$brandingStyle`r`n</head>"

[IO.File]::WriteAllText($path, $content)
Write-Host "Done! Header redesigned with dark branding style."
