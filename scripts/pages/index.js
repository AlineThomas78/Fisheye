    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        try {
            const response = await fetch('data/photographers.json'); 
            if (!response.ok) {
              throw new Error('La requête Fetch a échoué');
            }
        
            const photographersData = await response.json();
            const photographers = photographersData.photographers;
        
            return {
              photographers,
            };
          } catch (error) {
            console.error('Une erreur est survenue lors de la récupération des données :', error);
            return {
              photographers: [], // Vous pouvez renvoyer un tableau vide ou gérer l'erreur autrement.
            };
          }
        }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
