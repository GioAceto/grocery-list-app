// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7yzlAAsp4jsZU6K0oxUbsp5gyJUDFp_w",
  authDomain: "grocery-list-app-vue.firebaseapp.com",
  projectId: "grocery-list-app-vue",
  storageBucket: "grocery-list-app-vue.appspot.com",
  messagingSenderId: "321486510361",
  appId: "1:321486510361:web:0c9b49863e0d124fa78d88",
  measurementId: "G-BW7C3ZBW1K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
