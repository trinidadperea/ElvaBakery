const shotImages = document.querySelectorAll(".shot-zoom");

const imageModal = document.getElementById("imageModal");
const modalImagen = document.getElementById("modalImagen");
const closeImageModal = document.getElementById("closeImageModal");


shotImages.forEach(image => {

    image.addEventListener("click", () => {

        modalImagen.src = image.src;
        modalImagen.alt = image.alt;

        imageModal.classList.add("active");

    });

});


closeImageModal.addEventListener("click", () => {

    imageModal.classList.remove("active");

});


imageModal.addEventListener("click", (event) => {

    if (event.target === imageModal) {

        imageModal.classList.remove("active");

    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        imageModal.classList.remove("active");

    }

});

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