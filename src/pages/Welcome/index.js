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
    color: "rgb(41, 98, 255)",
    fontWeight: "normal",
  },
  vid: {
    width: "800px",
    height: "500px",
    '@media (max-width: 1100px)': {
      width: "600px",
      height: "425px"
    },
    '@media (max-width: 900px)': {
      width: "450px",
      height: "325px"
    },
    '@media (max-width: 700px)': {
      width: "350px",
      height: "250px"
    },
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
          className={classes.vid}
          src="https://www.youtube.com/embed/w77zPAtVTuI"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen />
        <h3 className={classes.h3}>A few tips for getting started on our platform</h3>
        <iframe
          className={classes.vid}
          src="https://www.youtube.com/embed/w77zPAtVTuI"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen />
      </div>
    </Box>
  )
}

export default Welcome;