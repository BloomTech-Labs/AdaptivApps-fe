import React from 'react';
import { useAuth0 } from '../../../config/react-auth0-spa';
import { makeStyles, Box, Button } from '@material-ui/core';
import acsLogo from '../../../assets/images/acsLogo.png';
import config from '../../../config/auth_config';
import {
  FaRegCalendar,
  FaRegBookmark,
  FaRegUser,
  FaHome,
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import NavLink from './NavLink';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow:
      '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14)',
  },
  imgContainer: {
    margin: '5rem 0',
    width: '25rem',
  },
  img: {
    width: '100%',
  },
  logoutBtn: {
    width: '60%',
  },
  navText: {
    textAlign: 'left',
    fontSize: '1.6rem',
  },
  navIcon: {
    fontSize: '2rem',
    margin: '0 1rem 0 2rem',
  },
  logoutBox: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  logoutIcon: {
    color: '#2962FF',
    display: 'flex',
    textAlign: 'left',
    fontSize: '2rem',
  },
  logoutText: {
    textTransform: 'none',
    color: '#2962FF',
    fontSize: '1.6rem',
    alignSelf: 'flex-start',
  },
});

// This component is rendered for all users on login on the side
const SideNav = () => {
  const classes = useStyles();
  const { logout, user } = useAuth0();

  return (
    <nav className={classes.root}>
      <Box>
        <Box className={classes.imgContainer}>
          <img className={classes.img} src={acsLogo} alt="ACS Logo" />
        </Box>
        <NavLink to="calendar">
          <FaRegCalendar className={classes.navIcon} />
          <p className={classes.navText}> Events Calendar</p>
        </NavLink>
        <NavLink to="myevents">
          <FaRegBookmark className={classes.navIcon} />
          <p className={classes.navText}> My Events</p>
        </NavLink>
        {/* If user is an admin, then this section will be rendered */}
        {user && user[config.roleUrl].includes('Admin') ? (
          <NavLink to="manage">
            <FaHome className={classes.navIcon} />

            <p className={classes.navText}> Manage Events</p>
          </NavLink>
        ) : null}
        {user && user[config.roleUrl].includes('Admin') ? (
          <NavLink to="users">
            <FaHome className={classes.navIcon} />

            <p className={classes.navText}> Manage Users</p>
          </NavLink>
        ) : null}
        <NavLink to="/">
          <FaRegUser className={classes.navIcon} />
          <p className={classes.navText}> My Profile</p>
        </NavLink>
      </Box>

      <Box>
        <Button className={classes.logoutBtn} onClick={() => logout()}>
          <Box className={classes.logoutBox}>
            <IconContext.Provider
              value={{ style: { transform: 'rotate(180deg)' } }}
            >
              <FiLogOut className={classes.logoutIcon} />

              <p className={classes.logoutText}> Log Out</p>
            </IconContext.Provider>
          </Box>
        </Button>
      </Box>
    </nav>
  );
};

export default SideNav;

SideNav.propTypes = {
  user: PropTypes.object,
};
