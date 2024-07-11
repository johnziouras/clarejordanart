import { initializeApp } from "@firebase/app";
import { Firestore } from "@firebase/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getImages(db: Firestore, path: string) {
  const imagesCol = collection(db, path);
  const imagesSnapshot = await getDocs(imagesCol);
  const imagesList = imagesSnapshot.docs.map((doc) => doc.data());
  return imagesList;
}

export { db, getImages };
