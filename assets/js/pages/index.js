/* ============================================================
   INDEX.JS — Scripts spécifiques à la page d'accueil
   ============================================================ */

/* ---------- Hero slider ---------- */
(function () {
    var cur = 0;
    var slides = document.querySelectorAll('#fateHero .fate-hero-slide');
    var dots = document.querySelectorAll('#fateHero .fate-hero-dot');
    var timer;

    if (!slides.length) return;

    function show(n) {
        slides[cur].classList.remove('active');
        dots[cur].classList.remove('active');
        cur = (n + slides.length) % slides.length;
        slides[cur].classList.add('active');
        dots[cur].classList.add('active');
    }
    window.fateHeroSlide = function (d) { clearInterval(timer); show(cur + d); go(); };
    window.fateHeroGoTo = function (n) { clearInterval(timer); show(n); go(); };
    function go() { timer = setInterval(function () { show(cur + 1); }, 6000); }
    go();
})();

/* ---------- Lecteur vidéo "À propos" — facade YouTube ---------- */
function launchAboutVideo() {
    const wrap = document.getElementById('aboutVideoWrap');
    if (!wrap) return;
    wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/oxOJTua3v7g?autoplay=1" title="Forum Associatif Tous Ensemble — Présentation" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}
window.launchAboutVideo = launchAboutVideo;

/* ---------- Pop-up incitation au don ---------- */
(function () {
    if (sessionStorage.getItem('fatePopupSeen')) return;
    setTimeout(function () {
        var overlay = document.getElementById('fate-popup-overlay');
        if (overlay) overlay.classList.add('visible');
    }, 1800);
})();

function closeFatePopup() {
    var overlay = document.getElementById('fate-popup-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
        setTimeout(function () { overlay.style.display = 'none'; }, 400);
        sessionStorage.setItem('fatePopupSeen', '1');
    }
}
window.closeFatePopup = closeFatePopup;

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeFatePopup();
});

document.addEventListener('DOMContentLoaded', function () {
    const popupOverlay = document.getElementById('fate-popup-overlay');
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function (e) {
            if (e.target === this) closeFatePopup();
        });
    }
});
