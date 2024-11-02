// firebase.js
// Importa las funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD6vov7LtXFKC4MuFF4M1TvNQY4Sdc1OeE",
    authDomain: "virtualpet-2024.firebaseapp.com",
    projectId: "virtualpet-2024",
    storageBucket: "virtualpet-2024.firebaseapp.com",
    messagingSenderId: "118498941716",
    appId: "1:118498941716:web:84eb407cbe6d58d6990001",
    measurementId: "G-CLJHTFTC43"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const DB = getFirestore(app);

export { DB, app };
