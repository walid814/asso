document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');
    const bannerImage = document.getElementById('bannerImage');

    if (playButton && bannerImage) {
        playButton.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            bannerImage.style.display = 'none';
        });
    }
});
window.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const bannerImage = document.getElementById('bannerImage');

  if (playButton && bannerImage) {
    playButton.addEventListener('click', (e) => {
      e.preventDefault();  
      playButton.style.display = 'none';
      bannerImage.style.display = 'none';
    });
  }
});


