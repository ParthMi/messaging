// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase,set, ref, get,child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-OrANBt0BiaW21dhEB7NLj96iBgOaEo0",
  authDomain: "messaging-23ec9.firebaseapp.com",
  projectId: "messaging-23ec9",
  storageBucket: "messaging-23ec9.appspot.com",
  messagingSenderId: "402127668542",
  appId: "1:402127668542:web:99a8529f7143be5add186f",
  measurementId: "G-ME12CDDBM6",
  databaseURL: "https://messaging-23ec9-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getDatabase(app);
const analytics = getAnalytics(app);