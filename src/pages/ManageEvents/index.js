import React from 'react';
import { Box, Text, Flex } from 'adaptiv-ui';
import { useQuery } from 'react-apollo';
import { GET_EVENTS } from './queries';
import AdminEventList from './AdminEventList';

// This is the component that is responsible for managing events
// An admin can perform CRUD operations for events and activities
const ManageEvents = () => {
  // Getting all events
  const { data: eventsData, refetch: eventsRefetch } = useQuery(GET_EVENTS);

  return (
    <Flex ai_start col stretch m="0 0 0 2rem">
      <Text xlf bold mm>
        Manage Events and Activities
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Box h="2rem" />

      {/* Call the AdminEventList, which will contain a list of events */}
      {eventsData ? (
        <AdminEventList
          events={eventsData?.events}
          eventsRefetch={eventsRefetch}
        />
      ) : (
        <p>Loading</p>
      )}
    </Flex>
  );
};

export default ManageEvents;
