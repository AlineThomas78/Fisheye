 // Créez une factory pour les médias
 function createMedia(data) {
    return {
      id: data.id,
      photographerId: data.photographerId,
      title: data.title,
      image: data.image,
      likes: data.likes,
      date: data.date,
	  price: data.price,
    };
  }