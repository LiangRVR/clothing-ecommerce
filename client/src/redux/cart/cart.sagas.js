import { all, takeLatest, call, put, select } from "redux-saga/effects";

import UserActionsTypes from "../user/user.types";
import { selectCurrentuser } from "../user/user.selector";
import {
  clearCartOnState,
  addCartsItemsfromFirebase,
  updateCartItemsOnFirebase,
} from "./cart.actions";
import { CartActionsTypes } from "./cart.types";
import { selectCartItems } from "./cart.selectors";
import { getDoc } from "firebase/firestore";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { updateDoc } from "firebase/firestore";
import { actionHistory } from "../store";

export function* editCartItemsOnFirebase(cartItems) {
  const currentUser = yield select(selectCurrentuser);
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
  console.log(actionHistory);
  try {
    const userCartRef = yield call(getUserCartRef, id);
    const userCartSnapshot = yield call(getDoc, userCartRef);
    const cartItems = userCartSnapshot.data().cartItems;
    const indexOfSignInSucces = actionHistory.lastIndexOf(
      UserActionsTypes.SIGN_IN_SUCCESS
    );
    const nearSeccionStarted =
      actionHistory[indexOfSignInSucces - 1] ===
        UserActionsTypes.GOOGLE_SIGN_IN_START ||
      actionHistory[indexOfSignInSucces - 1] ===
        UserActionsTypes.EMAIL_SIGN_IN_START;
    if (nearSeccionStarted) {
      if (cartItems.length !== 0) {
        yield put(addCartsItemsfromFirebase(cartItems));
      }
      yield updateUserCartItemsOnFirebase();
    }
  } catch (error) {
    console.log(error);
  }
}

export function* onSingOutSucces() {
  yield takeLatest(UserActionsTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onSignInSucces() {
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
    call(onSingOutSucces),
    call(onSignInSucces),
    call(onCartChanges),
    call(onClearCartOnFirebase),
  ]);
}
