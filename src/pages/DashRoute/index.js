// eslint-disable-next-line
import React, { useEffect } from 'react';

import { Flex, Box } from 'adaptiv-ui';

// Auth0 imports
import { useAuth0 } from '../../components/auth/react-auth0-spa';
import config from '../../components/auth/auth_config.json';

// Component imports
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './users/UserDashboard';
import SideNav from '../../components/SideNav';

// eslint-disable-next-line
import { useQuery, useMutation } from '@apollo/react-hooks';

import { PROFILE_INFO } from './queries/getProfile';
// import { ADD_USER_PROFILE } from './queries/addUserProfile';

const DashRouter = () => {
  const { loading, user } = useAuth0();

  const { data } = useQuery(PROFILE_INFO, {
    variables: { email: user.email },
  });

  console.log('USER EMAIL: ', user);

  console.log('BIG DATA', data);

  // const [createProfile] = useMutation(ADD_USER_PROFILE);

  // useEffect(() => {
  //   if (data?.profile?.email === user.email) {
  //     return null;
  //   } else {
  //     createProfile({
  //       variables: {
  //         email: user.email,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         displayName: user.name,
  //       },
  //     });
  //     console.log('NEW EMAIL ADDED FOOL!', createProfile?.data);
  //   }
  // }, []);

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
      <Box w="70vw">
        <UserDashboard user={user} />
      </Box>
    </Flex>
  );
};

export default DashRouter;
