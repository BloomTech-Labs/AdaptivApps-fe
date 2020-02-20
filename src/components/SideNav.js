import React from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import { Flex, Card, Linkton, Box, Button } from "adaptiv-ui";
import acsLogo from '../images/acsLogo.png'

const SideNav = () => {
  const { logout } = useAuth0()

  return(
    <Box h='100%' stretch >
      <Box stretch>
        <img src={acsLogo} />
      </Box>
      <Flex col jc_start ai_center >
        <Linkton primary stretch to='/calendar' >Events Calendar</Linkton>
        <Linkton primary stretch to='/events' >My Events</Linkton>
        <Linkton secondary stretch to='/dashboard' >My Profile</Linkton>
        
      </Flex>
      <Flex col jc_end ai_center >
        <Button primary stretch onclick={() => logout()}>Log Out</Button>
      </Flex>
    </Box>
  )
}

export default SideNav