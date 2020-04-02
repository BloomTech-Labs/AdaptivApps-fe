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
import { blue } from '@material-ui/core/colors';

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
    <Flex col style={{ margin: '2.2rem 1.2rem' }}>
      <div style={{ margin: '0rem 0.4rem 0rem 0.4rem' }}>
        <div style={{ borderRadius: '0.3rem' }}>
          <div
            style={{
              width: '10rem',
              position: 'relative',
              transform: 'rotate(-45deg)',
              top: '60px',
              right: '120px',
              color: '#eecc1a',
              borderBottom: '10rem',
              borderLeft: '12.75rem solid transparent',
              borderRight: '12.75rem solid transparent',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            {event.type}
          </div>
          <img
            style={{ height: '20vh', width: '30rem', objectFit: 'cover' }}
            src={event.imgUrl}
          />
        </div>

        <small
          style={{
            fontSize: '1.4rem',
            margin: '1.6rem 0rem 0rem 0rem',
            color: '#808080',
          }}
        >
          {event.startDate} - {event.endDate}
        </small>
        <h6 style={{ margin: '0.4rem 0rem 0rem', fontSize: '2.1rem' }}>
          <b>{event.title}</b>
        </h6>
        <p style={{ color: '#808080', margin: '0.4rem 0rem 0rem' }}>
          {event.location}
        </p>
        <button
          primary
          onClick={toggle}
          w="20rem"
          style={{
            marginLeft: '0rem',
            padding: '1rem 0',
            textAlign: 'left',
            background: 'transparent',
            border: 'none',
            color: '#2763FF',
          }}
        >
          Add to my schedule
        </button>
        <Modal isActive={isActive} align>
          <Container bg_src={event.imgUrl} h="20vh" w="110%"></Container>
          <Flex w="40rem" h="40rem" drape align="start">
            <small>
              {event.startDate} - {event.endDate}
            </small>
            <h6 style={{ textAlign: 'left', margin: '0' }}>
              <b>{event.title}</b>
            </h6>
            <p style={{ margin: '0' }}>{event.location}</p>
            <Text m="2rem 0 2rem 0">{event.details}</Text>
            <Flex col style={{ alignSelf: 'flex-end' }} jc_end>
              <Text style={{ fontSize: '2rem', color: '#2763FF' }}>
                {' '}
                Add to "My Events?"
              </Text>
              <Flex>
                <Button autoFocus primary="true" onClick={registerEvent}>
                  Join Event!
                </Button>
                <Button secondary onClick={toggle}>
                  Close
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Modal>
      </div>
    </Flex>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
