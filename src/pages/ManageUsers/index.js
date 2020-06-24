import React, { useState } from "react";

import {
  Box,
  Typography,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";
import UsersList from "./UsersList";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    width: "90%",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
      fontWeight: "500",
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

// This page is still a work in progress
// It will display a list of users, using material table, and an admin
// Can select users to perform actions. For now that's a dummy function,
// But in future can be functions like group messaging.
const ManageUsers = () => {
  const classes = useStyles();

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Manage Registered Users
        </Typography>
      </Box>
      <UsersList />
    </Box>
  );
};

export default ManageUsers;
