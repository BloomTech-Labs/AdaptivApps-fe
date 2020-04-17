import React from "react";
import { useAuth0 } from "../../config/react-auth0-spa";
import LandingPage from "../../pages/Landing";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
}));
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, user } = useAuth0();
  const classes = useStyles();

  // This Render function returns the appropriate component
  // If not logged in, land on landing page
  const Render = props =>
    user ? (
      <Component {...props} />
    ) : !loading && !user ? (
      <LandingPage />
    ) : (
      <div>
        <CircularProgress className={classes.loadingSpinner} />
      </div>
    );

  // We return the Render function that returns the right component
  return <Render path={path} {...rest} />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
};
