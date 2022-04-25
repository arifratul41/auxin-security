import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state: authState } = useAuth();

  return authState.user ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/auth" />
  );
};

export default PrivateRoute;
