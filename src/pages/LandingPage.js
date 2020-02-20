import React from 'react';
import { Wrapper, Box, Flex, Container, Button } from 'adaptiv-ui';
import { useAuth0 } from '../components/auth/react-auth0-spa';
import landingImage from '../images/landingImage.jpeg';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <IconContext.Provider value={{ color: 'white', size: '3rem' }}>
      {/* NavBar here, when sidebar nav is built */}
      <Wrapper>
        <Container bg_src={landingImage} invert attach_fix>
          <Flex h="70vh" jc_center ai_center>
            <Flex w="85%" jc_center ai_center>
              <h1 className="hero-text">
                Your Home for Angel City Sports Events and More!
              </h1>
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
              <p>
                Sign Up Now with Facebook or Google, add your profile info, and
                keep track of Angel City Sports Games, Clinics, and other
                events! All the info you need is all in one place - The Angel
                City Sports App.
              </p>
            </Flex>
            <Flex drape w="30%">
              <Button
                bg="#3B5998"
                secondary
                w="25rem"
                onClick={() => loginWithRedirect({})}
              >
                <Flex jc_between ai_center>
                  <FaFacebookSquare />
                  <p>Sign up with Facebook</p>
                </Flex>
              </Button>
              <Button secondary w="25rem" onClick={() => loginWithRedirect({})}>
                <Flex jc_between ai_center>
                  <FaGoogle />
                  <p>Sign up with Google</p>
                </Flex>
              </Button>
            </Flex>
          </Flex>
          <Box h="8vh" />
        </Flex>
      </Wrapper>
    </IconContext.Provider>
  );
};

export default LandingPage;
