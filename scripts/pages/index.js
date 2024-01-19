import { photographerTemplate } from '../templates/photographer.js';

 export async function getPhotographers() {
  try {
      const response = await fetch('data/photographers.json'); 
      if (!response.ok) {
        throw new Error('La requête Fetch a échoué');
      }
  
      const photographersData = await response.json();
      const photographers = photographersData.photographers;
      const media = photographersData.media;
  
      return {
        photographers,media,
      };
    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération des données :', error);
      return {
        photographers: [],
        media:[], 
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

if (
  window.location.pathname === "/index.html" ||
  window.location.pathname === "/"
) {
  init();
}

