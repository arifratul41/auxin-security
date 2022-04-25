import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CovidData from "./covid-data";
import Login from "./login";
import {AuthProvider, useAuth} from "./auth";
import PrivateRoute from "./PrivateRoute";
import AuthPage from "./auth/components/AuthPage";

export default function App() {
    const { state: authState } = useAuth();
  return (
      <Router>
        <div>
          <Switch>
              <PrivateRoute
                  path="/"
                  exact
                  user={authState.user}
                  component={(props) => <CovidData {...props} />}
              />
              <Route path="/auth" component={(props) => <AuthPage {...props} />} />
          </Switch>
        </div>
      </Router>
  );
}

