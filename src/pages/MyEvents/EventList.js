import React, { useState, useEffect } from "react";
import MyEventCard from "./MyEventCard";
import moment from "moment";
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
  },
  eventCard: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

export default function EventList({ data, refetch }) {
  const classes = useStyles();
  const [eventsByMonth, setEventsByMonth] = useState();
  useEffect(() => {
    setEventsByMonth(data && data?.events);
  });

  const groupBy = (array, key) => {
    // Return the end result
    return (
      array &&
      array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[moment(currentValue[key]).format("MMMM")] =
          result[moment(currentValue[key]).format("MMMM")] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {})
    ); // empty object is the initial value for result object
  };

  const eventsGroupedByMonth = groupBy(eventsByMonth, "startDate");
  console.log("Events grouped by month", eventsGroupedByMonth);
  return (
    <>
      {eventsGroupedByMonth?.January === undefined ||
      eventsGroupedByMonth?.January.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">January</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.January.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.February === undefined ||
      eventsGroupedByMonth?.February.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">February</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.February.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.March === undefined ||
      eventsGroupedByMonth?.March.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">March</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.March.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.April === undefined ||
      eventsGroupedByMonth?.April.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">April</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.April.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.May === undefined ||
      eventsGroupedByMonth?.May.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">May</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.May.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.June === undefined ||
      eventsGroupedByMonth?.June.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">June</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.June.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.July === undefined ||
      eventsGroupedByMonth?.July.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">July</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.July.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.August === undefined ||
      eventsGroupedByMonth?.August.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">August</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.August.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.September === undefined ||
      eventsGroupedByMonth?.September.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">September</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.September.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.October === undefined ||
      eventsGroupedByMonth?.October.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">October</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.October.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.November === undefined ||
      eventsGroupedByMonth?.November.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">November</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.November.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {eventsGroupedByMonth?.December === undefined ||
      eventsGroupedByMonth?.December.length < 1 ? null : (
        <div className={classes.eventGroup}>
          <Typography variant="h1">December</Typography>
          <div className={classes.eventCard}>
            {eventsGroupedByMonth?.December.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
