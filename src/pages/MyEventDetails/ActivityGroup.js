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
    display: "flex",
    flexDirection: "column",
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
    marginLeft: "-2.5rem",
  },
  tab: {
    padding: "0",
    "& span": {
      alignItems: "center",
    },
    fontSize: "2.5rem"
  },
  tabPanel: {
    "& div": {
      padding: "0 2.4rem 1rem 0",
    },
  },
  table: {
    alignItems: "start",
    textAlign: "left",
    "& th": {
      textAlign: "start",
    },
  },
}));

export default function ActivityGroup({
  data,
  activeEvent,
  activityData,
  refetch,
  currentActivities,
}) {
  const classes = useStyles();
  const [activityByDates, setActivityByDates] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const startDate = moment(activeEvent?.startDate);
  const endDate = moment(activeEvent?.endDate);
  const getDatesRangeArray = function (startDate, endDate, interval) {
    // console.log(startDate, endDate, interval);
    let cfg = { interval: interval || "days" };
    let dateArray = [];
    let currentDate = moment(startDate);
    // console.log(
    //   "-->",
    //   currentDate._i,
    //   "<=",
    //   endDate._i,
    //   currentDate <= endDate
    // );
    while (currentDate <= endDate) {
      dateArray.push(currentDate.format("ddd MM/DD/YY"));
      currentDate = currentDate.add(1, cfg.interval);
    }
    return dateArray;
  };
  const days = getDatesRangeArray(startDate, endDate);
  const [value, setValue] = React.useState(days[0]);
  console.log(days);

  useEffect(() => {
    setActivityByDates(activityData?.event?.activities);
  });

  const groupBy = (array, key) => {
    // Return the end result
    return (
      array &&
      array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {})
    ); // empty object is the initial value for result object
  };

  const activitiesGroupedByDate = groupBy(activityByDates, "date");

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
      <table className={classes.table}>
        <thead>
          <tr className={classes.tRow}>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Time</th>
            <th>I'm attending as...</th>
          </tr>
        </thead>
        <TabPanel value={value} index={value} className={classes.tabPanel}>
          <Activities
            data={data}
            activeEvent={activeEvent}
            currentActivities={currentActivities}
            value={value}
            refetch={refetch}
          />
        </TabPanel>
      </table>
    </div>
  );
}
