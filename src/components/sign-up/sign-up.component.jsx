import React, { Component } from "react";

import FormInput from "../form-input/form-input.componrnt";
import CustomButton from "../custom-button/custom-button.component";

import {
  createAccountWithEmailAndPassword,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    createAccountWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in
        console.log(userCredential);
        const user = userCredential.user;
        try {
          await createUserProfileDocument(user, { displayName });
        } catch (error) {
          console.log({
            errorCode: error.code,
            errorMessage: error.message,
          });
        }

        this.setState({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        console.log({
          errorCode: error.code,
          errorMessage: error.message,
        });
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <SignUpContainer>
        <SignUpTitle>I do not have an account</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form className="sing-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </SignUpContainer>
    );
  }
}
