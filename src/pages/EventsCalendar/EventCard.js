import React from 'react';
import { useNavigate } from '@reach/router';
import { useAuth0 } from '../../config/react-auth0-spa';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
} from '@material-ui/core';

import { useMutation } from 'react-apollo';
import { REGISTER_EVENT } from './queries/joinEvent';

const useStyles = makeStyles({
  root: {
    maxwidth: '100%',
    width: '90%',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  },
  headingBox: {
    margin: '6rem 0 2rem 3rem',
    fontWeight: '400',
    borderColor: '#D3D3D3',
  },
  grid: {
    marginLeft: '3rem',
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

  // const [isActive, toggle] = useModal();
  // console.log('image url', event);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to my schedule
        </Button>
      </CardActions>
    </Card>
    // <Modal isActive={isActive} align>
    //   <Container bg_src={event.imgUrl} h="20vh" w="110%"></Container>
    //   <Flex w="40rem" h="40rem" drape align="start">
    //     <small>
    //       {event.startDate} - {event.endDate}
    //     </small>
    //     <h6 style={{ textAlign: 'left', margin: '0' }}>
    //       <b>{event.title}</b>
    //     </h6>
    //     <p style={{ margin: '0' }}>{event.location}</p>
    //     <Text m="2rem 0 2rem 0">{event.details}</Text>
    //     <Flex col style={{ alignSelf: 'flex-end' }} jc_end>
    //       <Text style={{ fontSize: '2rem', color: '#2763FF' }}>
    //         {' '}
    //         Add to "My Events?"
    //       </Text>
    //       <Flex>
    //         <Button autoFocus primary="true" onClick={registerEvent}>
    //           Join Event!
    //         </Button>
    //         <Button secondary onClick={toggle}>
    //           Close
    //         </Button>
    //       </Flex>
    //     </Flex>
    //   </Flex>
    // </Modal>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
