// React imports
import React from 'react';

// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';

// Component imports
import SideNav from './SideNav';

import PropTypes from 'prop-types';

// Styling imports
import { Flex, Box } from 'adaptiv-ui';

const DashRouter = ({ children }) => {
  const { user } = useAuth0();
  return (
    <Flex jc_between>
      <SideNav user={user} />
      <Box w="17vw" min_w="25rem" />
      <Box stretch>{children}</Box>
    </Flex>
  );
};

export default DashRouter;

DashRouter.propTypes = {
  children: PropTypes.any,
};
