// import {initializeApp} from 'firebase'
import firebase from 'firebase/app'
import 'firebase/database'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDIijMkH3YutfueU9izslA0tE3T0wR-v8Y",
    authDomain: "petstore-f9631.firebaseapp.com",
    databaseURL: "https://petstore-f9631.firebaseio.com",
    projectId: "petstore-f9631",
    storageBucket: "petstore-f9631.appspot.com",
    messagingSenderId: "40886027765",
    appId: "1:40886027765:web:ebdfb42d985f051fbe8cbc"
  };
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
    // firebase.initializeApp({});
    export const db = firebase
    .initializeApp(firebaseConfig)
    .database()

