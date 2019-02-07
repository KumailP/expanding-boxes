/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "containers/HomePage/Loadable";
import "./style.scss";

const App = () => (
  <div className="app-wrapper">
    <Switch>
      <Route path="/:open?/:id?" component={HomePage} />
    </Switch>
  </div>
);

export default App;
