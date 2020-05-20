import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import moment from "moment";
import { Typography } from "@material-ui/core";

export default function EventList({ currentEvents }) {
  const [eventsByMonth, setEventsByMonth] = useState();
  useEffect(() => {
    setEventsByMonth(currentEvents && currentEvents);
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
        <>
          <Typography>January</Typography>
          {eventsGroupedByMonth?.January.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.February === undefined ||
      eventsGroupedByMonth?.February.length < 1 ? null : (
        <>
          <Typography>February</Typography>
          {eventsGroupedByMonth?.February.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.March === undefined ||
      eventsGroupedByMonth?.March.length < 1 ? null : (
        <>
          <Typography>March</Typography>
          {eventsGroupedByMonth?.March.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.April === undefined ||
      eventsGroupedByMonth?.April.length < 1 ? null : (
        <>
          <Typography>April</Typography>
          {eventsGroupedByMonth?.April.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.May === undefined ||
      eventsGroupedByMonth?.May.length < 1 ? null : (
        <>
          <Typography>May</Typography>
          {eventsGroupedByMonth?.May.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.June === undefined ||
      eventsGroupedByMonth?.June.length < 1 ? null : (
        <>
          <Typography>June</Typography>
          {eventsGroupedByMonth?.June.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.July === undefined ||
      eventsGroupedByMonth?.July.length < 1 ? null : (
        <>
          <Typography>July</Typography>
          {eventsGroupedByMonth?.July.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.August === undefined ||
      eventsGroupedByMonth?.August.length < 1 ? null : (
        <>
          <Typography>August</Typography>
          {eventsGroupedByMonth?.August.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.September === undefined ||
      eventsGroupedByMonth?.September.length < 1 ? null : (
        <>
          <Typography>September</Typography>
          {eventsGroupedByMonth?.September.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.October === undefined ||
      eventsGroupedByMonth?.October.length < 1 ? null : (
        <>
          <Typography>October</Typography>
          {eventsGroupedByMonth?.October.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.November === undefined ||
      eventsGroupedByMonth?.November.length < 1 ? null : (
        <>
          <Typography>November</Typography>
          {eventsGroupedByMonth?.November.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
      {eventsGroupedByMonth?.December === undefined ||
      eventsGroupedByMonth?.December.length < 1 ? null : (
        <>
          <Typography>December</Typography>
          {eventsGroupedByMonth?.December.map((event, id) => (
            <EventCard key={id} event={event} />
          ))}
        </>
      )}
    </>
  );
}
