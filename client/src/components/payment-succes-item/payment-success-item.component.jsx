import React from "react";

import {
  PaymentSuccessItemContainer,
  ItemImageContainer,
  TextContainer,
} from "./payment-success-item.styled";

const PaymentSuccessItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <PaymentSuccessItemContainer>
      <ItemImageContainer>
        <img src={imageUrl} alt="" />
      </ItemImageContainer>
      <TextContainer>{name}</TextContainer>
      <TextContainer>{quantity}</TextContainer>
      <TextContainer>${price}</TextContainer>
      <TextContainer>${quantity * price}</TextContainer>
    </PaymentSuccessItemContainer>
  );
};

export default PaymentSuccessItem;
