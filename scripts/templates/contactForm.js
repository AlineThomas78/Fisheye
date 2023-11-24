function contactForm() {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Récupérations des valeurs des champs //
        const inputNameValue = document.querySelector(".inputName").value;
        const inputFirstNameValue = document.querySelector(".inputFirstName").value;
        const inputEmailValue = document.querySelector(".inputEmail").value;
        const textAreaValue = document.querySelector(".textArea").value;

        // Créer un objet avec les données du formulaire
        const formData = {
            inputName: inputNameValue,
            inputFirstName: inputFirstNameValue,
            inputEmail: inputEmailValue,
            textArea: textAreaValue,
        };

        console.log("Données du formulaire :", formData);

    });
}