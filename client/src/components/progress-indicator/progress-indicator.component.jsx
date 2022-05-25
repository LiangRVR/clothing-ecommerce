import React from "react";
import { useSelector } from "react-redux";
import { selectActiveForm } from "../../redux/payment/payment.selectors";

import {
  ProgressIndicatorContainer,
  StepContainer,
  IndicatorSign,
  IndicatorText,
  DividerLine,
} from "./progress-indicator.styles";

const ProgressIndicator = () => {
  const activeForm = useSelector(selectActiveForm)
  const sections = ["Shipping Address", "Billing Address", "Payment"];
  const indexActive = sections.findIndex((section)=> section === activeForm)
  return (
    <ProgressIndicatorContainer>
      {sections.map((item, index) => {
        const active = index <= indexActive;
        const lineActive = index <= indexActive - 1;
        return (
          <StepContainer key ={item}>
            <IndicatorSign active={active} />
            <IndicatorText active={active}>{item}</IndicatorText>
            {index < sections.length - 1 ? (
              <DividerLine active={lineActive} />
            ) : null}
          </StepContainer>
        );
      })}
    </ProgressIndicatorContainer>
  );
};

export default ProgressIndicator;
