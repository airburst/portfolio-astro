import GoogleBucket from "./GoogleBucket";

class Photos {
  bucket: any;

  constructor() {
    this.bucket = new GoogleBucket('fairhurst-photo-gallery');
  }

  getGalleries() {
    return this.bucket.getGalleries();
  }

  async getPhotos(folder: string) {
    const photos = await this.bucket.listFiles(folder);

    return photos.filter((photo: string) => !photo.endsWith('/') && !photo.endsWith('cover.txt'));
  }
}

export default new Photos();
