import React from 'react';
import { useAuth0 } from '../components/auth/react-auth0-spa';
import LandingPage from '../pages/LandingPage';
import { Wrapper } from 'adaptiv-ui';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, user } = useAuth0();

  // This Render function returns the appropriate component
  const Render = props =>
    user ? (
      <Component {...props} />
    ) : !loading && !user ? (
      <LandingPage />
    ) : (
      <Wrapper jc_center>
        <h1>Loading</h1>
      </Wrapper>
    );

  // We return the Render function that returns the right component
  return <Render path={path} {...rest} />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
};
