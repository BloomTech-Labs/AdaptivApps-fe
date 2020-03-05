import React from 'react';

//components
import EventList from './EventList';
import SideNav from '../../../../components/SideNav';

import { useAuth0 } from '../../../../components/auth/react-auth0-spa';

import {
  Flex,
  Box,
  Text,
  Button,
  Form,
  Input,
  theme,
  TextArea,
  Select,
} from 'adaptiv-ui';

export default function EventCalendarPage() {
  const { user } = useAuth0();
  return (
    <Flex ai_start stretch>
      <Box w="15vw" min_w="25rem">
        <SideNav user={user} />
      </Box>
      <Text xlf bold mm>
        Upcomming Events
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <EventList />
    </Flex>
  );
}
