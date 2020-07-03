import React from "react";
// Google Analytics Imports
import ReactGA from "react-ga";
import { useQuery } from "react-apollo";
import moment from "moment";
// import ActivityGroup from "./ActivityGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import eventImg from "../../assets/images/acs_hartford.png";
import { useParams, Link } from "@reach/router";
// import { useNavigate } from "@reach/router";
import { GET_EVENT_ACTIVITIES } from "./queries/getActivities";

import { makeStyles, Box, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
    flexDirection: "column",
  },
  imgContainer: {
    display: "flex",
    width: "36rem",
    height: "16rem",
  },
  img: {
    width: "100%",
    padding: "0",
    height: "16rem",
    objectFit: "cover",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "2.4rem",
    "@media (max-width: 1050px)": {
      marginTop: "20px",
    },
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
    fontSize: "1.6rem",
    maxWidth: "80rem",
    margin: "2rem 0 0 3rem",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
  back: {
    display: "flex",
    alignItems: "center",
    color: "black",
    margin: "0 0 2% 0",
    fontSize: "1.8rem",
    textDecoration: "none",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 950px)": {
      flexDirection: "column",
    },
  },
  virtualBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "3rem",
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
});
/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const trackAttendees = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export default function ActivityList() {
  const classes = useStyles();
  // const navigate = useNavigate();
  const { eventId } = useParams();
  const { loading, error, data: activityData } = useQuery(
    GET_EVENT_ACTIVITIES,
    {
      variables: { id: eventId },
      fetchPolicy: "no-cache",
    }
  );

  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Link
          to="/calendar"
          aria-label="Navigate back to Events Calendar page."
          className={classes.back}
        >
          <ArrowBackIosIcon
            color="primary"
            aria-label="Back to Events Calendar"
            fontSize="large"
          />
          Back to Events Calendar
        </Link>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Event Details
        </Typography>
      </Box>
      <Box className={classes.eventContainer}>
        <div className={classes.top}>
          <Box className={classes.imgContainer}>
            <img
              className={classes.img}
              src={
                (activityData && activityData?.event?.imgUrl === null) ||
                activityData?.event?.imgUrl === undefined ||
                activityData?.event?.imgUrl === ""
                  ? eventImg
                  : activityData?.event?.imgUrl
              }
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
              {moment(activityData?.event?.startDate).format("MM/DD/YYYY")} -{" "}
              {moment(activityData?.event?.endDate).format("MM/DD/YYYY")}
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
        </div>
        {activityData.event.type === "Virtual" ? (
          <Box className={classes.virtualBox}>
            {activityData.event.host !== "" ? (
              <p>Hosted by: {activityData.event.host}</p>
            ) : null}
            {activityData.event.coaches !== "" ? (
              <p>Coach(es): {activityData.event.coaches}</p>
            ) : null}
            {activityData.event.speakers !== "" ? (
              <p>Special Guest Speaker(s): {activityData.event.speakers}</p>
            ) : null}

            <a
              href={activityData.event.link}
              rel="noopener noreferrer"
              target="_blank"
              onClick={() =>
                trackAttendees(
                  "Event",
                  "Joined Virtual Event",
                  "ATTENDEE_ADDED"
                )
              }
            >
              Click Here to Join Us!
            </a>
          </Box>
        ) : null}
      </Box>
      <Box className={classes.details}>{activityData.event.details}</Box>
      {/*activityData.event.activities.length >= 1 ? (
        <Box className={classes.activityC}>
          <p className={classes.myActivities}>Activities Schedule</p>
          <table className={classes.table}>
            <tbody>
              <ActivityGroup activityData={activityData} refetch={refetch} />
            </tbody>
          </table>
        </Box>
      ) : null*/}
    </main>
  );
}
