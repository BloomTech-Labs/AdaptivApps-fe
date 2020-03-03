// React imports
import React from 'react';

// Auth0 imports
import { useAuth0 } from '../../components/auth/react-auth0-spa';

// Component imports
import UserDashboard from './components/UserDashboard';
import SideNav from '../../components/SideNav';

// Styling imports
import { Flex, Box } from 'adaptiv-ui';

const DashRouter = () => {
  const { user } = useAuth0();
  return (
    <Flex jc_between>
      <Box w="15vw" min_w="25rem">
        <SideNav user={user} />
      </Box>
      <Box stretch>
        <UserDashboard user={user} />
      </Box>
    </Flex>
  );
};

export default DashRouter;
