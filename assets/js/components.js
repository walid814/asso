/* ============================================================
   COMPONENTS.JS — Nav et footer communs à toutes les pages
   Injection synchrone : ce script doit être chargé directement
   après <div id="site-nav"> dans le <body>.
   ============================================================ */

(function () {
    /* --- Résolution des chemins selon la profondeur --- */
    const isPages = /\/pages\//.test(window.location.pathname);
    const b  = isPages ? '../' : '';          /* base assets  */
    const p  = isPages ? '' : 'pages/';       /* préfixe pages */
    const h  = isPages ? '../index.html' : 'index.html'; /* home */

    /* --- Injection CSS partagé (footer + composants) --- */
    if (!document.querySelector('link[data-fate-components]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = b + 'assets/css/components.css';
        cssLink.setAttribute('data-fate-components', '');
        document.head.appendChild(cssLink);
    }

    /* --- Page courante pour l'état actif --- */
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    /* Map fichier → identifiant de section nav */
    const PAGE_NAV = {
        'fate.html':                                          'fate',
        'actualites.html':                                    'actualites',
        'festival-arta-sacra.html':                           'actualites',
        'can-juin-2025.html':                                 'actualites',
        'fate-vingt-cinq-ans-2026.html':                      'actualites',
        'routes-de-l-esclavage-a-nos-jours-juin-2025.html':   'actualites',
        'assainissement-d-eau-douala-septembre-2026.html':     'actualites',
        'plantation-bananiers-piments-bihang-2026-2027.html':  'actualites',
        'pied-des-tours-juin-2025.html':                      'actualites',
        'actions.html':                                       'actions',
        'collaborations.html':                                'actions',
        'archives.html':                                      'archives',
        'partenaires.html':                                   'partenaires',
        'contact.html':                                       'contact',
        'soutenir.html':                                      'soutenir',
        'adherer.html':                                       'adherer',
    };
    const activeSection = PAGE_NAV[currentFile] || null;

    /* --- Helpers pour les classes actives --- */
    function liClass(section) {
        return activeSection === section ? 'navItem selectedTab' : 'navItem';
    }
    function liClassSub(section) {
        return activeSection === section ? 'navItem hasSubmenu selectedTab' : 'navItem hasSubmenu';
    }
    function aClass(base, section) {
        return activeSection === section ? base + ' activeNav' : base;
    }

    /* ============================================================
       NAV HTML
       ============================================================ */
    const navHTML = `
<header class="headerWrapper">
    <div class="mobileNav paddingX">
        <a href="${h}" class="logoLink">
            <img src="${b}assets/images/logo.png" alt="logo fate" class="logoImage" />
        </a>
    </div>
    <div class="mobileNavToggle" id="mobileToggle">&#9776;</div>

    <nav class="mainNav" id="mainNav">
        <a href="${h}" class="logoLink desktopOnly">
            <img src="${b}assets/images/logo.png" alt="logo fate" class="logoImage" />
        </a>
        <ul class="navList">

            <li class="${liClass('fate')}">
                <a href="${b}pages/fate.html" class="${aClass('navLinkStrong strongerNav navLink', 'fate')}">FATE</a>
            </li>

            <li class="${liClassSub('actualites')}">
                <div class="navLinkWrapper">
                    <a href="${b}pages/actualites.html" class="${aClass('navLink navLinkStrong navToggleLink', 'actualites')}">
                        ACTUALITÉS <span class="dropdownIcon">+</span>
                    </a>
                </div>
                <ul class="submenuList">
                    <li class="submenuItem"><a href="${b}pages/festival-arta-sacra.html" class="submenuLink">Festival ARTA SACRA</a></li>
                    <div class="horizontalLine"></div>
                    <li class="submenuItem"><a href="${b}pages/can-juin-2025.html" class="submenuLink">En route pour la CAN 2025</a></li>
                    <div class="horizontalLine"></div>
                    <li class="submenuItem"><a href="${b}pages/fate-vingt-cinq-ans-2026.html" class="submenuLink">Le FATE bientôt vingt cinq ans 2001&nbsp;-&nbsp;2026</a></li>
                    <div class="horizontalLine"></div>
                    <li class="submenuItem"><a href="${b}pages/routes-de-l-esclavage-a-nos-jours-juin-2025.html" class="submenuLink">Des routes de l'esclavage à nos jours</a></li>
                    <div class="horizontalLine"></div>
                    <li class="submenuItem"><a href="${b}pages/assainissement-d-eau-douala-septembre-2026.html" class="submenuLink">Eau et assainissement PK17-PK32 Douala</a></li>
                    <div class="horizontalLine"></div>
                    <li class="submenuItem"><a href="${b}pages/plantation-bananiers-piments-bihang-2026-2027.html" class="submenuLink">Création d'une plantation de bananiers plantains et de piments à Bihiang-Cameroun</a></li>
                </ul>
            </li>

            <li class="${liClassSub('actions')}">
                <div class="navLinkWrapper">
                    <a href="${b}pages/actions.html" class="${aClass('navLink navLinkStrong navToggleLink', 'actions')}">
                        ACTIONS <span class="dropdownIcon">+</span>
                    </a>
                </div>
                <ul class="submenuList">
                    <li class="submenuItem"><a href="${b}pages/actions.html" class="submenuLink">Nos actions</a></li>
                    <div class="horizontalLine"></div>
                    <li class="submenuItem"><a href="${b}pages/collaborations.html" class="submenuLink">Nos collaborations</a></li>
                </ul>
            </li>

            <li class="${liClass('archives')}">
                <a href="${b}pages/archives.html" class="${aClass('navLinkStrong navLink', 'archives')}">ARCHIVES</a>
            </li>

            <li class="${liClassSub('partenaires')}">
                <div class="navLinkWrapper">
                    <a href="${b}pages/partenaires.html" class="${aClass('navLink navLinkStrong navToggleLink', 'partenaires')}">
                        PARTENAIRES <span class="dropdownIcon">+</span>
                    </a>
                </div>
                <ul class="submenuList partenairesSubmenuPush">
                    <li class="submenuItem"><a href="${b}pages/partenaires.html#sectionInstitutionnels" class="submenuLink">Institutionnels</a></li>
                    <div class="horizontalLine"></div>
                    <li class="submenuItem"><a href="${b}pages/partenaires.html#sectionPrives" class="submenuLink">Privés</a></li>
                    <div class="horizontalLine"></div>
                    <li class="submenuItem"><a href="${b}pages/partenaires.html#sectionAssociatif" class="submenuLink">Associatifs</a></li>
                </ul>
            </li>

            <li class="${liClass('contact')}">
                <a href="${b}pages/contact.html" class="${aClass('navLinkStrong navLink', 'contact')}">CONTACTS</a>
            </li>

            <li class="navItem">
                <a href="${b}pages/soutenir.html" class="${aClass('buttonNav', 'soutenir')}">Soutenir</a>
            </li>

            <li class="navItem">
                <a href="${b}pages/adherer.html" class="${aClass('btn-adherer-noir buttonNav', 'adherer')}">Adhérer</a>
            </li>

        </ul>
    </nav>
</header>`;

    /* ============================================================
       FOOTER HTML
       ============================================================ */
    const footerHTML = `
<footer class="ft-root">

    <div class="ft-inner">

        <!-- Colonne 1 : marque -->
        <div class="ft-col ft-col--brand">
            <a href="${h}" class="ft-logo-link">
                <img src="${b}assets/storage/logos/April2024/AeHqcm2UtTRBFx8a5Zws.png" alt="Logo FATE" class="ft-logo">
            </a>
            <p class="ft-about"><strong style="color:rgba(255,255,255,.75)">Forum Associatif Tous Ensemble</strong> est une structure engagée pour le vivre-ensemble, la solidarité locale et le développement d'initiatives citoyennes.</p>
            <span class="ft-social-label">Nous suivre</span>
            <div class="ft-social-icons">
                <a href="https://www.facebook.com/profile.php?id=61558231605226" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/company/forum-associatif-tous-ensemble/about/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://x.com/FATEnsemble" target="_blank" rel="noopener" aria-label="Twitter / X"><i class="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/forumassociatif_tousensemble?igsh=czgwZW1oc3FrcG1h" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://www.tiktok.com/@fatensemble" target="_blank" rel="noopener" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
            </div>
        </div>

        <!-- Colonne 2 : liens rapides -->
        <div class="ft-col ft-col--links">
            <p class="ft-heading">Accès rapides</p>
            <ul class="ft-links">
                <li><a href="${b}pages/fate.html"><i class="fas fa-angle-right"></i>La structure</a></li>
                <li><a href="${b}pages/soutenir.html"><i class="fas fa-angle-right"></i>Nous soutenir</a></li>
                <li><a href="${b}pages/adherer.html"><i class="fas fa-angle-right"></i>Adhérer</a></li>
                <li><a href="${b}pages/actions.html"><i class="fas fa-angle-right"></i>Nos actions</a></li>
                <li><a href="${b}pages/partenaires.html"><i class="fas fa-angle-right"></i>Partenaires</a></li>
                <li><a href="${b}pages/archives.html"><i class="fas fa-angle-right"></i>Archives</a></li>
                <li><a href="${b}pages/contact.html"><i class="fas fa-angle-right"></i>Contact</a></li>
            </ul>
        </div>

        <!-- Colonne 3 : contact -->
        <div class="ft-col ft-col--contact">
            <p class="ft-heading">Nous contacter</p>
            <div class="ft-contact-items">
                <div class="ft-contact-item">
                    <div class="ft-contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                    <div class="ft-contact-text">
                        <p>20 Rue Robert Desnos, 69120 Vaulx-En-Velin</p>
                        <p>14 avenue Berthelot, 69007 Lyon</p>
                    </div>
                </div>
                <div class="ft-contact-item">
                    <div class="ft-contact-icon"><i class="fas fa-envelope"></i></div>
                    <div class="ft-contact-text">
                        <a href="mailto:infosfatetousensemble@gmail.com">infosfatetousensemble@gmail.com</a>
                        <a href="mailto:art.afrovibes@gmail.com">art.afrovibes@gmail.com</a>
                    </div>
                </div>
                <div class="ft-contact-item">
                    <div class="ft-contact-icon"><i class="fas fa-phone-alt"></i></div>
                    <div class="ft-contact-text">
                        <a href="tel:+33783671126">+ 33 7 83 67 11 26</a>
                        <a href="tel:+33951183496">+ 33 9 51 18 34 96</a>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Barre de copyright -->
    <div class="ft-bottom-bar">
        <p class="ft-copy">
            <strong>Forum Associatif Tous Ensemble</strong> &copy; 2023&nbsp;-&nbsp;2026. Tous droits réservés par l'équipe FATE.
            <button class="ft-info-btn" title="Site conçu par Hervé Anselme Yeffe, Faïk Jebari, Basile Assiga Ateba et Irfat Fejzullahu" aria-label="Crédits du site">
                <i class="fas fa-info-circle"></i>
            </button>
        </p>
    </div>

</footer>

<div class="popup">
    <div class="popup-content">
        <button class="close-btn" id="popup-close"><i class="fas fa-times"></i></button>
        <form>
            <div class="input-group search-box">
                <input type="text" class="form-control" placeholder="Rechercher">
                <button class="btn" type="submit"><i class="fas fa-search"></i></button>
            </div>
        </form>
    </div>
</div>

<div class="go-top"><i class="fas fa-chevron-up"></i></div>`;

    /* ============================================================
       INJECTION
       ============================================================ */
    const navEl = document.getElementById('site-nav');
    if (navEl) navEl.outerHTML = navHTML;

    /* Footer is below this script in the DOM — defer until parsed */
    document.addEventListener('DOMContentLoaded', function () {
        const footerEl = document.getElementById('site-footer');
        if (footerEl) footerEl.outerHTML = footerHTML;
    });

})();
