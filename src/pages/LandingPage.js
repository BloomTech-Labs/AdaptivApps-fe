import React from 'react';

import { useAuth0 } from "../components/auth/react-auth0-spa";
import { Redirect } from "@reach/router";



const LandingPage = () => {
  
  const { user } = useAuth0();
  
  console.log("user", user);
  if (user) return <Redirect noThrow={true} to="/dashboard"/>
    return (
        <div className= "API-message">
          <h1>Let's get it started!!!</h1>
        </div>
    )
}

export default LandingPage