import React from 'react'
import config from "../../components/auth/auth_config.json";
import { useAuth0 } from "../../components/auth/react-auth0-spa";
import PropTypes from 'prop-types';
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
        <Flex ai_center sm>
          <Box sqr='5rem' >
            <img src={user.picture} alt="Profile" />
          </Box>
          <h2>{user.name} ({user[config.roleUrl]})</h2>
        </Flex>
        <Flex col sm>
          <p>{user.email}</p>
        
          <code>{JSON.stringify(user, null, 2)}</code>
        </Flex>
      </Flex>
  )
}

export default AdminDashboard;

AdminDashboard.propTypes = {
  user: PropTypes.object,
};
