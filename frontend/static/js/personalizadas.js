
// =========================
// RELLENOS DISPONIBLES
// =========================

const fillings = [
    {
        id: "dulce-merengue-crema",
        name: "Dulce de leche, merenguitos, crema chantilly",
        image: "../static/img/capas/capa_ddl_nerenguitos_crema.png"
    },
    {
        id: "dulce-crema-durazno",
        name: "Dulce de leche, durazno, crema chantilly",
        image: "../static/img/capas/capa_ddl_crema_durazno.png"
    },
    {
        id: "dulce-crema-oreo",
        name: "Dulce de leche, crema chantilly y oreos",
        image: "../static/img/capas/capa_ddl_cremaOreo.png"
    },
    {
        id: "dulce-crema",
        name: "Dulce de leche y crema chantilly",
        image: "../static/img/capas/capa_ddl_crema.png"
    }
];


// =========================
// TAMAÑO DE LA TORTA
// =========================

const sizeOptions =
    document.querySelectorAll(".size-option");

const cake =
    document.querySelector(".cake");


sizeOptions.forEach(option => {

    option.addEventListener("click", () => {

        // Quitar selección anterior
        sizeOptions.forEach(btn => {
            btn.classList.remove("active");
        });

        // Marcar el seleccionado
        option.classList.add("active");

        // Obtener tamaño
        const size =
            option.dataset.size;

        // Cambiar clase de la torta
        cake.classList.remove("size-18", "size-22");

        cake.classList.add(`size-${size}`);

    });

});


// =========================
// VER TORTA POR DENTRO
// =========================

const toggleCake =
    document.querySelector("#toggleCake");


let cakeOpen = false;


if (toggleCake && cake) {

    toggleCake.addEventListener("click", () => {

        cakeOpen = !cakeOpen;

        cake.classList.toggle("open", cakeOpen);


        if (cakeOpen) {

            toggleCake.textContent =
                "Ver torta completa";

        } else {

            toggleCake.textContent =
                "Ver la torta por dentro";

        }

    });

}


// =========================
// CREAR OPCIONES DE RELLENO
// =========================

const layerSelectors =
    document.querySelectorAll(".layer-selector");


layerSelectors.forEach((layerSelector, index) => {

    const layerNumber = index + 1;

    const optionsContainer =
        layerSelector.querySelector(".filling-options");


    if (!optionsContainer) return;


    // =========================
    // RELLENOS
    // =========================

    fillings.forEach(filling => {

        const label =
            document.createElement("label");

        label.className =
            "filling-option";


        label.innerHTML = `
            <input
                type="radio"
                name="filling-${layerNumber}"
                data-layer="${layerNumber}"
                data-filling="${filling.id}"
            >

            <span class="check-circle"></span>

            <span class="filling-name">
                ${filling.name}
            </span>
        `;


        optionsContainer.appendChild(label);


        // =========================
        // CAMBIAR IMAGEN
        // =========================

        const radio =
            label.querySelector("input");


        radio.addEventListener("change", () => {

            const cakeLayer =
                document.querySelector(
                    `.filling-layer-${layerNumber}`
                );


            if (!cakeLayer) return;


            const image =
                cakeLayer.querySelector("img");


            if (!image) return;


            image.src =
                filling.image;

        });

    });


    // =========================
    // OPCIÓN "OTRA"
    // =========================

    const otherLabel =
        document.createElement("label");


    otherLabel.className =
        "filling-option other-option";


    otherLabel.innerHTML = `
        <input
            type="radio"
            name="filling-${layerNumber}"
            data-layer="${layerNumber}"
            data-filling="otra"
        >

        <span class="check-circle"></span>

        <span class="filling-name">
            Otra:
        </span>

        <input
            type="text"
            class="other-filling-input"
            placeholder="Escribí tu relleno"
            disabled
        >
    `;


    optionsContainer.appendChild(otherLabel);


    const otherRadio =
        otherLabel.querySelector(
            "input[type='radio']"
        );


    const otherInput =
        otherLabel.querySelector(
            ".other-filling-input"
        );


    otherRadio.addEventListener("change", () => {

        otherInput.disabled =
            !otherRadio.checked;


        if (otherRadio.checked) {
            otherInput.focus();
        }

    });

});


// =========================
// WHATSAPP
// =========================

const whatsappButton =
    document.querySelector("#whatsappButton");


if (whatsappButton) {

    whatsappButton.addEventListener("click", () => {

        // =========================
        // TAMAÑO
        // =========================

        const selectedSize =
            document.querySelector(
                ".size-option.active"
            );


        if (!selectedSize) {

            alert(
                "Elegí un tamaño de torta"
            );

            return;
        }


        const size =
            selectedSize.dataset.size;


        // =========================
        // RELLENOS
        // =========================

        const selectedFillings = [];


        for (let layer = 1; layer <= 3; layer++) {

            const selected =
                document.querySelector(
                    `input[name="filling-${layer}"]:checked`
                );


            if (!selected) {

                alert(
                    `Elegí el relleno de la capa ${layer}`
                );

                return;
            }


            let fillingName =
                selected
                    .closest(".filling-option")
                    .querySelector(".filling-name")
                    .textContent
                    .trim();


            // =========================
            // OTRA
            // =========================

            if (
                selected.dataset.filling === "otra"
            ) {

                const input =
                    selected
                        .closest(".filling-option")
                        .querySelector(
                            ".other-filling-input"
                        );


                if (!input.value.trim()) {

                    alert(
                        `Escribí qué relleno querés en la capa ${layer}`
                    );

                    input.focus();

                    return;
                }


                fillingName =
                    `Otra: ${input.value.trim()}`;
            }


            selectedFillings.push(
                fillingName
            );

        }


        // =========================
        // MENSAJE
        // =========================

        const message = `
Hola Elva Bakery!

Quiero consultar por una torta personalizada.

- Tamaño: ${size} cm

- Rellenos:

• Capa 1: ${selectedFillings[0]}
• Capa 2: ${selectedFillings[1]}
• Capa 3: ${selectedFillings[2]}

¡Gracias!
        `;


        // =========================
        // WHATSAPP
        // =========================

        const phone =
            "5492616175138";


        const url =
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


        window.open(
            url,
            "_blank"
        );

    });

}

