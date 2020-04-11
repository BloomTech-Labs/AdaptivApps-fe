import React from 'react';
import { useAuth0 } from '../../config/react-auth0-spa';
import LandingPage from '../../pages/Landing';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, user } = useAuth0();
  // const loading = false;
  // const user = true;

  // This Render function returns the appropriate component
  // If not logged in, land on landing page
  const Render = props =>
    user ? (
      <Component {...props} />
    ) : !loading && !user ? (
      <LandingPage />
    ) : (
      <div>
        <h1>Loading</h1>
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
