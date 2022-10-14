import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNaS097KHnzL3aWCzPB4XLz7FJAFY81Ow",
    authDomain: "open-cem.firebaseapp.com",
    projectId: "open-cem",
    storageBucket: "open-cem.appspot.com",
    messagingSenderId: "345071906471",
    appId: "1:345071906471:web:7149ce691041719952f582",
    measurementId: "G-5Y9W4X3SLN"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage };
