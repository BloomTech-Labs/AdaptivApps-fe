import React, { useEffect } from "react";
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
    fontSize: "2rem"
  },
  eventsList: {
    display: "flex",
    flexDirection: "column"
  },
  eventCard: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black"
  },
  img: {
    width: "200px",
    height: "150px"
  },
  text: {
    fontSize: "1.6rem"
  },
  subtitle: {
    fontSize: "1.8rem"
  }
});

export default function UpcomingEventList({ userName }) {
  const classes = useStyles();
  var todayDate = new Date();
  let today = todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1 < 10 ? "0" : "") + (todayDate.getMonth() + 1) + "-" + (todayDate.getDate() < 10 ? "0" : "") + todayDate.getDate()

  const { data, loading, error, refetch } = useQuery(GET_UPCOMING_EVENTS, { variables: { userName: userName } });
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;

  const upcomingEvents = [];
  if (data) {
    for (let i = 0; i < data.events.length; i++) {
      if (data.events[i].startDate > today) {
        upcomingEvents.push(data.events[i]);
      }
    }
  }

  return (
    <div className={classes.eventsContainer}>
      <h3 className={classes.title}>My Upcoming Events</h3>
      {
        upcomingEvents.length > 0
          ?
          <div className={classes.eventsList}>
            {upcomingEvents.map(event =>
              <div key={event.id} className={classes.eventCard}>
                <img src={event.imgUrl} alt="Upcoming event" className={classes.img} />
                <p className={classes.text}>{event.startDate} - {event.endDate}</p>
                <h1 className={classes.subtitle}>{event.title}</h1>
                <p className={classes.text}>{event.location}</p>
              </div>
            )}
          </div>
          :
          <h3>You have no upcoming events.</h3>
      }
    </div>
  );
}
