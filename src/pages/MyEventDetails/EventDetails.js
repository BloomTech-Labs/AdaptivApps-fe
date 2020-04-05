// React imports
import React from 'react';
// Component imports
import ActivityDetails from './ActivityDetails';
// Styling import
import { Box, makeStyles } from '@material-ui/core';

// Applies Material-UI styling
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& img': {
      height: '16rem',
      width: '36rem',
      objectFit: 'cover',
     },
   },
   topContentContainer: {
     display: 'flex',
     flexDirection: 'row',
     paddingLeft: '0.3rem'
   },
   topContentText: {
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
     '& p': {
      margin: '0rem 0 0.5rem',
      color: '#808080',
      fontSize: '1.4rem',
    },
    '& h6': {
      fontWeight: 'bold',
      fontSize: '2.1rem',
      margin: '0rem 0 0.5rem',
    },
  },
  detailsContainer: {
    marginBottom: '2rem',
    marginTop: '1.6rem',
  },
  myActivitiesBox: {
    '& p': {
      fontWeight: 'bold',
      fontSize: '1.8rem',
      marginBottom: '2rem',
     
    },
    '& tr': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '0.2rem'
    },
    '& th': {
      width: '14rem',
      padding: '1% 1% 2% 0',
      textAlign: 'left'
    },
   },
   sponsorBox: {
    fontSize: '2rem',
    fontWeight: 'bold',
    width: '90%',
    margin: '5rem 0rem 0rem 0rem',
    '& li': {
      fontSize: '1.6rem',
    },
   },
   sponsorBox2: {
    fontSize: '2rem',
    fontWeight: 'bold',
    width: '90%',
    margin: '8rem 0rem 0rem 0rem',
    '& li': {
      fontSize: '1.6rem',
    },
  },
  webinarBox: {
    display: 'flex',
    flexDirection: 'column',
    '& p': {
      margin: '0 0.5rem',
    },
    '& a': {
      marginTop: '2rem',
      marginLeft: '0.5rem',
      color: '#2862ff',
    },
  },
});

export default function EventDetails(props) {
  const classes = useStyles();
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

  return (
    <Box className={classes.root} m={4}>
      <Box className={classes.topContentContainer}>
        <Box>
          <img src={activeEvent.imgUrl} alt="Event" />
        </Box>
        {activeEvent.type === 'Webinar' ? (
          <Box className={classes.topContentText} m="2.4rem">
            <p>{activeEvent.startDate}</p>
            <h6>{activeEvent.title}</h6>
            <p>{activeEvent.location}</p>
            <p>Start time: {activeEvent.startTime}</p>
          </Box>
        ) : (
          <Box className={classes.topContentText} m="2.4rem">
            <p>
              {activeEvent.startDate} - {activeEvent.endDate}
            </p>
            <h6>{activeEvent.title}</h6>
            <p>{activeEvent.location}</p>
          </Box>
        )}
      </Box>
      <Box className={classes.detailsContainer}>
        <p>{activeEvent.details}</p>
      </Box>

      {activeEvent.type === 'Webinar' ? (
        <>
          <Box className={classes.webinarBox}>
            <p>Hosted by: {activeEvent.host}</p>
            <p>Special Guest Speaker(s): {activeEvent.speakers}</p>
            <a href={activeEvent.zoomLink}>Click Here to Join Us on Zoom!</a>
          </Box>
          <Box className={classes.sponsorBox2}>
            <p>Special thanks to our sponsors!</p>
            <ul>
              {activeEvent.sponsors.split(', ').map(sponsor => (
                <li>{sponsor}</li>
              ))}
            </ul>
          </Box>
        </>
      ) : (
        <>
          <Box h="30rem" className={classes.myActivitiesBox}>
            <p>My Activities</p>
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
          </Box>
          <Box className={classes.sponsorBox}>
            <p>Special thanks to our sponsors!</p>
            <ul>
              {activeEvent?.sponsors?.split(', ').map(sponsor => (
                <li>{sponsor}</li>
              ))}
            </ul>
          </Box>
        </>
      )}
    </Box>
  );
}