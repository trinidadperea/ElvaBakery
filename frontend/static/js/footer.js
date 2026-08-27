fetch("../templates/footer.html")
    .then(response => response.text())
    .then(data => {

        document.body.insertAdjacentHTML("beforeend", data);

    })
    .catch(error => {
        console.error("No se pudo cargar el footer:", error);
    });