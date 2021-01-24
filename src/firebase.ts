import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/performance";
// import "firebase/analytics";

import firebaseConfig from "./config/firebase.config.json";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
