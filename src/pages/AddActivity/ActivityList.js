import React from 'react';
import ActivityCard from './ActivityCard';

export default function ActivityList(props) {
  const activities = props.activities;

  return (
    <div>
      <h5>Added Activities</h5>
      <p>Here's a list of activities.</p>
      <p>Use the form on the left to add more activities.</p>

      {activities &&
        activities.map(activity => (
          <ActivityCard
            activity={activity}
            key={activity.id}
            dispatch={props.dispatch}
          />
        ))}
    </div>
  );
}
