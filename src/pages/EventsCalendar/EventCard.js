import React from 'react';
import golfimg from '../../assets/images/little-guy-golf.jpg';
import { Flex, Container } from 'adaptiv-ui';
import PropTypes from 'prop-types';

export default function EventCard({ event }) {
  return (
    <Flex col>
      <Container bg_src={golfimg} h="10vh" w="20rem"></Container>
      <small>
        {event.startDate} - {event.endDate}
      </small>
      <h6>
        <b>{event.title}</b>
      </h6>
      <p>location</p>
    </Flex>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
