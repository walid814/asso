/* ============================================================
   MAIN.JS — Scripts communs à toutes les pages du site FATE
   ============================================================ */

/* ---------- 1. Navigation mobile + sous-menus ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    // Voile semi-transparent inséré une seule fois — ferme le drawer au clic
    // et permet de garder le contenu visible derrière (effet panneau latéral).
    let backdrop = null;
    if (mainNav) {
        backdrop = document.createElement('div');
        backdrop.className = 'navBackdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);
    }

    function closeDrawer() {
        if (mainNav) mainNav.classList.remove('navOpen');
        body.classList.remove('noScroll');
        if (backdrop) backdrop.classList.remove('open');
        document.querySelectorAll('.hasSubmenu.submenuOpen').forEach(li => {
            li.classList.remove('submenuOpen');
        });
    }

    function openDrawer() {
        if (mainNav) mainNav.classList.add('navOpen');
        body.classList.add('noScroll');
        if (backdrop) backdrop.classList.add('open');
    }

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', () => {
            if (mainNav.classList.contains('navOpen')) closeDrawer();
            else openDrawer();
        });
    }

    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Échap ferme le drawer aussi
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('navOpen')) {
            closeDrawer();
        }
    });

    // Fermer le drawer quand on passe en desktop (au resize). Sans ça,
    // ouvrir le drawer en mobile puis agrandir la fenêtre laisse le body
    // locké en noScroll et `.navOpen` posé alors qu'on est repassé en mode
    // nav desktop, ce qui empêche tout scroll vertical de la page.
    const NAV_DESKTOP_BREAKPOINT = 1100;
    let resizeRaf = null;
    window.addEventListener('resize', () => {
        if (resizeRaf) return;
        resizeRaf = requestAnimationFrame(() => {
            resizeRaf = null;
            if (window.innerWidth > NAV_DESKTOP_BREAKPOINT) {
                closeDrawer();
            }
        });
    });

    document.querySelectorAll('.navLink, .navLinkStrong').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!e.target.closest('.navToggleLink')) {
                closeDrawer();
            }
        });
    });

    document.querySelectorAll('.navToggleLink').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth < 992) {
                e.preventDefault();
                const parentLi = toggle.closest('.hasSubmenu');
                if (parentLi) parentLi.classList.toggle('submenuOpen');
            }
        });
    });
});

/* ---------- 2. Tooltips Bootstrap ---------- */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof bootstrap === 'undefined' || !bootstrap.Tooltip) return;
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
});

/* ---------- 3. Bulle "Suggestion" — visible au-delà de 50% de scroll ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const suggestionLink = document.getElementById('suggestionLink');
    if (!suggestionLink) return;

    function checkScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = scrollPosition / documentHeight;
        if (scrollPercent >= 0.5) {
            suggestionLink.style.opacity = '1';
            suggestionLink.style.visibility = 'visible';
        } else {
            suggestionLink.style.opacity = '0';
            suggestionLink.style.visibility = 'hidden';
        }
    }

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
});

/* ---------- 4. Classe "loaded" sur <body> au window.load ---------- */
if (typeof jQuery !== 'undefined') {
    jQuery(window).on('load', function () {
        jQuery('body').addClass('loaded');
    });
} else {
    window.addEventListener('load', () => document.body.classList.add('loaded'));
}
