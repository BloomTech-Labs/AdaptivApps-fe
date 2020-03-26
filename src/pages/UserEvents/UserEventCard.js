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

  console.log(event);

  return (
    <Flex  col style={{margin: "1.2rem"}}>
      <Flex col style={{margin: "0rem 0.4rem 0rem 0.4rem"}}>
      <Container  bg_src={event.imgUrl} h="20vh" w="30rem" style={{ borderRadius: "0.3rem"}} ></Container>
      <p style={{fontSize: "1.4rem", margin: "1.6rem 0rem 0rem 0rem", color: "#808080"}} >
        {event.startDate} - {event.endDate}
      </p>
      <h6 style={{margin: "0.4rem 0rem 0rem", fontSize: "2.1rem"}}>{event.title}</h6>
      <p style={{color: "#808080", margin: "0.4rem 0rem 0rem"}}>{event.location}</p>
      </Flex>
      <Flex jc_between row style={{marginTop: "1.6rem"}}>
        <Link to={`${event?.id}`} style={{color: "#2962ff", fontSize: "1.4rem", margin: "0.4rem"}}>VIEW DETAILS</Link>
        <button onClick={unregisterFromEvent} style={{padding: "0", color: "#2962ff", fontSize: "1.4rem", border: "none", margin: "0.4rem"}}>UNREGISTER</button>
      </Flex>
    </Flex>
  );
}

UserEventCard.propTypes = {
  event: PropTypes.object,
};