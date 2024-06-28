// FIREBASE
import  firebase  from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAjNghy6ruAoStwvKi9PPA7GBe6jLI-y1c",
  authDomain: "forum-409f1.firebaseapp.com",
  projectId: "forum-409f1",
  storageBucket: "forum-409f1.appspot.com",
  messagingSenderId: "795161880345",
  appId: "1:795161880345:web:21ac114342253123188788"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };