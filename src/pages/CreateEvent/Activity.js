import React, { useState, useEffect } from "react";
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
    marginTop: "3.2rem",
    paddingLeft: "2.4rem",
    textAlign: "left",
    fontSize: "1.8rem"
  },
  name: {
    fontWeight: "bold",
    marginBottom: "0.8rem"
  },
  date: {
    marginBottom: "0.8rem"
  },
  time: {
    marginBottom: "0.8rem"
  },
  location: {
    marginBottom: "0.8rem"
  },
  question: {
    color: "#2962FF",
    fontWeight: 500,
    marginTop: '3.2rem'
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
    await navigate(`/editActivity/${activity?.id}`);
  };
  useEffect(() => {
    refetch();
  }, [refetch]);

  // body for DeleteModal to display Activity info
  const body = (
    <Box className={classes.body}>
      <Typography variant="h2" className={classes.name}>{activity.name}</Typography>
      <Typography className={classes.date}>{activity.date}</Typography>
      <Typography className={classes.time}>
        {activity.startTime} - {activity.endTime}
      </Typography>
      <Typography className={classes.location}>{activity.location}</Typography>
      <Typography variant="h2" className={classes.question}>
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
