/* ============================================================
   COLLABORATIONS.JS — Frise chronologique de la page "Collaborations"
   Ordre du tableau : du plus ancien au plus récent.
   ============================================================ */

(function () {
    const YEARS = [2012, 2014, 2016, 2022, 2023, 2024, 2025];
    let activeYear = 2025;

    function switchToYear(newYear) {
        if (newYear === activeYear) return;

        const oldIdx = YEARS.indexOf(activeYear);
        const newIdx = YEARS.indexOf(newYear);
        const goingToPast = newIdx < oldIdx;

        const oldPanel = document.getElementById('panel' + activeYear);
        const newPanel = document.getElementById('panel' + newYear);
        if (!newPanel) return;

        newPanel.style.setProperty('--panel-slide-from', goingToPast ? '-36px' : '36px');

        document.querySelectorAll('.fate-tl-year').forEach(btn => {
            const active = parseInt(btn.dataset.year) === newYear;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        if (oldPanel) oldPanel.classList.remove('active');
        newPanel.classList.add('active');
        activeYear = newYear;

        const activeBtn = document.querySelector('.fate-tl-year.active');
        if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.fate-tl-year').forEach(function (btn) {
            btn.addEventListener('click', function () {
                switchToYear(parseInt(this.dataset.year));
            });
        });
    });
})();
