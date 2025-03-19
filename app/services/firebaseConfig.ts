import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoayQ9N2v1Cs1Z6eit8WXA7BDdP5IiRWo",
    authDomain: "synestesia-a0ea7.firebaseapp.com",
    projectId: "synestesia-a0ea7",
    storageBucket: "synestesia-a0ea7.firebasestorage.app",
    messagingSenderId: "389269434145",
    appId: "1:389269434145:web:09d6944b038ea5c76ed860"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default firebaseConfig;
