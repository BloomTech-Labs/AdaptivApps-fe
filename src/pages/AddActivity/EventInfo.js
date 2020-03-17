import React from 'react';
import { Flex, Text } from 'adaptiv-ui';

export default function EventInfo(props) {
  const event = props.event;

  return (
    <Flex col m="0 0 0 1rem">
      <Text lf>{event.title}</Text>
      <Text mf color="#696969">
        {event.startDate} - {event.endDate}
      </Text>
      <Text mf color="#696969">
        {event.location}
      </Text>
    </Flex>
  );
}
