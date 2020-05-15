import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `scrollable-force-tab-${index}`,
//     "aria-controls": `scrollable-force-tabpanel-${index}`,
//   };
// }

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ActivityGroup({ data, refetch }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [activityByDates, setActivityByDates] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const startDate = moment(data?.event?.startDate);
  const endDate = moment(data?.event?.endDate);

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

  useEffect(() => {
    setActivityByDates(data?.event?.activities);
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
  console.log(activitiesGroupedByDate);

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
      {console.log("value of tab date", value)}
      {days.map(day => (
        <TabPanel value={day} index={day}>
          {days.map(day => (
            <Activities day={day} data={data} refetch={refetch} />
          ))}
        </TabPanel>
      ))}
    </div>
  );
}
