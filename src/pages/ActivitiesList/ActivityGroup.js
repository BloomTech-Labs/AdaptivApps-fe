import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box, Paper, Button } from "@material-ui/core";
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
  paper: {
    padding: "0",
    width: "70rem",
    boxShadow: "none",
  },
  tabs: {
    marginLeft: "1.2rem",
  },
  tab: {
    padding: "0",
    "& span": {
      alignItems: "start",
    },
  },
  trow: {
    marginLeft: "3rem",
  },
  activities: {
    padding: "0",
  },
  tabPanel: {
    "& div": {
      padding: "0 2.4rem 1rem .8rem",
    },
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
      <Paper position="static" color="default" className={classes.paper}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          className={classes.tabs}
        >
          {days.map(day => (
            <Tab label={day} value={day} className={classes.tab} />
          ))}
        </Tabs>
      </Paper>
      <table>
        <thead>
          <tr className={classes.trow}>
            <th>Name</th>
            <th>Date</th>
            {activityData.event.type === "Virtual" ? (
              <th>Link</th>
            ) : (
              <th>Location</th>
            )}

            <th>Time</th>
          </tr>
        </thead>
        <TabPanel value={value} index={value} className={classes.tabPanel}>
          <Activities
            value={value}
            activityData={activityData}
            refetch={refetch}
            className={classes.activities}
          />
        </TabPanel>
      </table>
    </div>
  );
}
