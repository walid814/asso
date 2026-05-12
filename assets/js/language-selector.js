document.addEventListener('DOMContentLoaded', function() {
    const langHTML = `
    <!-- Language Selector Floating -->
    <div class="lang-floating-widget">
        <button class="lang-floating-btn" id="langFloatingBtn" aria-label="Changer de langue">
            <span class="flag-icon">🇫🇷</span>
        </button>
        <div class="lang-floating-menu" id="langFloatingMenu">
            <a href="#" class="lang-option"><span class="flag-icon">🇫🇷</span> Français</a>
            <a href="#" class="lang-option"><span class="flag-icon">🇬🇧</span> English</a>
            <a href="#" class="lang-option"><span class="flag-icon">🇪🇸</span> Español</a>
            <a href="#" class="lang-option"><span class="flag-icon">🇵🇹</span> Português</a>
            <a href="#" class="lang-option"><span class="flag-icon">🇸🇦</span> العربية</a>
            <a href="#" class="lang-option"><span class="flag-icon">🇰🇪</span> Swahili</a>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', langHTML);

    const langBtn = document.getElementById('langFloatingBtn');
    const langMenu = document.getElementById('langFloatingMenu');
    
    if(langBtn && langMenu) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langMenu.classList.toggle('show');
        });
        document.addEventListener('click', function(e) {
            if (!langMenu.contains(e.target)) {
                langMenu.classList.remove('show');
            }
        });
    }
});
