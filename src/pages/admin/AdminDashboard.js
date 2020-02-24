import React from 'react'
import config from "../../components/auth/auth_config.json";
import { useAuth0 } from "../../components/auth/react-auth0-spa";
import PropTypes from 'prop-types';
import { Flex, Box, Text, Button, Form } from "adaptiv-ui"

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
        
        <Flex col ai_center mm>
          
          <Flex ai_center>
            <Box sqr='5rem' >
              <img src={user.picture} alt="Profile" />
            </Box>
            <h2>{user.name} ({user[config.roleUrl]})</h2>
          </Flex>

          <Flex col ai_start sm>
            <Text xlf bold>
              Account Email Address
            </Text>

            <Flex jc_between ai_center>
              <Text lf>
                {user.email}
              </Text>
              <Button primary mm>Change</Button>
            </Flex>
          </Flex>

          <Flex col ai_start sm>
            <Text xlf bold>
              Personal Information
            </Text>
          </Flex>
          <Flex jc_between ai_start>
            <Flex drape>
              <Text lf lm>
                First Name
              </Text>
              <Text mf>
                {user.given_name}
              </Text>
            </Flex>

            <Flex drape>
              <Text lf lm>
                Last Name
              </Text>
              <Text mf>
                {user.family_name}
              </Text>
            </Flex>
          </Flex>

        </Flex>
        <Flex col sm>
        
          <code>{JSON.stringify(user, null, 2)}</code>
        </Flex>
      </Flex>
  )
}

export default AdminDashboard;

AdminDashboard.propTypes = {
  user: PropTypes.object,
};
