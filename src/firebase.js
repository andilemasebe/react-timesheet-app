import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY || "YOUR_API_KEY",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: process.env.REACT_APP_PROJECT_ID || "YOUR_PROJECT_ID",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
    appId: process.env.REACT_APP_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };