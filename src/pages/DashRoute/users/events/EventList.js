import React from 'react';
import SideNav from '../../../../components/SideNav';

import { useAuth0 } from '../../../../components/auth/react-auth0-spa';
// Styling imports
import { Flex, Box } from 'adaptiv-ui';

export default function EventList() {
  const { user } = useAuth0();
  return (
    <Flex>
      <Box w="15vw" min_w="25rem">
        <SideNav user={user} />
      </Box>
      <p>event list is working</p>
    </Flex>
  );
}
