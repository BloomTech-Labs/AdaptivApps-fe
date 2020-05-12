// React imports
import React from "react";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
import SimpleModal from "../ActivitiesList/SimpleModal";
// Styling imports
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
    color: "#2962FF",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
  },
});
export default function ActivityDetails({ activity }) {
  const classes = useStyles();
  const { user } = useAuth0();
console.log('Inside ActivityDetails', activity.participants)
  const activeEvent = activity.event;
  return (
    <tr className={classes.root}>
      <td className={classes.nameLink}>
        <SimpleModal activity={activity} />
      </td>
      <td>{activity.date}</td>
      {activeEvent.type === "Webinar" ? (
        <td>
          <a className={classes.nameLink} href={activity.link} target="_blank">
            Join!
          </a>
        </td>
      ) : (
        <td>{activity.location}</td>
      )}
      <td>{activity.startTime}</td>
      {activity?.participants.map((participant, id) =>
        participant && participant?.activityProfile?.email === user.email ? (
          <td>{participant.role}</td>
        ) : null
      )}
    </tr>
  );
}
