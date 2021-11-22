import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.componrnt";
import CustomButton from "../custom-button/custom-button.component";
import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from "./sign-in.styles";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredendiatls, setCredendiatls] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredendiatls;
  const handleSubmit = (e) => {
    e.preventDefault();
    emailSignInStart(email, password);
    setCredendiatls({ ...userCredendiatls, email: "", password: "" });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredendiatls({ ...userCredendiatls, [name]: value });
  };

  return (
    <SignInContainer>
      <SignInTitle>I Already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />

        <ButtonsBarContainer>
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSigIn>
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

const mapDipstachToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDipstachToProps)(SignIn);
