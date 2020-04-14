import React from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';

import { useQuery } from 'react-apollo';
import { GET_EVENTS } from './queries';
import AdminEventList from './AdminEventList';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    width: '90%',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],    
  },
  headingBox: {
    margin: '6rem 0 2rem 3rem',
    fontWeight: '400',
    borderColor: '#D3D3D3',
  },
});

// This is the component that is responsible for managing events
// An admin can perform CRUD operations for events and activities
const ManageEvents = () => {
  const classes = useStyles();
  // Getting all events
  const { data: eventsData, refetch: eventsRefetch } = useQuery(GET_EVENTS);

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Manage Events
        </Typography>
      </Box>
      <Box>
        {/* Call the AdminEventList, which will contain a list of events */}
        {eventsData ? (
          <AdminEventList
            events={eventsData?.events}
            eventsRefetch={eventsRefetch}
          />
        ) : (
          <p>Loading</p>
        )}
      </Box>
    </main>
  );
};

export default ManageEvents;
