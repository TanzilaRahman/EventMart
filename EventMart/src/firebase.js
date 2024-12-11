import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNSw11DNRyNcz8MbE5mUSwfGHAUnUSFQI",
    authDomain: "event-user-auth.firebaseapp.com",
    projectId: "event-user-auth",
    storageBucket: "event-user-auth.firebasestorage.app",
    messagingSenderId: "349005722724",
    appId: "1:349005722724:web:7455fade89f5b02f079b71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Get Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };