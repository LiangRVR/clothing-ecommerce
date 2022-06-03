import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessage,
  TotalAmount,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const [cartItems, total] = [
    useSelector(selectCartItems),
    useSelector(selectCartTotal),
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleCartHiddenHandler = () => dispatch(toggleCartHidden());

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>You cart is empty</EmptyMessage>
        )}
      </CartItemsContainer>
      {cartItems.length ? (
        <TotalAmount>
          <span>Total: $ {total}</span>
        </TotalAmount>
      ) : null}

      <CustomButton
        onClick={() => {
          toggleCartHiddenHandler();
          navigate("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
