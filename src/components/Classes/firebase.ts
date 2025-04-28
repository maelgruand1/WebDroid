// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 🔥 Ajout

const firebaseConfig = {
  apiKey: "API_KEY_GOOGLE",
  authDomain: "webdroid-react-2025.firebaseapp.com",
  projectId: "webdroid-react-2025",
  storageBucket: "webdroid-react-2025.appspot.com", // 🛠 Correction ici
  messagingSenderId: "480667434855",
  appId: "1:480667434855:web:ddc9d3f61f59381f9479c2",
  measurementId: "G-RQHP1ZGPPG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
