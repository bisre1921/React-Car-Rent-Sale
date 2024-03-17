// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABT52diOZ4IxgT9cHkrjuL3zwlhTvEbSw",
  authDomain: "react-car-rent-sale.firebaseapp.com",
  projectId: "react-car-rent-sale",
  storageBucket: "react-car-rent-sale.appspot.com",
  messagingSenderId: "413867517084",
  appId: "1:413867517084:web:19a0af83f938812017f959",
  measurementId: "G-WQRFVHC67H"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
//const analytics = getAnalytics(app);