import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    width: "90%",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: "500",
    },
    "& .MuiTab-wrapper": {
      fontSize: "1.6rem",
    },
    "& li": {
      fontSize: "1.6rem",
    },
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  body: {
    marginLeft: "3rem",
    marginBottom: "5rem",
  },
  h3: {
    fontSize: "2.4rem",
    color: "rgb(41, 98, 255)",
    fontWeight: "normal",
  },
  li: {
    display: "flex"
  },
  p1: {
    fontSize: '1.6rem',
    fontWeight: "bold",
  },
  p2: {
    fontSize: '1.6rem',
  },
}));

const Welcome = () => {
  const classes = useStyles();

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Welcome to the Angel City Sports Platform!
        </Typography>
      </Box>
      <div className={classes.body}>
        <Typography className={classes.h3}>
          This portal for the 2020 Angel City Virtual Games is presented by The
          Hartford!{" "}
        </Typography>
        <Typography>
          The platform will be your hub to not only register and attend events
          but, also to connect with your peers and coaches.{" "}
        </Typography>
        <Typography>You can get started in four simple steps!</Typography>
        <ol>
          <li>
            <p className={classes.p1}>Visit the "Settings" tab register your information and create your profile. Select a username and photo to personalize your page.</p>
            {/* <p className={classes.p2}>Select a username and photo to personalize your page.</p> */}
          </li>
          <li>
            <p className={classes.p1}>Click on "Events Calendar" </p>
            <p className={classes.p2}>and check out all of the opportunities available for you to participate in. You can select the events you want to participate in to have each event added to your</p>
            <p className={classes.p1}>"My Events" tab.</p>
          </li>
          <li>
            <p className={classes.p1}>Once you've selected your fun-filled week, </p>
            <p className={classes.p2}>check out the "My Events" tab for participant information and access to your events.</p>
          </li>
          <li>
            <p className={classes.p1}>Every day of this action-packed week, login to participate in all events and connect with others!</p>
           
          </li>
        </ol>
        <h3 className={classes.h3}>A welcome message from us to you</h3>
        <iframe
          width="700"
          height="400"
          src="https://www.youtube.com/embed/w77zPAtVTuI"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
        <h3 className={classes.h3}>
          A few tips for getting started on our platform
        </h3>
        <iframe
          width="700"
          height="400"
          src="https://www.youtube.com/embed/w77zPAtVTuI"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
      </div>
    </Box>
  );
};

export default Welcome;
