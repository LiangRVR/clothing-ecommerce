import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Components
import Header from "./components/header-component/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { GlobalStyle } from "./global.styles";

//redux
import { selectCurrentuser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";
import { selectPaymentStatus } from "./redux/payment/payment.selectors";

//Lazy Pages
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUp = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckOut = lazy(() => import("./pages/checkout/checkout.component"));
const Payment = lazy(() => import("./pages/payment/payment.component"));
const PaymentSucces = lazy(() =>
  import("./pages/payment-success/payment-success.component")
);

const App = () => {
  const currentUser = useSelector(selectCurrentuser);
  const paymentStatus = useSelector(selectPaymentStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle/>
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
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
            </Suspense>
          </ErrorBoundary>
        </Switch>
    </div>
  );
};

export default App;
