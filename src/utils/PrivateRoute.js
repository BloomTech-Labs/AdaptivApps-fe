import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

//imports from auth0
import { useAuth0 } from '../components/auth/react-auth0-spa';

//imports from components
import LandingPage from '../pages/LandingPage';

//imports from adaptiv-ui
import { Wrapper } from 'adaptiv-ui';

//imports from node_modules
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, user, isAuthenticated } = useAuth0();

  // secures private info by checking to see if user authenticated is true and then displays component and contents
  useEffect(() => {
  }, [loading, isAuthenticated]);

  const render = props =>
    user ? (
      <Component {...props} />
    ) : !loading && !user ? (
      <LandingPage />
    ) : (
      <Wrapper jc_center>
        <h1>Loading</h1>
      </Wrapper>
    );

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func,
  path: PropTypes.string,
};
