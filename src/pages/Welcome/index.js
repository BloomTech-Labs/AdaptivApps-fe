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
      fontSize: "1.8rem",
    },
    "& strong": {
      fontSize: "1.8rem",
    },
    "& a": {
      textDecoration: "none",
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
  h3: {
    fontSize: "2.4rem",
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
        <h3 className={classes.h3}>A Welcome Message From Us to You</h3>
        <Typography>
          This accessible portal will be your home for the 2020 Angel City
          Virtual Games presented by The Hartford. The entire Angel City Team is
          thrilled you are here to participate in three epic weeks of sports,
          special events, community fun, and most of all-connection.
          <br />
          <br />
          Be sure to browse the <strong>Events Calendar</strong> and select which events you are
          interested in attending this week and utilize the <strong>Chat</strong> to connect with
          friends, peers and coaches from all over the world!
          <br />
          <br />
          We are so excited for what’s ahead! Thank you so much for registering
          for the 2020 Angel City Games presented by The Hartford…this summer is
          going to be a blast!
          <br />
          <br />
          Be sure to visit the <strong>FAQs</strong> tab for easy video tutorials, a
          system walkthrough, and more!
        </Typography>
        <h3 className={classes.h3}>
          This Portal for the 2020 Angel City Virtual Games is Presented by The
          Hartford!{" "}
        </h3>
        <Typography>
          The platform will be your hub to not only register and attend events,
          but also to connect with your peers and coaches.{" "}
        </Typography>
        <Typography>You can get started in five simple steps!</Typography>
        <ol>
          <li>
            <p className={classes.p1}>
              Visit the <strong>Settings</strong> tab to create your profile. Be
              sure to enter a username to personalize your profile page.
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
              Click on <strong>Events Calendar</strong> and check out all of the
              opportunities available for you to participate in. If you are
              interested in an event simply click <strong>view details</strong>.
              If you would like to participate in the event click{" "}
              <strong>add</strong> and you will be taken to the{" "}
              <strong>Event Details</strong> page. You may now go back to{" "}
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
              Every day of this action-packed week, login to participate in all
              events and connect with others! Don't forget to check out the{" "}
              <strong>Chat</strong> tab to chat with friends!
            </p>
          </li>
        </ol>
        <h3 className={classes.h3}>
          Checkout this video tutorial for a walkthrough of our app!
        </h3>
        <iframe
          className={classes.vid}
          src="https://www.youtube.com/embed/w77zPAtVTuI"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
        <h3 className={classes.h3}>
          A few tips for getting started on our platform
        </h3>
        <Typography>
          For any questions about this exciting community platform please refer
          to the video tutorial above or check out the <strong>FAQ</strong>{" "}
          page. For any additional information, please email{" "}
          <strong>info@angelcitysports.org</strong>.
          <br />
          <br />
          Thank you for joining Angel City Sports in this World Premier Virtual
          Adaptive Sports Event- The 2020 Angel City Games presented by The
          Hartford.
        </Typography>

        <h3 className={classes.h3}>
          The 2020 Angel City Virtual Games Presented by The Harford (Explained)
        </h3>
        <Typography>
          On March 12th, Angel City Sports made the tough decision to suspend
          all in-person programming and events in response to the COVID-19
          crisis. This included the 2020 Angel City Games presented by The
          Hartford. However, quickly after that decision was made, the Angel
          City team began to brainstorm ways to inspire and support our athletes
          to connect, engage, and build community all while living healthy,
          active lives. Thus, the 2020 Angel City Virtual Games presented by The
          Hartford was created!
          <br />
          <br />
          The 2020 Angel City Virtual Games presented by The Hartford will
          mirror all components the physical Games would have showcased: sport
          clinics, competitive opportunities, special events, and community
          building. The key difference-
          <strong>
            the Virtual Games will last 3 weeks as opposed to 4 days!
          </strong>
          <br />
          <br />
          Adaptive athletes along with family, friends, volunteers, and peers
          are welcome to join in on this unforgettable summer – 21 days full of
          sport, education, connection, and fun!
          <br />
          <br />
          Check out the <strong>Events Calendar</strong> tab in this portal to
          view all activities available in the upcoming week. These events will
          be continually updated as the Virtual Games will take place all summer
          long!
          <br />
          <br />
          <strong>Week 1</strong>: July 13 - 19
          <br />
          <strong>Week 2</strong>: August 3 - 9
          <br />
          <strong>Week 3</strong>: August 24 - 30
        </Typography>

        <h3 className={classes.h3}>About Angel City Sports</h3>
        <Typography>
          Angel City Sports provides year-round free adaptive sports
          opportunities for kids, adults, and veterans with physical
          disabilities or visual impairments. A chapter member of Move United,
          Angel City Sports is focused on encouraging participation in sports
          and recreation activities for people with physical disabilities and
          advancing the Paralympic movement. Debuting in 2015, the annual Angel
          City Games presented by The Hartford, is now the largest multisport
          Paralympic competition open to kids, adults, and veterans. In addition
          to providing free equipment, coaching, and competitive opportunities –
          Angel City focuses on how every individual can reach their full
          potential and unlock their dreams through music, art, higher
          education, and career opportunities. For more information about Angel
          City Sports, visit{" "}
          <a href="https://www.angelcitysports.org" target="_blank">
            angelcitysports.org
          </a>{" "}
          and follow <strong>@angelcitysports</strong> on Facebook, Instagram,
          and Twitter.
        </Typography>
      </div>
    </Box>
  );
};

export default Welcome;
