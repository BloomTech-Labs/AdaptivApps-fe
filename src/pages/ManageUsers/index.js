import React, { useState } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import UsersList from "./UsersList";
import EventAttendeeList from "./EventAttendeeList";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    width: "90%",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: "500",
    },
    "& .MuiTab-wrapper": {
      fontSize: "1.6rem",
    },
  },
  btn: {
    margin: theme.spacing(1),
    padding: "5",
    textTransform: "none",
    backgroundColor: "#2962FF",
    border: "1px solid #2962FF",
    borderRadius: "5px",
    color: "white",
    "&:hover": {
      background: "white",
      color: "#2962FF",
    },
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const ManageUsers = () => {
  const classes = useStyles();
  const [displayFilter, setDisplayFilter] = useState(true);
  const [displayEventUser, setDisplayEventUser] = useState(false);

  const handleClick1 = async () => {
    await setDisplayEventUser(false);
    setDisplayFilter(true);
  }

  const handleClick2 = async () => {
    await setDisplayFilter(false);
    setDisplayEventUser(true);
  }

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Manage Registered Users
        </Typography>
      </Box>
      <Tabs
        indicatorColor="primary"
        textColor="black"
        centered
      >
        <Tab label="Filter Users" onClick={handleClick1}></Tab>
        <Tab label="Event Attendees" onClick={handleClick2}></Tab>
      </Tabs>
      {displayFilter ? <UsersList /> : null}
      {displayEventUser ? <EventAttendeeList /> : null}
    </Box>
  );
};

export default ManageUsers;
