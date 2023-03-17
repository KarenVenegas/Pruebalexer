import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const app = firebase.initializeApp({
    "projectId": "gdi-lexer",
    "appId": "1:429725269477:web:5b608ea52b4d85079b430c",
    "storageBucket": "gdi-lexer.appspot.com",
    "apiKey": "AIzaSyAr3w3sIzmZL4MK8eMbPXIRTL30O2QhfZM",
    "authDomain": "gdi-lexer.firebaseapp.com",
    "messagingSenderId": "429725269477"
  });