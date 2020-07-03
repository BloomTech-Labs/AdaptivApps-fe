import React, { useEffect } from "react";
import NavLink from "../../routes/DashRouter/SideNav/NavLink";
import moment from "moment";
// Import queries
import { useQuery } from "react-apollo";
import { GET_UPCOMING_EVENTS } from "./queries";
// Import stylings
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import eventImg from "../../assets/images/acs_hartford.png";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
    },
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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      flexWrap: "wrap",
      direction: "ltr",
    },
  },
  eventCard: {
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    direction: "ltr",
    backgroundColor: "white",
    width: "90%",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      direction: "ltr",
      margin: "1rem auto",
    },
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
    },
  },
  textContainer: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  imgContainer: {
    width: "100%",
    height: "12rem",
    [theme.breakpoints.down("sm")]: {
      height: "14rem",
    },
  },
  img: {
    borderRadius: "5px",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  text: {
    margin: "0",
    fontSize: "1.4rem",
  },
  subtitle: {
    margin: "0",
    fontSize: "1.8rem",
  },
}));

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
                aria-label="navigate to event details page"
                to={`/myevents/${event.id}`}
                key={event.id}
                className={classes.navLink}
              >
                <div className={classes.imgContainer}>
                  <img
                    src={
                      event?.imgUrl === null ||
                        event?.imgUrl === undefined ||
                        event?.imgUrl === ""
                        ? eventImg
                        : event?.imgUrl
                    }
                    alt="Upcoming event picture, click to visit event details page"
                    className={classes.img}
                  />
                </div>
              </NavLink>
              <div className={classes.textContainer}>
                <p className={classes.text}>
                  {moment(event.startDate).format("MM/DD/YYYY")}
                  {" - "}
                  {moment(event.endDate).format("MM/DD/YYYY")}
                </p>
                <h1 className={classes.subtitle}>{event.title}</h1>
                <p className={classes.text}>{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <h3 className={classes.text}>You have no upcoming events.</h3>
        )}
    </>
  );
}
