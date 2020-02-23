import React from 'react';
import { useAuth0 } from '../components/auth/react-auth0-spa';
import config from '../components/auth/auth_config.json';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './users/UserDashboard';
import SideNav from '../components/SideNav';
import { Flex, Box } from 'adaptiv-ui';

// example Profile page

const DashRouter = () => {
  const { loading, user } = useAuth0();
  console.log(user);

  // loading and no user will show Loading div
  if (loading || !user) {
    return <div>Loading...</div>;
  }
  return user[config.roleUrl].includes('Admin') ? (
    <Flex jc_between>
      <Box>
        <SideNav user={user} />
      </Box>
      <Box w="70vw">
        <AdminDashboard user={user} />
      </Box>
    </Flex>
  ) : (
    <Flex jc_between>
      <Box>
        <SideNav user={user} />
      </Box>
      <Box w="85%">
        <UserDashboard user={user} />
      </Box>
    </Flex>
  );
};

export default DashRouter;
