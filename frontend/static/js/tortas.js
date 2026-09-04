/* =========================
   WHATSAPP
========================= */

const whatsappButtons = document.querySelectorAll(".whatsapp-button");

whatsappButtons.forEach(button => {

    button.addEventListener("click", () => {

        const torta = button.dataset.torta;

        const message = `Hola Elva Bakery!

Quiero consultar por:

- ${torta}

¡Gracias! 💕`;

        const phone = "5492616175138";

        const url =
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

    });

});


/* =========================
   IMÁGENES DE LAS CARDS
========================= */

const imageModal = document.getElementById("imageModal");
const modalImagen = document.getElementById("modalImagen");
const closeImageModal = document.getElementById("closeImageModal");


/* Todas las imágenes de las cards */

document.querySelectorAll(".torta-card img, .tarta-card img").forEach(imagen => {

    imagen.addEventListener("click", () => {

        modalImagen.src = imagen.src;
        modalImagen.alt = imagen.alt;

        imageModal.classList.add("active");

    });

});


/* =========================
   CERRAR MODAL
========================= */

closeImageModal.addEventListener("click", () => {

    imageModal.classList.remove("active");

});


/* Cerrar tocando afuera */

imageModal.addEventListener("click", (e) => {

    if (e.target === imageModal) {
        imageModal.classList.remove("active");
    }

});


/* Cerrar con ESC */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        imageModal.classList.remove("active");
    }

});