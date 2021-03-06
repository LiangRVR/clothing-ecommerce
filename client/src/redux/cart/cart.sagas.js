import { all, takeLatest, call, put, select } from "redux-saga/effects";

import UserActionsTypes from "../user/user.types";
import { selectCurrentUser } from "../user/user.selector";
import {
  clearCartOnState,
  addCartsItemsFromFirebase,
  updateCartItemsOnFirebase,
} from "./cart.actions";
import { CartActionsTypes } from "./cart.types";
import { selectCartItems } from "./cart.selectors";
import { getDoc } from "firebase/firestore";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { updateDoc } from "firebase/firestore";
import { actionHistory } from "../store";

export function* editCartItemsOnFirebase(cartItems) {
  const currentUser = yield select(selectCurrentUser);
  yield put(updateCartItemsOnFirebase());
  try {
    if (currentUser) {
      const userCartRef = yield call(getUserCartRef, currentUser.id);
      yield call(updateDoc, userCartRef, { cartItems });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* clearCartOnFirebase() {
  yield editCartItemsOnFirebase([]);
}

export function* updateUserCartItemsOnFirebase() {
  const cartItems = yield select(selectCartItems);
  yield editCartItemsOnFirebase(cartItems);
}

export function* clearCartOnSignOut() {
  yield put(clearCartOnState());
}

export function* getUserCartItemsFromFirebase({ payload: { id } }) {
  try {
    const userCartRef = yield call(getUserCartRef, id);
    const userCartSnapshot = yield call(getDoc, userCartRef);
    const cartItems = userCartSnapshot.data().cartItems;
    const indexOfSignInSuccess = actionHistory.lastIndexOf(
      UserActionsTypes.SIGN_IN_SUCCESS
    );
    const nearSessionStarted =
      actionHistory[indexOfSignInSuccess - 1] ===
        UserActionsTypes.GOOGLE_SIGN_IN_START ||
      actionHistory[indexOfSignInSuccess - 1] ===
        UserActionsTypes.EMAIL_SIGN_IN_START;
    if (nearSessionStarted) {
      if (cartItems.length !== 0) {
        yield put(addCartsItemsFromFirebase(cartItems));
      }
      yield updateUserCartItemsOnFirebase();
    }
  } catch (error) {
    console.log(error);
  }
}

export function* onSingOutSuccess() {
  yield takeLatest(UserActionsTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onSignInSuccess() {
  yield takeLatest(
    UserActionsTypes.SIGN_IN_SUCCESS,
    getUserCartItemsFromFirebase
  );
}

export function* onCartChanges() {
  yield takeLatest(
    [
      CartActionsTypes.ADD_CARTS_ITEMS_FROM_FIREBASE,
      CartActionsTypes.ADD_ITEMS,
      CartActionsTypes.REMOVE_ITEM,
      CartActionsTypes.CLEAR_ITEM_FROM_CART,
    ],
    updateUserCartItemsOnFirebase
  );
}

export function* onClearCartOnFirebase() {
  yield takeLatest(
    CartActionsTypes.CLEAR_CART_ON_FIREBASE_AND_STATE,
    clearCartOnFirebase
  );
}

export function* cartSagas() {
  yield all([
    call(onSingOutSuccess),
    call(onSignInSuccess),
    call(onCartChanges),
    call(onClearCartOnFirebase),
  ]);
}
