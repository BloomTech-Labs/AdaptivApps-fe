import React from 'react';
import { useQuery } from 'react-apollo';

import { GET_EVENT_ACTIVITIES } from './queries/getActivities';

import { Flex, Box, Text } from 'adaptiv-ui';

export default function ActivityList() {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_EVENT_ACTIVITIES);
  console.log('ActivityList', data);
  return (
    <Flex ai_start col stretch>
      <Text xlf bold mm>
        Event Activities
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      {/* {data &&
        data.events.activities.map((activity, id) => (
          <EventCard key={id} activity={activity} />
        ))} */}
    </Flex>
  );
}
