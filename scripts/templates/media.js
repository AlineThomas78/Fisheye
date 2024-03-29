export function mediaTemplate(media) {
  const { title, image, likes, video } = media;
  const isVideo = video !== undefined;
  const mediaSource = isVideo ? video : image;
  const imgLike = "./public/assets/images/like.png";

  function createSortSection() {
    const sortDiv = document.createElement("div");
    sortDiv.classList.add("sort-section");

    const label = document.createElement("label");
    label.textContent = "Trier par :";
    label.classList.add("selectLabel");

    const select = document.createElement("select");
    select.setAttribute("aria-labelledby", "Order by");
    select.classList.add("sort-select");
    

    const options = ["Selectionnez", "Popularité", "Date", "Titre"];
    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.textContent = optionText;
      select.appendChild(option);
    });

    sortDiv.appendChild(label);
    sortDiv.appendChild(select);
    select.setAttribute("tabindex", "0");
    return sortDiv;
  }

  //Carousel
  function displayMedia() {
    const article = document.createElement("article");
    article.classList.add("article");
    article.setAttribute("tabindex", "0")

    article.setAttribute("role", "dialog");
    article.setAttribute("aria-label", "Carrousel d'images");

    const link = document.createElement("a");
    link.classList.add("link");

    if (isVideo) {
      // Créez un élément vidéo si c'est une vidéo
      const videoElement = document.createElement("video");
      videoElement.setAttribute("src", mediaSource);
      videoElement.classList.add("img");
      videoElement.controls = true;
      link.appendChild(videoElement);
    } else {
      // Créez un élément img si c'est une image
      const img = document.createElement("img");
      img.setAttribute("src", mediaSource);
      img.setAttribute("alt", `${media.title}, closeup view`);
      img.classList.add("img");
      link.appendChild(img);
    }

    const divContainer = document.createElement("div");
    divContainer.classList.add("containerElements");

    const divTitle = document.createElement("div");
    divTitle.classList.add("containerTitle");

    const divLikes = document.createElement("div");
    divLikes.classList.add("container-likes");

    const titleElement = document.createElement("h6");
    titleElement.textContent = title;

    const likesElement = document.createElement("p");
    likesElement.classList.add("number_like");
    likesElement.textContent = likes;

    const likeImage = document.createElement("img");
    likeImage.setAttribute("src", `./${imgLike}`);
    likeImage.classList.add("like-image");
    likeImage.addEventListener("click", () => {
    likesElement.textContent++;

    const totalLike = document.querySelector(".spanPrice");

    totalLike.innerHTML = (Number(totalLike.innerHTML) + 1).toString();

    });

    article.appendChild(link);
    article.appendChild(divContainer);
    divContainer.appendChild(divTitle);
    divContainer.appendChild(divLikes);
    divTitle.appendChild(titleElement);
    divLikes.appendChild(likesElement);
    divLikes.appendChild(likeImage);

    return article;
  }

  return {
    title,
    isVideo,
    mediaSource,
    likes,
    displayMedia,
    createSortSection,
  };
}
