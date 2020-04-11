// React imports
import React from 'react';

// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';

// Component imports
import SideNav2 from './SideNav/SideNav2';
// import SideNav from './SideNav'
import PropTypes from 'prop-types';

// Styling imports
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
  },
  box: {
    marginLeft: '2rem',
    width: '100%',
  },
});

const DashRouter = ({ children }) => {
  const classes = useStyles();
  const { user } = useAuth0();

  return (
    <div className={classes.root}>
      <SideNav2 user={user} />
      <Box className={classes.box}>{children}</Box>
    </div>
  );
};

export default DashRouter;

DashRouter.propTypes = {
  children: PropTypes.any,
};
