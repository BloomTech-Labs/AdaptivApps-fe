// React imports
import React from 'react';
// Styling imports
import PropTypes from 'prop-types';
import '../ActivitiesList/styles.css';

export default function ActivityDetails({ activity }) {
  
  return (
    <tr>
      <td className="activity_title">{activity.name}</td>
      <td>{activity.startDate}</td>
      <td>{activity.location}</td>
      <td>{activity.startTime}</td>
      <td>{activity.endTime}</td>
    </tr>
  );
}
ActivityDetails.propTypes = {
  activity: PropTypes.object,
};
