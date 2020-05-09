import React from 'react';
// Apollo-GraphQL imports
import { useMutation } from 'react-apollo';
import { DELETE_ACTIVITY } from './graphql';
// Material-UI imports
import { makeStyles, Button } from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
  root: {
    "& tr": {
      display: "flex",
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
  const [DeleteActivity] = useMutation(DELETE_ACTIVITY);

  
  return (
    <tbody className={classes.root}>
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
  )
}
