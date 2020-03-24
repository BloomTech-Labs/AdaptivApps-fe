// React imports
import React from 'react';
// Styling imports
import {
  Flex,
} from 'adaptiv-ui';
import PropTypes from 'prop-types';
import '../ActivitiesList/styles.css';

export default function ActivityDetails({ activity }) {
  console.log(activity);
  return (
    <Flex visible ai_center>
      <tr>
        <td className="activity_title">{activity.name}</td>
        <td>{activity.startDate}</td>
        <td>{activity.location}</td>
        <td>{activity.startTime}</td>
        <td>{activity.endTime}</td>
      </tr>
    </Flex>
  );
}
ActivityDetails.propTypes = {
  activity: PropTypes.object,
};
