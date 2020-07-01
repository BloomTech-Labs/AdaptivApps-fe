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
    display: "flex",
  },
  p1: {
    fontSize: "1.6rem",
    "& strong": {
      fontSize: "1.6rem",
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
          Steamed, dark cappuccino mazagran steamed grounds to go. Variety est,
          ut irish half and half, whipped frappuccino cultivar java breve
          mazagran. To go, doppio, black con panna filter, caramelization bar
          fair trade roast fair trade. Grounds galão, chicory, redeye et crema
          and sit fair trade. And wings latte trifecta flavour body dripper.
          Strong mazagran extra carajillo aged, body mocha cortado and con panna
          brewed. Skinny, extraction extra, café au lait aroma blue mountain
          grinder whipped doppio. Beans dark as white sit chicory est chicory.
        </Typography>
        <h3 className={classes.h3}>
          This Portal for the 2020 Angel City Virtual Games is Presented by The
          Hartford!{" "}
        </h3>
        <Typography>
          The platform will be your hub to not only register and attend events
          but, also to connect with your peers and coaches.{" "}
        </Typography>
        <Typography>You can get started in four simple steps!</Typography>
        <ol>
          <li>
            <p className={classes.p1}>
              Visit the <strong>Settings</strong> tab to create your profile. Be
              sure to select a username to personalize your profile page.
            </p>
          </li>
          <li>
            <p className={classes.p1}>
              Next, checkout the <strong>My Profile</strong> tab add a bit more
              of a personalized touch by adding a cool banner and profile image.
            </p>
          </li>
          <li>
            <p className={classes.p1}>
              Click on <strong>Events Calendar</strong> and check out all of the
              opportunities available for you to participate in. You can select
              the events you want to participate in to have each event added to
              your <strong>My Events</strong> tab.
            </p>
          </li>
          <li>
            <p className={classes.p1}>
              Once you've selected your fun-filled week, check out the{" "}
              <strong>My Events</strong> tab for participant information and
              access to your events.
            </p>
          </li>
          <li>
            <p className={classes.p1}>
              Every day of this action-packed week, login to participate in all
              events and connect with others!
            </p>
          </li>
        </ol>
        <h3 className={classes.h3}>
          Checkout this video tutorial for a walkthrough of our app!
        </h3>
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
        <Typography>
          For any questions about this exciting community platform please refer
          to the video tutorial above or check out the <strong>FAQ</strong>{" "}
          page. For any additional information, please email
          info@angelcitysports.org.
        </Typography>
        <Typography>Thank you for joining Angel City Sports in
          this World’s Premier Virtual Adaptive Sports Event- The 2020 Angel
          City Games presented by The Hartford.</Typography>
      </div>
    </Box>
  );
};

export default Welcome;
