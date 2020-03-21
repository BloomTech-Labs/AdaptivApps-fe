// React imports
import React from 'react'
// Reach Router imports
import { useParams } from '@reach/router';
// Component imports
import EventDetails from './EventDetails';
// GraphQL/Apollo imports
import { useQuery } from 'react-apollo';
import { GET_EVENT_DETAILS } from './queries';
// Styling imports


export default function UserEventDetails() {
  const { eventId } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { id: eventId },
  });
  if (loading) return 'Loading...';
  if (error) return   `Error! ${error.message}`;
  console.log(data)
  return (
    <div>
      <h4>Event Details</h4>
      {data &&
        data?.events?.map((event, id) => (
          <EventDetails key={id} event={event}/> 
        ))}
    </div>
  )
}
