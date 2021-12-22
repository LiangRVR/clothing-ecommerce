import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { clearCart } from "../../redux/cart/cart.actions";
import { changeActiveForm, setPaymentStatus } from "../../redux/payment/payment.actions";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import { selectShippinData } from "../../redux/payment/payment.selectors";

import PaymentSuccessItem from "../../components/payment-succes-item/payment-success-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import {
  PaymentSuccessContainer,
  PaymentSuccessTitle,
  PaymentSuccessHeaderContainer,
  HeaderBlockContainer,
  ShippingTitle,
  ShippingData,
  ShippingDataContainer,
  TotalContainer,
} from "./payment-success.styles";

const PaymentSucces = () => {
  const [cartItems, total] = [
    useSelector(selectCartItems),
    useSelector(selectCartTotal),
  ];
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    addressLine1,
    addressLine2,
    firstName,
    lastName,
    city,
    state,
    zipCode,
  } = useSelector(selectShippinData);

  const clickHandler = () => {
    dispatch(changeActiveForm("Shipping Address"));
    dispatch(clearCart());
    dispatch(setPaymentStatus())
    history.push("/");
  };

  return (
    <PaymentSuccessContainer>
      <PaymentSuccessTitle>Payment succeeded</PaymentSuccessTitle>
      <ShippingDataContainer>
        <ShippingTitle>Shipping Addresss:</ShippingTitle>
        <ShippingData>
          <p>{`${firstName} ${lastName}`}</p>
          <p>{`${addressLine1}`}</p>
          {addressLine2 && <p>{`${addressLine2}`}</p>}
          <p>{`${city}, ${state} ${zipCode}`}</p>
        </ShippingData>
      </ShippingDataContainer>

      <PaymentSuccessHeaderContainer>
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
          <span>Total</span>
        </HeaderBlockContainer>
      </PaymentSuccessHeaderContainer>

      {cartItems.map((item) => (
        <PaymentSuccessItem key={item.id} item={item} />
      ))}
      <TotalContainer>
        <span>Total: $ {total}</span>
      </TotalContainer>
      <CustomButton onClick={clickHandler}>Continue</CustomButton>
    </PaymentSuccessContainer>
  );
};

export default PaymentSucces;
