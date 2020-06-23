import React from "react";
import { useQuery } from "react-apollo";
import ActivityGroup from "./ActivityGroup";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useParams } from "@reach/router";
import { GET_EVENT_ACTIVITIES } from "./queries/getActivities";

import { makeStyles, Box, Typography } from "@material-ui/core";

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
    "& tr": {
      display: "flex",
      alignItems: "center",
      textAlign: "left",
    },
    "& th": {
      fontWeight: 550,
      fontSize: "1.6rem",
      width: "19.6rem",
      padding: "1% 0 2% 0",
      textAlign: "left",
    },
  },
  myActivities: {
    fontWeight: "bold",
    fontSize: "1.8rem",
    margin: "3rem 0 2rem 3rem",
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
  const { loading, error, data: activityData, refetch } = useQuery(
    GET_EVENT_ACTIVITIES,
    {
      variables: { id: eventId },
      fetchPolicy: 'no-cache'
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
            {activityData?.event?.startDate}-{activityData?.event?.endDate}
          </Typography>
          <Typography className={classes.title}>
            {activityData?.event?.title}
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
      {activityData.event.activities.length >= 1 ? (
        <Box className={classes.activityC}>
          <p className={classes.myActivities}>Activities Schedule</p>
          <table className={classes.table}>
            <tbody>
              <ActivityGroup activityData={activityData} refetch={refetch} />
            </tbody>
          </table>
        </Box>
      ) : null}
    </main>
  );
}
