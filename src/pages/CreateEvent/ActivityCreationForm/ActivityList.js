import React from 'react';
import ActivityCard from './ActivityCard';
import { useQuery } from 'react-apollo';
import { GET_ACTIVITIES } from '../queries/ActivitiesQuery';

export default function ActivityList(props) {
  const event_id = props.event_id;
  const { loading, data } = useQuery(GET_ACTIVITIES, {
    variables: {
      id: event_id,
    },
  });
  if (loading) return <p>Loading ...</p>;
  console.log('the event associated activities are', event_id);
  return (
    <div>
      <h5>Added Activities</h5>
      <p>Here's a list of activities.</p>
      <p>Use the form on the left to add more activities.</p>
    </div>
  );
}
