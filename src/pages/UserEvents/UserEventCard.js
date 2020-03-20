//React imports
import React from 'react';
//Component imports
import { Link } from '@reach/router';
//Styling imports
import { Flex, Container } from 'adaptiv-ui';
import PropTypes from 'prop-types';

export default function UserEventCard({ event }) {
  return (
    <Flex col>
      <Container bg_src={event.imgUrl} h="10vh" w="20rem"></Container>
      <small>
        {event.startDate} - {event.endDate}
      </small>
      <h6>
        <b>{event.title}</b>
      </h6>
      <p>location</p>
      <Link to='calendar'>View Details</Link>
    </Flex>
  );
}

UserEventCard.propTypes = {
  event: PropTypes.object,
};