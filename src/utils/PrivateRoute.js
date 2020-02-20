import React from "react";
import { Router } from "@reach/router";
import { useAuth0 } from '../components/auth/react-auth0-spa'
import LandingPage from '../pages/LandingPage'
import Profile from "../components/Profile";
import { Wrapper } from "adaptiv-ui";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, user } = useAuth0();

  // secures private info by checking to see if user authenticated is true and then displays component and contents
  // useEffect(() => {
  //   if (loading || isAuthenticated) {
  //     return;
  //   }
  //   const fn = async () => {
  //     await loginWithRedirect({
  //       appState: { targetUrl: path }
  //     });
  //   };
  //   fn();
  // }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props =>
    user ? 
    <Profile {...props} path="/"/> 
    : 
    !loading && !user ? 
    <LandingPage /> 
    : 
    <Wrapper jc_center>
      <h1>Loading</h1>
    </Wrapper>;

  return <Profile path={path} render={render} {...rest} />;
};

export default PrivateRoute;