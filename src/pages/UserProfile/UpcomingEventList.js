import React from "react";
// Import queries
import { useQuery } from "react-apollo";
import { GET_UPCOMING_EVENTS } from "./queries";
// Import stylings
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  eventsContainer: {
    marginLeft: "10px"
  },
  title: {
    fontSize: "1.8rem"
  },
});

export default function UpcomingEventList({ userName }) {
  const classes = useStyles();
  var todayDate = new Date();
  let today = todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1 < 10 ? "0" : "") + (todayDate.getMonth() + 1) + "-" + (todayDate.getDate() < 10 ? "0" : "") + todayDate.getDate()

  const { data, loading, error } = useQuery(
    GET_UPCOMING_EVENTS,
    {
      variables: { userName: userName },
    }
  );
  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;

  const upcomingEvents = [];
  if (data) {
    for (let i = 0; i < data.profile.events.length; i++) {
      if (data.profile.events[i].event.startDate < today) {
        upcomingEvents.push(data.profile.events[i].event);
        //upcomingEvents[i].orderDisplaying = i + 1;
      }
    }
    console.log(upcomingEvents);
  }

  return (
    <div className={classes.eventsContainer}>
      <h3 className={classes.title}>My Upcoming Events</h3>
      {
        upcomingEvents.length > 0 ?
          <div>
            <p>Event list coming</p>
          </div> :
          <h3>You have no upcoming events.</h3>
      }
    </div>
  );
}
