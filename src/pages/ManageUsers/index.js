import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  makeStyles,
} from '@material-ui/core';
import UsersList from './UsersList';
import UsersFilter from './UsersFilter';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    width: '90%',
    marginLeft: '1rem',
    marginTop: '4rem',
  },
  btn: {
    margin: theme.spacing(1),
    padding: '5',
    fontSize: '1.6rem',
    fontWeight: '600',
    textTransform: 'none',
    backgroundColor: '#2962FF',
    color: 'white',
  },
  headingBox: {
    margin: '6rem 0 2rem 3rem',
    borderColor: '#D3D3D3',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

// This page is still a work in progress
// It will display a list of users, using material table, and an admin
// Can select users to perform actions. For now that's a dummy function,
// But in future can be functions like group messaging.
const ManageUsers = () => {
  const classes = useStyles();
  const [showList, setShowList] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <Box component="main" className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h3" gutterBottom>
          Manage Registered Users
        </Typography>
      </Box>
      <Container className={classes.buttonBox}>
        {!showList ? (
          <Button
            className={classes.btn}
            onClick={() => {
              setShowList(!showList);
            }}
          >
            Show all users
          </Button>
        ) : (
          <Button
            className={classes.btn}
            onClick={() => {
              setShowList(!showList);
            }}
          >
            Hide users
          </Button>
        )}
        {showList ? <UsersList /> : null}

        {!showPanel ? (
          <Button
            className={classes.btn}
            onClick={() => {
              setShowPanel(!showPanel);
            }}
          >
            Start a customized search
          </Button>
        ) : (
          <Button
            className={classes.btn}
            onClick={() => {
              setShowPanel(!showPanel);
            }}
          >
            Hide search
          </Button>
        )}
        {showPanel ? <UsersFilter /> : null}
      </Container>
    </Box>
  );
};

export default ManageUsers;
