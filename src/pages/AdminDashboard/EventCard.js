import React from "react";
import moment from "moment";
import { Link } from "@reach/router";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    width: "20%",
    maxWidth: "30rem",
    minWidth: "20rem",
    display: "flex",
    flexDirection: "column",
    margin: ".5rem 2rem",
    "& p": {
      fontSize: "1.4rem",
      margin: "0",
    },
  },
  imgContainer: {
    width: "100%",
    height: "14rem",
    borderRadius: "5px",
  },
  img: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: "5px",
  },
}));

export default function EventCard(event) {
  const classes = useStyles();
  const formattedDate = moment(event?.event?.startDate).format(
    "dddd, MMMM Do YYYY"
  );
  const formattedTime = moment(event?.event?.startTime, "HH:mm").format(
    "h:mm A"
  );
  console.log("title", event?.event?.title);
  console.log("formattedTime", event.attendees);
  return (
    <>
      <div className={classes.card}>
        <p>{event?.event?.title}</p>
        <Link to={`/calendar/${event?.event?.id}`}>
          <div className={classes.imgContainer}>
            <img src={event?.event?.imgUrl} className={classes.img} />
          </div>
        </Link>
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
        <p>Population: {event.event.attendees?.length}</p>
      </div>
    </>
  );
}
