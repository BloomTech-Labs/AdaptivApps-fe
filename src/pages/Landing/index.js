// React imports
import React from 'react';
import NavBar from './NavBar';
import {
  makeStyles,
  Container,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from '@reach/router';
import { useAuth0 } from '../../config/react-auth0-spa';
import landingImage from '../../assets/images/landingImage.jpeg';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#000000',
    padding: '0',
    maxWidth: '100%',
    height: '60vh',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  bannerImg: {
    opacity: '0.5',
    width: '100%',
    height: '60vh',
    objectFit: 'cover',
  },
  typography: {
    top: '20rem',
    zIndex: '1',
    maxWidth: '85%',
    color: '#FFFFFF',
    position: 'absolute',
    padding: 0,
    [theme.breakpoints.up('lg')]: {
      fontSize: '7.2rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '5.2rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '3.2rem',
    },
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '100%',
    width: '100vw',
    margin: '0',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  contentIntro: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: '35%',
    margin: '5rem 0 0 10em',
    '& h2': {
      margin: '1.5rem 0',
    },
    [theme.breakpoints.down('md')]: {
      width: '55%',
      '& h2': {
        margin: '0.5rem 0',
      },
    },
  },
  contentP: {
    fontSize: '1.8rem',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn1: {
    margin: '10rem 0 2rem 0',
    textTransform: 'none',
    fontSize: '2.4rem',
    display: 'flex',
    borderRadius: '5px',
    width: '40rem',
    height: '6rem',
    backgroundColor: '#3B5998',
    color: 'white',
    '&:hover': {
      border: '1px solid #3B5998',
      backgroundColor: 'white',
      color: '#3B5998',
    },
    '& span': {
      display: 'flex',
      justifyContent: 'flex-start',
      '& svg': {
        margin: '0 1.5rem',
      },
    },
  },
  btn2: {
    textTransform: 'none',
    fontSize: '2.4rem',
    display: 'flex',
    borderRadius: '5px',
    width: '40rem',
    height: '6rem',
    backgroundColor: '#4285F4',
    color: 'white',
    '&:hover': {
      border: '1px solid #4285F4',
      backgroundColor: 'white',
      color: '#4285F4',
    },
    '& span': {
      display: 'flex',
      justifyContent: 'flex-start',
      '& svg': {
        margin: '0 1.5rem',
      },
    },
  },
}));

// This is our landing page, aka the home page for the main app
const LandingPage = () => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  return (
    <IconContext.Provider value={{ color: 'white', size: '3rem' }}>
      <NavBar />
      <Container className={classes.container}>
        <div className={classes.box}>
          <Typography className={classes.typography}>
            Your home for Angel City Sports events and more!
          </Typography>
          <img
            className={classes.bannerImg}
            src={landingImage}
            alt="Angel City Sports"
          />
        </div>
      </Container>
      <Container className={classes.contentContainer}>
        <Box className={classes.contentIntro}>
          <h2>Sign Up Now!</h2>
          <Typography className={classes.contentP}>
            Sign Up Now with Facebook or Google, add your profile info, and keep
            track of Angel City Sports Games, Clinics, and other events! All the
            info you need is all in one place - The Angel City Sports App.
          </Typography>
        </Box>
        <Box className={classes.btnContainer}>
          <Button
            className={classes.btn1}
            onClick={() => loginWithRedirect({})}
          >
            <FaFacebookSquare className={classes.icon} />
            <p>Sign up with Facebook</p>
          </Button>
          <Button
            className={classes.btn2}
            onClick={() => loginWithRedirect({})}
          >
            <FaGoogle className={classes.icon} />
            <p>Sign up with Google</p>
          </Button>

          <Link
            to="privacy-policy"
            style={{ padding: '0' }}
            className="privacy-link"
          >
            <small>Privacy Policy</small>
          </Link>

          <Link to="accessibility" className="accessibility">
            Accessibility Statement
          </Link>
        </Box>
      </Container>
    </IconContext.Provider>
  );
};

export default LandingPage;