import React from "react";
import "./custom-button.styles.scss";

function CustomButton({ children, isGoogleSigIn, ...otherProps }) {
  return (
    <button
      className={`${isGoogleSigIn ? "google-sign-in" : ""} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default CustomButton;
