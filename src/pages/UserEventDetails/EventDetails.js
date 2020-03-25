// React imports
import React from 'react';
// Component imports
import ActivityDetails from './ActivityDetails';
// Styling import
import { Flex, Box } from 'adaptiv-ui';

export default function EventDetails(props) {
  const activeEvent = props.event[0];
  const currentActivities = activeEvent.activities;
  const filteredActivities = [];
  const checkRoles = activities =>
    activities &&
    activities.forEach(activity => {
      if (activity.athletes.length > 0) {
        const updated = activity;
        updated.message = 'Participating';
        filteredActivities.push(updated);
      }
      if (activity.coaches.length > 0) {
        const updated = activity;
        updated.message = 'Coaching';
        filteredActivities.push(activity);
      }
      if (activity.volunteers.length > 0) {
        const updated = activity;
        updated.message = 'Volunteering';
        filteredActivities.push(activity);
      }
      if (activity.other.length > 0) {
        const updated = activity;
        updated.message = 'Other';
        filteredActivities.push(activity);
      }
    });

  checkRoles(currentActivities);
  console.log('Watermelon Boba tea', filteredActivities);

  return (
    <Flex ai_start col stretch visible>
      <Flex m="3rem 0">
        <img
          style={{ height: '15rem', width: '40rem', objectFit: 'cover' }}
          src={activeEvent?.imgUrl}
        />
        <Box m="auto 0">
          <small
            style={{ margin: '1rem', color: '#808080', fontSize: '1.5rem' }}
          >
            {activeEvent?.startDate}-{activeEvent?.endDate}
          </small>
          <br />
          <p style={{ margin: '1rem', fontWeight: 'bold', fontSize: '2.1rem' }}>
            {activeEvent.title}
          </p>
          <p style={{ margin: '1rem', color: '#808080', fontSize: '1.5rem' }}>
            {activeEvent.location}
          </p>
        </Box>
      </Flex>
      <Flex>
        <p style={{ marginBottom: '2rem' }}>{activeEvent.details}</p>
      </Flex>
      <Flex visible col h="30rem" stretch>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '1.8rem',
            marginBottom: '2rem',
          }}
        >
          My Activities
        </p>
        {filteredActivities &&
          filteredActivities.map((activity, id) => (
            <ActivityDetails key={id} activity={activity} />
          ))}
      </Flex>
    </Flex>
  );
}
