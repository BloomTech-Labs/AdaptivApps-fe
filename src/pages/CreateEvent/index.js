import React from 'react';
import { Box, Text } from 'adaptiv-ui';
import EventCreationForm from './EventCreationForm';

export default function CreateEvent() {
  return (
    <div>
      <Text xlf bold mm>
        Create an Event
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <EventCreationForm />
    </div>
  );
}
