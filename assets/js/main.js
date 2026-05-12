document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    toggleBtn.addEventListener('click', () => {
        mainNav.classList.toggle('navOpen');
        body.classList.toggle('noScroll');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const suggestionPrompt = document.getElementById('suggestionPrompt');
    let hasShownOnce = false;
    let isCurrentlyVisible = false;

    console.log('Script de suggestion chargé');

    // Vérifier si on est sur la page de suggestions
    const currentPath = window.location.pathname;
    if (currentPath.includes('/suggestions') || currentPath.includes('/suggestion')) {
        console.log('Sur la page de suggestions - aucun affichage du prompt');
        return;
    }

    console.log('Element suggestionPrompt:', suggestionPrompt);

    // Si l'élément n'existe pas (masqué côté serveur), on sort
    if (!suggestionPrompt) {
        console.log('Element suggestionPrompt non trouvé - probablement masqué côté serveur');
        return;
    }

    // Vérifier si la suggestion a été fermée dans cette session
    if (localStorage.getItem('suggestionClosed') === 'true') {
        console.log('Suggestion fermée précédemment - pas d\'affichage automatique');
        return;
    }

    if (suggestionPrompt) {
        console.log('Element trouvé, ajout du listener de scroll...');

        // Fonction pour vérifier si on est au milieu de la page
        function checkScrollPosition() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Calculer si on est au milieu de la page (entre 40% et 60% du scroll)
            const scrollPercentage = scrollTop / (documentHeight - windowHeight);
            const isInMiddle = scrollPercentage >= 0.4 && scrollPercentage <= 0.8;

            console.log(`Scroll: ${Math.round(scrollPercentage * 100)}%`);

            if (isInMiddle && !isCurrentlyVisible) {
                console.log('Au milieu de la page - affichage du message');
                showSuggestionPrompt();
            } else if (!isInMiddle && isCurrentlyVisible) {
                console.log('Plus au milieu - masquage du message');
                hideSuggestionPrompt();
            }
        }

        // Écouter le scroll avec throttling pour les performances
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    checkScrollPosition();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Test après 2 secondes pour vérifier que ça fonctionne
        setTimeout(() => {
            console.log('Test d\'affichage immédiat');
            showSuggestionPrompt();
        }, 2000);

    } else {
        console.error('Element suggestionPrompt non trouvé !');
    }

    function showSuggestionPrompt() {
        console.log('showSuggestionPrompt appelée');

        if (!suggestionPrompt || isCurrentlyVisible) {
            return;
        }

        isCurrentlyVisible = true;
        suggestionPrompt.style.display = 'block';
        console.log('Display mis à block');

        // Ajouter la classe 'show' après un petit délai pour l'animation
        setTimeout(() => {
            suggestionPrompt.classList.add('show');
            console.log('Classe show ajoutée');
        }, 100);
    }

    function hideSuggestionPrompt() {
        console.log('hideSuggestionPrompt appelée');

        if (!suggestionPrompt || !isCurrentlyVisible) {
            return;
        }

        suggestionPrompt.classList.remove('show');
        console.log('Classe show retirée');

        // Masquer complètement après l'animation
        setTimeout(() => {
            suggestionPrompt.style.display = 'none';
            isCurrentlyVisible = false;
            console.log('Display mis à none');
        }, 600);
    }

    // Fonction de test globale
    window.testSuggestion = function () {
        console.log('Test manuel déclenché');
        const element = document.getElementById('suggestionPrompt');
        if (element) {
            console.log('Element trouvé pour test manuel');
            showSuggestionPrompt();
        } else {
            console.error('Element non trouvé pour test manuel');
        }
    };

    // Fonction pour fermer manuellement le message de suggestion
    window.closeSuggestionPrompt = function () {
        console.log('Fermeture manuelle du message de suggestion');
        hideSuggestionPrompt();

        // Empêcher la réapparition pendant cette session
        localStorage.setItem('suggestionClosed', 'true');
        console.log('Suggestion fermée pour cette session');
    };
});

const closeOpenSection = year => {
    const icon = document.getElementById(`icon${year}`);
    const iconSection = document.getElementById(`actionContainer${year}`);

    if (icon && iconSection && icon.classList.contains("fa-angle-down")) {
        // section actuellement ouverte → on la ferme
        iconSection.style.display = "none";
        icon.classList.replace("fa-angle-down", "fa-angle-up");
    }

    else if (icon && icon.classList.contains("fa-angle-up")) {
        // section actuellement fermée → on la rouvre
        iconSection.style.display = "flex"; // utiliser "flex" pour garder la mise en page d’origine
        icon.classList.replace("fa-angle-up", "fa-angle-down");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour gérer l'affichage des images
    const showMoreImagesBtn = document.getElementById('showMoreImagesBtn');
    let isImagesExpanded = false;

    if (showMoreImagesBtn) {
        showMoreImagesBtn.addEventListener('click', function () {
            const allImages = document.querySelectorAll('.expositionImageContainer');

            if (!isImagesExpanded) {
                // Afficher plus d'images
                let hiddenCount = 0;

                allImages.forEach((el, index) => {
                    const isHidden = el.style.display === 'none' ||
                        (el.style.display === '' && index >= 9);

                    if (isHidden) {
                        hiddenCount++;

                        setTimeout(() => {
                            el.style.display = 'block';
                            el.style.opacity = '0';
                            el.style.transform = 'translateY(20px)';
                            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                            setTimeout(() => {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }, 50);
                        }, hiddenCount * 100);
                    }
                });

                this.innerHTML = '<i class="fas fa-eye-slash" style="margin-right: 8px;"></i>Afficher moins d\'images';
                isImagesExpanded = true;

            } else {
                // Masquer les images supplémentaires
                allImages.forEach((el, index) => {
                    if (index >= 9) {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(-20px)';

                        setTimeout(() => {
                            el.style.display = 'none';
                        }, 300);
                    }
                });

                this.innerHTML = '<i class="fas fa-images" style="margin-right: 8px;"></i>Afficher plus d\'images';
                isImagesExpanded = false;
            }
        });
    }

    // Fonction pour gérer l'affichage des vidéos
    const showMoreVideosBtn = document.getElementById('showMoreVideosBtn');
    let isVideosExpanded = false;

    if (showMoreVideosBtn) {
        showMoreVideosBtn.addEventListener('click', function () {
            const allVideos = document.querySelectorAll('.expositionVideoContainer');

            if (!isVideosExpanded) {
                // Afficher plus de vidéos
                let hiddenCount = 0;

                allVideos.forEach((el, index) => {
                    const isHidden = el.style.display === 'none' ||
                        (el.style.display === '' && index >= 6);

                    if (isHidden) {
                        hiddenCount++;

                        setTimeout(() => {
                            el.style.display = 'block';
                            el.style.opacity = '0';
                            el.style.transform = 'translateY(20px)';
                            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                            setTimeout(() => {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }, 50);
                        }, hiddenCount * 100);
                    }
                });

                this.innerHTML = '<i class="fas fa-eye-slash" style="margin-right: 8px;"></i>Afficher moins de vidéos';
                isVideosExpanded = true;

            } else {
                // Masquer les vidéos supplémentaires
                allVideos.forEach((el, index) => {
                    if (index >= 6) {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(-20px)';

                        setTimeout(() => {
                            el.style.display = 'none';
                        }, 300);
                    }
                });

                this.innerHTML = '<i class="fas fa-video" style="margin-right: 8px;"></i>Afficher plus de vidéos';
                isVideosExpanded = false;
            }
        });
    }

    // Ancien code pour compatibilité (showMoreBtn)
    const showMoreBtn = document.getElementById('showMoreBtn');
    let isExpanded = false;

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
            console.log('Bouton cliqué, état actuel:', isExpanded); // Debug

            // Sélectionner toutes les images de la galerie
            const allImages = document.querySelectorAll('.expositionImageContainer');

            console.log('Nombre total d\'images:', allImages.length); // Debug

            if (!isExpanded) {
                // Afficher plus d'images
                let hiddenCount = 0;

                allImages.forEach((el, index) => {
                    // Vérifier si l'élément est caché (index >= 9)
                    const isHidden = el.style.display === 'none' ||
                        (el.style.display === '' && index >= 9);

                    if (isHidden) {
                        hiddenCount++;

                        setTimeout(() => {
                            el.style.display = 'block';
                            el.style.opacity = '0';
                            el.style.transform = 'translateY(20px)';
                            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                            // Déclencher l'animation après un court délai
                            setTimeout(() => {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }, 50);
                        }, hiddenCount * 100); // Délai progressif
                    }
                });

                // Changer le texte et l'icône du bouton
                this.innerHTML = '<i class="fas fa-eye-slash" style="margin-right: 8px;"></i>Afficher moins';
                isExpanded = true;

            } else {
                // Masquer les images supplémentaires
                allImages.forEach((el, index) => {
                    if (index >= 9) {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(-20px)';

                        setTimeout(() => {
                            el.style.display = 'none';
                        }, 300);
                    }
                });

                // Remettre le texte et l'icône originaux
                this.innerHTML = '<i class="fas fa-images" style="margin-right: 8px;"></i>Afficher plus';
                isExpanded = false;

                // Faire défiler vers le titre de la galerie
                const galerieTitle = document.querySelector('h3');
                if (galerieTitle) {
                    galerieTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }

            console.log('Nouvel état:', isExpanded); // Debug
        });
    } else {
        console.log('Bouton showMoreBtn non trouvé'); // Debug
    }

    // Script pour afficher le lien suggestion au 3/4 de la page
    const suggestionLink = document.getElementById('suggestionLink');
    if (suggestionLink) {
        function checkScroll() {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercent = scrollPosition / documentHeight;

            if (scrollPercent >= 0.5) { // Afficher à 50% du scroll
                suggestionLink.style.opacity = '1';
                suggestionLink.style.visibility = 'visible';
            } else {
                suggestionLink.style.opacity = '0';
                suggestionLink.style.visibility = 'hidden';
            }
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll(); // Vérifier au chargement initial
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
});

$(window).bind("load", function () {
    $("body").addClass("loaded")
})