document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;

    const symbols = ['-'];
    const colors = [
    'rgba(0, 0, 0, 0.25)',         // noir
    'rgba(255, 179, 0, 0.25)',     // jaune-orangé
    'rgba(255, 0, 0, 0.25)',       // rouge
    'rgba(135, 206, 235, 0.25)',   // bleu ciel
    ];

    const COUNT = 30;
    const MIN_SIZE = 60;
    const MAX_SIZE = 120;
    const EDGE = 30;
    const HALF = Math.floor(COUNT / 2);

    /* 🆕 — historique des positions déjà utilisées */
    const taken = [];

    /* 🆕 — fonction de proximité (8 vw & 8 vh ≈ même diagonale) */
    const tooClose = (x, y) =>
        taken.some(p => Math.hypot(p.x - x, p.y - y) < 8);

    for (let i = 0; i < COUNT; i++) {
        const inLeft = i < HALF;
        let leftPos, topPos;

        /* 🆕 — tirage jusqu’à trouver un emplacement libre */
        do {
            const offset = Math.random() * EDGE;
            leftPos = inLeft ? offset : 100 - EDGE + offset; 
            topPos  = Math.random() * 100;                   // 0‑100 vh
        } while (tooClose(leftPos, topPos));

        /* 🆕 — on enregistre la position retenue */
        taken.push({ x: leftPos, y: topPos });

        const span = document.createElement('span');
        span.classList.add('confetti');
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        span.style.left = `${leftPos}vw`;
        span.style.top  = `${topPos}vh`;

        const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
        span.style.fontSize  = `${size}px`;
        span.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        span.style.color     = colors[Math.floor(Math.random() * colors.length)];
        span.style.animationDuration = `${6 + Math.random() * 4}s`;

        container.appendChild(span);
    }

    /* ----------- effet parallaxe ----------- */
    let targetScroll = 0;
    let currentOffset = 0;

    window.addEventListener('scroll', () => { targetScroll = window.scrollY; });

    function animate() {
        currentOffset += (targetScroll - currentOffset) * 0.005;
        container.style.transform = `translateY(${-currentOffset * 0.1}px)`;
        requestAnimationFrame(animate);
    }
    animate();
});
