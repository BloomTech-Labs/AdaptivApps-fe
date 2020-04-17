// React imports
import React, { useEffect } from "react";
// Component imports
import ActivityDetails from "./ActivityDetails";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// GraphQL/Apollo imports
import { useQuery } from "react-apollo";
import { GET_USER_ACTIVITIES } from "./queries";
// Styling import
import { Box, makeStyles, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

// Applies Material-UI styling
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& img": {
      height: "16rem",
      width: "36rem",
      objectFit: "cover",
    },
  },
  topContentContainer: {
    display: "flex",
    flexDirection: "row",
  },
  topContentText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& p": {
      margin: "0rem 0 0.5rem",
      color: "#808080",
      fontSize: "1.4rem",
    },
    "& h2": {
      fontWeight: "500",
      fontSize: "2.1rem",
      margin: "0rem 0 0.5rem",
    },
  },
  detailsContainer: {
    marginBottom: "2rem",
    marginTop: "1.6rem",
  },
  myActivitiesBox: {
    "& p": {
      fontWeight: "bold",
      fontSize: "1.8rem",
      marginTop: "3rem",
      marginBottom: "2rem",
    },
    "& tr": {
      display: "flex",
      alignItems: "center",
    },
    "& th": {
      marginTop: 0,
      fontWeight: 550,
      fontSize: "1.6rem",
      width: "20rem",
      padding: "1% 1% 2% 0",
      textAlign: "left",
    },
  },
  sponsorBox: {
    width: "90%",
    margin: "5rem 0rem 0rem 0rem",
    "& ul": {
      marginTop: "1rem",
    },
    "& li": {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
  },
  webinarBox: {
    display: "flex",
    flexDirection: "column",
    "& p": {
      margin: 0,
      fontSize: "1.6rem",
    },
    "& a": {
      marginTop: "2rem",
      color: "#2862ff",
      fontSize: "1.6rem",
      textDecoration: "none",
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
  details: {
    fontSize: "1.4rem",
    maxWidth: "80rem",
    margin: "2rem 0 0 0",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
}));

export default function EventDetails(props) {
  const classes = useStyles();
  const activeEvent = props.event;
  const eventId = activeEvent.id;
  const { user } = useAuth0();
  const { loading, error, data, refetch } = useQuery(GET_USER_ACTIVITIES, {
    variables: { id: eventId, email: user.email },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;

  const currentActivities = data.activities;
  return (
    <Box className={classes.root} m={4}>
      <Box className={classes.topContentContainer}>
        <Box>
          <img src={activeEvent.imgUrl} alt="Event" />
        </Box>
        {activeEvent.type === "Webinar" ? (
          <Box className={classes.topContentText} m="2.4rem">
            <p>{activeEvent.startDate}</p>
            <h2>{activeEvent.title}</h2>
            <Typography variant="subtitle1">{activeEvent.location}</Typography>
            <p>Start time: {activeEvent.startTime}</p>
          </Box>
        ) : (
          <Box className={classes.topContentText} m="2.4rem">
            <p>
              {activeEvent.startDate} - {activeEvent.endDate}
            </p>
            <h2>{activeEvent.title}</h2>
            <Typography variant="subtitle1">{activeEvent.location}</Typography>
          </Box>
        )}
      </Box>
      <Box className={classes.detailsContainer}>
        <Typography className={classes.details} variant="body1">
          {activeEvent.details}
        </Typography>
      </Box>

      {activeEvent.type === "Webinar" ? (
        <>
          <Box className={classes.webinarBox}>
            <p>Hosted by: {activeEvent.host}</p>
            <p>Special Guest Speaker(s): {activeEvent.speakers}</p>
            <a href={activeEvent.link}>Click Here to Join Us!</a>
          </Box>
          <Box className={classes.myActivitiesBox}>
            <p>My Activities</p>
            <table className={classes.table}>
              <tbody>
                <tr className={classes.headerRow}>
                  <th className={classes.tableH}>Name</th>
                  <th className={classes.tableH}>Date</th>
                  <th className={classes.tableH}>Link</th>
                  <th className={classes.tableH}>Time</th>
                  <th className={classes.tableH}>My Role</th>
                </tr>
                {currentActivities &&
                  currentActivities.map((activity, id) => (
                    <ActivityDetails key={id} activity={activity} />
                  ))}
              </tbody>
            </table>
          </Box>
        </>
      ) : (
        <>
          <Box className={classes.myActivitiesBox}>
            <p>My Activities</p>
            <table className={classes.table}>
              <tbody>
                <tr className={classes.headerRow}>
                  <th className={classes.tableH}>Name</th>
                  <th className={classes.tableH}>Date</th>
                  <th className={classes.tableH}>Location</th>
                  <th className={classes.tableH}>Time</th>
                  <th className={classes.tableH}>My Role</th>
                </tr>
                {currentActivities &&
                  currentActivities.map((activity, id) => (
                    <ActivityDetails
                      key={id}
                      activeEvent={activeEvent}
                      activity={activity}
                    />
                  ))}
              </tbody>
            </table>
          </Box>
        </>
      )}
      <Box className={classes.sponsorBox}>
        {activeEvent?.sponsors?.length > 0 ? (
          <Typography variant="h3">Special thanks to our sponsors!</Typography>
        ) : null}
        <ul>
          {activeEvent.sponsors.length > 0
            ? activeEvent?.sponsors
                ?.split(", ")
                .map(sponsor => <li>{sponsor}</li>)
            : null}
        </ul>
      </Box>
    </Box>
  );
}
