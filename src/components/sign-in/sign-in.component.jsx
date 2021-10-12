import React, { Component } from "react";
import FormInput from "../form-input/form-input.componrnt";
import CustomButton from "../custom-button/custom-button.component";
import "./sign-in.styles.scss";
import {
  signInWithGooglePopup,
  credentialResult,
  credentialError,
} from "../../firebase/firebase.utils";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      email: "",
      password: "",
    });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);

    this.setState({ [name]: value });
  };

  handleGoogleAuthClick = () => {
    signInWithGooglePopup()
      .then((result) => {
        /*
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = credentialResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        */
      })
      .catch((error) => {
        /*
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = credentialError(error);
        // ...
        */
      });
  };

  render() {
    return (
      <div className="sign-in">
        <h1>I Already have an account</h1>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signInWithGooglePopup} isGoogleSigIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
