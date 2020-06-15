import React, { useEffect } from "react";
import { useQuery } from "react-apollo";
import { makeStyles, Grid, Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import AdminTagsSearch from './AdminTagsSearch';
import EventList from "./EventList";
import { GET_EVENT_LIST } from "./queries";
import { useAuth0 } from "../../config/react-auth0-spa";
import config from "../../config/auth_config";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  grid: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginLeft: "3rem",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
});

export default function EventsCalendar() {
  const { user } = useAuth0();
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_EVENT_LIST);

  // refetches EVENT_LIST without refreshing page
  useEffect(() => {
    refetch();
  }, [refetch]);
  const currentEvents = data?.events;
  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;
  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Upcoming Events
        </Typography>
      </Box>
      {user && user[config.roleUrl].includes("Admin") ? (
        <AdminTagsSearch />
      ) : null}
      <Grid className={classes.grid}>
        <EventList currentEvents={currentEvents} refetch={refetch} />
      </Grid>
    </main>
  );
}
