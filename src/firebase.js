// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWNpbMXKkMyORPOE_ozZLYoOpGBL1kVCA",
  authDomain: "sparktech-web.firebaseapp.com",
  projectId: "sparktech-web",
  storageBucket: "sparktech-web.appspot.com",
  messagingSenderId: "34284786274",
  appId: "1:34284786274:web:d3192de8964bbea379f73b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the authentication service
const auth = getAuth(app);

export { auth };


