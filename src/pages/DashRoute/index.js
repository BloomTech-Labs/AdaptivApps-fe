// React imports
import React from 'react';

// Auth0 imports
import { useAuth0 } from '../../components/auth/react-auth0-spa';

// Component imports
// import UserDashboard from './components/UserDashboard';
import SideNav from '../../components/SideNav';

import PropTypes from 'prop-types';

// Styling imports
import { Flex, Box } from 'adaptiv-ui';

const DashRouter = ({ children }) => {
  const { user } = useAuth0();
  return (
    <Flex jc_between>
      <Box w="15vw" min_w="25rem">
        <SideNav user={user} />
      </Box>
      <Box stretch>
        {/* <UserDashboard user={user} /> */}
        {children}
      </Box>
    </Flex>
  );
};

export default DashRouter;

DashRouter.propTypes = {
  children: PropTypes.any,
};
