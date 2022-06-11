import { takeLatest, put, call } from "redux-saga/effects";
import UserActionsTypes from "../user.types";
import {
  onSignUpSuccess,
  signInAfterSignUp,
  onSignUpStart,
  signUp,
  onSignOutStart,
  signOut,
  onCheckUserSession,
  isUserAuthenticated,
  onGoogleSignInStart,
  signInWithGoogle,
  onEmailSignInStart,
  signInWithEmail,
  getSnapshotFromUserAuth,
} from "../user.sagas";

import {
  createAccountWithEmailAndPassword,
  signOutAccount,
  getCurrentUser,
  signInAccountWithEmailAndPassword,
  signInWithGooglePopup,
  createUserProfileDocument,
} from "../../../firebase/firebase.utils";

import {
  signInFailure,
  signInSuccess,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
} from "../user.actions";

import { getDoc } from "firebase/firestore";

jest.mock("../../../firebase/firebase.utils", () => {
  return {
    createAccountWithEmailAndPassword: jest.fn(),
    signOutAccount: jest.fn(),
    getCurrentUser: jest.fn(),
    signInAccountWithEmailAndPassword: jest.fn(),
    signInWithGooglePopup: jest.fn(),
    createUserProfileDocument: jest.fn(),
  };
});

jest.mock("firebase/firestore", () => {
  return {
    getDoc: jest.fn(),
  };
});

describe("testing user sagas", () => {
  const mockEmail = "liang@gmail.com";
  const mockPassword = "test123";
  const mockDisplayName = "liang";
  const mockAdditionalData = {
    displayName: mockDisplayName,
  };
  const mockUser = {
    user: {
      id: 123456895623,
      email: mockEmail,
    },
  };

  const mockActionSignUp = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockAdditionalData.displayName,
    },
  };

  const mockActionSignInAfterSingUp = {
    payload: {
      user: mockUser.user,
      additionalData: mockAdditionalData,
    },
  };

  it("should trigger signInAfterSignUp on SIGN_UP_SUCCESS", () => {
    const generator = onSignUpSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionsTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger signUp on SIGN_UP_START", () => {
    const generator = onSignUpStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionsTypes.SIGN_UP_START, signUp)
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger signOut on SIGN_OUT_START", () => {
    const generator = onSignOutStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionsTypes.SIGN_OUT_START, signOut)
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger isUserAuthenticated on CHECK_USER_SESSION", () => {
    const generator = onCheckUserSession();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionsTypes.CHECK_USER_SESSION, isUserAuthenticated)
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger signInWithGoogle on GOOGLE_SIGN_IN_START", () => {
    const generator = onGoogleSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionsTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger signInWithEmail on EMAIL_SIGN_IN_START", () => {
    const generator = onEmailSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionsTypes.EMAIL_SIGN_IN_START, signInWithEmail)
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger getSnapshotFromUserAuth on signInAfterSignUp", () => {
    const generator = signInAfterSignUp(mockActionSignInAfterSingUp);
    expect(generator.next().value).toEqual(
      getSnapshotFromUserAuth(mockUser.user, mockAdditionalData)
    );
    expect(generator.next().done).toBe(true);
  });

  describe("on sign up", () => {
    const generator = signUp(mockActionSignUp);

    it("should trigger createAccountWithEmailAndPassword", () => {
      generator.next();
      expect(createAccountWithEmailAndPassword).toBeCalledWith(
        mockEmail,
        mockPassword
      );
    });

    it("should put signUpSuccess when createAccountWithEmailAndPassword done with no error", () => {
      expect(generator.next(mockUser).value).toEqual(
        put(
          signUpSuccess({
            user: mockUser.user,
            additionalData: { displayName: mockDisplayName },
          })
        )
      );
    });

    it("should put signUpFailure on error", () => {
      const failGenerator = signUp(mockActionSignUp);
      failGenerator.next();
      expect(failGenerator.throw("error").value).toEqual(
        put(signUpFailure("error"))
      );
    });
  });

  describe("on sign out", () => {
    const generator = signOut();
    it("should trigger signOutAccount", () => {
      generator.next();
      expect(signOutAccount).toBeCalled();
    });

    it("should put signOutSuccess when signOutAccount done with no error", () => {
      expect(generator.next().value).toEqual(put(signOutSuccess()));
      expect(generator.next().done).toBe(true);
    });

    it("should put signOutFailure on error", () => {
      const failGenerator = signOut();
      failGenerator.next();
      expect(failGenerator.throw("error").value).toEqual(
        put(signOutFailure("error"))
      );
    });
  });

  describe("is there an user Authenticated", () => {
    const mockUserAuth = { uid: 54681324465465432 };

    const generator = isUserAuthenticated();
    it("should trigger getCurrentUser", () => {
      generator.next();
      expect(getCurrentUser).toBeCalled();
    });

    it("should trigger getSnapshotFromUserAuth", () => {
      expect(generator.next(mockUserAuth).value).toEqual(
        getSnapshotFromUserAuth(mockUserAuth)
      );
    });

    it("should done if there no an user authenticated", () => {
      const doneGenerator = isUserAuthenticated();
      doneGenerator.next();
      expect(doneGenerator.next().done).toBe(true);
    });

    it("should put signInFailure on error", () => {
      const failGenerator = isUserAuthenticated();
      failGenerator.next();
      expect(failGenerator.throw("error").value).toEqual(
        put(signInFailure("error"))
      );
    });
  });

  describe("sign in with email and password", () => {
    const generator = signInWithEmail(mockActionSignUp);
    it("should trigger signAccountWithEmailAndPassword", () => {
      generator.next();
      expect(signInAccountWithEmailAndPassword).toBeCalledWith(
        mockEmail,
        mockPassword
      );
    });

    it("should trigger getSnapshotFromUserAuth", () => {
      expect(generator.next(mockUser).value).toEqual(
        getSnapshotFromUserAuth(mockUser.user)
      );
      expect(generator.next().done).toBe(true);
    });

    it("should put signInFailure on error", () => {
      const failGenerator = signInWithEmail(mockActionSignUp);
      failGenerator.next();
      expect(failGenerator.throw("error").value).toEqual(
        put(signInFailure("error"))
      );
    });
  });

  describe("sign in with Google", () => {
    const generator = signInWithGoogle();
    it("should trigger signInWithGooglePopup", () => {
      generator.next();
      expect(signInWithGooglePopup).toBeCalled();
    });

    it("should trigger getSnapshotFromUserAuth", () => {
      expect(generator.next(mockUser).value).toEqual(
        getSnapshotFromUserAuth(mockUser.user)
      );
      expect(generator.next().done).toBe(true);
    });

    it("should put signInFailure on error", () => {
      const failGenerator = signInWithGoogle();
      failGenerator.next();
      expect(failGenerator.throw("error").value).toEqual(
        put(signInFailure("error"))
      );
    });
  });

  describe("get snapshot from user auth", () => {
    const generator = getSnapshotFromUserAuth(
      mockUser.user,
      mockAdditionalData
    );
    it("should call createUserProfileDocument", () => {
      expect(generator.next().value).toEqual(
        call(createUserProfileDocument, mockUser.user, mockAdditionalData)
      );
    });

    it("should call getDoc", () => {
      const mockUserRef = {};
      expect(generator.next(mockUserRef).value).toEqual(
        call(getDoc, mockUserRef)
      );
    });

    it("should put SignInSuccess", () => {
      const mockUserSnapshot = {
        id: mockUser.user.id,
        data: jest.fn().mockImplementation(() => {
          return {
            email: mockEmail,
            displayName: mockDisplayName,
          };
        }),
      };
      expect(generator.next(mockUserSnapshot).value).toEqual(
        put(
          signInSuccess({ id: mockUserSnapshot.id, ...mockUserSnapshot.data() })
        )
      );

      expect(generator.next().done).toBe(true);
    });

    it("should put signInFailure on error", () => {
      const failGenerator = signInWithGoogle();
      failGenerator.next();
      expect(failGenerator.throw("error").value).toEqual(
        put(signInFailure("error"))
      );
    });
  });
});
