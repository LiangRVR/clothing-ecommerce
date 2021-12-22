import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckOut from "./pages/checkout/checkout.component";
import Payment from "./pages/payment/payment.component";
import PaymentSucces from "./pages/payment-success/payment-success.component";

//Components
import Header from "./components/header-component/header.component";

//redux
import { selectCurrentuser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";
import { selectPaymentStatus } from "./redux/payment/payment.selectors";

const App = () => {
  const currentUser = useSelector(selectCurrentuser);
  const paymentStatus = useSelector(selectPaymentStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckOut} />
        <Route exact path="/checkout/payment" component={Payment} />
        <Route exact path="/signin">
          {currentUser ? <Redirect to="/" /> : <SignInAndSignUp />}
        </Route>
        <Route exact path="/checkout/payment/done">
          {paymentStatus ? <PaymentSucces /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
