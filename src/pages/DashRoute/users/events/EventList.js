import React from 'react';
import SideNav from '../../../../components/SideNav';

import { useQuery } from 'react-apollo';
import { GET_EVENT_LIST } from '../../queries/events/getEvents';

import { useAuth0 } from '../../../../components/auth/react-auth0-spa';
// Styling imports
import { Flex, Box } from 'adaptiv-ui';

export default function EventList() {
  const { loading, error, data } = useQuery(GET_EVENT_LIST);
  const { user } = useAuth0();
  console.log(data);
  return (
    <Flex>
      <Box w="15vw" min_w="25rem">
        <SideNav user={user} />
      </Box>
      <EventCard />
    </Flex>
  );
}
