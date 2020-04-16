import React from "react";
import SimpleModal from "./SimpleModal";
import RolesDialog from "./SelectRole";
import PropTypes from "prop-types";

import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  grid: {
    display: "flex",
    "& td": {
      fontSize: "1.6rem",
    },
  },
  header: {
    color: "#202020",
  },
  nameLink: {
    color: "#2962FF",
    width: "24rem",
    padding: "1% 1% 1% 0%",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
    },
  },
  tableData: {
    width: "20rem",
    padding: "0 1% 1% 0%",
  },
  rolesDialog: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    padding: "0",
  },
});

export default function Activities({ activity, activityData }) {
  const classes = useStyles();
  return (
    <Grid className={classes.grid}>
      <table>
        <tbody>
          <tr>
            <td className={classes.nameLink}>
              <SimpleModal activity={activity} activityData={activityData} />
            </td>
            <td className={classes.tableData}>{activity.startDate}</td>
            {activityData.event.type === "In Person" ? (
              <td className={classes.tableData}>{activity.location}</td>
            ) : null}
            <td className={classes.tableData}>{activity.startTime}</td>
          </tr>
        </tbody>
      </table>
      <RolesDialog
        className={classes.rolesDialog}
        activity={activity}
        activityData={activityData}
      />
    </Grid>
  );
}
Activities.propTypes = {
  activity: PropTypes.object,
};
