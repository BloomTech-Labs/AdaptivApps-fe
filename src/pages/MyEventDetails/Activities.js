import React, { useEffect, useState } from "react";
import moment from "moment";
// Component imports
import Activity from "./Activity";
// Material-UI imports
import { makeStyles, Box, Typography, Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& tr": {
      display: "flex",
    },
    "& th": {
      margin: "0",
      fontWeight: 550,
      fontSize: "1.6rem",
      width: "15rem",
      padding: "1% 1% 2% 0",
      textAlign: "left",
    },
  },
  subHeadings: {
    color: "#808080",
  },
}));

export default function Activities({ refetch, value, data, activeEvent }) {
  const classes = useStyles();

  useEffect(() => {
    refetch();
  }, [refetch]);
  console.log("active Event activities.js", activeEvent);

  return (
    <div className={classes.root}>
      {activeEvent?.activities.map((activity, id) => (
        <Activity
          key={id}
          activeEvent={activeEvent}
          activity={activity}
          refetch={refetch}
          value={value}
        />
      ))}
    </div>
  );
}
