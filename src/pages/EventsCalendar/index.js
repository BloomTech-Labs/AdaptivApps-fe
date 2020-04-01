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
    <Flex
      Flex
      ai_start
      col
      stretch
      style={{ marginLeft: '1rem', marginTop: '4rem' }}
    >
      <h4 style={{ margin: '1rem 0rem 0.8rem 1.5rem', fontSize: '2.4rem' }}>
        Upcoming Events
      </h4>
      <Box h="0.2rem" w="90%" bg="lightgrey" m="0 0 0 1.6rem" />
      <Flex jc_between row w="90%" style={{ flexWrap: "wrap" }}>
        {data &&
          data?.events?.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
      </Flex>
    </Flex>
  );
}
