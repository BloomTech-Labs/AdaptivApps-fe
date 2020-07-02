import React, { useEffect, useState } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import config from "../../config/auth_config";
import { useAuth0 } from "../../config/react-auth0-spa";
import { useQuery, useMutation } from "react-apollo";
import { useParams } from "@reach/router";
import { UPDATE_EVENT, GET_EVENT } from "./graphql";

import EventForm from "./EventForm";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
  box: {
    marginLeft: "3rem",
  },
});

export default function EditEvent() {
  const { user } = useAuth0();
  const classes = useStyles();
  const { eventId } = useParams();
  const [updateEvent, { data: updateData }] = useMutation(UPDATE_EVENT);
  const { data: eventData, error, loading } = useQuery(GET_EVENT, {
    variables: { id: eventId },
  });
  const event = eventData?.event;

  return (
    <main className={classes.root}>
      {user && user[config.roleUrl].includes("Admin") ? (
        <>
          <Box className={classes.headingBox} borderBottom={2}>
            <Typography className={classes.heading} variant="h1" gutterBottom>
              Edit An Event
            </Typography>
          </Box>
          <Box className={classes.box}>
            <EventForm
              updateData={updateData}
              updateEvent={updateEvent}
              event={event}
              loading={loading}
              eventId={eventId}
            />
          </Box>
        </>
      ) : (
        <p>Sorry, you don't belong here. Please navigate to another page.</p>
      )}
    </main>
  );
}
