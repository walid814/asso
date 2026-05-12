document.addEventListener('DOMContentLoaded', function () {
    // 1. On cache l'élément Google hors de l'écran, PAS avec display:none
    const langHTML = `
    <div class="lang-floating-widget" translate="no">
        <button class="lang-floating-btn" id="langFloatingBtn" aria-label="Changer de langue">
            <span class="flag-icon" id="currentFlag">🇫🇷</span>
        </button>
        <div class="lang-floating-menu" id="langFloatingMenu">
            <a href="javascript:void(0);" class="lang-option" data-lang="fr"><span class="flag-icon">🇫🇷</span> Français</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="en"><span class="flag-icon">🇬🇧</span> English</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="es"><span class="flag-icon">🇪🇸</span> Español</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="pt"><span class="flag-icon">🇵🇹</span> Português</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="ar"><span class="flag-icon">🇸🇦</span> العربية</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="sw"><span class="flag-icon">🇰🇪</span> Swahili</a>
        </div>
    </div>
    <div id="google_translate_element" style="position: absolute; left: -9999px; top: -9999px; opacity: 0; pointer-events: none; z-index: -1;"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', langHTML);

    // Initialisation Google Translate
    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'fr',
            includedLanguages: 'en,es,pt,ar,sw', // Optimisation : on limite aux langues dont on a besoin
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    const langBtn = document.getElementById('langFloatingBtn');
    const langMenu = document.getElementById('langFloatingMenu');
    const currentFlag = document.getElementById('currentFlag');

    if (langBtn && langMenu) {
        langBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            langMenu.classList.toggle('show');
        });

        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function (e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                const flag = this.querySelector('.flag-icon').textContent;

                // Sauvegarder la langue
                localStorage.setItem('selectedLang', lang);
                localStorage.setItem('selectedFlag', flag);

                currentFlag.textContent = flag;
                langMenu.classList.remove('show');

                translatePage(lang);
            });
        });

        document.addEventListener('click', function (e) {
            if (!langMenu.contains(e.target)) {
                langMenu.classList.remove('show');
            }
        });
    }

    function translatePage(langCode) {
        // Retour au français (langue d'origine)
        if (langCode === 'fr') {
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname};`;
            window.location.reload();
            return;
        }

        const select = document.querySelector('.goog-te-combo');

        if (select) {
            // Plan A : Le menu déroulant de Google est trouvé
            select.value = langCode;
            select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
        } else {
            // Plan B (Sécurité) : On force le cookie de Google et on recharge la page
            console.warn("Sélecteur Google non trouvé, utilisation de la méthode Cookie.");
            document.cookie = `googtrans=/fr/${langCode}; path=/;`;
            document.cookie = `googtrans=/fr/${langCode}; path=/; domain=${location.hostname};`;
            window.location.reload();
        }
    }

    // Restaurer l'affichage au chargement
    const savedLang = localStorage.getItem('selectedLang');
    const savedFlag = localStorage.getItem('selectedFlag');

    if (savedFlag && currentFlag) {
        currentFlag.textContent = savedFlag;
    }

    // Appliquer la traduction si une langue différente du français est sauvegardée
    setTimeout(() => {
        if (savedLang && savedLang !== 'fr') {
            const select = document.querySelector('.goog-te-combo');
            if (select && select.value !== savedLang) {
                select.value = savedLang;
                select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            }
        }
    }, 1500); // Délai pour laisser le temps au script de Google de charger
});