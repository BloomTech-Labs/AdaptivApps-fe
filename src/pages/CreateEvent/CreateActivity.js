import React from "react";
// Reach Router imports
import { useParams } from '@reach/router';
// Apollo-GraphQL imports
import { useMutation, useQuery } from "react-apollo";
import { CREATE_ACTIVITY, GET_ACTIVITIES } from "./graphql";
// Component imports
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
// Material-UI imports
import { makeStyles, Box, Typography, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  activityCreation: {
    display: "flex"
  }
});

export default function CreateActivity() {
  const { eventId } = useParams();
  const [createActivity, { error, loading }] = useMutation(CREATE_ACTIVITY);
  const { data, refetch } = useQuery(GET_ACTIVITIES, {
    variables: {
      id: eventId,
    },
  });
  const classes = useStyles();
  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;
  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Add Activities to an Event
        </Typography>
      </Box>
      <Container className={classes.activityCreation}>
        <Box>
          <ActivityForm data={data} createActivity={createActivity} eventId={eventId} refetch={refetch} />
        </Box>
        <Box>
          <ActivityList data={data} refetch={refetch} />
        </Box>
      </Container>
    </main>
  );
}
