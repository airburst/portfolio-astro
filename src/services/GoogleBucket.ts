// Imports the Google Cloud client library
import { Storage, File } from "@google-cloud/storage";
import type { Gallery } from "../types";

class GoogleBucket {
  bucketName: string;
  storage: Storage;

  constructor(bucketName: string) {
    this.storage = new Storage({ keyFilename: "service.json" });
    this.bucketName = bucketName;
  }

  async listFolders() {
    // Lists folders in the bucket
    const [files] = await this.storage.bucket(this.bucketName).getFiles();

    return files
      .filter((file: File) => file.name.endsWith("/"))
      .map((file: File) => file.name.slice(0, -1));
  }

  async listFiles(folder = "") {
    let options = undefined;
    if (folder) {
      options = { prefix: `${folder}/`, delimiter: "/" };
    }
    const [files] = await this.storage
      .bucket(this.bucketName)
      .getFiles(options);

    return files.map((file: File) => file.name);
  }

  async getGalleries() {
    const folders = await this.listFolders();
    const galleries: Gallery[] = [];

    for (const folder of folders) {
      const files = await this.listFiles(folder);
      const coverFile = files.find((file: string) =>
        file.endsWith("cover.txt")
      );
      if (coverFile) {
        const { cover, caption = null } = await this.getMetadata(coverFile);

        galleries.push({ folder, cover: `${folder}/${cover}`, caption });
      } else {
        // Use most recent file as cover
        galleries.push({ folder, cover: files[files.length - 1] });
      }
    }
    return galleries;
  }

  async getMetadata(fileName: string) {
    try {
      const [metadata] = await this.storage
        .bucket(this.bucketName)
        .file(fileName)
        .getMetadata();
      return metadata.metadata;
    } catch (error: any) {
      console.error("💢 ", error.message);
      return null;
    }
  }

  async setMetadata(fileName: string, meta: any) {
    try {
      const [metadata] = await this.storage
        .bucket(this.bucketName)
        .file(fileName)
        .setMetadata({ metadata: meta });
      return metadata;
    } catch (error: any) {
      console.error("💢 ", error.message);
      return null;
    }
  }
}

export default GoogleBucket;
