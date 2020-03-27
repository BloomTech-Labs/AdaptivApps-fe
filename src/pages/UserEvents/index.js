// React imports
import React, { useEffect } from 'react';
// Component imports
import UserEventCard from './UserEventCard';
// GraphQL/Apollo imports
import { useQuery } from 'react-apollo';
import { GET_USER_EVENTS } from './queries';
// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';
// Styling imports
import { Flex, Box } from 'adaptiv-ui';

export default function UserEvents() {
  // Retrieves logged in user info
  const { user } = useAuth0();
  // Retrieves all events a user is registered to
  const { error, loading, data, refetch } = useQuery(GET_USER_EVENTS, {
    variables: { email: user.email },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <Flex ai_start col stretch style={{marginLeft: "1rem", marginTop: "4rem"}}>
      <h4 style={{margin: '1rem 0rem 0.8rem 1.5rem', fontSize: "2.4rem"}}>My Events</h4>
      <Box h="0.2rem" w="90%" bg="lightgrey" m="0 0 0 1.6rem" />
      <Flex jc_between row w="90%">
      {data &&
        data.events.map((event, id) => (
          <UserEventCard refetch={refetch} key={id} event={event} />
        ))}
      </Flex>
    </Flex>
  );
}
