/*import { initializeApp } from "firebase/app";
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
*/
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLDa955jy--M6vYd2H5y6FNXsTm1OM6XY",
  authDomain: "bantay-bayan-6c802.firebaseapp.com",
  projectId: "bantay-bayan-6c802",
  storageBucket: "bantay-bayan-6c802.appspot.com",
  messagingSenderId: "336522311020",
  appId: "1:336522311020:web:d91e50ad07e367df74af49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };



