import React from 'react';
import { useQuery } from 'react-apollo';
import Activities from './Activities';

import { useParams } from '@reach/router';
import { GET_EVENT_ACTIVITIES } from './queries/getActivities';

import { Flex, Box } from 'adaptiv-ui';

export default function ActivityList() {
  const { eventId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_EVENT_ACTIVITIES, {
    variables: { id: eventId },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <Flex ai_start col stretch visible>
      <h4>Event Activities</h4>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Flex m="3rem 0">
        <img
          style={{ height: '15rem', width: '40rem', objectFit: 'cover' }}
          src={data && data?.event?.imgUrl}
        />
        <Box m="auto 0">
          <small style={{ margin: '1rem' }}>
            {data.event.startDate}-{data.event.endDate}
          </small>
          <br />
          <p style={{ margin: '1rem' }}>{data.event.title}</p>
          <small style={{ margin: '1rem' }}>{data.event.location}</small>
        </Box>
      </Flex>
      <Flex visible col h="30rem" stretch>
        <h6 style={{ margin: '0' }}>Activities Schedule</h6>
        {data &&
          data?.event?.activities.map((activity, id) => (
            <Activities key={id} activity={activity} />
          ))}
      </Flex>
    </Flex>
  );
}
