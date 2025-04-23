// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBthzUVgp8AFGl6osPxUdEdN-zhxy5Op0o",
  authDomain: "webdroid-react-2025.firebaseapp.com",
  projectId: "webdroid-react-2025",
  storageBucket: "webdroid-react-2025.firebasestorage.app",
  messagingSenderId: "480667434855",
  appId: "1:480667434855:web:ddc9d3f61f59381f9479c2",
  measurementId: "G-RQHP1ZGPPG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db }

