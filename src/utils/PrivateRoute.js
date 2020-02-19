import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from '../components/auth/react-auth0-spa';
import LandingPage from '../pages/LandingPage';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  // secures private info by checking to see if user authenticated is true and then displays component and contents
  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props =>
    isAuthenticated ? <Component {...props} /> : <LandingPage />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;