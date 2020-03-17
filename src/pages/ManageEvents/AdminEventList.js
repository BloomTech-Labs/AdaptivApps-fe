import React from 'react';
import { Flex, Text } from 'adaptiv-ui';
import AdminEventCard from './AdminEventCard';

const AdminEventList = props => {
  const events = props.events;

  return (
    <Flex col m="0 0 0 1.5rem">
      {events &&
        events.map(event => (
          <AdminEventCard
            event={event}
            key={event.id}
            refetch={props.refetch}
          />
        ))}
    </Flex>
  );
};

export default AdminEventList;
