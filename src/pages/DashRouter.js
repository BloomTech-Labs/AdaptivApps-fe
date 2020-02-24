import React from 'react';

import { Flex, Box } from 'adaptiv-ui';

// Auth0 imports
import { useAuth0 } from '../components/auth/react-auth0-spa';
import config from '../components/auth/auth_config.json';

// Component imports
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './users/UserDashboard';
import SideNav from '../components/SideNav';

const DashRouter = () => {
  const { loading, user } = useAuth0();
  console.log(user);

  // loading and no user will show Loading div
  if (loading || !user) {
    return <div>Loading...</div>;
  }
  return user[config.roleUrl].includes('Admin') ? (
    <Flex jc_between>
      <Box w="20%">
        <SideNav user={user} />
      </Box>
      <Box w="80%" mm>
        <AdminDashboard user={user} />
      </Box>
    </Flex>
  ) : (
    <Flex jc_between>
      <Box w="20%">
        <SideNav user={user} />
      </Box>
      m<Box w="80%" mm>
        <UserDashboard user={user} />
      </Box>
    </Flex>
  );
};

export default DashRouter;
