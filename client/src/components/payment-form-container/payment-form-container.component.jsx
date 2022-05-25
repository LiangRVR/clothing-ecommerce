import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

import PaymentForm from "../payment-form/payment-form.component";

import { selectCartTotal } from "../../redux/cart/cart.selectors";
import { selectBillingData } from "../../redux/payment/payment.selectors";
import {
  BillingData,
  BillingDataContainer,
  BillingTitle,
  ElementsContainer,
} from "./payment-form-container.styles";

const publishableKey =
  "pk_test_51HW6xKEaVGofRHMLtgyTqkpJxcv8Wv6r2cQcwqjDnneLcUswMesx2YlhQqGfPWEN5rhqoiYP1xLYx3L9y8PqbBA600IUHZAFtD";
const stripePromise = loadStripe(publishableKey);

const PaymentFormContainer = () => {
  const [clientSecret, setClientSecret] = useState("");
  const totalPrice = useSelector(selectCartTotal);
  const {
    addressLine1,
    addressLine2,
    firstName,
    lastName,
    city,
    state,
    zipCode,
  } = useSelector(selectBillingData);

  useEffect(() => {
    const priceForStripe = totalPrice * 100;
    axios
      .post("/payment/create", {
        amount: priceForStripe,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [totalPrice]);

  const appearance = {
    theme: "flat",
    variables: {
      fontLineHeight: "1.5",
      borderRadius: "0",
      colorPrimary: "white",
      colorBackground: "white",
      colorPrimaryText: "black",
      fontFamily: "Open Sans Condensed, sans-serif",
    },
    rules: {
      ".Input": {
        padding: "12px",
        borderBottom: "1px solid black",
        marginBottom: "25px",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <ElementsContainer>
      <h2>Payment</h2>
      <BillingDataContainer>
        <BillingTitle>Billing Addresss:</BillingTitle>
        <BillingData>
          <p>{`${firstName} ${lastName}`}</p>
          <p>{`${addressLine1}`}</p>
          {addressLine2 && <p>{`${addressLine2}`}</p>}
          <p>{`${city}, ${state} ${zipCode}`}</p>
        </BillingData>
      </BillingDataContainer>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </ElementsContainer>
  );
};

export default PaymentFormContainer;
