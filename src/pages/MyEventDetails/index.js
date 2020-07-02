// React imports
import React, { useEffect } from "react";
// Reach Router imports
import { useParams, Link } from "@reach/router";
import { useNavigate } from "@reach/router";
// Component imports
import EventDetails from "./EventDetails";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// GraphQL/Apollo imports
import { useQuery } from "react-apollo";
import { GET_EVENT_DETAILS } from "./queries";
// Styling imports
import { Box, Typography, makeStyles } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    marginLeft: "1rem",
    marginTop: "3.1rem",
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
    textDecoration: "none"
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
});

export default function MyEventDetails() {
  const classes = useStyles();
  // Retrieves ID of current event from parameters
  const { eventId } = useParams();
  const navigate = useNavigate();
  // Retrieves logged in user info from Auth0
  const { user } = useAuth0();
  // Retrieves event details of specified event by ID which user is registered to
  const { loading, error, data, refetch } = useQuery(GET_EVENT_DETAILS, {
    variables: { id: eventId, email: user.email },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;

  const activeEvent = data.events;

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Link
          aria-label="Navigate back to My Events list."
          className={classes.linkBack}
          to="/myevents"
        >
          <ArrowBackIosIcon color="primary" fontSize="large" />
          Back to My Events
        </Link>
        <Typography variant="h1" gutterBottom>
          Event Details
        </Typography>
      </Box>
      {activeEvent &&
        activeEvent.map((event, id) => (
          <EventDetails key={id} event={event} data={data} />
        ))}
    </main>
  );
}
