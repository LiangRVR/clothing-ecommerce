import React, { useState } from "react";
import { useDispatch } from "react-redux";

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

const SignIn = () => {
  const [userCredendiatls, setCredendiatls] = useState({
    email: "",
    password: "",
  });
  
  const dispatch = useDispatch();
  const googleSignInStartHandler = () => dispatch(googleSignInStart());
  const emailSignInStartHandler = (email, password) =>
    dispatch(emailSignInStart({ email, password }));

  const { email, password } = userCredendiatls;

  const handleSubmit = (e) => {
    e.preventDefault();
    emailSignInStartHandler(email, password);
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
          <CustomButton
            type="button"
            onClick={googleSignInStartHandler}
            isGoogleSigIn
          >
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
