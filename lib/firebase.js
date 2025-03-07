import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Your Firebase config (found in Firebase Console > Project settings)
const firebaseConfig = {
  apiKey: "AIzaSyBseJVg19K5IPux6xVve4OkYFM31dSoOR",
  authDomain: "pnp-bantay-bayan.firebaseapp.com",
  projectId: "pnp-bantay-bayan",
  storageBucket: "pnp-bantay-bayan.firebasestorage.app",
  messagingSenderId: "523260018332",
  appId: "1:523260018332:web:40401ef5e8bdfb9cafb759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
