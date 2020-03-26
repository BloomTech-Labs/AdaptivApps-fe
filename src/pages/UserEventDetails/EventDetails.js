// React imports
import React from 'react';
// Component imports
import ActivityDetails from './ActivityDetails';
// Styling import
import { Flex, Box } from 'adaptiv-ui';

export default function EventDetails(props) {
  const userID = props.userID;
  const activeEvent = props.event;
  const currentActivities = activeEvent.activities;
  const filteredActivities = [];

  const checkUserInAthletes = athletes => {
    let mark = false;
    athletes.forEach(athlete => {
      if (athlete.id === userID) {
        mark = true;
      }
    });
    return mark;
  };

  const checkUserInCoaches = coaches => {
    let mark = false;
    coaches.forEach(coach => {
      if (coach.id === userID) {
        mark = true;
      }
    });
    return mark;
  };

  const checkUserInVolunteers = volunteers => {
    let mark = false;
    volunteers.forEach(volunteer => {
      if (volunteer.id === userID) {
        mark = true;
      }
    });
    return mark;
  };

  const checkUserInOthers = others => {
    let mark = false;
    others.forEach(other => {
      if (other.id === userID) {
        mark = true;
      }
    });
    return mark;
  };

  const checkRoles = activities =>
    activities &&
    activities.forEach(activity => {
      if (activity?.athletes && activity?.athletes.length > 0) {
        if (checkUserInAthletes(activity.athletes)) {
          const updated = activity;
          updated.message = 'Participating';
          filteredActivities.push(updated);
        }
      }
      if (activity?.coaches && activity?.coaches.length > 0) {
        if (checkUserInCoaches(activity.coaches)) {
          const updated = activity;
          updated.message = 'Coaching';
          filteredActivities.push(activity);
        }
      }
      if (activity?.volunteers && activity?.volunteers.length > 0) {
        if (checkUserInVolunteers(activity.volunteers)) {
          const updated = activity;
          updated.message = 'Volunteering';
          filteredActivities.push(activity);
        }
      }
      if (activity?.other && activity?.other.length > 0) {
        if (checkUserInOthers(activity.other)) {
          const updated = activity;
          updated.message = 'Watching';
          filteredActivities.push(activity);
        }
      }
    });

  checkRoles(currentActivities);
  console.log(
    'Drinking butter beer and eating chocolate frogs',
    filteredActivities,
    userID
  );

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
