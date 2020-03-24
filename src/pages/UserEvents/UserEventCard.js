import React from 'react';
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
      <p>{event.location}</p>
    </Flex>
  );
}

UserEventCard.propTypes = {
  event: PropTypes.object,
};