import React from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import { Link } from "react-router-dom";
import { Flex, Box } from "adaptiv-ui";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Flex wrap stretch jc_end ai_center>
      {/* If a user is not logged in (authenticated), will redirect to Auth0 log in modal. */}
      {!isAuthenticated && (
        <button aria-label="Access log in modal" onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {/* If a user is logged in (authenticated), log out functionality will be enabled.) */}
      {isAuthenticated && <button aria-label="log out" onClick={() => logout()}>Log out</button>}

      <Box w='1rem' />
      <Link to="/">Home</Link>

      {isAuthenticated && (
        <>
          <Link to="/dashboard">Profile</Link>
        </>
      )}
      <Box w='3rem' />
    </Flex>
  );
};

export default NavBar;