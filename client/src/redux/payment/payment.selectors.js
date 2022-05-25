import { createSelector } from "reselect";

const selectPayment = (state) => state.payment;

export const selectShippinData = createSelector(
  [selectPayment],
  (payment) => payment.shippingData
);

export const selectBillingData = createSelector(
  [selectPayment],
  (payment) => payment.billingData
);

export const selectActiveForm = createSelector(
  [selectPayment],
  (payment) => payment.activeForm
);

export const selectPaymentDone = createSelector(
  [selectPayment],
  (payment) => payment.paymentDone
)
