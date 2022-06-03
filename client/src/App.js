import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Components
import Header from "./components/header-component/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { GlobalStyle } from "./global.styles";

//redux
import { checkUserSession } from "./redux/user/user.actions";
import { selectPaymentDone } from "./redux/payment/payment.selectors";

//Lazy Pages
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const Authentication = lazy(() =>
  import("./pages/authentication/authentication.component")
);
const CheckOut = lazy(() => import("./pages/checkout/checkout.component"));
const Payment = lazy(() => import("./pages/payment/payment.component"));
const PaymentSucces = lazy(() =>
  import("./pages/payment-success/payment-success.component")
);
const RequireAuth = lazy(() =>
  import("./components/require-auth/require-auth.component")
);

const App = () => {
  const paymentDone = useSelector(selectPaymentDone);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<HomePage />} />
              <Route path="shop/*" element={<ShopPage />} />
              <Route path="checkout" element={<CheckOut />} />
              <Route path="payment">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Payment />
                    </RequireAuth>
                  }
                />
                <Route
                  path="done"
                  element={
                    paymentDone ? (
                      <PaymentSucces />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              </Route>

              <Route path="auth" element={<Authentication />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
