import React from "react";
import { useQuery } from "react-apollo";
import { GET_EVENTS_ATTENDEES } from "./graphql";
import EventCard from "./EventCard";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "3rem",
    paddingBottom: "3rem",
    borderBottom: "2px solid #D3D3D3",
  },
}));

export default function EventList() {
  const classes = useStyles();
  const { data, error, loading, refetch } = useQuery(GET_EVENTS_ATTENDEES);
  console.log("data", data?.events?.title);
  return (
    <div className={classes.root}>
      {data?.events?.map(event => (
        <EventCard event={event} />
      ))}
    </div>
  );
}
