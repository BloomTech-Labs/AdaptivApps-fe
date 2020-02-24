import React from 'react'
import { useAuth0 } from "../../components/auth/react-auth0-spa";
import config from "../../components/auth/auth_config.json";
import PropTypes from 'prop-types';
import { Flex, Box, Text } from "adaptiv-ui"

function UserDashboard(props) {
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
          <Text mf>
            Account Email
          </Text>
          <Text mf>
            {user.email}
          </Text>
          <h2>{user.name} ({user[config.roleUrl]})</h2>
        </Flex>
        <Flex col sm>
        
          <code>{JSON.stringify(user, null, 2)}</code>
        </Flex>
      </Flex>
  )
}

export default UserDashboard;

UserDashboard.propTypes = {
  user: PropTypes.object,
};
