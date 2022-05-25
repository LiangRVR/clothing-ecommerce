// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

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
export const auth = getAuth();

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
GoogleProvider.setCustomParameters({
  prompt: "select_account",
});

export const credentialResult = GoogleAuthProvider.credentialFromResult;

export const credentialError = GoogleAuthProvider.credentialFromError;

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, GoogleProvider);

export const createAccountWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInAccountWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutAccount = () => signOut(auth);

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

export const getUserCartRef = async (userId) => {
  const q = query(collection(db, "carts"), where("userId", "==", userId));
  const cartsSnapshot = await getDocs(q);

  if (cartsSnapshot.empty) {
    const cartsRef = doc(collection(db, "carts"));
    try {
      setDoc(cartsRef, {
        userId,
        cartItems: [],
      });
      return cartsRef;
    } catch (error) {
      console.log("error creating cart User", error.message);
    }
  }
  return cartsSnapshot.docs[0].ref;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const collectionRef = (collectionKey) => collection(db, collectionKey);

export const convertCollectionSnapShotToMap = (collection) => {
  const transformedCollection = collection.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
