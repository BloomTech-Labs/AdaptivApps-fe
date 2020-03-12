import React from 'react';
import { useAuth0 } from '../../../config/react-auth0-spa';
import { Flex, NavBar, Box, Button } from 'adaptiv-ui';
import acsLogo from '../../../assets/images/acsLogo.png';
import config from '../../../config/auth_config';
import { FaRegCalendar, FaRegBookmark, FaRegUser, FaPen } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import NavLink from './NavLink';

// This component is rendered for all users on login on the side
const SideNav = () => {
  const { logout, user } = useAuth0();

  return (
    <NavBar className="nav-bar" col jc_between h="100vh">
      <Flex col>
        <Box stretch>
          <img src={acsLogo} alt="ACS Logo" />
        </Box>
        <NavLink to="calendar">
          <Box w="2rem" />
          <FaRegCalendar />
          <Box w="2rem" />
          <p>Events Calendar</p>
        </NavLink>
        <NavLink to="myevents">
          <Box w="2rem" />
          <FaRegBookmark />
          <Box w="2rem" />
          <p>My Events</p>
        </NavLink>
        {/* If user is an admin, then this section will be rendered */}
        {user && user[config.roleUrl].includes('Admin') ? (
          <NavLink to="events/create">
            <Box w="2rem" />
            <FaPen />
            <Box w="2rem" />
            <p>Create Event</p>
          </NavLink>
        ) : null}
        <NavLink primary="true" row="true" stretch="true" to="/" radius="0">
          <Box w="2rem" />
          <FaRegUser />
          <Box w="2rem" />
          <p>My Profile</p>
        </NavLink>
      </Flex>

      <Flex col jc_end ai_end>
        <Button ai_start primary stretch radius="0" onClick={() => logout()}>
          <Flex jc_start ai_center>
            <IconContext.Provider
              value={{ style: { transform: 'rotate(180deg)' } }}
            >
              <Box w="2rem" />
              <FiLogOut />
              <Box w="2rem" />
              <p>Log Out</p>
            </IconContext.Provider>
          </Flex>
        </Button>
      </Flex>
    </NavBar>
  );
};

export default SideNav;

SideNav.propTypes = {
  user: PropTypes.object,
};
