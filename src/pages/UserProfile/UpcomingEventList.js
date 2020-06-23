import React, { useEffect } from "react";
import NavLink from "../../routes/DashRouter/SideNav/NavLink";
// Import queries
import { useQuery } from "react-apollo";
import { GET_UPCOMING_EVENTS } from "./queries";
// Import stylings
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  title: {
    marginLeft: "1rem",
    fontSize: "2rem",
  },
  eventsList: {
    border: "none",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "90%",
    direction: "rtl",
    backgroundColor: "white",
  },
  eventCard: {
    border: "none",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    direction: "ltr",
    backgroundColor: "white",
    width: "90%",
    marginBottom: "20px",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "10px",
  },
  img: {
    width: "100%",
    height: "150px",
  },
  text: {
    margin: "0",
    fontSize: "1.4rem",
  },
  subtitle: {
    margin: "0",
    fontSize: "1.8rem",
  },
});

export default function UpcomingEventList({ userName }) {
  const classes = useStyles();
  var todayDate = new Date();
  let today =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth() + 1 < 10 ? "0" : "") +
    (todayDate.getMonth() + 1) +
    "-" +
    (todayDate.getDate() < 10 ? "0" : "") +
    todayDate.getDate();

  const { data, loading, error, refetch } = useQuery(GET_UPCOMING_EVENTS, {
    variables: { userName: userName },
  });
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress />;
  if (error) return `Error! ${error.message}`;
  console.log("data in upcoming event list", data);
  const upcomingEvents = [];
  if (data) {
    for (let i = 0; i < data.events.length; i++) {
      if (data.events[i].startDate > today) {
        upcomingEvents.push(data.events[i]);
      }
    }
  }

  return (
    <>
      <h3 className={classes.title}>My Upcoming Events</h3>
      {upcomingEvents.length > 0 ? (
        <div className={classes.eventsList}>
          {upcomingEvents.map(event => (
            <div key={event.id} className={classes.eventCard}>
              <NavLink
                to={`/myevents/${event.id}`}
                key={event.id}
                className={classes.navLink}
              >
                <img
                  src={event.imgUrl}
                  alt="Upcoming event"
                  className={classes.img}
                />
              </NavLink>
              <div className={classes.textContainer}>
                <p className={classes.text}>
                  {event.startDate} - {event.endDate}
                </p>
                <h1 className={classes.subtitle}>{event.title}</h1>
                <p className={classes.text}>{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <h3>You have no upcoming events.</h3>
        )}
    </>
  );
}
