import React from 'react';
import golfimg from '../../assets/images/little-guy-golf.jpg';
import {
  Flex,
  Container,
  Button,
  Modal,
  useModal,
  Text,
  Linkton,
} from 'adaptiv-ui';
import NavLink from '../../routes/DashRouter/SideNav/NavLink';
import PropTypes from 'prop-types';

export default function EventCard({ event }) {
  const [isActive, toggle] = useModal();
  return (
    <Flex col>
      <Container bg_src={golfimg} h="10vh" w="20rem"></Container>
      <small>
        {event.startDate} - {event.endDate}
      </small>
      <h6>
        <b>{event.title}</b>
      </h6>
      <p>{event.location}</p>
      <Button primary onClick={toggle} w="20rem">
        Add to my schedule
      </Button>
      <Modal isActive={isActive} toggle={toggle}>
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
          <NavLink primary="true" autoFocus to={`${event?.id}`} onClick={console.log("Working!")}>
            Click me!
          </NavLink>
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
