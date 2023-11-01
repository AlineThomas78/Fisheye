import { getPhotographers } from "../pages/index.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaTemplate } from "../templates/media.js";

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

    // Recherche du photographe correspondant à l'ID
    const photographer = data.photographers.find(
      (photographer) => photographer.id === parseInt(photographerId)
    );

    if (photographer) {
      // Appel de la fonction pour afficher les données du photographe
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

async function factoryMedia() {
  try {
    const data = await getPhotographers();
    const mediaContainer = document.querySelector(".factoryMedia");

    // Récupérer l'ID du photographe à partir des paramètres de recherche
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get("id");

    // Filtrer les médias en fonction de l'ID du photographe
    const photographerMedia = data.media.filter(
      (media) => media.photographerId === parseInt(photographerId)
    );
    // console.log(photographerMedia)

    // Créer la section de tri et ajoute à la factoryMedia
    const mediaInstance = mediaTemplate(photographerMedia);
    const sortSection = mediaInstance.createSortSection();
    mediaContainer.appendChild(sortSection);

    const articleSection = document.createElement("div");
    articleSection.classList.add("article-section");

    photographerMedia.forEach((media) => {
      const mediaElement = mediaTemplate(media).displayMedia();
      articleSection.appendChild(mediaElement);
    });console.log(photographerMedia)

    mediaContainer.appendChild(articleSection);

    // Section Select
    const selectElement = document.querySelector(".sort-select");
    // Écoutez les changements de sélection dans le select
    selectElement.addEventListener("change", (event) => {
      console.log("Changement détecté !");
      const selectedOption = event.target.value;
      if (selectedOption === "Date") {
        console.log("Option Date sélectionnée");
        
        // Triez les images par date
        photographerMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (selectedOption === "Titre") {
        console.log("Option Titre sélectionnée");
        // Triez les images par titre
        photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
      } else if (selectedOption === "Popularité") {
        console.log("Option Popularité sélectionnée");
        // Triez les images par popularité 
        photographerMedia.sort((a, b) => b.likes - a.likes);
        }

      // Effacez le contenu de articleSection
      articleSection.innerHTML = "";

      // Affichage des images triées
      photographerMedia.forEach((media) => {
        const mediaElement = mediaTemplate(media).displayMedia();
        articleSection.appendChild(mediaElement);
        console.log(media.title, media.likes, media.date);
      });
    });
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
  }
}

factoryMedia();
