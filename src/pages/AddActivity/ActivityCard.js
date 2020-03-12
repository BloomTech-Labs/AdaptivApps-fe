import React from 'react';

export default function ActivityCard(props) {
  return (
    <div>
      <p>Name: {props.activity.name}</p>
      <p>Date: {props.activity.startDate}</p>
      <p>Location: {props.activity.location}</p>
      <p>Time: {props.activity.startTime}</p>
    </div>
  );
}
