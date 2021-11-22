import React from "react";
import StripeCheckout from "react-stripe-checkout";

import CustomButton from "../custom-button/custom-button.component";

const StripeButtonComponent = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HW6xKEaVGofRHMLtgyTqkpJxcv8Wv6r2cQcwqjDnneLcUswMesx2YlhQqGfPWEN5rhqoiYP1xLYx3L9y8PqbBA600IUHZAFtD";

  const onToken = (token) => {
    console.log(token);
    alert("payment successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    >
      <CustomButton>Pay Now</CustomButton>
    </StripeCheckout>
  );
};

export default StripeButtonComponent;
