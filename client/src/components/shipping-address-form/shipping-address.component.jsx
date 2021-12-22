import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addShippingData,
  changeActiveForm,
} from "../../redux/payment/payment.actions";
import { selectShippinData } from "../../redux/payment/payment.selectors";

import FormInput from "../form-input/form-input.componrnt";
import CustomButton from "../custom-button/custom-button.component";
import GiftOption from "../gift-option/gift-option.component";

import { ShippingContainer, FormsInputRow } from "./shipping-address.styles";

const Shipping = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const shippingData = useSelector(selectShippinData);

  const [giftMessage, setGiftMessage] = useState("");

  
  useEffect(() => {
    if (shippingData) {
      const {
        firstName,
        lastName,
        phoneNumber,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
      } = shippingData;
      setContact({
        firstName,
        lastName,
        phoneNumber,
      });
      setAddress({
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
      });
      setGiftMessage(shippingData.giftMessage || "")
    }
  },[shippingData]);

  const checkedOption = shippingData.giftMessage || false


  const dispatch = useDispatch();
  const addShippingDataHandler = (data) => dispatch(addShippingData(data));

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
    const shippingAddress =
      giftMessage.length > 0
        ? {
            ...contact,
            ...address,
            giftMessage,
          }
        : {
            ...contact,
            ...address,
          };

    addShippingDataHandler(shippingAddress);
    dispatch(changeActiveForm("Billing Address"));
  };

  return (
    <ShippingContainer>
      <h2>Shipping Address</h2>
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

        <FormInput
          type="tel"
          label="Phone Number"
          name="phoneNumber"
          value={contact.phoneNumber}
          handleChange={handleContactChange}
          required
        />
        <GiftOption giftMessage={giftMessage} setGiftMessage={setGiftMessage} checkedOption={checkedOption}/>
        <CustomButton type="submit">Continue</CustomButton>
      </form>
    </ShippingContainer>
  );
};

export default Shipping;
