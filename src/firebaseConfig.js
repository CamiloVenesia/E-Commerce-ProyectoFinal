import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCfEhXS6p4NC73Ge9yKOdzY2xOnx_8RK3o",
    authDomain: "e-commerce-pf-lamatera.firebaseapp.com",
    projectId: "e-commerce-pf-lamatera",
    storageBucket: "e-commerce-pf-lamatera.firebasestorage.app",
    messagingSenderId: "12349078561",
    appId: "1:12349078561:web:35a4cbc2cb71c95ea87760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)