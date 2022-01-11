import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { isLoggedIn } from "../helpers/auth";
import { observer, Provider } from "mobx-react";

const PrivateRoute = (props) => {
  const { component: Component, location } = props;
  console.log(props);
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/app/login`);
    return null;
  }

  return <Component {...props} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
