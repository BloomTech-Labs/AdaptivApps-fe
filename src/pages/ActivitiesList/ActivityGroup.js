import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box, AppBar, Button } from "@material-ui/core";
import moment from "moment";
import Activities from "./Activities";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ActivityGroup({ activityData, refetch }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const startDate = moment(activityData?.event?.startDate);
  const endDate = moment(activityData?.event?.endDate);

  const getDatesRangeArray = function(startDate, endDate, interval) {
    console.log(startDate, endDate, interval);
    let cfg = { interval: interval || "days" };
    let dateArray = [];
    let currentDate = moment(startDate);
    console.log(
      "-->",
      currentDate._i,
      "<=",
      endDate._i,
      currentDate <= endDate
    );
    while (currentDate <= endDate) {
      dateArray.push(currentDate.format("ddd MM/DD/YY"));
      currentDate = currentDate.add(1, cfg.interval);
    }
    return dateArray;
  };
  const days = getDatesRangeArray(startDate, endDate);
  const [value, setValue] = React.useState(days[0]);

  console.log("days", days);
  console.log("Activity Data in ActivityGroup.js", activityData);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {days.map(day => (
            <Tab label={day} value={day} />
          ))}
        </Tabs>
      </AppBar>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Time</th>
          </tr>
        </thead>
        <TabPanel value={value} index={value}>
          <Activities
            value={value}
            activityData={activityData}
            refetch={refetch}
          />
        </TabPanel>
      </table>
    </div>
  );
}
