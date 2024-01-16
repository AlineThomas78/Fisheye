export function photographerTemplate(photographers) {
  const { id, name, portrait, city, country, tagline, price } = photographers;

  const picture = `${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.href = `../../scripts/templates/photographer.html?id=${id}`;
    
    const img = document.createElement("img");

    img.setAttribute("src", `./${picture}`);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const localisation = document.createElement("h5");
    localisation.textContent = city + "," + " " + country;
    const tag = document.createElement("p");
    tag.textContent = tagline;
    const prices = document.createElement("p");
    prices.classList.add("price");
    prices.textContent = price + " €/jour";

    // Ajoutez un gestionnaire d'événement au lien pour la redirection
    link.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = link.href; // Redirige l'utilisateur vers la page photographer.html
    });

    // Ajoutez l'image et le titre à l'intérieur du lien
    link.appendChild(img);
    link.appendChild(h2);

    article.appendChild(link);
    article.appendChild(localisation);
    article.appendChild(tag);
    article.appendChild(prices);
    return article;
  }

  async function getPhotographersHeader() {
    //Créez les éléments HTML pour afficher les informations du photographe dans le header
    
    const article = document.querySelector(".photograph-info");
    const portrait = document.querySelector('.photograph-header');

    const nameElement = document.createElement("h1");
    nameElement.textContent = name;

    const cityElement = document.createElement("p");
    cityElement.textContent = city + ", " + country;

    const taglineElement = document.createElement("p");
    taglineElement.classList.add("tagline");
    taglineElement.textContent = tagline;

    const portraitElement = document.createElement("img");
    portraitElement.src = picture;
    portraitElement.alt = name;

    // Ajoutez ces éléments aux div correspondantes
    article.appendChild(nameElement);
    article.appendChild(cityElement);
    article.appendChild(taglineElement);
    portrait.appendChild(portraitElement);
  
    return  article ;
  }

  return {name,picture,city,tagline,price,getUserCardDOM,getPhotographersHeader, };
}
