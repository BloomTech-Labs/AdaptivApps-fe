import React from 'react';
import { useAuth0 } from '../../config/react-auth0-spa';
import { makeStyles, Box, Button } from '@material-ui/core';
import acsLogo from '../../assets/images/acsLogo.png';
const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: '1',
    position: 'absolute',
    display: 'flex',
    background: 'transparent',
    height: '10vh',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center'
    },
  },
  acsBanner: {
    height: '100%',
  },
  acsBrand: {
    height: 'auto',
    width: '30rem',
    [theme.breakpoints.down('md')]: {
      width: '25rem',
    },
  },
  box: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnContainer: {
    width: '24rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-start',
    '& .MuiButton-label': {
      fontSize: '1.6rem',
      fontWeight: 500
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '1.5rem',
    }
  },
  navBtn: {
    width: '9.6rem',
    height: '4.8rem',
    background: '#2962FF',
    color: '#FFFFFF',
    fontSize: '1.6rem',
    textTransform: 'none',
    marginTop: '1.6rem',
    '&:hover': {
      background: '#FFFFFF',
      color: '#2962FF',
    },
  },
}));
const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <nav className={classes.container}>
      <Box className={classes.acsBanner}>
        <img
          className={classes.acsBrand}
          src={acsLogo}
          alt="angel city sports brand"
        />
      </Box>
      <Box className={classes.box}>
        <Box className={classes.btnContainer}>
          {/* If a user is not logged in (authenticated), will redirect to Auth0 log in modal. */}
          {!isAuthenticated && (
            <Button
              className={classes.navBtn}
              onClick={() => loginWithRedirect({})}
            >
              Sign Up
            </Button>
          )}
          <Button
            className={classes.navBtn}
            aria-label="Access log in modal"
            onClick={() => loginWithRedirect({})}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </nav>
  );
};
export default NavBar;