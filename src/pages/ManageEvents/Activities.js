import React, { useEffect, useState } from "react";
import moment from "moment";
// Component imports
import Activity from "./Activity";
// Material-UI imports
import { makeStyles, Box, Typography, Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "3rem",
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

export default function Activities({ data, refetch, day }) {
  const classes = useStyles();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // const activities = data?.event?.activities.map(activity => {
  //   return activity;
  // });
  // const formatDates = moment(activities?.date).format("ddd MM/DD/YY");
  // console.log("activities in Activities.js", activities);
  // console.log("activity dates in Activities.js", formatDates);
  // console.log("Day inside ActivityList", day);
  // console.log("data inside ActivityList", data);

  return (
    <div className={classes.root}>
      {/* {data?.event?.activities.length === 0 ? (
        <>
          <p>No activities added yet!</p>
          <p>
            Use the form on the left to add activities to any of the days for
            the event.
          </p>
        </>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>

          {data?.event?.activities.map((activity, id) => (
            <Activity key={id} activity={activity} refetch={refetch} />
          ))}
        </table>
      )} */}
    </div>
  );
}
