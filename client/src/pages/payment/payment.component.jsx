import React from "react";
import { useSelector } from "react-redux";
import { selectActiveForm } from "../../redux/payment/payment.selectors";

import ProgressIndicator from "../../components/progress-indicator/progress-indicator.component";
import Shipping from "../../components/shipping-address-form/shipping-address.component";
import Billing from "../../components/billing-address-form/billing-addres-form.component";
import PaymentFormContainer from "../../components/payment-form-container/payment-form-container.component";
import OrderSummary from "../../components/order-summary/order-sumary.component";
import OrderDetails from "../../components/order-details/order-details.component";

import {
  PaymentContainer,
  FormAndSummaryContainer,
  FormContainer,
  SummaryAndCartDetailContainer,
} from "./payment.styles";

const Payment = () => {
  const activeForm = useSelector(selectActiveForm);
  const sections = {
    "Shipping Address": <Shipping />,
    "Billing Address": <Billing />,
    Payment: <PaymentFormContainer />,
  };

  return (
    <PaymentContainer>
      <ProgressIndicator />
      <FormAndSummaryContainer>
        <FormContainer>{sections[activeForm]}</FormContainer>

        <SummaryAndCartDetailContainer>
          <OrderSummary />
          <OrderDetails />
        </SummaryAndCartDetailContainer>
      </FormAndSummaryContainer>
    </PaymentContainer>
  );
};

export default Payment;
