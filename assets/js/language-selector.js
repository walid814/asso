document.addEventListener('DOMContentLoaded', function () {
    // 1. On cache l'élément Google hors de l'écran
    const langHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css" />
    
    <div class="lang-floating-widget" translate="no">
        <button class="lang-floating-btn" id="langFloatingBtn" aria-label="Changer de langue">
            <span class="flag-icon-display" id="currentFlag"><span class="fi fi-fr"></span></span>
        </button>
        <div class="lang-floating-menu" id="langFloatingMenu">
            <a href="javascript:void(0);" class="lang-option" data-lang="fr"><span class="fi fi-fr"></span> Français</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="en"><span class="fi fi-gb"></span> English</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="es"><span class="fi fi-es"></span> Español</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="pt"><span class="fi fi-pt"></span> Português</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="ar"><span class="fi fi-sa"></span> العربية</a>
            <a href="javascript:void(0);" class="lang-option" data-lang="sw"><span class="fi fi-ke"></span> Swahili</a>
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
            includedLanguages: 'en,es,pt,ar,sw',
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

                // On récupère le HTML du drapeau (le <span class="fi fi-..."></span>)
                const flagHTML = this.querySelector('.fi').outerHTML;

                // Sauvegarder la langue et le drapeau
                localStorage.setItem('selectedLang', lang);
                localStorage.setItem('selectedFlagHTML', flagHTML);

                // Mettre à jour le bouton
                currentFlag.innerHTML = flagHTML;
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
        if (langCode === 'fr') {
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname};`;
            window.location.reload();
            return;
        }

        const select = document.querySelector('.goog-te-combo');

        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
        } else {
            document.cookie = `googtrans=/fr/${langCode}; path=/;`;
            document.cookie = `googtrans=/fr/${langCode}; path=/; domain=${location.hostname};`;
            window.location.reload();
        }
    }

    // Restaurer l'affichage au chargement
    const savedLang = localStorage.getItem('selectedLang');
    const savedFlagHTML = localStorage.getItem('selectedFlagHTML');

    if (savedFlagHTML && currentFlag) {
        currentFlag.innerHTML = savedFlagHTML;
    }

    setTimeout(() => {
        if (savedLang && savedLang !== 'fr') {
            const select = document.querySelector('.goog-te-combo');
            if (select && select.value !== savedLang) {
                select.value = savedLang;
                select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            }
        }
    }, 1500);
});