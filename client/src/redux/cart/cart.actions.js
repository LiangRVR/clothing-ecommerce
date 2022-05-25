import { CartActionsTypes } from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionsTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionsTypes.ADD_ITEMS,
  payload: item,
});

export const addCartsItemsfromFirebase = (items) => ({
  type: CartActionsTypes.ADD_CARTS_ITEMS_FROM_FIREBASE,
  payload: items,
});

export const removeItem = (item) =>({
  type: CartActionsTypes.REMOVE_ITEM,
  payload: item,
})

export const updateCartItemsOnFirebase = () =>({
  type: CartActionsTypes.UPDATE_CARTS_ITEMS_ON_FIREBASE,
})


export const clearCartOnState = () =>({
  type: CartActionsTypes.CLEAR_CART_ON_STATE,
})

export const clearCartOnFirebaseAndState = () =>({
  type: CartActionsTypes.CLEAR_CART_ON_FIREBASE_AND_STATE,
})

export const clearItemFromCart = (item) => ({
  type: CartActionsTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});
