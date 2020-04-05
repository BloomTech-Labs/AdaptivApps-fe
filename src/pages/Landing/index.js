// React imports
import React from 'react';
import NavBar from './NavBar';
import { Grid, Container, Box, Button, Typography, makeStyles } from '@material-ui/core';
import { Link } from '@reach/router';
import { useAuth0 } from '../../config/react-auth0-spa';
import landingImage from '../../assets/images/landingImage.jpeg';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
// import './styles.css';

const useStyles = makeStyles({
  mainContainer: {
    height: '100vh'
  },
  topContent: {
    backgroundColor: 'rgba(7, 6, 6, 0.5)',
    position: 'relative',
    height: '60vh',
    '& img': {
      objectFit: 'cover',
    },
  },
})

// This is our landing page, aka the home page for the main app
const LandingPage = () => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  return (
    <IconContext.Provider value={{ color: 'white', size: '3rem' }}>
      <NavBar />
      <Grid className={classes.mainContainer}>
      
          <Box className={classes.topContent}>
            <img  src={landingImage} alt="Angel City Sports" />
            <p>
              Your Home for Angel City Sports Events and More!
            </p>
          </Box>
     
        <Container>
          <Box>
            <h2>Sign Up Now!</h2>
          </Box>
          <Box>
            <Box>
              <Typography>
                Sign Up Now with Facebook or Google, add your profile info, and
                keep track of Angel City Sports Games, Clinics, and other
                events! All the info you need is all in one place - The Angel
                City Sports App.
              </Typography>
            </Box>
            <Box drape w="30%">
              <Button
                bg="#3B5998"
                secondary
                w="26rem"
                onClick={() => loginWithRedirect({})}
              >
                <Box jc_between ai_center>
                  <FaFacebookSquare />
                  <p>Sign up with Facebook</p>
                </Box>
              </Button>
              <Button secondary w="26rem" onClick={() => loginWithRedirect({})}>
                <Box jc_between ai_center>
                  <FaGoogle />
                  <p>Sign up with Google</p>
                </Box>
              </Button>
              <Link
                to="privacy-policy"
                style={{ padding: '0' }}
                className="privacy-link"
              >
                <small>Privacy Policy</small>
              </Link>
            </Box>
          </Box>
        </Container>
        <Link to="accessibility" className="accessibility">
          Accessibility Statement
        </Link>
      </Grid>
    </IconContext.Provider>
  );
};

export default LandingPage;
