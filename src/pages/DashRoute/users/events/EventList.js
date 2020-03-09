import React from 'react';

import EventCard from './EventCard';

import { useQuery } from 'react-apollo';
import { GET_EVENT_LIST } from '../../queries/events/getEvents';

// Styling imports
import { Flex, Box, Text } from 'adaptiv-ui';

export default function EventList() {
  const { loading, error, data } = useQuery(GET_EVENT_LIST);

  console.log(data);
  return (
    <Flex ai_start col stretch>
      <Text xlf bold mm>
        Upcomming Events
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      {data?.events.map((event, id) => (
        <EventCard key={id} event={event} />
      ))}
    </Flex>
  );
}
