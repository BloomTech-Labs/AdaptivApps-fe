import React from "react";
import {
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";

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
    fontSize: "3rem",
    color: "gray",
    fontWeight: "normal",
  }
}));

const Welcome = () => {
  const classes = useStyles();

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Welcome to the Angel City Sports platform!
        </Typography>
      </Box>
      <div className={classes.body}>
        <h3 className={classes.h3}>A welcome message from us to you</h3>
        <iframe
          width="700"
          height="400"
          src="https://www.youtube.com/embed/w77zPAtVTuI"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen />
        <h3 className={classes.h3}>A few tips for getting started on our platform</h3>
        <iframe
          width="700"
          height="400"
          src="https://www.youtube.com/embed/w77zPAtVTuI"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen />
      </div>
    </Box>
  )
}

export default Welcome;