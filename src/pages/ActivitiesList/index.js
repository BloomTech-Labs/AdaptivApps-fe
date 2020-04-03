import React from 'react';
import { useQuery } from 'react-apollo';
import Activities from './Activities';

import { useParams } from '@reach/router';
import { GET_EVENT_ACTIVITIES } from './queries/getActivities';

import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    width: '90%',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  },
  headingBox: {
    margin: '6rem 0 2rem 3rem',
    fontWeight: '400',
    borderColor: '#D3D3D3',
  },
  eventContainer: {
    display: 'flex',
    marginLeft: '3rem',
  },
  imgContainer: {
    display: 'flex',
    width: '36rem',
    height: '16rem',
  },
  eventImg: {
    width: '100%',
    objectFit: 'cover',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: '2.4rem',
  },
  date: {
    fontSize: '1.4rem',
  },
  title: {
    fontSize: '2.1rem',
    margin: '.4rem 0',
    fontWeight: '500',
    color: '#3C3C3C',
  },
  loc: {
    fontSize: '1.6rem',
  },
  activityC: {
    margin: '2.4rem 0 1.6rem 3rem',
  },
  activityH: {
    fontSize: '1.8rem',
  },
  tableH: {
    color: '#202020',
    margin: '6.3rem 0 .8rem 0',
    width: '14rem',
  },
});

export default function ActivityList() {
  const classes = useStyles();
  const { eventId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(GET_EVENT_ACTIVITIES, {
    variables: { id: eventId },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h3" gutterBottom>
          Upcoming Events
        </Typography>
      </Box>
      <Box className={classes.eventContainer}>
        <Box className={classes.imgContainer}>
          <img className={classes.eventImg} src={data && data?.event?.imgUrl} />
        </Box>
        <Box className={classes.infoContainer}>
          <Typography
            className={classes.date}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {data.event.startDate}-{data.event.endDate}
          </Typography>
          <Typography className={classes.title}>{data.event.title}</Typography>
          <Typography
            className={classes.loc}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {data.event.location}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.activityC}>
        <Typography className={classes.activityH}>
          Activities Schedule
        </Typography>
        <table>
          <tbody>
            <tr className={classes.headerRow}>
              <th className={classes.tableH}>Name</th>
              <th className={classes.tableH}>Date</th>
              <th className={classes.tableH}>Location</th>
              <th className={classes.tableH}>Time</th>
            </tr>
          </tbody>
        </table>
        {data &&
          data?.event?.activities.map((activity, id) => (
            <Activities key={id} activity={activity} />
          ))}
      </Box>
    </main>
  );
}
