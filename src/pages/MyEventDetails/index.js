// React imports
import React from 'react';
// Reach Router imports
import { useParams } from '@reach/router';
// Component imports
import EventDetails from './EventDetails';
// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';
// GraphQL/Apollo imports
import { useQuery } from 'react-apollo';
import { GET_EVENT_DETAILS, GET_USER_PROFILE } from './queries';
// Styling imports
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    width: '90%',
    marginLeft: '1rem',
    marginTop: '4rem',
  },
  headingBox: {
    margin: '6rem 0 2rem 3rem',
    borderColor: '#D3D3D3',
  },
});

export default function MyEventDetails() {
  const classes = useStyles();
  // Retrieves ID of current event from parameters
  const { eventId } = useParams();
  // Retrieves logged in user info from Auth0
  const { user } = useAuth0();
  // Retrieves event details of specified event by ID which user is registered to
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { id: eventId, email: user.email },
  });

  const { data: userData } = useQuery(GET_USER_PROFILE, {
    variables: { email: user.email },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const activeEvent = data.events;
  const userID = userData?.profile?.id;

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Event Details
        </Typography>
      </Box>
      {activeEvent &&
        activeEvent.map((event, id) => (
          <EventDetails key={id} event={event} userID={userID} />
        ))}
    </main>
  );
}
