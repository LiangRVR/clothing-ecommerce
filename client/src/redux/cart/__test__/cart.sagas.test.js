import { takeLatest, call, put, select } from "redux-saga/effects";
import { CartActionsTypes } from "../cart.types";
import { selectCartItems } from "../cart.selectors";
import { selectCurrentUser } from "../../user/user.selector";
import UserActionsTypes from "../../user/user.types";
import {
  addCartsItemsFromFirebase,
  clearCartOnState,
  updateCartItemsOnFirebase,
} from "../cart.actions";
import {
  onClearCartOnFirebase,
  clearCartOnFirebase,
  onCartChanges,
  updateUserCartItemsOnFirebase,
  onSignInSuccess,
  getUserCartItemsFromFirebase,
  onSingOutSuccess,
  clearCartOnSignOut,
  editCartItemsOnFirebase,
} from "../cart.sagas";

import { getUserCartRef } from "../../../firebase/firebase.utils";
import { getDoc, updateDoc } from "firebase/firestore";

jest.mock("../../../firebase/firebase.utils", () => {
  return {
    getUserCartRef: jest.fn(),
  };
});

jest.mock("../../store", () => {
  return {
    actionHistory: ["GOOGLE_SIGN_IN_START", "SIGN_IN_SUCCESS"],
  };
});

jest.mock("firebase/firestore", () => {
  return {
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
  };
});

describe("testing cartSagas", () => {
  const cartItems = [
    {
      id: 28,
      imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
      name: "Yellow Track Suit",
      price: 135,
      quantity: 21,
    },
    {
      id: 8,
      imageUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png",
      name: "Wolf Cap",
      price: 14,
      quantity: 1,
    },
  ];

  const mockCurrentUser = {
    id: 121212,
    email: "liang@gmail.com",
  };

  const userCartRef = {};

  it("should trigger clearCartOnFirebase on CLEAR_CART_ON_FIREBASE_AND_STATE", () => {
    const generator = onClearCartOnFirebase();
    expect(generator.next().value).toEqual(
      takeLatest(
        CartActionsTypes.CLEAR_CART_ON_FIREBASE_AND_STATE,
        clearCartOnFirebase
      )
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger updateUserCartItemsOnFirebase on any change on cartItems", () => {
    const generator = onCartChanges();
    expect(generator.next().value).toEqual(
      takeLatest(
        [
          CartActionsTypes.ADD_CARTS_ITEMS_FROM_FIREBASE,
          CartActionsTypes.ADD_ITEMS,
          CartActionsTypes.REMOVE_ITEM,
          CartActionsTypes.CLEAR_ITEM_FROM_CART,
        ],
        updateUserCartItemsOnFirebase
      )
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger getUserCartItemsFromFirebase on SIGN_IN_SUCCESS", () => {
    const generator = onSignInSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionsTypes.SIGN_IN_SUCCESS, getUserCartItemsFromFirebase)
    );
    expect(generator.next().done).toBe(true);
  });

  it("should trigger clearCartOnSignOut on SIGN_OUT_SUCCESS", () => {
    const generator = onSingOutSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionsTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
    );
    expect(generator.next().done).toBe(true);
  });

  describe("on getUserCartItemsFromFirebase", () => {
    const mockAction = {
      payload: {
        id: 1,
      },
    };
    const userCartSnapshot = {
      data: () => {
        return { cartItems };
      },
    };
    const generator = getUserCartItemsFromFirebase(mockAction);
    it("should call getUserCartRef", () => {
      expect(generator.next().value).toEqual(
        call(getUserCartRef, mockAction.payload.id)
      );
    });
    it("should call getDoc", () => {
      expect(generator.next(userCartRef).value).toEqual(
        call(getDoc, userCartRef)
      );
    });

    it("should put addCartsItemsFromFirebase if there is a session started and the user has some items in his userCartItem", () => {
      expect(generator.next(userCartSnapshot).value).toEqual(
        put(addCartsItemsFromFirebase(cartItems))
      );
    });

    it("should updateUserCartItemsOnFirebase", () => {
      expect(generator.next().value).toEqual(updateUserCartItemsOnFirebase());
    });

    it("should put console.log on error", () => {
      const failGenerator = getUserCartItemsFromFirebase(mockAction);
      failGenerator.next();
      expect(failGenerator.throw("error").done).toBe(true);
    });
  });

  describe("clear cart on signOut", () => {
    const generator = clearCartOnSignOut();
    it("should put clearCartOnState", () => {
      expect(generator.next().value).toEqual(put(clearCartOnState()));
      expect(generator.next().done).toBe(true);
    });
  });

  describe("update user cart items on firebase", () => {
    const generator = updateUserCartItemsOnFirebase();
    it("should get cart items on state", () => {
      expect(generator.next().value).toEqual(select(selectCartItems));
    });

    it("should trigger editCartItemsOnFirebase", () => {
      expect(generator.next(cartItems).value).toEqual(
        editCartItemsOnFirebase(cartItems)
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe("clear cart on firebase", () => {
    const generator = clearCartOnFirebase();

    it("should trigger editCartItemsOnFirebase", () => {
      expect(generator.next().value).toEqual(editCartItemsOnFirebase([]));
      expect(generator.next().done).toBe(true);
    });
  });

  describe("on editCartItemsOnFirebase", () => {
    const generator = editCartItemsOnFirebase(cartItems);

    it("should get current user", () => {
      expect(generator.next().value).toEqual(select(selectCurrentUser));
    });

    it("should put updateCartItemsOnFirebase", () => {
      expect(generator.next(mockCurrentUser).value).toEqual(
        put(updateCartItemsOnFirebase())
      );
    });

    it("should update cartItems on firebase if there is a session active", () => {
      expect(generator.next().value).toEqual(
        call(getUserCartRef, mockCurrentUser.id)
      );

      expect(generator.next(userCartRef).value).toEqual(
        call(updateDoc, userCartRef, { cartItems })
      );

      expect(generator.next().done).toBe(true);
    });


    it("should console.log on error", () => {
      const failGenerator = editCartItemsOnFirebase(cartItems);
      failGenerator.next();
      failGenerator.next(mockCurrentUser);
      failGenerator.next();
      expect(failGenerator.throw("error").done).toBe(true);
    });
  });
});
