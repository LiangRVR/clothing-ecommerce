import React from "react";
import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

const WhitSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default WhitSpinner;
