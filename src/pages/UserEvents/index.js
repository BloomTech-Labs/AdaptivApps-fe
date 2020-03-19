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

  const { error, loading, data, refetch } = useQuery(GET_USER_EVENTS, {
    variables: { email: user.email },
  });

  useEffect(() => {
    refetch();
  }, []);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Flex ai_start col stretch>
      <h1>My Events</h1>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      {data &&
        data?.events?.map((event, id) => (
          <UserEventCard key={id} event={event} />
        ))}
    </Flex>
  );
}
