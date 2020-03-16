import React from 'react';
import { useQuery } from 'react-apollo';
import Activities from './Activities';

import { useParams } from '@reach/router';
import { GET_EVENT_ACTIVITIES } from './queries/getActivities';

import { Flex, Box, Text } from 'adaptiv-ui';

export default function ActivityList() {
  const { eventId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_EVENT_ACTIVITIES, {
    variables: { id: eventId },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <Flex ai_start col stretch>
      <Text xlf bold mm>
        Event Activities
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      {data &&
        data?.event?.activities.map((activity, id) => (
          <Activities key={id} activity={activity} />
        ))}
    </Flex>
  );
}
