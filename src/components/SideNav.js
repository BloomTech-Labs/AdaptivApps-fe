import React from 'react';
import { useAuth0 } from './auth/react-auth0-spa';
import { Flex, NavBar, Box, Button } from 'adaptiv-ui';
import acsLogo from '../assets/images/acsLogo.png';
import config from '../components/auth/auth_config.json';
import { FaRegCalendar, FaRegBookmark, FaRegUser, FaPen } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import NavLink from './NavLink';
// import { Link } from '@reach/router';

const SideNav = props => {
  const { logout } = useAuth0();

  return (
    <NavBar col jc_between h="100vh">
      <Flex col>
        <Box stretch>
          <img src={acsLogo} alt="ACS Logo" />
        </Box>
        <NavLink
          primary="true"
          row="true"
          stretch="true"
          to="calendar"
          radius="0"
        >
          <Box w="2rem" />
          <FaRegCalendar />
          <Box w="2rem" />
          <p>Events Calendar</p>
        </NavLink>

        <NavLink
          to="events"
          primary="true"
          row="true"
          stretch="true"
          radius="0"
        >
          {/* <Link to="events"> */}
          <Box w="2rem" />
          <FaRegBookmark />
          <Box w="2rem" />
          <p>My Events</p>
          {/* </Link> */}
        </NavLink>

        {props.user[config.roleUrl].includes('Admin') ? (
          <NavLink
            to="events/create"
            primary="true"
            row="true"
            stretch="true"
            radius="0"
          >
            {/* <Link to="events/create"> */}
            <Box w="2rem" />
            <FaPen />
            <Box w="2rem" />
            <p>Create Event</p>
            {/* </Link> */}
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
