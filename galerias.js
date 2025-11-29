document.addEventListener("DOMContentLoaded", () => {

   /* ---- 1. Mostrar solo una galería a la vez ---- */

const titulos = document.querySelectorAll(".titulo1");

titulos.forEach(titulo => {
    titulo.addEventListener("click", () => {

        const galeriaActual = titulo.nextElementSibling;

        // Si no es una galería, no hacer nada
        if (!galeriaActual.classList.contains("galeria")) return;

        const todasLasGalerias = document.querySelectorAll(".galeria");

        // Si la galería ya está abierta, simplemente ciérrala
        if (!galeriaActual.classList.contains("cerrado")) {
            galeriaActual.classList.add("cerrado");
            return;
        }

        // Cerrar todas las demás
        todasLasGalerias.forEach(g => {
            if (g !== galeriaActual) g.classList.add("cerrado");
        });

        // Abrir la actual
        galeriaActual.classList.remove("cerrado");
    });
});
    /* ---- 2. Lightbox COMPLETO ---- */

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const cerrarBtn = document.querySelector(".cerrar");
    const flechaIzq = document.querySelector(".flecha-izq");
    const flechaDer = document.querySelector(".flecha-der");

    let imagenes = [];
    let indice = 0;

    // Tomar TODAS las imágenes de TODAS las galerías
    const todasLasGalerias = document.querySelectorAll(".galeria");

    todasLasGalerias.forEach(galeria => {
        const imgs = Array.from(galeria.querySelectorAll("img"));
        imgs.forEach(img => {
            img.addEventListener("click", () => {
                imagenes = imgs;
                indice = imgs.indexOf(img);

                abrirLightbox(img.src);
            });
        });
    });

    function abrirLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.remove("oculto");
    }

    function cerrarLightbox() {
        lightbox.classList.add("oculto");
        lightboxImg.style.transform = "scale(1)";
    }

    cerrarBtn.addEventListener("click", cerrarLightbox);

    // Cerrar al hacer clic fuera
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });

    /* ---- 3. Flechas izquierda/derecha ---- */

    flechaDer.addEventListener("click", () => {
        indice = (indice + 1) % imagenes.length;
        lightboxImg.src = imagenes[indice].src;
    });

    flechaIzq.addEventListener("click", () => {
        indice = (indice - 1 + imagenes.length) % imagenes.length;
        lightboxImg.src = imagenes[indice].src;
    });

    /* ---- 4. Zoom táctil (pinch zoom en móviles) ---- */

    let escala = 1;

    lightboxImg.addEventListener("wheel", (e) => {
        e.preventDefault();
        escala += e.deltaY * -0.001;

        escala = Math.min(Math.max(1, escala), 3);

        lightboxImg.style.transform = `scale(${escala})`;
    });

    // Reset zoom al cerrar
    cerrarBtn.addEventListener("click", () => escala = 1);
});
