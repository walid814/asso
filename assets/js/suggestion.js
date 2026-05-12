document.addEventListener("DOMContentLoaded", function () {
    // 1. Ne rien afficher si on est déjà sur la page suggestion
    const currentPath = window.location.pathname;
    if (currentPath.includes('/suggestions') || currentPath.includes('/suggestion')) {
        return;
    }



    // 3. Préparer le bon lien selon où on se trouve (racine ou dossier pages/)
    const isRoot = currentPath.endsWith('/') || currentPath.endsWith('index.html');
    const linkPath = isRoot ? 'pages/suggestions.html' : 'suggestions.html';

    // 4. Créer la bulle et l'ajouter au <body>
    const suggestionHTML = `
        <div class="suggestion-prompt" id="suggestionPrompt" style="display: none;">
            <button class="suggestion-close" id="closeSuggestion" aria-label="Fermer la suggestion">
                <i class="fas fa-times"></i>
            </button>
            <a href="${linkPath}" class="suggestion-link">
                <i class="fas fa-lightbulb"></i>
                Une idée ? Une remarque ?
            </a>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', suggestionHTML);

    const suggestionPrompt = document.getElementById('suggestionPrompt');

    // 5. Afficher la bulle après 1 seconde
    setTimeout(() => {
        if (suggestionPrompt) {
            suggestionPrompt.style.display = 'flex';
            setTimeout(() => suggestionPrompt.classList.add('show'), 50);
        }
    }, 1000);

    // 6. Gérer la fermeture (Technique de la délégation d'événements = 100% fiable)
    document.addEventListener('click', function (e) {
        // On vérifie si on a cliqué sur le bouton #closeSuggestion (ou l'icône à l'intérieur)
        if (e.target.closest('#closeSuggestion')) {
            e.preventDefault(); // Empêche tout comportement bizarre

            if (suggestionPrompt) {
                // On lance l'animation de disparition
                suggestionPrompt.classList.remove('show');

                // On le masque totalement après l'animation (600ms)
                setTimeout(() => {
                    suggestionPrompt.style.display = 'none';
                }, 600);
            }


        }
    });
});