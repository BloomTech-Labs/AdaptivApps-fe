import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import moment from "moment";
import HashMap from "hashmap";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  eventGroup: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    "& h1": {
      fontWeight: "600",
      color: "#808080",
    },
    "& h3": {
      fontWeight: "500",
      color: "#808080",
    },
    marginBottom: "20px",
  },
  eventCard: {
    display: "flex",
    flexWrap: "wrap",
  },
  p: {
    fontSize: "1.6rem",
  }
}));

export default function EventList({ currentEvents, refetch, user }) {
  const classes = useStyles();
  var eventsMap = new HashMap();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (currentEvents) {
    for (let i = 0; i < currentEvents.length; i++) {
      const startDate = currentEvents[i]?.startDate;
      if (eventsMap.has(startDate)) {
        // Push this event
        eventsMap.get(startDate).push(currentEvents[i]);
      }
      else {
        // Create new entry
        const events = [];
        events.push(currentEvents[i]);
        eventsMap.set(startDate, events);
      }
    }
  }

  const allDates = eventsMap.keys();

  return (
    <>
      {allDates.length > 0 ?
        <div>
          {allDates.map(date => (
            <div className={classes.eventGroup}>
              <Typography variant="h1">{moment(date).format("dddd, MMMM Do YYYY").split(", ")[0]}</Typography>
              <Typography variant="h3">{moment(date).format("dddd, MMMM Do YYYY").split(", ")[1]}</Typography>
              <div className={classes.eventCard}>
                {eventsMap.get(date).map(event => (
                  <EventCard key={event.id} event={event} refetch={refetch} user={user} />
                ))}
              </div>
            </div>
          ))}
        </div> :
        <p className={classes.p}>No events available for now. Come back later!</p>
      }
    </>
  );
}