import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/performance";
// import "firebase/analytics";

import firebaseConfig from "./config/firebase.config.json";
import { user } from "./stores/user";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

auth.onAuthStateChanged((e) => {
  user.set(e);
});
