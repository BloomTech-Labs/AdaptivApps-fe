import React from "react";
import SimpleModal from "./SimpleModal";
import RolesDialog from "./SelectRole";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "& td": {
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
    textAlign: "left",
    color: "#2962FF",
    "& .MuiButton-label": {
      textAlign: "left",
      alignItems: "start",
      fontSize: "1.6rem",
      fontWeight: 500,
      justifyContent: "start",
    },
    "& span": {
      alignItems: "start",
      textAlign: "left",
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

export default function Activity({ activity, activityData, value }) {
  const classes = useStyles();
  console.log("activityData in Activity.js", activityData);
  return (
    <>
      {value === activity?.date ? (
        <>
          {" "}
          <tr className={classes.root}>
            <td className={classes.nameLink}>
              <SimpleModal activity={activity} activityData={activityData} />
            </td>
            <td className={classes.tableData}>{activity?.date}</td>
            {activityData?.event?.type === "In Person" ? (
              <td className={classes.tableData}>{activity.location}</td>
            ) : (
              <td>
                <a
                  className={classes.tableData}
                  href={activity?.link}
                  target="_blank"
                >
                  Join!
                </a>
              </td>
            )}
            <td className={classes.time}>{activity?.startTime}</td>
            <td>
              <RolesDialog
                className={classes.rolesDialog}
                activity={activity}
                activityData={activityData}
              />
            </td>
          </tr>
        </>
      ) : null}
    </>
  );
}
