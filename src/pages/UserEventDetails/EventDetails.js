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
  console.log('event deets', props.event.type);

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

  return (
    <Flex ai_start col stretch visible style={{ margin: '2.2rem 1.2rem' }}>
      <Flex m="0rem 0.4rem 0rem 0.4rem">
        <img
          style={{ height: '16rem', width: '36rem', objectFit: 'cover' }}
          src={activeEvent.imgUrl}
        />
        
          {activeEvent.type === 'Webinar' ? (
            <Flex col jc_center m="2.4rem">
            <p
            style={{
              margin: '0.4rem 0rem',
              color: '#808080',
              fontSize: '1.4rem',
            }}
          >
            {activeEvent.startDate} 
          </p>
          <p style={{ margin: '0rem', fontWeight: 'bold', fontSize: '2.1rem' }}>
            {activeEvent.title}
          </p>
          <p
            style={{
              margin: '0.4rem 0rem',
              color: '#808080',
              fontSize: '1.4rem',
            }}
          >
            {activeEvent.location}
          </p>
          </Flex>
          ): <Flex col jc_center m="2.4rem">
            <p
          style={{
            margin: '0.4rem 0rem',
            color: '#808080',
            fontSize: '1.4rem',
          }}
        >
          {activeEvent.startDate} - {activeEvent.endDate}
        </p>
        <p style={{ margin: '0rem', fontWeight: 'bold', fontSize: '2.1rem' }}>
          {activeEvent.title}
        </p>
        <p
          style={{
            margin: '0.4rem 0rem',
            color: '#808080',
            fontSize: '1.4rem',
          }}
        >
          {activeEvent.location}
        </p>
        </Flex>}
      </Flex>
      <Flex>
        <p style={{ marginBottom: '2rem', marginTop: '1.6rem' }}>
          {activeEvent.details}
        </p>
      </Flex>

      {activeEvent.type === 'Webinar' ? (
        <a style={{ marginLeft: "0.5rem", color: "#2862ff"}} href={activeEvent.zoomLink}>Join Us on Zoom!</a>
      ): <Flex visible col h="30rem" stretch>
      <p
        style={{
          fontWeight: 'bold',
          fontSize: '1.8rem',
          marginBottom: '2rem',
        }}
      >
        My Activities
      </p>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Time</th>
            <th>My Role</th>
          </tr>
          {filteredActivities &&
            filteredActivities.map((activity, id) => (
              <ActivityDetails key={id} activity={activity} />
            ))}
        </tbody>
      </table>
    </Flex>}
    </Flex>
  );
}
