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