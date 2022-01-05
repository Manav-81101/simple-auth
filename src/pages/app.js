import React from "react";
import { Router } from "@reach/router";
import Login from "../components/Login";
import PrivateRoute from "../components/PrivateRoute";
import Signup from "../components/Signup";
import Home from "../components/Home";

const App = () => (
  <Router>
    <PrivateRoute path="/app/home" component={Home} />
    <Login path="/app/login" />
    <Signup path="/app/signup" />
  </Router>
);

export default App;
