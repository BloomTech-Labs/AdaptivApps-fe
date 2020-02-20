import React from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import { Flex, Card, Linkton, Box, Button } from "adaptiv-ui";
import acsLogo from '../images/acsLogo.png'
import { IconContext } from 'react-icons'
import { FaRegCalendar, FaRegBookmark, FaRegUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'

const SideNav = () => {
  const { logout } = useAuth0()

  return(
    <Box h='100%' stretch>
      <Box stretch>
        <img src={acsLogo} />
      </Box>
      <Flex col jc_start ai_center >
        <Linkton primary stretch to='/calendar' ><FaRegCalendar /> <p>Events Calendar</p></Linkton>
        <Linkton primary stretch to='/events' ><FaRegBookmark /> <p>My Events</p></Linkton>
        <Linkton secondary stretch to='/dashboard' ><FaRegUser /> <p>My Profile</p></Linkton>
        
      </Flex>
      <Flex col jc_end ai_center >
        <Button primary stretch onclick={() => logout()}><FiLogOut /> <p>Log Out</p></Button>
      </Flex>
    </Box>
  )
}

export default SideNav