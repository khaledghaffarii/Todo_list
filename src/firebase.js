
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBnw0mO1sLUCAHEG7spNTgW4x16OZ0pfkU",
  authDomain: "my-todo-app-3b633.firebaseapp.com",
  projectId: "my-todo-app-3b633",
  storageBucket: "my-todo-app-3b633.appspot.com",
  messagingSenderId: "48797533329",
  appId: "1:48797533329:web:4e74a836709634bd162b30",
  measurementId: "G-PFKESFWN6T",
});

const db = firebaseApp.firestore();

export default db;
