import React from "react";

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
} from "./check-box.styles";

const Checkbox = ({ className, checked, ...props }) => {
  return(
  <CheckboxContainer className={className || ""}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)};

export default Checkbox;
