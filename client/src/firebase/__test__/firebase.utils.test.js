import firestoreAuth from "firebase/auth";

import {
  signInWithGooglePopup,
  signInAccountWithEmailAndPassword,
  createAccountWithEmailAndPassword,
  signOutAccount,
} from "../firebase.utils";

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    signInWithPopup: jest.fn(),
    GoogleAuthProvider: jest.fn().mockImplementation(() => {
      return {
        addScope: jest.fn(),
        setCustomParameters: jest.fn(),
      };
    }),
    signOut: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
  };
});

describe("firebase utils - auth", () => {
  it("Sign In with Google popup", () => {
    signInWithGooglePopup();
    expect(firestoreAuth.signInWithPopup).toHaveBeenCalled();
  });

  it("Sign In with Email and Password", () => {
    const testAccount = {
      email: "testEmail",
      password: "testPassword",
    };
    signInAccountWithEmailAndPassword(testAccount.email, testAccount.password);
    expect(firestoreAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      testAccount.email,
      testAccount.password
    );
  });

  it("Create user with Email and Password", () => {
    const testAccount = {
      email: "testEmail",
      password: "testPassword",
    };
    createAccountWithEmailAndPassword(testAccount.email, testAccount.password);
    expect(firestoreAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      testAccount.email,
      testAccount.password
    );
  });

  it("Sign Out", () => {
    signOutAccount();
    expect(firestoreAuth.signOut).toHaveBeenCalled();
  });
});
