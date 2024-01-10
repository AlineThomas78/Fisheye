const form = document.getElementById("contactForm");
const formElements = Array.from(form.elements).filter(element => element.type !== "hidden" && !element.disabled);

form.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();

        const activeElement = document.activeElement;
        const currentIndex = formElements.indexOf(activeElement);

        let nextIndex;
        if (event.key === "ArrowDown") {
            nextIndex = currentIndex < formElements.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : formElements.length - 1;
        }

        formElements[nextIndex].focus();
    }
});

form.addEventListener("submit", function (event) {
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
    form.reset();
 });
