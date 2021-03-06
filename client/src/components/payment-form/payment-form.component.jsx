import React, { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPaymentDone } from "../../redux/payment/payment.actions";

import CustomButton from "../custom-button/custom-button.component";

import {
  FormContainer,
  PaymentElementContainer,
  Spinner,
  SpinnerContainer,
  PaymentMessage,
} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentDoneHandler = (status) => dispatch(setPaymentDone(status));

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = params["payment_intent_client_secret"];

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);
    paymentDoneHandler(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    setIsLoading(false);

    if (error) {
      switch (error.type) {
        case "card_error":
        case "validation_error":
          setMessage(error.message);
          break;
        default:
          setMessage("An unexpected error occured.");
      }
      paymentDoneHandler(false);
      return
    }
      navigate("done")
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <PaymentElementContainer onReady={() => setFormLoading(false)} />
      {formLoading ? (
        <SpinnerContainer>
          <Spinner isLarge />
          <p>Loading Payment Form</p>
        </SpinnerContainer>
      ) : (
        <CustomButton
          disabled={isLoading || !stripe || !elements}
          type="submit"
        >
          {isLoading ? <Spinner /> : "Pay now"}
        </CustomButton>
      )}

      {/* Show any error or success messages */}
      {message && <PaymentMessage>{message}</PaymentMessage>}
    </FormContainer>
  );
};

export default PaymentForm;
