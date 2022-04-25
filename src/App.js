import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CovidData from "./covid-data";

export default function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <CovidData />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

