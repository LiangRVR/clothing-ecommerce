import React, { useState } from "react";

import { useSelector } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.componrnt";

import {
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import {
  SummaryData,
  SummaryContainer,
  SummaryDataElement,
  Total,
  FormPromo,
} from "./order-sumary.styles";

const OrderSummary = () => {
  const [promoCode, setPromoCode] = useState("");
  const [itemsCount, total] = [
    useSelector(selectCartItemsCount),
    useSelector(selectCartTotal),
  ];
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  return (
    <SummaryContainer>
      <h3>Order Summary</h3>
      <SummaryData>
        <SummaryDataElement>
          <span>Subtotal ({itemsCount})</span>
          <span>${total}</span>
        </SummaryDataElement>
        <SummaryDataElement>
          <span>Estimated Tax</span>
          <span>-</span>
        </SummaryDataElement>
        <SummaryDataElement>
          <span>Estimated Shipping</span>
          <span>-</span>
        </SummaryDataElement>
      </SummaryData>
      <SummaryDataElement>
        <Total>Estimated Total</Total>
        <Total>${total}</Total>
      </SummaryDataElement>
      <FormPromo>
        <FormInput
          type="text"
          label="Apply Promo Code"
          value={promoCode}
          handleChange={handlePromoCodeChange}
        />
        <CustomButton type="submit">Apply</CustomButton>
      </FormPromo>
    </SummaryContainer>
  );
};

export default OrderSummary;
