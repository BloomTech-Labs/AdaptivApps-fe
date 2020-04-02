import React from 'react';
import { useNavigate } from '@reach/router';
import { useAuth0 } from '../../config/react-auth0-spa';
import PropTypes from 'prop-types';
import SimpleModal from './SimpleModal';

import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';

import { useMutation } from 'react-apollo';
import { REGISTER_EVENT } from './queries/joinEvent';

const useStyles = makeStyles({
  root: {
    borderRadius: '.5rem',
    margin: '1.5rem',
    boxShadow: 'none',
  },
  cardDate: {
    fontSize: '1.4rem',
  },
  cardTitle: {
    fontSize: '2.1rem',
    margin: '.5rem 0',
    fontWeight: 'bold',
  },
  cardLoc: {
    fontSize: '1.6rem',
  },
  content: {
    padding: '1.5rem 0 0 0',
  },
  btnContainer: {
    padding: '0',
    marginTop: '1rem',
  },
  btn: {
    padding: '0',
    fontSize: '1.6rem',
    fontWeight: '600',
    textTransform: 'none',
  },
  cardImg: {
    maxWidth: '36rem',
    maxHeight: '16rem',
  },
});

export default function EventCard({ event }) {
  const classes = useStyles();
  const [updateEvent] = useMutation(REGISTER_EVENT);

  const { user } = useAuth0();
  const navigate = useNavigate();

  const registerEvent = async () => {
    await updateEvent({
      variables: { id: event.id, email: user.email },
    });
    await navigate(`/calendar/${event.id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.card}>
        <CardMedia
          className={classes.cardImg}
          component="img"
          alt="Event"
          width="15rem"
          image={event?.imgUrl}
          title="Angel City Event"
        />
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
        <SimpleModal event={event} />
      </CardActions>
    </Card>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
