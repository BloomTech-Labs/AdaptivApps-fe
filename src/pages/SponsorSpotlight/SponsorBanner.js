import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Link } from "@material-ui/core";
import { useNavigate } from "@reach/router";

const Sponsors = require("../../assets/images/Sponsors.jpg");
const Sponsor_Thanks = require("../../assets/images/ProfilePhoto.png");

const useStyles = makeStyles(theme => ({
  banner: {
    //backgroundImage: " linear-gradient(#343c6d, #43496c 30%, #282a3c 80%)",
    backgroundColor: "#232c63",
    display: "flex",
    padding: "1%",
    overflow: "hidden",
    //textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    textDecoration: "none",
    fontWeight: "900",
    fontSize: "2.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  image: {
    maxWidth: "80%",
    alignSelf: "flex-end",
  },
  sponsors: {
    maxWidth: "30%",
    marginRight: "15%",
  },
}));

export default function SponsorBanner() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(`/sponsorspotlight`)}>
      <div className={classes.banner}>
        <img src={Sponsors} className={classes.sponsors} />
        <img src={Sponsor_Thanks} className={classes.image} />
      </div>
      {/* <Container className={classes.banner}>
        <img
          className={classes.acs}
          src={ACS_Logo}
          alt="Angel City Virtual Games Logo"
          tabIndex="0"
        /> */}
      {/* <Typography className={classes.text}>
        Click to view all sponsors!
      </Typography> */}
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
