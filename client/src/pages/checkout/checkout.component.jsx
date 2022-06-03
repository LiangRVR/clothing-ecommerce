import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
//import StripeButtonComponent from "../../components/stripe-button/stripe-button.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer,
} from "./checkout.styles";

const CheckOut = () => {
  const [cartItems, total] = [
    useSelector(selectCartItems),
    useSelector(selectCartTotal),
  ];
  console.log({cartItems, total})
  const navigate = useNavigate();

  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <TotalContainer>
        <span>Total: $ {total}</span>
      </TotalContainer>
      <WarningContainer>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: Any future date - CVV: 123
      </WarningContainer>
      <CustomButton onClick={() => navigate("../payment")} disabled={!total}>
        {!total ? "Cart is Empty": "Pay Now"}
      </CustomButton>
    </CheckoutPageContainer>
  );
};

export default CheckOut;
