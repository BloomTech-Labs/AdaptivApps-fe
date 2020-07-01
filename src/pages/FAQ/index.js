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
    "& p": {
      fontSize: "1.8rem",
    },
    "& strong": {
      fontSize: "1.8rem",
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
  h4: {
    fontSize: "2.5rem",
    color: "rgb(41, 98, 255)",
    fontWeight: "normal",
  },
}));

const FAQ = () => {
  const classes = useStyles();

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Frequently Asked Questions
        </Typography>
      </Box>
      <div className={classes.body}>
        <div className={classes.group}>
          <h3 className={classes.h4}>How do the Virtual Games work?</h3>
          <p>
            All activities and special events for the 2020 Angel City Virtual
            Games presented by The Hartford will be accessible through this web
            portal. All activities will be hosted via Zoom or a similar
            platform. You can view and register for individual events in the{" "}
            <strong>Events Calendar</strong> tab.
          </p>
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>
            Do I have to register for each activity separately?
          </h3>
          <p>
            Once you've completed registration for the 2020 Angel City Virtual
            Games presented by the Hartford you are set to attend any and all
            activities throughout all 3 weeks. If you would like for the events
            you are interested to be displayed in the <strong>My Events</strong>{" "}
            tab you will need to register for that specific event.
          </p>
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>When does registration close?</h3>
          <p>
            Registration will remain open throughout the duration of each
            individual event. You can access the links to all activities in the{" "}
            <strong>Events Calendar</strong> tab.
          </p>
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>
            How do I find an event after I sign up for it? How can I participate
            in an event?
          </h3>
          <p>
            After using <strong>Events Calendar</strong> to select and{" "}
            <strong>add</strong> your events, visit the{" "}
            <strong>My Events</strong> tab. You should find all events
            previously selected in this tab. This is your personally chosen
            Angel City Virtual Games presented by The Hartford experience! On
            the day of your event, visit this tab to find participant
            information to access your challenge, clinic, special event, and
            more!
          </p>
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>
            How can I connect with other athletes, coaches, and the community?
          </h3>
          <p>
            Using the chat feature, you can find friends, discuss the latest
            clinic, connect with mentors, and more! Simply fill out your
            profile, then access the <strong>Chat</strong> tab to find other users with the
            same interests, start a group chat with the most recent clinic you
            attended, or message a mentor for guidance! This feature is only
            available to those 18 years or older.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default FAQ;
