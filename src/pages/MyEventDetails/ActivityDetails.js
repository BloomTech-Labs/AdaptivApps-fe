// React imports
import React from 'react';
// Styling imports
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types';
import '../ActivitiesList/styles.css';

const useStyles = makeStyles({
  root: {
    '& td': {
      width: '14rem',
      padding: '1% 1% 2% 0',
      display: 'flex',
      textAlign: 'left'
    },
  },
  title: {
    color: '#2962ff',
  },
});

export default function ActivityDetails({ activity }) {
  const classes = useStyles();

  return (
    <tr className={classes.root}>
      <td className={classes.title}>{activity.name}</td>
      <td>{activity.startDate}</td>
      <td>{activity.location}</td>
      <td>{activity.startTime}</td>
      <td>{activity.message}</td>
    </tr>
  );
}

ActivityDetails.propTypes = {
  activity: PropTypes.object,
};
