import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

//Pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

//Components
import Header from "./components/header-component/header.component";
import { auth } from "./firebase/firebase.utils";
import { onAuthStateChanged } from "@firebase/auth";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}
