import React from 'react';
import { Wrapper, Box, Flex, AppWrapper } from 'adaptiv-ui';
import landingImage from '../images/landingImage.jpeg';



const LandingPage = () => {

  return (
  
    <Wrapper>
      <AppWrapper bg_src={landingImage} >
        <Flex w='60%' h='70vh' >
          <h1 className='hero-text'>Your Home for Angel City Sports Events and More!</h1>
        </Flex>
      </AppWrapper>
    </Wrapper>
  )
}

export default LandingPage