import React from 'react';

import EventCard from './EventCard';

import { useQuery } from 'react-apollo';
import { GET_EVENT_LIST } from './queries';

// Styling imports
import { Flex, Box, Text } from 'adaptiv-ui';

export default function EventsCalendar() {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_EVENT_LIST);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <Flex ai_start col stretch>
      <h1>Upcoming Events</h1>
      <Box h="0.2rem" w="90%" bg="lightgrey" />

      {data &&
        data.events.map((event, id) => <EventCard key={id} event={event} />)}
    </Flex>
  );
}
