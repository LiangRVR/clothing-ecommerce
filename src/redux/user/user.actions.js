import UserActionsTypes from "./user.types";

export const googleSignInStart = () => ({
  type: UserActionsTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionsTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionsTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionsTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionsTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionsTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionsTypes.SIGN_OUT_FAILURE,
  payload: error,
});


export const checkUserSession = () => ({
  type: UserActionsTypes.CHECK_USER_SESSION,
});
