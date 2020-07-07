// React imports
import React from "react";
// Material-UI imports
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
    "& li": {
      fontSize: "1.8rem",
    },
    "& strong": {
      fontSize: "1.8rem",
    },
    "& a": {
      fontSize: "1.8rem",
      fontWeight: "bold"
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
  li: {
    display: "flex",
  },
  p1: {
    fontSize: "1.8rem",
    "& strong": {
      fontSize: "1.8rem",
    },
  },
  vid: {
    width: "800px",
    height: "500px",
    "@media (max-width: 1100px)": {
      width: "600px",
      height: "425px",
    },
    "@media (max-width: 900px)": {
      width: "450px",
      height: "325px",
    },
    "@media (max-width: 700px)": {
      width: "350px",
      height: "250px",
    },
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
            Games presented by The Hartford will be accessible through this
            website. All activities will be hosted via Zoom or a similar
            platform. You can view and register for individual events in the{" "}
            <strong>Events Calendar</strong> tab.
          </p>
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>How do I use this website?</h3>
          <p>Great question, you can get started in five easy steps!</p>
          <ol>
            <li>
              <p className={classes.p1}>
                Visit the <strong>Settings</strong> tab to create your profile.
                Be sure to enter a username to personalize your profile page.
              </p>
            </li>
            <li>
              <p className={classes.p1}>
                Checkout the <strong>My Profile</strong> tab to give more of a
                personalized touch by adding a cool banner and profile image.
              </p>
            </li>
            <li>
              <p className={classes.p1}>
                Click on <strong>Events Calendar</strong> and check out all of
                the opportunities available for you to participate in. If you
                are interested in an event simply click{" "}
                <strong>view details</strong>. If you would like to participate
                in the event click <strong>add</strong> and you will be taken to
                the <strong>Event Details</strong> page. You may now go back to{" "}
                <strong>Events Calendar</strong> and repeat this process to
                register for as many events as you would like.
              </p>
            </li>
            <li>
              <p className={classes.p1}>
                Once you have selected your fun-filled week, check out the{" "}
                <strong>My Events</strong> tab to view your upcoming events and
                participation information.
              </p>
            </li>
            <li>
              <p className={classes.p1}>
                Every day of this action-packed week, login to participate in
                all events and connect with others! Don't forget to check out
                the <strong>Chat</strong> tab to chat with friends!
              </p>
            </li>
          </ol>
          {/* <p>
            Check out the video tutorial below to learn everything you need to
            know about this action-packed week!
          </p>
          <iframe
            className={classes.vid}
            src="https://www.youtube.com/embed/w77zPAtVTuI"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullscreen
          /> */}
        </div>
        <div className={classes.group}>
          <h3 className={classes.h4}>
            Do I have to register for each activity separately?
          </h3>
          <p>
            Once you've completed <a href="https://www.angelcitygames.org/Virtual/Event-Details/Registration" target="_blank">registration</a> for the 2020 Angel City Virtual
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
            profile, then access the <strong>Chat</strong> tab to find other
            users with the same interests, start a group chat with the most
            recent clinic you attended, or message a mentor for guidance!{" "}
            <strong>
              {" "}
              This feature is only available to those 18 years or older.
            </strong>
          </p>
        </div>
      </div>
    </Box>
  );
};

export default FAQ;
