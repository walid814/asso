/* ============================================================
   SUGGESTIONS.JS — Page de suggestions
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    /* Loader */
    const loader = document.getElementById('sgLoader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 120);
    }

    /* Validation + feedback bouton submit */
    const form = document.getElementById('sgForm');
    const submitBtn = document.getElementById('sgSubmit');

    if (form && submitBtn) {
        form.addEventListener('submit', function () {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours…';
        });
    }
});
