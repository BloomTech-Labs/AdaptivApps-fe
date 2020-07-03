import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { useNavigate } from "@reach/router";
import Tooltip from "@material-ui/core/Tooltip";

const Sponsors = require("../../assets/images/SponsorsText.png");
// const Sponsor_Thanks = require("../../assets/images/ProfilePhoto.png");
const Sponsor_Photo = require("../../assets/images/ProfilePhoto.png");

const useStyles = makeStyles(theme => ({
  banner: {
    backgroundColor: "#232c63",
    padding: ".5%",
  },
  image: {
    maxWidth: "80%",
    "@media (max-width: 950px)": {
      padding: "0 100px 100px -250px",
    },
  },
  sponsors: {
    maxWidth: "50%",
    //marginRight: "15%",
    minHeight: "45px",
    minWidth: "300px",
    "@media (max-width: 950px)": {
      marginRight: "0",
      minHeight: "45px",
      minWidth: "300px",
    },
  },
  btn: {
    border: "none",
    background: "none",
    backgroundColor: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
  },
}));

export default function SponsorBanner() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Link
      onClick={() => navigate(`/sponsorspotlight`)}
      aria-label="Click to go to our sponsor spotlight page"
    >
      <div className={classes.banner}>
        <Tooltip title="Check out our sponsors">
          <button
            aria-label="click here to check out our sponsor page"
            className={classes.btn}
          >
            <img src={Sponsor_Photo} className={classes.image} />
            <img src={Sponsors} className={classes.sponsors} />
          </button>
        </Tooltip>
      </div>
    </Link>
  );
}
