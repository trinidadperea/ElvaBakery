const cake = document.querySelector(".cake");
const toggleCake = document.querySelector("#toggleCake");
const sizeOptions = document.querySelectorAll(".size-option");


// =========================
// RELLENOS DISPONIBLES
// =========================

const fillings = [
    {
        id: "dulce-merengue-crema",
        name: "Dulce de leche, merenguitos, crema chantilly"
    },
    {
        id: "dulce-crema-durazno",
        name: "Dulce de leche, durazno, crema chantilly"
    },
    {
        id: "dulce-crema-oreo",
        name: "Dulce de leche, crema chantilly y oreos"
    },
    {
        id: "dulce-frutilla-crema-merengue",
        name: "Dulce de leche"
    },
    {
        id: "dulce-crema",
        name: "Dulce de leche y crema chantilly"
    },
    {
        id: "crema-durazno",
        name: "Crema chantilly, durazno"
    },
    {
        id: "crema-frutilla",
        name: "Crema oreo"
    },
    {
        id: "crema-frutilla",
        name: "Crema Chantilly"
    }
];


// =========================
// CREAR OPCIONES
// =========================

const layerSelectors =
    document.querySelectorAll(".layer-selector");


layerSelectors.forEach((layerSelector, index) => {

    const layerNumber = index + 1;

    const optionsContainer =
        layerSelector.querySelector(".filling-options");


    // -------------------------
    // RELLENOS EXISTENTES
    // -------------------------

    fillings.forEach(filling => {

        const label =
            document.createElement("label");

        label.className = "filling-option";

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

    });


    // -------------------------
    // OPCIÓN "OTRA"
    // -------------------------

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


    // -------------------------
    // ACTIVAR / DESACTIVAR
    // CAMPO "OTRA"
    // -------------------------

    const otherRadio =
        otherLabel.querySelector("input[type='radio']");

    const otherInput =
        otherLabel.querySelector(".other-filling-input");


    otherRadio.addEventListener("change", () => {

        otherInput.disabled =
            !otherRadio.checked;


        if (otherRadio.checked) {

            otherInput.focus();

        }

    });

});


// =========================
// ABRIR / CERRAR TORTA
// =========================

toggleCake.addEventListener("click", () => {

    cake.classList.toggle("open");

    if (cake.classList.contains("open")) {

        toggleCake.textContent = "Cerrar torta";

    } else {

        toggleCake.textContent =
            "Ver la torta por dentro";

    }

});


// =========================
// CAMBIAR TAMAÑO
// =========================

sizeOptions.forEach(option => {

    option.addEventListener("click", () => {

        const size = option.dataset.size;

        cake.classList.remove(
            "size-18",
            "size-22"
        );

        cake.classList.add(
            `size-${size}`
        );


        sizeOptions.forEach(button => {
            button.classList.remove("active");
        });

        option.classList.add("active");

    });

});


// =========================
// CAMBIAR RELLENOS
// =========================

const fillingOptions =
    document.querySelectorAll(".filling-option input");


fillingOptions.forEach(option => {

    option.addEventListener("change", () => {

        const layer = option.dataset.layer;
        const filling = option.dataset.filling;

        const cakeLayer =
            document.querySelector(
                `.filling-layer-${layer}`
            );


        if (!cakeLayer) return;


        // Eliminar colores anteriores

        fillings.forEach(item => {

            cakeLayer.classList.remove(
                `filling-${item.id}`
            );

        });


        // Agregar nuevo color

        cakeLayer.classList.add(
            `filling-${filling}`
        );

    });

});


// =========================
// WHATSAPP
// =========================

const whatsappButton =
    document.querySelector("#whatsappButton");


whatsappButton.addEventListener("click", () => {

    // -------------------------
    // TAMAÑO
    // -------------------------

    const selectedSize =
        document.querySelector(".size-option.active");

    const size =
        selectedSize.dataset.size;


    // -------------------------
    // RELLENOS
    // -------------------------

    const fillings = [];

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


        // -------------------------
        // SI ES "OTRA"
        // -------------------------

        if (selected.dataset.filling === "otra") {

            const input =
                selected
                    .closest(".filling-option")
                    .querySelector(".other-filling-input");


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


        fillings.push(fillingName);
    }


    // -------------------------
    // MENSAJE
    // -------------------------

    const message = `
    Hola Elva Bakery! 

    Quiero consultar por una torta personalizada.

    - Tamaño: ${size} cm

    - Rellenos:

    • Capa 1: ${fillings[0]}
    • Capa 2: ${fillings[1]}
    • Capa 3: ${fillings[2]}

    ¡Gracias! 
    `;


        // -------------------------
        // WHATSAPP
        // -------------------------

        const phone =
            "5492616175138";


        const url =
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


        window.open(url, "_blank");

});