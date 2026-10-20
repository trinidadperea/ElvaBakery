// ========================================
// CONFIGURACIÓN DE LA TORTA PERSONALIZADA
// ========================================

// Rellenos disponibles
const fillings = [
    {
        id: "dulce-merengue-crema",
        name: "Dulce de leche, merenguitos y crema chantilly",
        image: "static/img/capas/capa_ddl_nerenguitos_crema.png"
    },
    {
        id: "dulce-crema-durazno",
        name: "Crema chantilly y durazno",
        image: "static/img/capas/capa_ddl_crema_durazno.png"
    },
    {
        id: "dulce-crema-durazno",
        name: "Dulce de leche y frutillas",
        image: "static/img/capas/capa_ddl_crema_durazno.png"
    },
    {
        id: "dulce-crema-oreo",
        name: "Dulce de leche y Oreo",
        image: "static/img/capas/capa_ddl_cremaOreo.png"
    },
    {
        id: "dulce-crema",
        name: "Dulce de leche y crema chantilly",
        image: "static/img/capas/capa_ddl_crema.png"
    }
];


// ========================================
// ELEMENTOS HTML
// ========================================

const steps = document.querySelectorAll(".builder-step");
const stepIndicator = document.querySelector("#stepIndicator");
const progressFill = document.querySelector("#progressFill");

const sizeOptions = document.querySelectorAll(".size-option");
const heightOptions = document.querySelectorAll(".height-option");

const nextStep1 = document.querySelector("#nextStep1");
const nextStep2 = document.querySelector("#nextStep2");
const nextStep3 = document.querySelector("#nextStep3");

const fillingInstructions = document.querySelector("#fillingInstructions");
const fillingError = document.querySelector("#fillingError");

const layerSelectors = document.querySelectorAll(".layer-selector");

const cakeSummary = document.querySelector("#cakeSummary");
const whatsappButton = document.querySelector("#whatsappButton");


// ========================================
// DATOS SELECCIONADOS
// ========================================

let selectedSize = null;
let selectedLayers = null;
let currentStep = 1;


// ========================================
// MOSTRAR PASOS
// ========================================

function showStep(stepNumber) {

    currentStep = stepNumber;

    steps.forEach(step => {
        step.classList.toggle(
            "active",
            Number(step.dataset.step) === stepNumber
        );
    });

    if (stepIndicator) {
        stepIndicator.textContent = `Paso ${stepNumber} de 4`;
    }

    if (progressFill) {
        progressFill.style.width = `${(stepNumber / 4) * 100}%`;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// PASO 1: ELEGIR TAMAÑO
// ========================================

sizeOptions.forEach(option => {

    option.addEventListener("click", () => {

        sizeOptions.forEach(button => {
            button.classList.remove("active");
        });

        option.classList.add("active");

        selectedSize = option.dataset.size;

        nextStep1.disabled = false;

    });

});


nextStep1.addEventListener("click", () => {

    if (!selectedSize) {
        alert("Elegí el tamaño de tu torta.");
        return;
    }

    showStep(2);

});


// ========================================
// PASO 2: ELEGIR CANTIDAD DE RELLENOS
// ========================================

heightOptions.forEach(option => {

    option.addEventListener("click", () => {

        heightOptions.forEach(button => {
            button.classList.remove("active");
        });

        option.classList.add("active");

        const newLayerCount = Number(option.dataset.layers);

        // Si cambia la cantidad de rellenos,
        // limpiamos las elecciones anteriores.
        if (selectedLayers !== newLayerCount) {
            clearFillings();
        }

        selectedLayers = newLayerCount;

        updateFillingOptions();

        nextStep2.disabled = false;

    });

});


nextStep2.addEventListener("click", () => {

    if (!selectedLayers) {
        alert("Elegí si querés dos o tres rellenos.");
        return;
    }

    showStep(3);

});


// ========================================
// PASO 3: CREAR LAS OPCIONES DE RELLENO
// ========================================

function createFillingOptions() {

    layerSelectors.forEach(layerSelector => {

        const layerNumber = Number(layerSelector.dataset.layer);
        const optionsContainer = layerSelector.querySelector(".filling-options");

        optionsContainer.innerHTML = "";

        // Crear opciones de rellenos disponibles
        fillings.forEach(filling => {

            const label = document.createElement("label");
            label.className = "filling-option";

            label.innerHTML = `
                <input
                    type="radio"
                    name="filling-${layerNumber}"
                    value="${filling.id}"
                    data-filling="${filling.id}"
                >

                <span class="check-circle"></span>

                <span class="filling-name">${filling.name}</span>
            `;

            const radio = label.querySelector("input");

            radio.addEventListener("change", () => {

                // Actualizar apariencia de la opción seleccionada
                optionsContainer.querySelectorAll(".filling-option")
                    .forEach(option => {
                        option.classList.remove("selected");
                    });

                label.classList.add("selected");

                fillingError.textContent = "";

                updateNextFillingButton();

            });

            optionsContainer.appendChild(label);

        });


        // Opción para solicitar otro relleno
        const otherLabel = document.createElement("label");
        otherLabel.className = "filling-option other-option";

        otherLabel.innerHTML = `
            <input
                type="radio"
                name="filling-${layerNumber}"
                value="otra"
                data-filling="otra"
            >

            <span class="check-circle"></span>

            <span class="filling-name">Otro relleno</span>

            <input
                type="text"
                class="other-filling-input"
                placeholder="¿Qué relleno te gustaría?"
                disabled
                aria-label="Escribí el relleno que querés"
            >
        `;

        const otherRadio = otherLabel.querySelector("input[type='radio']");
        const otherInput = otherLabel.querySelector(".other-filling-input");

        otherRadio.addEventListener("change", () => {

            optionsContainer.querySelectorAll(".filling-option")
                .forEach(option => {
                    option.classList.remove("selected");
                });

            otherLabel.classList.add("selected");

            otherInput.disabled = false;

            fillingError.textContent = "";

            otherInput.focus();

            updateNextFillingButton();

        });

        otherInput.addEventListener("click", () => {

            otherRadio.checked = true;
            otherRadio.dispatchEvent(new Event("change"));

        });

        otherInput.addEventListener("input", () => {

            if (otherRadio.checked) {
                fillingError.textContent = "";
                updateNextFillingButton();
            }

        });

        otherInput.addEventListener("blur", () => {

            if (otherRadio.checked && !otherInput.value.trim()) {
                fillingError.textContent =
                    "Escribí qué relleno querés para esta capa.";
            }

        });

        optionsContainer.appendChild(otherLabel);

    });

}


// ========================================
// MOSTRAR SOLO LOS RELLENOS NECESARIOS
// ========================================

function updateFillingOptions() {

    layerSelectors.forEach(layerSelector => {

        const layerNumber = Number(layerSelector.dataset.layer);

        if (layerNumber <= selectedLayers) {

            layerSelector.style.display = "block";

        } else {

            layerSelector.style.display = "none";

        }

    });

    fillingInstructions.textContent =
        `Elegí un relleno para cada capa. Necesitás seleccionar ${selectedLayers} rellenos.`;

    updateNextFillingButton();

}


// ========================================
// LIMPIAR LAS SELECCIONES DE RELLENO
// ========================================

function clearFillings() {

    layerSelectors.forEach(layerSelector => {

        const optionsContainer = layerSelector.querySelector(".filling-options");

        optionsContainer.querySelectorAll("input[type='radio']")
            .forEach(radio => {
                radio.checked = false;
            });

        optionsContainer.querySelectorAll(".other-filling-input")
            .forEach(input => {
                input.value = "";
                input.disabled = true;
            });

        optionsContainer.querySelectorAll(".filling-option")
            .forEach(option => {
                option.classList.remove("selected");
            });

    });

    fillingError.textContent = "";

    nextStep3.disabled = true;

}


// ========================================
// VALIDAR LOS RELLENOS SELECCIONADOS
// ========================================

function getSelectedFillings() {

    const selectedFillings = [];

    for (let layer = 1; layer <= selectedLayers; layer++) {

        const selected = document.querySelector(
            `input[name="filling-${layer}"]:checked`
        );

        // Falta elegir un relleno
        if (!selected) {
            return null;
        }

        let fillingName = "";

        if (selected.value === "otra") {

            const otherInput = selected
                .closest(".filling-option")
                .querySelector(".other-filling-input");

            fillingName = otherInput.value.trim();

            if (!fillingName) {
                return null;
            }

        } else {

            const filling = fillings.find(item => item.id === selected.value);

            if (!filling) {
                return null;
            }

            fillingName = filling.name;

        }

        selectedFillings.push(fillingName);

    }

    return selectedFillings;

}


function updateNextFillingButton() {

    if (!selectedLayers) {
        nextStep3.disabled = true;
        return;
    }

    const selectedFillings = getSelectedFillings();

    nextStep3.disabled = !selectedFillings ||
        selectedFillings.length !== selectedLayers;

}


// ========================================
// CONTINUAR AL PASO 4
// ========================================

nextStep3.addEventListener("click", () => {

    const selectedFillings = getSelectedFillings();

    if (!selectedFillings) {

        fillingError.textContent =
            `Completá los ${selectedLayers} rellenos antes de continuar.`;

        return;

    }

    createSummary(selectedFillings);

    showStep(4);

});


// ========================================
// PASO 4: RESUMEN DE LA TORTA
// ========================================

function createSummary(selectedFillings) {

    const summary = [
        `Tamaño: ${selectedSize} cm`,
        `Cantidad de rellenos: ${selectedLayers}`,
        "",
        "Rellenos elegidos:"
    ];

    selectedFillings.forEach((filling, index) => {

        summary.push(`Relleno ${index + 1}: ${filling}`);

    });

    cakeSummary.textContent = summary.join("\n");

}


// ========================================
// BOTONES PARA VOLVER
// ========================================

document.querySelectorAll(".prev-step").forEach(button => {

    button.addEventListener("click", () => {

        if (currentStep > 1) {
            showStep(currentStep - 1);
        }

    });

});


// ========================================
// WHATSAPP
// ========================================

whatsappButton.addEventListener("click", () => {

    const selectedFillings = getSelectedFillings();

    if (!selectedSize || !selectedLayers || !selectedFillings) {

        alert("Revisá las opciones de tu torta antes de continuar.");

        return;

    }

    const fillingsMessage = selectedFillings
        .map((filling, index) => `• Relleno ${index + 1}: ${filling}`)
        .join("\n");

    const message = `¡Hola, Elva Bakery! 💗

Quiero consultar por una torta personalizada.

• Tamaño: ${selectedSize} cm
• Cantidad de rellenos: ${selectedLayers}

${fillingsMessage}

Me gustaría mandarles una foto o diseño de la torta que quiero.
¿Me la pueden cotizar?

¡Gracias!`;

    const phone = "5492616175138";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

});


// ========================================
// INICIALIZAR
// ========================================

createFillingOptions();

showStep(1);