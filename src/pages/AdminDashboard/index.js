import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Typography, makeStyles } from "@material-ui/core";
import UsersList from "./UsersList";
import EventAttendeeList from "./EventAttendeeList";
import config from "../../config/auth_config";
import EventList from "./EventList";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

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
  tab: {
    border: "1px solid gray",
    marginLeft: "10px",
    marginBottom: "10px",
  },
  highlightedTab: {
    border: "1px solid gray",
    marginLeft: "10px",
    marginBottom: "10px",
    backgroundColor: "rgb(41, 98, 255)",
    color: "white",
  },
  tabs: {
    marginTop: "5rem",
  },
}));

const ManageUsers = () => {
  const { user } = useAuth0();
  const classes = useStyles();
  const [displayFilter, setDisplayFilter] = useState(true);
  const [displayEventUser, setDisplayEventUser] = useState(false);

  const handleClick1 = async () => {
    await setDisplayEventUser(false);
    setDisplayFilter(true);
  };

  const handleClick2 = async () => {
    await setDisplayFilter(false);
    setDisplayEventUser(true);
  };

  return (
    <Box component="main" className={classes.root}>
      {user && user[config.roleUrl].includes("Admin") ? (
        <>
          <Box className={classes.headingBox} borderBottom={2}>
            <Typography variant="h1" gutterBottom>
              Manage Registered Users
            </Typography>
          </Box>
          <EventList />
          <Tabs
            indicatorColor="primary"
            textColor="black"
            centered
            className={classes.tabs}
          >
            {displayFilter ? (
              <Tab
                label="Filter Users"
                onClick={handleClick1}
                className={classes.highlightedTab}
              />
            ) : (
              <Tab
                label="Filter Users"
                onClick={handleClick1}
                className={classes.tab}
              />
            )}
            {displayEventUser ? (
              <Tab
                label="Event Attendees"
                onClick={handleClick2}
                className={classes.highlightedTab}
              />
            ) : (
              <Tab
                label="Event Attendees"
                onClick={handleClick2}
                className={classes.tab}
              />
            )}
          </Tabs>
          {displayFilter ? <UsersList /> : null}
          {displayEventUser ? <EventAttendeeList /> : null}
        </>
      ) : null}
    </Box>
  );
};

export default ManageUsers;
