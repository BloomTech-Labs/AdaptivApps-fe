// React imports
import React from 'react'
// Reach Router imports
import { useParams } from '@reach/router';
// Component imports
import EventDetails from './EventDetails';
// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';
// GraphQL/Apollo imports
import { useQuery } from 'react-apollo';
import { GET_EVENT_DETAILS } from './queries';
// Styling imports
import { Flex, Box } from 'adaptiv-ui';


export default function UserEventDetails() {
  // Retrieves ID of current event from parameters
  const { eventId } = useParams();
  // Retrieves logged in user info from Auth0
  const { user } = useAuth0();
  // Retrieves event details of specified event by ID which user is registered to
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { id: eventId, email: user.email },
  });
  
  if (loading) return 'Loading...';
  if (error) return   `Error! ${error.message}`;
  
  const activeEvent = data.events;
  
  return (
    <Flex ai_start col stretch style={{marginLeft: "1rem", marginTop: "4rem"}}>
      <h4 style={{marginBottom: '0.5rem', fontSize: "2.4rem"}}>Event Details</h4>
      <Box h="0.2rem" w="90%" bg="lightgrey" m="0 0 0 1.6rem" />
      
      {activeEvent &&
          activeEvent.map((event, id) => (
            <EventDetails key={id} event={event} />
      ))}
    </Flex>
  )
}
