import React, { useEffect } from "react";
import { useQuery } from "react-apollo";
import { makeStyles, Grid, Box, Typography } from "@material-ui/core";

import EventCard from "./EventCard";
import { GET_EVENT_LIST } from "./queries";

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
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginLeft: "3rem",
  },
});

export default function EventsCalendar() {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_EVENT_LIST);
  // refetches EVENT_LIST without refreshing page
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Upcoming Events
        </Typography>
      </Box>
      <Grid className={classes.grid}>
        {data &&
          data?.events?.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
      </Grid>
    </main>
  );
}
