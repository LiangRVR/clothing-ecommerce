import { PaymentActionTypes } from "./payment.types";

const INITIAL_STATE = {
  shippingData: {},
  billingData: {},
  activeForm: "Shipping Address",
  paymentDone: false,
};

const paymentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PaymentActionTypes.SET_SHIPPING_DATA:
      return {
        ...state,
        shippingData: action.payload,
      };
    case PaymentActionTypes.SET_BILLING_DATA:
      return {
        ...state,
        billingData: action.payload,
      };
    case PaymentActionTypes.SET_PAYMENT_DONE:
      return {
        ...state,
        paymentDone: action.payload,
      };
    case PaymentActionTypes.SET_ACTIVE_FORM:
      return {
        ...state,
        activeForm: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
