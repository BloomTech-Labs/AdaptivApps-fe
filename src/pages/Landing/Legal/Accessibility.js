import React from "react";
import { Link } from "@reach/router";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
    width: "90%",
    margin: "30px 0 0 30px",
    fontSize: "5rem"
  },
  linkBack: {
    color: "#202020",
    fontSize: "1.8rem",
    fontWeight: 530,
    display: "flex",
    alignItems: "center",
    marginBottom: "1.6rem",
    marginLeft: "0.3rem",
    textDecoration: "none",
  },
  title: {
    marginLeft: "35%",
    fontSize: "4rem",
  },
  link: {
    fontSize: "2rem"
  },
  divider: {
    marginTop: "3%",
    marginBottom: "3%",
  },
});

export default function Accessibility() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to={`/`} className={classes.linkBack}>
        <ArrowBackIosIcon color="primary" fontSize="large" />
        Go Back
      </Link>

      <Divider variant="inset" className={classes.divider} />

      <div>
        <h1 className={classes.title}>Accessibility Statement</h1>
        <br />
        <p>Updated: March 2020.</p>
        <h2>General</h2>
        <p>
          app.angelcityalliance.org strives to ensure that its services are accessible to
          people with disabilities. app.angelcityalliance.org has invested a significant
          amount of resources to help ensure that its website is made easier to
          use and more accessible for people with disabilities, with the strong
          belief that every person has the right to live with dignity, equality,
          comfort and independence.
        </p>

        <h2>Accessibility on app.angelcityalliance.org</h2>
        <p>
          app.angelcityalliance.org makes available the{" "}
          <a
            href="https://UserWay.org"
            alt="Free Website Accessibility Widget"
            title="Free Website Accessibility Widget"
            className={classes.link}
          >
            UserWay Website Accessibility Widget
          </a>{" "}
          that is powered by a dedicated accessibility server. The software
          allows app.angelcityalliance.org to improve its compliance with the Web Content
          Accessibility Guidelines (WCAG 2.1).
        </p>

        <h2>Enabling the Accessibility Menu</h2>
        <p>
          The app.angelcityalliance.org accessibility menu can be enabled by clicking the
          accessibility menu icon that appears on the corner of the page. After
          triggering the accessibility menu, please wait a moment for the
          accessibility menu to load in its entirety.
        </p>

        <h2>Disclaimer</h2>
        <p>
          app.angelcityalliance.org continues its efforts to constantly improve the
          accessibility of its site and services in the belief that it is our
          collective moral obligation to allow seamless, accessible and
          unhindered use also for those of us with disabilities.
        </p>

        <p>
          Despite our efforts to make all pages and content on app.angelcityalliance.org
          fully accessible, some content may not have yet been fully adapted to
          the strictest accessibility standards. This may be a result of not
          having found or identified the most appropriate technological
          solution.
        </p>

        <h2>Here For You</h2>
        <p>
          If you are experiencing difficulty with any content on app.angelcityalliance.org
          or require assistance with any part of our site, please contact us
          during normal business hours as detailed below and we will be happy to
          assist.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you wish to report an accessibility issue, have any questions or
          need assistance, please contact app.angelcityalliance.org Customer Support as
          follows:
        </p>

        <br />

        <p>
          Email:{" "}
          <a href="mailto:admin@adaptivapps.org" className={classes.link}>admin@adaptivapps.org</a>
        </p>
      </div>
    </div>
  );
}
