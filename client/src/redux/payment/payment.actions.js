import { PaymentActionTypes } from "./payment.types";

export const addBillingData = (data) => ({
  type: PaymentActionTypes.SET_BILLING_DATA,
  payload: data,
});

export const addShippingData = (data) => ({
  type: PaymentActionTypes.SET_SHIPPING_DATA,
  payload: data,
});

export const changeActiveForm = (formName) => ({
  type: PaymentActionTypes.SET_ACTIVE_FORM,
  payload: formName,
});

export const setPaymentStatus = (status) => ({
  type: PaymentActionTypes.SET_PAYMENT_DONE,
  payload: status,
});
