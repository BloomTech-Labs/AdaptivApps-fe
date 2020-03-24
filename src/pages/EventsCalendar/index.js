import React, { useEffect } from 'react';

import EventCard from './EventCard';

import { useQuery } from 'react-apollo';
import { GET_EVENT_LIST } from './queries';

// Styling imports
import { Flex, Box } from 'adaptiv-ui';

export default function EventsCalendar() {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data, refetch } = useQuery(GET_EVENT_LIST);
  // refetches EVENT_LIST without refreshing page
  useEffect(() => {
    refetch();
  }, []);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Flex ai_start col stretch>
      <h4>Upcoming Events</h4>
      <Box h="0.2rem" w="90%" bg="lightgrey" />

      {data &&
        data?.events?.map((event, id) => <EventCard key={id} event={event} />)}
    </Flex>
  );
}
