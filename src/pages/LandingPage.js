import React from 'react';
import { Wrapper, Box, Flex, AppWrapper } from 'adaptiv-ui';
import landingImage from '../images/landingImage.jpeg';



const LandingPage = () => {

  return (
  // NavBar here, when sidebar nav is built
    <Wrapper>
      <AppWrapper bg_src={landingImage} >
        <Flex h='70vh' jc_center ai_center >
          <Flex w='85%' jc_center ai_center >
            <h1 className='hero-text'>Your Home for Angel City Sports Events and More!</h1>
          </Flex>
        </Flex>
      </AppWrapper>
      
    </Wrapper>
  )
}

export default LandingPage