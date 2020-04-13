//React imports
import React from 'react';
//Component imports
import { useNavigate } from '@reach/router';
// GraphQL/Apollo imports
import { useMutation } from 'react-apollo';
import { UNREGISTER_FROM_EVENT } from './queries';
// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';
//Styling imports
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
// TODO: propTypes for refetch? import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '.5rem',
    marginRight: '2.4rem',
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },
  cardDate: {
    fontSize: '1.4rem',
  },
  cardTitle: {
    fontSize: '2.1rem',
    margin: '.4rem 0',
    fontWeight: '500',
    color: '#3C3C3C',
  },
  cardLoc: {
    fontSize: '1.6rem',
  },
  content: {
    padding: '1.5rem 0 0 0',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0',
    margin: '1.6rem 0',
  },
  btn: {
    padding: '0',
    fontWeight: '400',
    textTransform: 'none',
    color: '#2962FF',
    '& .MuiButton-label': {
      fontSize: '1.6rem'
    }
  },
  cardImg: {
    maxWidth: '36rem',
    maxHeight: '16rem',
  },
  banner: {
    position: 'relative',
    transform: 'rotate(-45deg)',
    top: '4.9rem',
    right: '3rem',
    borderBottom: '2.5rem solid #555',
    borderLeft: '2.5rem solid transparent',
    borderRight: '2.5rem solid transparent',
    height: '0',
    color: '#EECC1B',
    width: '12.75rem',
    textAlign: 'center',
    fontSize: '1.4rem'
  },
}));

export default function MyEventCard({ event, refetch }) {
  const classes = useStyles();
  const navigate = useNavigate();
  // Retrieves current user info from Auth0
  const { user } = useAuth0();
  const [updateProfile] = useMutation(UNREGISTER_FROM_EVENT);

  // Unregisters user from specified event
  const unregisterFromEvent = async () => {
    await updateProfile({
      variables: { id: event.id, email: user.email },
    });
    await refetch();
  };
  const viewEventDetails = async () => {
    await navigate(`/myevents/${event?.id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.card}>
        <Box>
          <div className={classes.banner}>{event.type}</div>
          <CardMedia
            className={classes.cardImg}
            component="img"
            alt="Event"
            width="15rem"
            image={event?.imgUrl}
            title="Angel City Event"
          />
        </Box>
        <CardContent className={classes.content}>
          <Typography
            className={classes.cardDate}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {event.startDate} - {event.endDate}
          </Typography>
          <Typography
            className={classes.cardTitle}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {event.title}
          </Typography>
          <Typography
            className={classes.cardLoc}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {event.location}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.btnContainer}>
        <Button onClick={viewEventDetails} className={classes.btn}>
          View Details
        </Button>
        <Button className={classes.btn} onClick={unregisterFromEvent}>
          Unregister
        </Button>
      </CardActions>
    </Card>
  );
}
