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


export default function UserEventDetails() {
  const { eventId } = useParams();
  const { user } = useAuth0();
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { id: eventId, email: user.email },
  });
  if (loading) return 'Loading...';
  if (error) return   `Error! ${error.message}`;
  console.log(data)
  return (
    <div>
      <h4>Event Details</h4>
      {data &&
        data?.profile?.events?.map((event, id) => (
          <EventDetails key={id} event={event}/> 
        ))}
    </div>
  )
}
