import React, { useState } from "react";
import Checkbox from "../check-box/check-box.component";
import FormInput from "../form-input/form-input.componrnt";

import {
  GiftIcon,
  GiftOptionContainer,
  GiftOptionTitle,
  GiftOptionLabel,
  GiftOptionMessage,
} from "./gift-option.styles";

const GiftOption = ({ giftMessage, setGiftMessage, checkedOption }) => {
  const [checked, setChecked] = useState(checkedOption || false);

  const chekboxHandler = (e) => {
    if (e.target.checked === false) setGiftMessage("");
    setChecked(e.target.checked);
  };

  return (
    <GiftOptionContainer checked={checked}>
      <GiftOptionLabel>
        <GiftOptionTitle>Gift Options</GiftOptionTitle>
        <Checkbox
          checked={checked}
          onChange={chekboxHandler}
          className={"checkbox"}
        />
        <GiftIcon />
        <span>This is a gift</span>
      </GiftOptionLabel>
      {checked ? (
        <GiftOptionMessage>
          <span>
            We’ll hide the prices and print your personal message on the packing
            slip if you include one
          </span>
          <FormInput
            margin={`small`}
            type="text"
            label="Enter Personal Message (optional)"
            name="personalMessage"
            value={giftMessage}
            handleChange={(e) => setGiftMessage(e.target.value)}
            required
          />
        </GiftOptionMessage>
      ) : null}
    </GiftOptionContainer>
  );
};

export default GiftOption;
