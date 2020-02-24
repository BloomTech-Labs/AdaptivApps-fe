import React from 'react';
import { useAuth0 } from './auth/react-auth0-spa';
import { Flex, NavBar, Box, Button } from 'adaptiv-ui';
import acsLogo from '../assets/images/acsLogo.png';
import config from '../components/auth/auth_config.json';
import { FaRegCalendar, FaRegBookmark, FaRegUser, FaPen } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import NavLink from './NavLink';
import PropTypes from 'prop-types';

const SideNav = props => {
  const { logout } = useAuth0();

  return (
    <NavBar col jc_between h="100vh" w="29.5vw">
      <Flex col>
        <Box stretch>
          <img src={acsLogo} alt="ACS Logo" />
        </Box>
        <NavLink
          primary="true"
          row="true"
          stretch="true"
          to="/calendar"
          radius="0"
        >
          <Box w="2rem" />
          <FaRegCalendar />
          <Box w="2rem" />
          <p>Events Calendar</p>
        </NavLink>

        <NavLink
          primary="true"
          row="true"
          stretch="true"
          to="/events"
          radius="0"
        >
          <Box w="2rem" />
          <FaRegBookmark />
          <Box w="2rem" />
          <p>My Events</p>
        </NavLink>

        {props.user[config.roleUrl].includes('Admin') ? (
          <NavLink
            primary="true"
            row="true"
            stretch="true"
            to="/events/create"
            radius="0"
          >
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
            <Box w="2rem" />
            <FiLogOut />
            <Box w="2rem" />
            <p>Log Out</p>
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
