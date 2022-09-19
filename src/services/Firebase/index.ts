import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import type { Photo, Gallery } from "../../types";
import seedData from "../../../photos.json";

// https://console.firebase.google.com/project/fairhurst-photos/firestore/data

const firebaseConfig = {
  apiKey: "AIzaSyCRxzGYcg9dwy5_X_XNxqHJ_onflR_eO8c",
  authDomain: "fairhurst-photos.firebaseapp.com",
  projectId: "fairhurst-photos",
  storageBucket: "fairhurst-photos.appspot.com",
  messagingSenderId: "213068414952",
  appId: "1:213068414952:web:47fe7f12bb110e69ddae5d",
};

class Firebase {
  app;
  db;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async listGalleries(): Promise<Gallery[]> {
    const querySnapshot = await getDocs(collection(this.db, "galleries"));
    const galleries: Gallery[] = [];

    await querySnapshot.forEach((doc) => {
      const { folder, cover } = doc.data();
      galleries.push({ name: doc.id, folder, cover });
    });
    return galleries;
  }

  async addPhoto(gallery: string, photo: Photo): Promise<string> {
    try {
      const galleryRef = doc(this.db, `galleries/${gallery}`);
      const docRef = await addDoc(collection(galleryRef, "photos"), photo);
      return docRef.id;
    } catch (e: any) {
      console.error("Error adding photo: ", e);
      return e.message as string;
    }
  }

  async getPhotos(gallery: string): Promise<Photo[]> {
    const galleryRef = doc(this.db, `galleries/${gallery}`);
    const querySnapshot = await getDocs(collection(galleryRef, "photos"));
    const photos: Photo[] = [];

    await querySnapshot.forEach((doc) => {
      photos.push(doc.data() as Photo);
    });
    return photos;
  }

  async seed() {
    seedData.map(({ gallery, ...photo }) => {
      this.addPhoto(gallery, photo);
    });
  }
}

export default new Firebase();
