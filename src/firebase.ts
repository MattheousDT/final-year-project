import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/performance";
import "firebase/analytics";

//@ts-ignore
firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const analytics = firebase.analytics();

export const logPageView = () =>
  analytics.logEvent("page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
