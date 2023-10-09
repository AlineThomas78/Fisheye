import { getPhotographers } from '../pages/index.js';
import { photographerTemplate } from '../templates/photographer.js';

// Récupération de l'ID du photographe à partir des paramètres de recherche
const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");

async function displayPhotographer(photographerData) {
  const sectionInfo = document.querySelector(".photograph-info");
  
      const photographerModel = photographerTemplate(photographerData);
      const userCardDOM = photographerModel.getPhotographersHeader();
      // sectionInfo.appendChild(userCardDOM);
  
}

async function initHeader() {
  try {
    const data = await getPhotographers();

    // Recherchez le photographe correspondant à l'ID
    const photographer = data.photographers.find(
      (photographer) => photographer.id === parseInt(photographerId)
    );

    if (photographer) {
      // Appeler la fonction pour afficher les données du photographe
      displayPhotographer(photographer);
    } else {
      console.error("Aucun photographe trouvé avec l'ID spécifié");
    }
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des données du photographe :",
      error
    );
  }
}

initHeader();









