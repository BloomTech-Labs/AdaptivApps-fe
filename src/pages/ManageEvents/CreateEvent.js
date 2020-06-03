import React, { useEffect } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth0 } from "../../config/react-auth0-spa";
import { useQuery, useMutation } from "react-apollo";
import { CREATE_EVENT, GET_EVENTS } from "./graphql";

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
  formContainer: {
    marginLeft: "3rem",
  },
});

export default function CreateEvent() {
  const classes = useStyles();
  const [createEvent, { data, error, loading }] = useMutation(CREATE_EVENT);

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Create An Event
        </Typography>
      </Box>
      <Box className={classes.formContainer}>
        <EventForm createEvent={createEvent} data={data} />
      </Box>
    </main>
  );
}
