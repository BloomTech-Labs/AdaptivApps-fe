import React from 'react';
import {ToolTip, Box, Text} from "adaptiv-ui"

export default function Activities({ activity }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{activity.name}</td>
            <td>{activity.startDate}</td>
            <td>{activity.location}</td>
            <td>{activity.startTime}</td>
            <td>
              <ToolTip tt_left="105%" tabIndex={0} tt_w="12rem">
                <Box bg={"#2962FF"} circle p=".8rem">
                  <Text ai="center" fontSize="10rem" p="2%" color="white">+</Text>
                  </Box>
                  <Text>
                    Im Competing
                    Im Coaching
                    Im Volunteering
                    Im Spectating
                  </Text>
              </ToolTip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
