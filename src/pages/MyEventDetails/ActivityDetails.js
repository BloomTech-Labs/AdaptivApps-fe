// React imports
import React from 'react';
// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';
import SimpleModal from '../ActivitiesList/SimpleModal';

import { useQuery } from 'react-apollo';
import { useParams } from '@reach/router';
import { GET_EVENT_ACTIVITIES } from '../ActivitiesList/queries/getActivities';
// Styling imports
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    '& td': {
      width: '14rem',
      padding: '0 1% 2% 0',
      display: 'flex',
      textAlign: 'left',
      fontSize: '1.6rem'
    },
  },
  nameLink: {
    color: '#2962FF',
    '& .MuiButton-label': {
      fontSize: '1.6rem',
      fontWeight: 500
    },
  },
});
export default function ActivityDetails({ activity }) {
  const classes = useStyles();
  const { user } = useAuth0();
  const { eventId } = useParams();
  const { data } = useQuery(GET_EVENT_ACTIVITIES, {
    variables: { id: eventId },
  });
  return (
    <tr className={classes.root}>
      <td className={classes.nameLink}>
        <SimpleModal activity={activity} data={data} />
      </td>
      <td>{activity.startDate}</td>
      <td>{activity.location}</td>
      <td>{activity.startTime}</td>
      {activity.participants.map((participant, id) =>
        participant && participant.profile.email === user.email ? (
          <td>{participant.role}</td>
        ) : null
      )}
    </tr>
  );
}

ActivityDetails.propTypes = {
  activity: PropTypes.object,
};
