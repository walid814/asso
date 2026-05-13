/* ============================================================
   ARCHIVES.JS — Filtres de la page Archives
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.arch-filter-btn');
    const cardWraps = document.querySelectorAll('.arch-card-wrap');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            cardWraps.forEach(card => {
                card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
            });
        });
    });
});
