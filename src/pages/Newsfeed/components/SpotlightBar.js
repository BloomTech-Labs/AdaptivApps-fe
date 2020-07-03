import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "sticky",
    marginTop: "80%",
    display: "flex",
    flexDirection: "column",
    objectFit: "contain",
  },
  hartford: {
    maxWidth: "100%",
  },
  acs: {
    maxWidth: "80%",
  },
}));

const Hartford = require("../../../assets/images/Hartford.png");
const ACS = require("../../../assets/images/01-ACS_Logo.png");

export default function SpotlightBar() {
  const classes = useStyles();
  const [toggleEdit, setToggleEdit] = useState(false);

  return (
    <Container className={classes.root}>
      <img src={Hartford} className={classes.hartford} />
      <img src={ACS} className={classes.acs} />
    </Container>
  );
}
