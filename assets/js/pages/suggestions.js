/* ============================================================
   SUGGESTIONS.JS — Page de suggestions (loader, animations, formulaire)
   À ne pas confondre avec assets/js/suggestion.js (la bulle globale).
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    /* Loader + animations */
    const pageLoader = document.getElementById('pageLoader');
    const body = document.body;
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add('hidden');
            setTimeout(() => { pageLoader.style.display = 'none'; }, 500);
        }
        body.classList.add('loaded');
    }, 100);

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(section => observer.observe(section));

    /* Validation formulaire */
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.btn-submit');
    if (form && submitBtn) {
        form.addEventListener('submit', function () {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        });
    }
});
