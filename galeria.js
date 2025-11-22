
  const galeria = document.querySelectorAll('.galeria img');
  const lightbox = document.getElementById('lightbox');
  const imgGrande = document.getElementById('imgGrande');
  const cerrar = document.querySelector('.cerrar');

  galeria.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'block';
      imgGrande.src = img.src;
    });
  });

  cerrar.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== imgGrande) {
      lightbox.style.display = 'none';
    }
  });

