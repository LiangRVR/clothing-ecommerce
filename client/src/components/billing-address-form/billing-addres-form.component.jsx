import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBillingData,
  selectShippinData,
} from "../../redux/payment/payment.selectors";

import FormInput from "../form-input/form-input.componrnt";
import CustomButton from "../custom-button/custom-button.component";
import Checkbox from "../check-box/check-box.component";

import {
  addBillingData,
  changeActiveForm,
} from "../../redux/payment/payment.actions";

import {
  BillingContainer,
  FormsInputRow,
  OptionLabel,
} from "./billing-addres-form.styles";

const Billing = () => {
  const [checked, setChecked] = useState(false);

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
  });

  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const dispatch = useDispatch();
  const addBillingDataHandler = (data) => dispatch(addBillingData(data));

  const shippingData = useSelector(selectShippinData);
  const billingData = useSelector(selectBillingData);

  useEffect(() => {
    if (billingData) {
      const {
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        sameAsShipping,
      } = billingData;

      setContact({
        firstName,
        lastName,
      });
      setAddress({
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
      });
      setChecked(sameAsShipping);
    }
  }, [billingData]);

  const handleContactChange = (e) => {
    const { value, name } = e.target;

    setContact({ ...contact, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { value, name } = e.target;

    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const billingData = checked
      ? {
          ...contact,
          ...address,
          sameAsShipping: checked,
        }
      : {
          ...contact,
          ...address,
        };

    addBillingDataHandler(billingData);
    dispatch(changeActiveForm("Payment"));
  };

  const handleBackClick = () => {
    dispatch(changeActiveForm("Shipping Address"));
  };

  const chekboxHandler = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      const {
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
      } = shippingData;
      setContact({
        firstName,
        lastName,
      });
      setAddress({
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
      });
    } else {
      setContact({
        firstName: "",
        lastName: "",
      });
      setAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  };

  return (
    <BillingContainer>
      <h2>Billing Address</h2>
      <OptionLabel>
        <Checkbox checked={checked} onChange={chekboxHandler} />
        <span>Same as Shipping Address</span>
      </OptionLabel>

      <form onSubmit={handleSubmit}>
        <FormsInputRow>
          <FormInput
            type="text"
            label="First Name"
            name="firstName"
            value={contact.firstName}
            handleChange={handleContactChange}
            required
          />
          <FormInput
            type="text"
            label="Last Name"
            name="lastName"
            value={contact.lastName}
            handleChange={handleContactChange}
            required
          />
        </FormsInputRow>

        <FormInput
          type="text"
          label="Address Line 1"
          name="addressLine1"
          value={address.addressLine1}
          handleChange={handleAddressChange}
          required
        />
        <FormInput
          type="text"
          label="Address Line 2 (Optional)"
          name="addressLine2"
          value={address.addressLine2}
          handleChange={handleAddressChange}
        />
        <FormsInputRow>
          <FormInput
            type="text"
            label="City"
            name="city"
            value={address.city}
            handleChange={handleAddressChange}
            required
          />
          <FormInput
            type="text"
            label="State"
            name="state"
            value={address.state}
            handleChange={handleAddressChange}
            required
          />

          <FormInput
            type="text"
            label="ZIP Code"
            name="zipCode"
            maxlength="10"
            minlength="5"
            required
            value={address.zipCode}
            handleChange={handleAddressChange}
          />
        </FormsInputRow>
        <FormsInputRow>
          <CustomButton type="button" onClick={handleBackClick}>
            Back
          </CustomButton>
          <CustomButton type="submit">Continue</CustomButton>
        </FormsInputRow>
      </form>
    </BillingContainer>
  );
};

export default Billing;
