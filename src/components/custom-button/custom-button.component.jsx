import React from "react";
import "./custom-button.styles.scss";

function CustomButton({ children, isGoogleSigIn, inverted, ...otherProps }) {
  return (
    <button
      className={`${inverted ? "inverted" : ""} ${
        isGoogleSigIn ? "google-sign-in" : ""
      } custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default CustomButton;
