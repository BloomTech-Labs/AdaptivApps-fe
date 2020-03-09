import React from 'react';

import EventCard from './EventCard';

import { useQuery } from 'react-apollo';
import { GET_EVENT_LIST } from './queries';

// Styling imports
import { Flex, Box, Text } from 'adaptiv-ui';

export default function EventsCalendar() {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_EVENT_LIST);

  return (
    <Flex ai_start col stretch>
      <Text xlf bold mm>
        Upcoming Events
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      {data &&
        data.events.map((event, id) => <EventCard key={id} event={event} />)}
    </Flex>
  );
}
