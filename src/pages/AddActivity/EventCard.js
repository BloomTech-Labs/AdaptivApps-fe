import React from 'react';
import { Flex } from 'adaptiv-ui';

const EventCard = props => {
  const event = props.event;
  return (
    <Flex col>
      <p>
        <strong>{event.title}</strong>
      </p>
      <p>{event.startDate}</p>
      <p>{event.endDate}</p>
      <p>{event.location}</p>
    </Flex>
  );
};

export default EventCard;
