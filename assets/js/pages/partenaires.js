/* ============================================================
   PARTENAIRES.JS — Filtres et deep-link de la page Partenaires
   ============================================================ */

(function () {
    const FILTER_MAP = {
        sectionInstitutionnels: 'institutionnels',
        sectionPrives:          'prives',
        sectionAssociatif:      'associatifs'
    };

    function applyFilter(filter) {
        const btns  = document.querySelectorAll('.pt-filter-btn');
        const cards = document.querySelectorAll('.pt-card-wrap');
        const blocks = document.querySelectorAll('.pt-category-block');

        btns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));

        cards.forEach(card => {
            card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
        });

        blocks.forEach(block => {
            if (filter === 'all') {
                block.style.display = '';
            } else {
                const hasVisible = block.querySelector(`.pt-card-wrap[data-cat="${filter}"]`);
                block.style.display = hasVisible ? '' : 'none';
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.pt-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
        });

        const hash = window.location.hash.replace('#', '');
        if (FILTER_MAP[hash]) {
            applyFilter(FILTER_MAP[hash]);
            const target = document.getElementById(hash);
            if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
        }
    });
})();
