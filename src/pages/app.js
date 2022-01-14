import React from "react";
import { Router } from "@reach/router";
import Login from "../components/Login";
import PrivateRoute from "../components/PrivateRoute";
import Signup from "../components/Signup";
import Home from "../components/Home";
import GraphQLTrial from "../components/GraphQLTrial";
import { observer, Provider } from "mobx-react";
import { pokemonStore, Context } from "../helpers/store";

const App = observer(() => {
  return (
    <Context.Provider value={pokemonStore}>
      <Router>
        <PrivateRoute path="/app/home" component={Home} />
        <Login path="/app/login" />
        <Signup path="/app/signup" />
        <GraphQLTrial path="/app/graphql" />
      </Router>
    </Context.Provider>
  );
});

export default App;
