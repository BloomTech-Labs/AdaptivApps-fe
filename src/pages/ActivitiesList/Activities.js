import React from 'react';

export default function Activities({ activity }) {
  console.log('in activity component', activity);
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
          </tr>
        </tbody>
      </table>
    </div>
  );
}
