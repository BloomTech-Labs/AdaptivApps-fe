import React, { useState } from "react";
// Apollo-GraphQL imports
import { useMutation } from "react-apollo";
import { DELETE_ACTIVITY } from "./graphql";
// Component imports
import DeleteModal from "../../theme/DeleteModal";
// Material-UI imports
import { makeStyles, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

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
  body: {
    paddingLeft: "2.4rem",
    textAlign: "left",
    "& h3": {
      fontSize: "2.1rem",
      fontWeight: 600,
    },
    "& p": {
      fontSize: "1.8rem",
    },
  },
  question: {
    color: "#2962FF",
    fontWeight: 600,
  },
});

export default function Activity({ activity, refetch }) {
  const classes = useStyles();
  const [DeleteActivity] = useMutation(DELETE_ACTIVITY);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteActivity = async () => {
    await DeleteActivity({
      variables: {
        id: activity.id,
      },
    });
    refetch();
  };

  const body = (
    <div className={classes.body}>
      <h3>{activity.name}</h3>
      <p>{activity.date}</p>
      <p>
        {activity.startTime} - {activity.endTime}
      </p>
      <p>{activity.location}</p>
      <p className={classes.question}>Delete this activity?</p>
    </div>
  );

  return (
    <>
      <tbody className={classes.root}>
        <tr>
          <td>{activity.name}</td>
          <td>{activity.date}</td>
          <td>{activity.location}</td>
          <td>
            {activity.startTime} - {activity.endTime}
          </td>
          <Button>
            <EditOutlinedIcon color="primary" fontSize="large" />
          </Button>
          <Button onClick={handleOpen}>
            <DeleteOutlineIcon color="primary" fontSize="large" />
          </Button>
        </tr>
      </tbody>
      <DeleteModal
        onClick={deleteActivity}
        open={open}
        body={body}
        handleClose={handleClose}
      />
    </>
  );
}
