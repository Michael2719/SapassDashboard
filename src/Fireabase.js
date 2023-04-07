// Import the functions you need from the SDKs you need
import { initializeApp } from "../node_modules/firebase/app";
import {getAuth} from "../node_modules/firebase/auth";
import {getFirestore,query,getDocs,collection,where,addDoc} from "../node_modules/firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBu7-gSxO6M176VFmEMj_jkg8RHuvcc2S8",
  authDomain: "sapass-d028e.firebaseapp.com",
  projectId: "sapass-d028e",
  storageBucket: "gs://sapass-d028e.appspot.com",
  messagingSenderId: "38592385095",
  appId: "1:38592385095:web:464fd1ce93ad69cf7a6162",
  measurementId: "G-7ZCERJEM75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);