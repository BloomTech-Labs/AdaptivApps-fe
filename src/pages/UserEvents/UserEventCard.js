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
import { Flex, Container, Button, Box } from 'adaptiv-ui';
import PropTypes from 'prop-types';


export default function UserEventCard({ event, refetch }) {
  const [updateProfile] = useMutation(UNREGISTER_FROM_EVENT);
  // Retrieves current user info
  const { user } = useAuth0();
  // Unregisters user from specified event
  const unregisterFromEvent = async () => {
    await updateProfile({
      variables: { id: event.id, email: user.email }
    });
    await refetch();
  };

  return (
    <Flex col>
      <Container bg_src={event.imgUrl} h="20vh" w="30rem" ></Container>
      <p style={{fontSize: "1.4rem", marginTop: "2rem"}} >
        {event.startDate} - {event.endDate}
      </p>
      <h6 >
        <b>{event.title}</b>
      </h6>
      <p >location</p>
      <Flex jc_between row>
        <Link to={`${event?.id}`} style={{color: "#2962ff", fontSize: "1.4rem"}}>VIEW DETAILS</Link>
        <button onClick={unregisterFromEvent} style={{padding: "0", color: "#2962ff", fontSize: "1.4rem"}}>UNREGISTER</button>
      </Flex>
    </Flex>
  );
}

UserEventCard.propTypes = {
  event: PropTypes.object,
};