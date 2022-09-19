import firebase from "./Firebase";

class Photos {
  getGalleries() {
    return firebase.listGalleries();
  }

  async getPhotos(gallery: string) {
    const photos = await firebase.getPhotos(gallery);

    return photos;
  }
}

export default new Photos();
