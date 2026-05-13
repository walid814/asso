/* ============================================================
   ADHERER.JS — Toggle du formulaire d'adhésion
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const joinBtn = document.getElementById('joinToggleBtn');
    const formContainer = document.getElementById('joinFormContainer');
    const form = document.getElementById('joinForm');
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (joinBtn && formContainer) {
        joinBtn.addEventListener('click', () => {
            const isOpen = formContainer.classList.contains('open');
            formContainer.classList.toggle('open');
            joinBtn.setAttribute('aria-expanded', !isOpen);
            if (!isOpen) {
                formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    if (form) {
        form.addEventListener('submit', () => {
            if (!form.checkValidity()) return;
            setTimeout(() => {
                if (loadingOverlay) loadingOverlay.style.display = 'flex';
            }, 50);
        });
    }
});
