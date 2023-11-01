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

async function factoryMedia() {
  try {
    const data = await getPhotographers();
    const mediaContainer = document.querySelector(".factoryMedia");

    // Récupérez l'ID du photographe à partir des paramètres de recherche
    const params = new URLSearchParams(window.location.search);
    const photographerId = params.get("id");

    // Filtrez les médias en fonction de l'ID du photographe
    const photographerMedia = data.media.filter(
      (media) => media.photographerId === parseInt(photographerId)
    );
    // console.log(photographerMedia);

    // Créez la section de tri et ajoutez-la à la factoryMedia
    const mediaInstance = mediaTemplate(photographerMedia); // Utilisez photographerMedia ici    mediaContainer.appendChild(sortSection);
    const sortSection = mediaInstance.createSortSection();
    mediaContainer.appendChild(sortSection);

    const articleSection = document.createElement("div"); // Créez la div article-section en dehors de la boucle
    articleSection.classList.add('article-section');

    photographerMedia.forEach((media) => {
      const mediaElement = mediaTemplate(media).displayMedia(); // Appelez la fonction displayMedia() directement
      articleSection.appendChild(mediaElement); // Ajoutez chaque article à la div article-section
    });

    mediaContainer.appendChild(articleSection); // Ajoutez la div article-section à la factoryMedia
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
  }
}

factoryMedia();
