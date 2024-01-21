import { getPhotographers } from "../pages/index.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaTemplate } from "../templates/media.js";
import { displayMedia } from "../templates/modal.js";

// Récupération de l'ID du photographe à partir des paramètres de recherche
const params = new URLSearchParams(window.location.search);
const photographerId = params.get("id");

async function displayPhotographer(photographerData) {
  const sectionInfo = document.querySelector(".photograph-info");

  const photographerModel = photographerTemplate(photographerData);
  const userCardDOM = photographerModel.getPhotographersHeader();
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

    // Filtrer les médias en fonction de l'ID du photographe
    const photographerMedia = data.media.filter(
      (media) => media.photographerId === parseInt(photographerId)
    );

    // Créer la section de tri et ajouter à la factoryMedia
    const mediaInstance = mediaTemplate(photographerMedia);
    const sortSection = mediaInstance.createSortSection();
    mediaContainer.appendChild(sortSection);

    const articleSection = document.createElement("div");
    articleSection.classList.add("article-section");

    const closeModalBtn = document.getElementById("closeModalBtn");
    closeModalBtn.addEventListener("click", () => {
      const carouselModal = document.querySelector(".carouselModal");
      carouselModal.style.display = "none";
    });

    let totalLike = 0;
    function displayEveryMedia() {
      photographerMedia.forEach((media, mediaIndex) => {
        totalLike += media.likes;
        const mediaElement = mediaTemplate(media).displayMedia();
        articleSection.appendChild(mediaElement);

        // Ajoutez un gestionnaire de clic pour chaque image
        mediaElement.firstElementChild.addEventListener("click", () => {
          const carouselModal = document.querySelector(".carouselModal");
          carouselModal.setAttribute("aria-label", "image closeup view");
          carouselModal.style.display = "flex";

          displayMedia(mediaIndex, photographerMedia);
          const previousBtn = document.querySelector(".previousBtn");
          const nextBtn = document.querySelector(".nextBtn");

          let currentIndex = mediaIndex;

          function goPrevious() {
            if (currentIndex - 1 < 0) {
              currentIndex = photographerMedia.length - 1;
            } else {
              currentIndex--;
            }
            displayMedia(currentIndex, photographerMedia);
          }

          function goNext() {
            if (currentIndex + 1 > photographerMedia.length - 1) {
              currentIndex = 0;
            } else {
              currentIndex++;
            }
            displayMedia(currentIndex, photographerMedia);
          }

          previousBtn.addEventListener("click", () => {
            goPrevious();
          });

          nextBtn.addEventListener("click", () => {
            goNext();
          });
          // Gestionnaire d'événements pour les touches fleches
          document.addEventListener("keydown", (event) => {
            if (carouselModal.style.display === "flex") {
              if (event.key === "ArrowLeft") {
                goPrevious();
              }
              if (event.key === "ArrowRight") {
                goNext();
              }
            }
          });
        });
      });
    }
    displayEveryMedia();

    // MODAL LIKE //
    const modalLike = document.querySelector(".likes");
    modalLike.innerHTML = `
    <div class="contentLikes">
       <span class="spanPrice">${totalLike}</span>
       <img class="priceImg" alt="icone en forme de coeur"
             src="./public/assets/images/heartBlack.png"
        >
    </div>`;

    const priceDays = document.querySelector(".price");
    const photographer = data.photographers.find((d) => d.id == photographerId);
    priceDays.innerHTML = `${photographer.price} € /jour`;

    mediaContainer.appendChild(articleSection);
    // Section Select
    const selectElement = document.querySelector(".sort-select");
    // Écoutez les changements de sélection dans le select
    selectElement.addEventListener("change", (event) => {
      const selectedOption = event.target.value;
      if (selectedOption === "Date") {

        // Triez les images par date
        photographerMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (selectedOption === "Titre") {
        // Triez les images par titre
        photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
      } else if (selectedOption === "Popularité") {
        // Triez les images par popularité
        photographerMedia.sort((a, b) => b.likes - a.likes);
      }
      
      // Effacez le contenu de articleSection
      articleSection.innerHTML = "";
      // Afficher les media triés de la même manière
      displayEveryMedia();
    });
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
  }
}

factoryMedia();
