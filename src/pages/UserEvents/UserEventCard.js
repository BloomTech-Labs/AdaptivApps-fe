//React imports
import React from 'react';
//Component imports
import { Link } from '@reach/router';
// GraphQL/Apollo imports
import { useMutation } from 'react-apollo';
import { UNREGISTER_FROM_EVENT } from './queries';
// Auth0 imports
import { useAuth0 } from '../../config/react-auth0-spa';
//Styling imports
import { Flex, Container, Button } from 'adaptiv-ui';
import PropTypes from 'prop-types';


export default function UserEventCard({ event, refetch }) {
  const [updateProfile] = useMutation(UNREGISTER_FROM_EVENT);
  // Retrieves current user info
  const { user } = useAuth0();
  // Unregisters user from specified event
  const unregisterFromEvent = () => {
    updateProfile({
      variables: { id: event.id, email: user.email }
    });
    refetch();
  };

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
      <Button secondary="true" onClick={unregisterFromEvent}>Unregister</Button>
      <Link to={`${event?.id}`}>View Details</Link>
    </Flex>
  );
}

UserEventCard.propTypes = {
  event: PropTypes.object,
};