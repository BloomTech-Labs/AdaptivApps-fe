// React imports
import React, { useEffect } from "react";
import moment from "moment";
// Component imports
import ActivityGroup from "./ActivityGroup";
import eventImg from "../../assets/images/acs_hartford.png";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// GraphQL/Apollo imports
import { useQuery } from "react-apollo";
import { GET_USER_ACTIVITIES } from "./queries";
// Styling import
import { Box, makeStyles, Typography, Link } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

// Applies Material-UI styling
const useStyles = makeStyles({
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
    "@media (max-width: 1050px)": {
      flexDirection: "column",
    },
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
  donateBtn: {
    boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
    "&:active": {
      boxShadow: "inset 0px 3px 8px rgba(0,0,0,0.2)",
    },
    backgroundColor: "#FFC629",
    padding: ".8rem 1.1rem",
    borderRadius: ".5rem",
    fontSize: "1.4rem",
    fontWeight: 550,
    margin: "auto",
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
      padding: "1% 1% 0 0",
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
  virtualBox: {
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
  img: {
    width: "100%",
    padding: "0",
    height: "16rem",
    objectFit: "cover",
  },
});

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

  // const currentActivities = data.activities;
  return (
    <Box className={classes.root} m={4}>
      <Box className={classes.topContentContainer}>
        <Box>
          <img
            className={classes.img}
            src={
              (props && props?.event?.imgUrl === null) ||
              props?.event?.imgUrl === undefined ||
              props?.event?.imgUrl === ""
                ? eventImg
                : props?.event?.imgUrl
            }
            alt="Event"
          />
        </Box>
        {activeEvent.type === "Virtual" ? (
          <Box className={classes.topContentText} m="2.4rem">
            <p>{moment(activeEvent.startDate).format("MM/DD/YYYY")}</p>
            <h2>{activeEvent.title}</h2>
            <Typography variant="subtitle1">{activeEvent.location}</Typography>
            {activeEvent.startTime && (
              <p>
                Start time:{" "}
                {moment(activeEvent.startTime, "HH:mm").format("h:mm A")} PST
              </p>
            )}
          </Box>
        ) : (
          <Box className={classes.topContentText} m="2.4rem">
            <p>
              {moment(activeEvent.startDate).format("MM/DD/YYYY")}
              {" - "}
              {moment(activeEvent.endDate).format("MM/DD/YYYY")}
            </p>
            <h2>{activeEvent.title}</h2>
            <Typography variant="subtitle1">{activeEvent.location}</Typography>
          </Box>
        )}
        <Link
          className={classes.donateBtn}
          color="primary"
          href="https://app.mobilecause.com/vf/virtual2020"
          target="_blank"
          rel="noopener"
        >
          DONATE NOW
        </Link>
      </Box>
      <Box className={classes.detailsContainer}>
        <Typography className={classes.details} variant="body1">
          {activeEvent.details}
        </Typography>
      </Box>
    
      {activeEvent.type === "Virtual" ? (
        <Box className={classes.virtualBox}>
          {activeEvent.host !== "" ? (
            <p>Hosted by: {activeEvent.host}</p>
          ) : null}
          {activeEvent.coaches !== "" ? (
            <p>Coach(es): {activeEvent.coaches}</p>
          ) : null}
          {activeEvent.speakers !== "" ? (
            <p>Special Guest Speaker(s): {activeEvent.speakers}</p>
          ) : null}

          <a href={activeEvent.link} rel="noopener noreferrer" target="_blank">
            Click Here to Join Us!
          </a>
        </Box>
      ) : null}
      {/*      <>
        {currentActivities.length >= 1 ? (
          <Box className={classes.myActivitiesBox}>
            <p>My Activities</p>
            <ActivityGroup
              data={data}
              activeEvent={activeEvent}
              currentActivities={currentActivities}
              refetch={refetch}
            />
          </Box>
        ) : null}
        </>*/}
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
