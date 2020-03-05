import React from 'react';

import EventCard from './EventCard';

import { useQuery } from 'react-apollo';
import { GET_EVENT_LIST } from '../../queries/events/getEvents';

// Styling imports
import { Flex } from 'adaptiv-ui';

export default function EventList() {
  const { loading, error, data } = useQuery(GET_EVENT_LIST);

  console.log(data);
  return (
    <Flex>
      {data?.events.map((event, id) => (
        <EventCard key={id} event={event} />
      ))}
    </Flex>
  );
}
