import userReducer from "../user.reducer";

import {
  signInSuccess,
  signOutSuccess,
  signInFailure,
  signOutFailure,
  signUpFailure,
} from "../user.actions";

const initialState = {
  currentUser: null,
  error: null,
};

describe("testing userReducer", () => {
  it("should return initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should set currentUser to payload on signInSucces action", () => {
    const mockUser = { id: 1, userName: "Liang Villarrubia" };
    expect(
      userReducer(initialState, signInSuccess(mockUser)).currentUser
    ).toEqual(mockUser);
  });

  it("should set currentUser to null on signOutSucces action", () => {
    expect(userReducer(initialState, signOutSuccess()).currentUser).toBe(null);
  });

  it("should setError currentUser to null on signInFailure, signOutFailure, signUpFailure actions", () => {
    const mockError = {
      message: "errored",
      error: 404,
    };
    expect(userReducer(initialState, signInFailure(mockError)).error).toEqual(
      mockError
    );
    expect(userReducer(initialState, signOutFailure(mockError)).error).toEqual(
      mockError
    );
    expect(userReducer(initialState, signUpFailure(mockError)).error).toEqual(
      mockError
    );
  });
});
