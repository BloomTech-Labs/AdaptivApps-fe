import React from 'react';
// import RolesToolTip from './RolesToolTip';
import RolesDialog from './RolesDialog';
import PropTypes from 'prop-types';
import './styles.css';

import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  grid: {
    display: 'flex',
  },
  header: {
    color: '#202020',
  },
  nameLink: {
    color: '#2962FF',
    width: '14rem',
    padding: '1% 1% 3% 0%',
  },
});

export default function Activities({ activity }) {
  const classes = useStyles();
  return (
    <Grid className={classes.grid}>
      <table>
        <tbody>
          <tr>
            <td className={classes.nameLink}>{activity.name}</td>
            <td className={classes.date}>{activity.startDate}</td>
            <td className={classes.loc}>{activity.location}</td>
            <td className={classes.time}>{activity.startTime}</td>
          </tr>
        </tbody>
      </table>
      {/* <RolesToolTip activity={activity} /> */}
      <RolesDialog activity={activity} />
    </Grid>
  );
}
Activities.propTypes = {
  activity: PropTypes.object,
};
