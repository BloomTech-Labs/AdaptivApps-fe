import React from 'react';
import {
  Flex,
} from 'adaptiv-ui';
import RolesToolTip from "./RolesToolTip"
import PropTypes from 'prop-types';
import './styles.css';

export default function Activities({ activity }) {
  return (
    <Flex visible ai_center>
        <table>
          <tbody>
            <tr>
              <td>{activity.name}</td>
              <td>{activity.startDate}</td>
              <td>{activity.location}</td>
              <td>{activity.startTime}</td>
            </tr>
          </tbody>
        </table>
     <RolesToolTip activity={activity} />
    </Flex>
  );
}
Activities.propTypes = {
  activity: PropTypes.object,
};
