import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import { AuthenticationContainer } from "./authentication.styles";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return currentUser ? (
    <Navigate to={from} replace />
  ) : (
    <AuthenticationContainer>
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  );
};

export default Authentication;
