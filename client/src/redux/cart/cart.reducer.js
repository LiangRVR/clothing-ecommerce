import { CartActionsTypes } from "./cart.types";
import {
  addItemToCart,
  addItemsToCart,
  removeItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionsTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case CartActionsTypes.ADD_ITEMS:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CartActionsTypes.ADD_CARTS_ITEMS_FROM_FIREBASE:
      return {
        ...state,
        cartItems: addItemsToCart(state.cartItems, action.payload),
      };

    case CartActionsTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionsTypes.CLEAR_CART_ON_STATE:
    case CartActionsTypes.CLEAR_CART_ON_FIREBASE_AND_STATE:
      return {
        ...state,
        cartItems: [],
      };
    case CartActionsTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case CartActionsTypes.UPDATE_CARTS_ITEMS_ON_FIREBASE:
    default:
      return state;
  }
};

export default cartReducer;
