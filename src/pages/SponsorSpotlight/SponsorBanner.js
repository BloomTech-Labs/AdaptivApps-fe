import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Link } from "@material-ui/core";
import { useNavigate } from "@reach/router";

const ACS_Logo = require("../../assets/images/01-ACS_Logo.png");
const Hartford_Logo = require("../../assets/images/TheHartfordBlue.jpg");

const useStyles = makeStyles(theme => ({
  banner: {
    //backgroundImage: " linear-gradient(#343c6d, #43496c 30%, #282a3c 80%)",
    width: "100%",
    backgroundColor: "#282c52",
    padding: "1%",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    color: "white",
    textDecoration: "none",
    fontWeight: "900",
    fontSize: "2.5rem",
    letterSpacing: "2px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  acs: {
    maxWidth: "15%",
  },
  hartford: {
    maxWidth: "20%",
  },
}));

export default function SponsorBanner() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(`/sponsorspotlight`)}>
      <div className={classes.banner}>
        <img
          className={classes.acs}
          src={ACS_Logo}
          alt="Angel City Virtual Games Logo"
          tabIndex="0"
        />
        <Typography className={classes.text}>
          Click to view all sponsors!
        </Typography>
        <img
          className={classes.hartford}
          src={Hartford_Logo}
          alt="Hartford Logo"
          tabIndex="0"
        />
      </div>
    </Link>
  );
}
