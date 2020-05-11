import React from "react";
// Reach Router imports
import { useParams, Link } from "@reach/router";
// Apollo-GraphQL imports
import { useMutation, useQuery } from "react-apollo";
import { CREATE_ACTIVITY, GET_ACTIVITIES } from "./graphql";
// Component imports
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
// Material-UI imports
import { makeStyles, Box, Typography, Container } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    marginTop: "3.1rem",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  headingBox: {
    margin: "0 0 2rem 3rem",
    borderColor: "#D3D3D3",
  },
  linkBack: {
    color: "#202020",
    fontSize: "1.8rem",
    fontWeight: 530,
    display: "flex",
    alignItems: "center",
    marginBottom: "1.6rem",
    marginLeft: "0.3rem",
    textDecoration: "none",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
  activityCreation: {
    display: "flex",
  },
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
        <Link to={`/editEvent/${eventId}`} className={classes.linkBack}>
          <ArrowBackIosIcon color="primary" fontSize="large" />
          Edit Event
        </Link>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Add Activities to an Event
        </Typography>
      </Box>
      <Container className={classes.activityCreation}>
        <Box>
          <ActivityForm
            data={data}
            createActivity={createActivity}
            eventId={eventId}
            refetch={refetch}
          />
        </Box>
        <Box>
          <ActivityList data={data} refetch={refetch} />
        </Box>
      </Container>
    </main>
  );
}
