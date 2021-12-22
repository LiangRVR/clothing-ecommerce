import React from "react";
import { useSelector } from "react-redux";

import CartItem from "../cart-item/cart-item.component";
import {
  selectCartItems,
  selectCartItemsCount,
} from "../../redux/cart/cart.selectors";

import {OrderDetailContainer, OrderItemsContainer, OrderDetailTitle } from "./order-details.styles";

const OrderDetails = () => {
  const [cartItems, total] = [
    useSelector(selectCartItems),
    useSelector(selectCartItemsCount),
  ];
  return (
    <OrderDetailContainer>
      <OrderDetailTitle>
        <h3>Order Details </h3>
        <p>{`( ${total} items)`}</p>
      </OrderDetailTitle>

      <OrderItemsContainer>
        {cartItems?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </OrderItemsContainer>
    </OrderDetailContainer>
  );
};

export default OrderDetails;
