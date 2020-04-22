import React from "react";
import SimpleModal from "./SimpleModal";
import RolesDialog from "./SelectRole";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "& td": {
      marginLeft: "3rem",
      width: "20rem",
      padding: "0 1% 2% 0",
      display: "flex",
      textAlign: "left",
      fontSize: "1.6rem",
    },
    "& a": {
      fontSize: "1.6rem",
      textDecoration: "none",
    },
  },
  nameLink: {
    color: "#2962FF",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
  },
  rolesDialog: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    padding: "0",
  },
  time: {
    margin: "0",
    maxWidth: "5rem",
  },
});

export default function Activities({ activity, activityData }) {
  const classes = useStyles();
  return (
    <tr className={classes.root}>
      <td className={classes.nameLink}>
        <SimpleModal activity={activity} activityData={activityData} />
      </td>
      <td className={classes.tableData}>{activity.startDate}</td>
      {activityData.event.type === "In Person" ? (
        <td className={classes.tableData}>{activity.location}</td>
      ) : null}
      <td className={classes.time}>{activity.startTime}</td>
      <td>
        <RolesDialog
          className={classes.rolesDialog}
          activity={activity}
          activityData={activityData}
        />
      </td>
    </tr>
  );
}
