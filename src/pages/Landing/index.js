// React imports
import React from 'react';
import NavBar from './NavBar';
import { Wrapper, Box, Flex, Container, Button, Text } from 'adaptiv-ui';
import { useAuth0 } from '../../config/react-auth0-spa';
import landingImage from '../../assets/images/landingImage.jpeg';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import NavLink from '../../routes/DashRouter/SideNav/NavLink';
import './styles.css';

// This is our landing page, aka the home page for the main app
const LandingPage = () => {
  const { user, loginWithRedirect } = useAuth0();
  return (
    <IconContext.Provider value={{ color: 'white', size: '3rem' }}>
      <NavBar />
      <Wrapper>
        <Container bg_src={landingImage} invert attach_fix>
          <Flex h="50vh" jc_center ai_center>
            <Flex w="85%" jc_center ai_center>
              <Text bold f_size="7.2rem">
                Your Home for Angel City Sports Events and More!
              </Text>
            </Flex>
          </Flex>
        </Container>
        <Box h="6vh" />
        <Flex drape>
          <Flex>
            <h2>Sign Up Now!</h2>
          </Flex>
          <Flex jc_center ai_center>
            <Flex drape w="30%">
              <Text>
                Sign Up Now with Facebook or Google, add your profile info, and
                keep track of Angel City Sports Games, Clinics, and other
                events! All the info you need is all in one place - The Angel
                City Sports App.
              </Text>
            </Flex>
            <Flex drape w="30%">
              <div
                className="fb-login-button"
                data-width=""
                data-size="large"
                data-button-type="login_with"
                data-layout="default"
                data-auto-logout-link="false"
                data-use-continue-as="false"
              ></div>
              <Button secondary w="26rem" onClick={() => loginWithRedirect({})}>
                <Flex jc_between ai_center>
                  <FaGoogle />
                  <Box w="2rem" />
                  <p>Sign up with Google</p>
                  <Box w="2rem" />
                </Flex>
              </Button>
              <NavLink
                to="privacy-policy"
                style={{ padding: '0' }}
                className="privacy-link"
              >
                <small>Privacy Policy</small>
              </NavLink>
            </Flex>
          </Flex>
        </Flex>
        <NavLink to="accessibility" className="accessibility">
          Accessibility Statement
        </NavLink>
      </Wrapper>
    </IconContext.Provider>
  );
};

export default LandingPage;
