import React from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import { Flex, Box, Button, Linkton, theme } from "adaptiv-ui";
import acsLogo from '../images/acsLogo.png'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Flex h='10rem' stretch>
      <Box w='30rem'>
        <img src={acsLogo} />
      </Box>
      <Flex stretch jc_end ai_center>

        {/* If a user is not logged in (authenticated), will redirect to Auth0 log in modal. */}
        {!isAuthenticated && (
          <Button border={`2px solid ${theme.primary}`} primary aria-label="Access log in modal" onClick={() => loginWithRedirect({})}>Log in</Button>
        )}

        {/* If a user is logged in (authenticated), log out functionality will be enabled.) */}
        {isAuthenticated && <Button border={`2px solid ${theme.primary}`} primary aria-label="log out" onClick={() => logout()}>Log out</Button>}

        <Box w='3rem' />
          <Linkton border={`2px solid ${theme.primary}`} primary to="/">Home</Linkton>

        {isAuthenticated && (
          <Linkton border={`2px solid ${theme.primary}`} primary to="/dashboard">Profile</Linkton>
        )}
        <Box w='3rem' />
      </Flex>
    </Flex>
  );
};

export default NavBar;