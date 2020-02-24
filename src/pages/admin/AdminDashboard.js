<<<<<<< HEAD
import React from 'react'
import config from "../../components/auth/auth_config.json";
import { useAuth0 } from "../../components/auth/react-auth0-spa";
import { Flex, Box } from "adaptiv-ui"

function AdminDashboard(props) {
  const { user } = props;
  const { loading } = useAuth0();
  // console.log(user)

  // loading and no user will show Loading div
  if (loading || !user) {
    return <div>Loading...</div>;
  } else
    return(
      <Flex ai_start col>
        <h2>Account Information</h2>
        <Box ms h='0.2rem' w='90%' bg='lightgrey' />
        <Flex ai_center>
        <Box sqr='5rem' >
          <img src={user.picture} alt="Profile" />
        </Box>
        <h2>{user.name} ({user[config.roleUrl]})</h2>
        </Flex>
        <p>{user.email}</p>
      
        <code>{JSON.stringify(user, null, 2)}</code>
      </Flex>
  )
=======
import React from 'react';
import config from '../../components/auth/auth_config.json';
import { Box } from 'adaptiv-ui';
import PropTypes from 'prop-types';

function AdminDashboard({ user }) {
  return (
    <div>
      <Box w="10rem">
        <img src={user.picture} alt="Profile" />
      </Box>
      <h1>This is ADMIN PAGE</h1>
      <h2>{user.name}</h2>
      <h3>{user[config.roleUrl]}</h3>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </div>
  );
>>>>>>> 21c690016f4a300dd1e8166c0bdf4c6f734def0b
}

export default AdminDashboard;

AdminDashboard.propTypes = {
  user: PropTypes.object,
};
