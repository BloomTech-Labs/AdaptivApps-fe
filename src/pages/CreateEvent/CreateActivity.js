import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMutation } from "react-apollo";
import { CREATE_ACTIVITY } from "./graphql";

import ActivityForm from "./ActivityForm";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
});

export default function CreateActivity() {
  const [createActivity, { data, error, loading }] = useMutation(CREATE_ACTIVITY);
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Add Activities to an Event
        </Typography>
      </Box>
      <Box>
        <ActivityForm createActivity={createActivity} data={data} />
      </Box>
    </main>
  );
}
