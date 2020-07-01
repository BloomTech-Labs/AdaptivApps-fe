import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { useNavigate } from "@reach/router";

const Sponsors = require("../../assets/images/Sponsors.jpg");
const Sponsor_Thanks = require("../../assets/images/ProfilePhoto.png");

const useStyles = makeStyles(theme => ({
  banner: {
    backgroundColor: "#232c63",
    display: "flex",
    padding: "1%",
    justifyContent: "center",
    alignItems: "center",
    '@media (max-width: 950px)': {
      flexDirection: "column-reverse",
    },
  },
  image: {
    maxWidth: "80%",
    alignSelf: "flex-end",
    '@media (max-width: 950px)': {
      padding: "0 100px 100px -250px",
    },
  },
  sponsors: {
    maxWidth: "30%",
    marginRight: "15%",
    '@media (max-width: 950px)': {
      marginRight: "0",
      minHeight: "45px",
      minWidth: "250px",
    },
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
    </Link>
  );
}
