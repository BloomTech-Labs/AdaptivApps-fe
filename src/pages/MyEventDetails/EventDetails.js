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
    paddingLeft: '0.3rem',
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
      marginTop: '3rem',
    },
    '& tr': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '0.2rem',
    },
    '& th': {
      width: '20rem',
      padding: '1% 1% 2% 0',
      textAlign: 'left',
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
  headerRow: {
    textAlign: 'left',
    fontSize: '1.8rem',
  },
  tableH: {
    color: '#202020',
    margin: '1rem 0 0 0',
    width: '20rem',
  },
});

export default function EventDetails(props) {
  const classes = useStyles();
  const activeEvent = props.event;
  const currentActivities = activeEvent.activities;

  console.log('currentActivity in event details', currentActivities);
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
            <a href={activeEvent.link}>Click Here to Join Us!</a>
          </Box>
          <Box className={classes.myActivitiesBox}>
            <p>Activities</p>
            <table className={classes.table}>
              <tbody>
                <tr className={classes.headerRow}>
                  <th className={classes.tableH}>Name</th>
                  <th className={classes.tableH}>Date</th>
                  <th className={classes.tableH}>Link</th>
                  <th className={classes.tableH}>Time</th>
                  <th className={classes.tableH}>My Role</th>
                </tr>
                {currentActivities &&
                  currentActivities.map((activity, id) => (
                    <ActivityDetails
                      key={id}
                      activeEvent={activeEvent}
                      activity={activity}
                    />
                  ))}
              </tbody>
            </table>
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
          <Box className={classes.myActivitiesBox}>
            <p>Activities</p>
            <table className={classes.table}>
              <tbody>
                <tr className={classes.headerRow}>
                  <th className={classes.tableH}>Name</th>
                  <th className={classes.tableH}>Date</th>
                  <th className={classes.tableH}>Location</th>
                  <th className={classes.tableH}>Time</th>
                  <th className={classes.tableH}>My Role</th>
                </tr>
                {currentActivities &&
                  currentActivities.map((activity, id) => (
                    <ActivityDetails
                      key={id}
                      activeEvent={activeEvent}
                      activity={activity}
                    />
                  ))}
              </tbody>
            </table>
          </Box>
          <Box className={classes.sponsorBox}>
            {activeEvent?.sponsors?.length > 0 ? (
              <p>Special thanks to our sponsors!</p>
            ) : null}
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
