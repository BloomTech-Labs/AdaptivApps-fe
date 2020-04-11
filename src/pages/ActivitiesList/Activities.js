import React from 'react';
import SimpleModal from './SimpleModal';
import RolesDialog from './SelectRole';
import { useQuery } from 'react-apollo';
import { useParams } from '@reach/router';
import { GET_EVENT_ACTIVITIES } from './queries/getActivities';
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
  tableData: {
    width: '14rem',
    padding: '0 1% 3% 0%',
  },
  rolesDialog: {
    margin: '0',
    padding: '0',
  },
});

export default function Activities({ activity }) {
  const { eventId } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT_ACTIVITIES, {
    variables: { id: eventId },
  });
  const classes = useStyles();
  console.log('data in activities.js', data);
  return (
    <Grid className={classes.grid}>
      <table>
        <tbody>
          <tr>
            <td className={classes.nameLink}>
              <SimpleModal activity={activity} data={data} />
            </td>
            <td className={classes.tableData}>{activity.startDate}</td>
            <td className={classes.tableData}>{activity.location}</td>
            <td className={classes.tableData}>{activity.startTime}</td>
          </tr>
        </tbody>
      </table>
      <RolesDialog
        className={classes.rolesDialog}
        activity={activity}
        data={data}
      />
    </Grid>
  );
}
Activities.propTypes = {
  activity: PropTypes.object,
};
