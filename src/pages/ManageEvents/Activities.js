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

export default function Activities({ data, refetch, value }) {
  const classes = useStyles();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={classes.root}>
      {data?.event?.activities.map((activity, id) => (
        <Activity
          key={id}
          activity={activity}
          refetch={refetch}
          data={data}
          value={value}
        />
      ))}
    </div>
  );
}
