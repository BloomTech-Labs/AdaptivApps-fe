import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { useNavigate } from "@reach/router";
import Tooltip from "@material-ui/core/Tooltip";

const Sponsors = require("../../assets/images/Sponsors.png");
const Sponsor_Thanks = require("../../assets/images/ProfilePhoto.png");

const useStyles = makeStyles(theme => ({
  banner: {
    backgroundColor: "#232c63",
    display: "flex",
    padding: "1%",
    //justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 950px)": {
      flexDirection: "column-reverse",
    },
  },
  image: {
    maxWidth: "80%",
    "@media (max-width: 950px)": {
      padding: "0 100px 100px -250px",
    },
  },
  sponsors: {
    maxWidth: "40%",
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
  },
}));

export default function SponsorBanner() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(`/sponsorspotlight`)}>
      <div className={classes.banner}>
        <Tooltip title="Check out our sponsors">
          <button className={classes.btn}>
            <img src={Sponsors} className={classes.sponsors} />
          </button>
        </Tooltip>
        <img src={Sponsor_Thanks} className={classes.image} />
      </div>
    </Link>
  );
}
