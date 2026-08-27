const whatsappButtons = document.querySelectorAll(".whatsapp-button");

whatsappButtons.forEach(button => {

    button.addEventListener("click", () => {

        const torta = button.dataset.torta;

        const message = `Hola Elva Bakery!

Quiero consultar por la siguiente torta:

- ${torta}

¿Podrían indicarme disponibilidad?

¡Gracias! 💕`;

        const phone = "5492616175138";

        const url =
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

    });

});