// React imports
import React from 'react';
// Reach Router imports
import { Link, useNavigate } from '@reach/router';
// GraphQL/Apollo imports
import { useMutation } from 'react-apollo';
import { REGISTER_EVENT } from './queries/joinEvent';
// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';
// Styling imports
import { Flex, Container, Button, Modal, useModal, Text } from 'adaptiv-ui';
import PropTypes from 'prop-types';

export default function EventCard({ event }) {
  const [updateEvent] = useMutation(REGISTER_EVENT);

  const { user } = useAuth0();
  const navigate = useNavigate();

  const registerEvent = async () => {
    await updateEvent({
      variables: { id: event.id, email: user.email },
    });
    await navigate(`/calendar/${event.id}`);
  };

  const [isActive, toggle] = useModal();
  console.log('image url', event);
  return (
    <Flex col>
      <Container
        bg_src={event.imgUrl}
        h="20vh"
        w="30rem"
        m="3rem 0 1rem "
      ></Container>
      <small style={{ marginLeft: '3rem' }}>
        {event.startDate} - {event.endDate}
      </small>
      <h6 style={{ marginLeft: '3rem' }}>
        <b>{event.title}</b>
      </h6>
      <p style={{ marginLeft: '3rem', maxWidth: '40rem' }}>{event.location}</p>
      <Button primary onClick={toggle} w="20rem">
        Add to my schedule
      </Button>
      <Modal isActive={isActive}>
        <Flex w="40rem" h="40rem" drape>
          <small>
            {event.startDate} - {event.endDate}
          </small>
          <h6>
            <b>{event.title}</b>
          </h6>
          <p>{event.location}</p>
          <Text>
            Join us in June 2020 for the 6th annual Angel City Games, presented
            by The Hartford, the largest Paralympic-style adaptive sports event
            in the Western US! We’ve added more sports to the schedule this year
            and anticipate hosting our largest event ever - Don’t miss it!
          </Text>
          <Text> Add to "My Events?"</Text>
          <Button autoFocus primary="true" onClick={registerEvent}>
            Join Event!
          </Button>
          <Button secondary onClick={toggle}>
            Close
          </Button>
        </Flex>
      </Modal>
    </Flex>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
