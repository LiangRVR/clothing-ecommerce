import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentuser } from "../../redux/user/user.selector";

const RequireAuth = ({ children }) => {
  const currentUser = useSelector(selectCurrentuser);
  const location = useLocation();
  return !currentUser ? (
    <Navigate to="/auth" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default RequireAuth;
