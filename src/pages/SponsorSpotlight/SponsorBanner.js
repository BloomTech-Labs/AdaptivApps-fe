import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Link } from "@material-ui/core";
import { useNavigate } from "@reach/router";

const Sponsor_Thanks = require("../../assets/images/SponsorThanks.png");
const ACS_Logo = require("../../assets/images/01-ACS_Logo.png");
const Hartford_Logo = require("../../assets/images/TheHartfordBlue.jpg");

const useStyles = makeStyles(theme => ({
  banner: {
    //backgroundImage: " linear-gradient(#343c6d, #43496c 30%, #282a3c 80%)",
    backgroundColor: "#232c63",
    display: "flex",
    //padding: "1%",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    top: "5%",
    left: "22%",
    color: "white",
    textDecoration: "none",
    fontWeight: "900",
    fontSize: "2.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  acs: {
    maxWidth: "20%",
  },
  hartford: {
    maxWidth: "25%",
  },
  image: {
    alignSelf: "flex-end",
  },
}));

export default function SponsorBanner() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(`/sponsorspotlight`)}>
      <div className={classes.banner}>
        <img src={Sponsor_Thanks} className={classes.image} />
      </div>
      {/* <Container className={classes.banner}>
        <img
          className={classes.acs}
          src={ACS_Logo}
          alt="Angel City Virtual Games Logo"
          tabIndex="0"
        /> */}
      <Typography className={classes.text}>
        Click to view all sponsors!
      </Typography>
      {/* <img
          className={classes.hartford}
          src={Hartford_Logo}
          alt="Hartford Logo"
          tabIndex="0"
        />
      </Container> */}
    </Link>
  );
}
