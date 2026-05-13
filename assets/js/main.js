/* ============================================================
   MAIN.JS — Scripts communs à toutes les pages du site FATE
   ============================================================ */

/* ---------- 1. Navigation mobile + sous-menus ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', () => {
            mainNav.classList.toggle('navOpen');
            body.classList.toggle('noScroll');
        });
    }

    document.querySelectorAll('.navLink, .navLinkStrong').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!e.target.closest('.navToggleLink')) {
                if (mainNav) mainNav.classList.remove('navOpen');
                body.classList.remove('noScroll');
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
