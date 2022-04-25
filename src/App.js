import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CovidData from "./covid-data";
import {useAuth} from "./auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./auth/components/Login";

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
              <Route path="/auth" component={(props) => <Login {...props} />} />
          </Switch>
        </div>
      </Router>
  );
}

