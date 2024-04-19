import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyADtis0jF6thRbYgEPNbph_UeecS9qUNRc",
  authDomain: "note-taking-app-b68c1.firebaseapp.com",
  databaseURL:
    "https://note-taking-app-b68c1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "note-taking-app-b68c1",
  storageBucket: "note-taking-app-b68c1.appspot.com",
  messagingSenderId: "934844257380",
  appId: "1:934844257380:web:78ef7a53efd92fff3e7b71",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const imgDb = getStorage(app);
