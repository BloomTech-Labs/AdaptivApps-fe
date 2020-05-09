import React from 'react';
// Material-UI imports
import { makeStyles, Button } from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
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
    "& td": {
      width: "15rem",
      padding: "0 1% 2% 0",
      display: "flex",
      textAlign: "left",
      fontSize: "1.6rem",
    },
  },
});

export default function Activity({ activity }) {
  const classes = useStyles();
  return (
    <table className={classes.root}>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Location</th>
          <th>Time</th>
        </tr>
        <tr>
          <td>{activity.name}</td>
          <td>{activity.date}</td>
          <td>{activity.location}</td>
          <td>{activity.startTime} - {activity.endTime}</td>
          <Button>
            <EditOutlinedIcon color="primary" fontSize="large"/>
          </Button>
          <Button>
           <DeleteOutlineIcon color="primary" fontSize="large" />  
          </Button>
        </tr>
      </tbody>
    </table>
  )
}
