import React from "react";
import { useQuery } from "react-apollo";
import Activities from "./Activities";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useParams } from "@reach/router";
import { GET_EVENT_ACTIVITIES } from "./queries/getActivities";

import { makeStyles, Box, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    "& th": {
      fontSize: "1.6rem",
    },
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  eventContainer: {
    display: "flex",
    marginLeft: "3rem",
  },
  imgContainer: {
    display: "flex",
    width: "36rem",
    height: "16rem",
  },
  eventImg: {
    width: "100%",
    objectFit: "cover",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "2.4rem",
  },
  date: {
    fontSize: "1.4rem",
  },
  title: {
    fontSize: "2.1rem",
    margin: ".4rem 0",
    fontWeight: "500",
    color: "#3C3C3C",
  },
  loc: {
    fontSize: "1.6rem",
  },
  activityC: {
    "& p": {
      fontWeight: "bold",
      fontSize: "1.8rem",
      margin: "3rem 0 2rem 3rem",
    },
    "& tr": {
      display: "flex",
      alignItems: "center",
    },
    "& th": {
      margin: "0 0 0 3rem",
      fontWeight: 550,
      fontSize: "1.6rem",
      width: "20rem",
      padding: "1% 1% 2% 0",
      textAlign: "left",
    },
  },
  headerRow: {
    textAlign: "left",
    fontSize: "1.8rem",
  },
  tableH: {
    color: "#202020",
    width: "20rem",
  },
  grid: {
    width: "100%",
  },
  activityH: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  details: {
    fontSize: "1.4rem",
    maxWidth: "80rem",
    margin: "2rem 0 0 3rem",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
});

export default function ActivityList() {
  const classes = useStyles();
  const { eventId } = useParams();
  const { loading, error, data: activityData } = useQuery(
    GET_EVENT_ACTIVITIES,
    {
      variables: { id: eventId },
    }
  );
  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;
  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Event Activities
        </Typography>
      </Box>
      <Box className={classes.eventContainer}>
        <Box className={classes.imgContainer}>
          <img
            className={classes.eventImg}
            src={activityData && activityData?.event?.imgUrl}
            alt="Event"
          />
        </Box>
        <Box className={classes.infoContainer}>
          <Typography
            className={classes.date}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {activityData.event.startDate}-{activityData.event.endDate}
          </Typography>
          <Typography className={classes.title}>
            {activityData.event.title}
          </Typography>
          <Typography
            className={classes.loc}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {activityData.event.location}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.details}>{activityData.event.details}</Box>
      <Box className={classes.activityC}>
        <p>Activities Schedule</p>
        <table className={classes.table}>
          <tbody>
            <tr className={classes.headerRow}>
              <th className={classes.tableH}>Name</th>
              <th className={classes.tableH}>Date</th>
              {activityData.event.type === "In Person" ? (
                <th className={classes.tableH}>Location</th>
              ) : null}
              <th className={classes.tableH}>Time</th>
            </tr>
            {activityData &&
              activityData?.event?.activities.map((activity, id) => (
                <Activities
                  key={id}
                  activity={activity}
                  activityData={activityData}
                />
              ))}
          </tbody>
        </table>
      </Box>
    </main>
  );
}
