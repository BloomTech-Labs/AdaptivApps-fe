// React imports
import React from 'react';

// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';

// Component imports
import SideNav from './SideNav';

import PropTypes from 'prop-types';

// Styling imports
import { makeStyles, Box } from '@material-ui/core';

// w="17vw" min_w="25rem"
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headingBox: {
    margin: '6rem 0 2rem 3rem',
    fontWeight: '400',
    borderColor: '#D3D3D3',
  },
  grid: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: '3rem',
  },
  box: {
    width: '17vw',
    minWidth: '25rem',
  },
  children: {
    width: '100%',
  },
});

const DashRouter = ({ children }) => {
  const classes = useStyles();
  const { user } = useAuth0();
  return (
    <div className={classes.root}>
      <SideNav user={user} className={classes.nav} />
      <Box className={classes.box} />
      <Box className={classes.children}>{children}</Box>
    </div>
  );
};

export default DashRouter;

DashRouter.propTypes = {
  children: PropTypes.any,
};
