import React, { useState } from "react";
// Apollo-GraphQL imports
import { useMutation } from "react-apollo";
import { DELETE_ACTIVITY } from "./graphql";
//reach router imports
import { useNavigate } from "@reach/router";
// Component imports
import DeleteModal from "../../theme/DeleteModal";
// Material-UI imports
import { makeStyles, Button, Box, Typography } from "@material-ui/core";
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
  },
  question: {
    color: "#2962FF",
    fontWeight: 600,
  },
});

export default function Activity({ activity, refetch }) {
  const classes = useStyles();
  const [DeleteActivity] = useMutation(DELETE_ACTIVITY);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // will open DeleteModal when invoked
  const handleOpen = () => {
    setOpen(true);
  };
  // will close DeleteModal when invoked
  const handleClose = () => {
    setOpen(false);
  };
  // will delete an activity from an event
  const deleteActivity = async () => {
    await DeleteActivity({
      variables: {
        id: activity.id,
      },
    });
    refetch();
  };
  const editActivity = async () => {
    await navigate(`/editActivity/${activity.id}`);
  };
  console.log(activity);

  // body for DeleteModal to display Activity info
  const body = (
    <Box className={classes.body}>
      <Typography variant="h3">{activity.name}</Typography>
      <Typography>{activity.date}</Typography>
      <Typography>
        {activity.startTime} - {activity.endTime}
      </Typography>
      <Typography>{activity.location}</Typography>
      <Typography className={classes.question}>
        Delete this activity?
      </Typography>
    </Box>
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
            <EditOutlinedIcon
              onClick={editActivity}
              color="primary"
              fontSize="large"
            />
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
