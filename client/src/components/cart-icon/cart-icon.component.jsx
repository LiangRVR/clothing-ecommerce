import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer,
} from "./cart-icon.styles";

const CartIcon = () => {
  const itemsCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();
  const toggleCartHiddenHandler = () => dispatch(toggleCartHidden());

  return (
    <CartContainer onClick={toggleCartHiddenHandler}>
      <ShoppingIcon />
      <ItemCountContainer>{itemsCount}</ItemCountContainer>
    </CartContainer>
  );
};

export default CartIcon;
