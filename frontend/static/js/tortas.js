
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


const tortasCarousel = [

    {
        imagen: "static/img/personalizadas/letraE.jpeg",
        titulo: "Letter Cake - Letra E",
        descripcion: "Chocolinas, dulce de leche y crema + Deco de corazones rosados y blancos hechos con chocolate blanco"
    },

    {
        imagen: "static/img/personalizadas/letraT.jpeg",
        titulo: "Letter Cake - Letra T",
        descripcion: "Chocolinas, dulce de leche y crema + Deco de patitos rosados y celestes hechos con chocolate blanco y mucho amor para un baby shower"
    },

    {
        imagen: "static/img/personalizadas/personalizadaCorazones.jpeg",
        titulo: "Torta Corazones",
        descripcion: "Torta de bizcochuelo rellena con dulce de leche, crema chantilly y merenguitos, pedido especial para una cumpleañera"
    },

    {
        imagen: "static/img/personalizadas/persoOso.jpeg",
        titulo: "Torta Oso",
        descripcion: "Torta de bizcochuelo rellena con dulce de leche, crema chantilly y merenguitos, pedido especial para una cumpleañera"
    },

    {
        imagen: "static/img/personalizadas/letraM_brownie.jpeg",
        titulo: "Letter Cake - Letra M",
        descripcion: "Brownie, mucho dulce de leche, crema chantilly y deco para un cumpleaños de 30"
    },

    {
        imagen: "static/img/personalizadas/rogelMetro.jpeg",
        titulo: "Rogel de 1 metro",
        descripcion: "Pedido especial para una fiesta de cumpleaños, rogel de 1 metro de largo con más de 5 kg de dulce de leche y mucho merengue!!"
    },
    {
        imagen: "static/img/personalizadas/letterG.jpeg",
        titulo: "Letter Cake - Letra G",
        descripcion: "Chocotorta en forma de letra G, con una deco colorida, oreos bañadas, kitkat, rocklets y muchos chocolates!!"
    }

];


let indiceCarousel = 0;

const carouselImagen = document.getElementById("carouselImagen");
const carouselTitulo = document.getElementById("carouselTitulo");
const carouselDescripcion = document.getElementById("carouselDescripcion");
const carouselSlide = document.querySelector(".carousel-slide");

const prevTorta = document.getElementById("prevTorta");
const nextTorta = document.getElementById("nextTorta");

const carouselIndicators = document.getElementById("carouselIndicators");


function mostrarTortaCarousel(indice) {

    indiceCarousel = indice;

    const torta = tortasCarousel[indiceCarousel];

    carouselSlide.classList.add("changing");

    setTimeout(() => {

        carouselImagen.src = torta.imagen;
        carouselImagen.alt = torta.titulo;

        carouselTitulo.textContent = torta.titulo;
        carouselDescripcion.textContent = torta.descripcion;

        actualizarIndicadoresCarousel();

        carouselSlide.classList.remove("changing");

    }, 200);
}


/* SIGUIENTE */

nextTorta.addEventListener("click", () => {

    let siguiente = indiceCarousel + 1;

    if (siguiente >= tortasCarousel.length) {
        siguiente = 0;
    }

    mostrarTortaCarousel(siguiente);

});


/* ANTERIOR */

prevTorta.addEventListener("click", () => {

    let anterior = indiceCarousel - 1;

    if (anterior < 0) {
        anterior = tortasCarousel.length - 1;
    }

    mostrarTortaCarousel(anterior);

});


/* INDICADORES */

function crearIndicadoresCarousel() {

    carouselIndicators.innerHTML = "";

    tortasCarousel.forEach((_, indice) => {

        const indicador = document.createElement("button");

        indicador.classList.add("indicator");

        indicador.addEventListener("click", () => {
            mostrarTortaCarousel(indice);
        });

        carouselIndicators.appendChild(indicador);

    });

    actualizarIndicadoresCarousel();
}


function actualizarIndicadoresCarousel() {

    const indicadores = document.querySelectorAll(
        ".carousel-indicators .indicator"
    );

    indicadores.forEach((indicador, indice) => {

        indicador.classList.toggle(
            "active",
            indice === indiceCarousel
        );

    });

}


crearIndicadoresCarousel();





