// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaUpZW7s5YNW5WFz0rZPalQY1EkEtNOtQ",
  authDomain: "clothing-ecommerce-db-c8d1f.firebaseapp.com",
  projectId: "clothing-ecommerce-db-c8d1f",
  storageBucket: "clothing-ecommerce-db-c8d1f.appspot.com",
  messagingSenderId: "52497670118",
  appId: "1:52497670118:web:8effc93aaf555823300027",
  measurementId: "G-3L9MW5L4D8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//auth
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const createAccountWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInAccountWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signOutAccount = () => signOut(auth);

export const credentialResult = GoogleAuthProvider.credentialFromResult;

export const credentialError = GoogleAuthProvider.credentialFromError;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
