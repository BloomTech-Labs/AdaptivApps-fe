import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Link } from "@material-ui/core";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles(theme => ({
  banner: {
    backgroundColor: "#2962FF",
    padding: "1%",
    textAlign: "center",
  },
  text: {
    color: "white",
    textDecoration: "none",
    fontWeight: "900",
    fontSize: "2.5rem",
    letterSpacing: "2px",
    textShadow: "-3px 3px 8px black",
  },
}));

export default function SponsorBanner() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Link onClick={() => navigate(`/sponsorspotlight`)}>
      <Container className={classes.banner}>
        <Typography className={classes.text}>
          Thank You to Our Sponsors
        </Typography>
      </Container>
    </Link>
  );
}
