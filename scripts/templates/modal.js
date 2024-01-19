export function displayMedia(mediaIndex, allMedia) {
  const currentMedia = document.querySelector('.currentMedia')
  function displayImageOrVideo(_media) {
    if (_media.image) {
      const imageElement = document.createElement("img");
      imageElement.classList.add("imgCurrentMedia");
      imageElement.setAttribute("alt", "liste d'image du photographe");
      imageElement.src = _media.image;
      currentMedia.appendChild(imageElement);

      // Ajouter le titre en dessous de l'image //
      if (_media.title) {
        const titleElement = document.createElement("p");
        titleElement.classList.add("titleElement");
        titleElement.textContent = _media.title;
        currentMedia.appendChild(titleElement);
      }
    } else {
      const videoElement = document.createElement("video");
      videoElement.classList.add("imgCurrentMedia");
      videoElement.src = _media.video;
      videoElement.controls = true;
      currentMedia.appendChild(videoElement);

      // Ajouter le titre en dessous de la vidéo //
      if (_media.title) {
        const titleElement = document.createElement("p");
        titleElement.classList.add("titleElement");
        titleElement.textContent = _media.title;
        currentMedia.appendChild(titleElement);
      }
    }
  }

  function cleanMedia() {
    const currentMediaElement = document.querySelector(".currentMedia");

    while (currentMediaElement.firstChild) {
      currentMediaElement.removeChild(currentMediaElement.firstChild);
    }
  }
  cleanMedia();
  displayImageOrVideo(allMedia[mediaIndex]);
}
