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
      <Flex ai_start col stretch>

        <Text xlf bold mm>Account Information</Text>
        
        <Box h='0.2rem' w='90%' bg='lightgrey' />
        
        <Flex mm col ai_start>
          {/* <Box h='5rem' /> */}
          <Flex jc_between ai_center>

            <Box sqr='5rem' >
              <img src={user.picture} alt="Profile" />
            </Box>
            <Text lf sm>{user.name} ({user[config.roleUrl]})</Text>

          </Flex>

          <Box h='3rem' />

          <Flex ai_start col>

            <Text lf bold>
              Account Email Address
            </Text>

            <Flex ai_center>
              <Text lf>
                {user.email}
              </Text>
              <Button primary mm>Change</Button>     
            </Flex>
     
          </Flex>

          <Flex ai_start col stretch>
            
            <Text xlf bold>
              Personal Information
            </Text>
     
            <Box h='3rem' />
     
            <Flex jc_between stretch>
     
              <Flex ai_start col>
                <Text lf>
                  First Name
                </Text>
                <Flex ai_center>
                  <Text lf border='1px solid grey' radius>
                    {user.given_name}
                  </Text>
                </Flex>
              </Flex>

              <Flex ai_start col>
                <Text lf>
                  Last Name
                </Text>
                <Flex ai_center>
                  <Text lf border='1px solid grey' radius>
                    {user.family_name}
                  </Text>
                </Flex>
              </Flex>

            </Flex>

            <Box h='3rem' />

            <Flex jc_between stretch>
              <Flex ai_start col>
                <Text lf>
                  Display Name
                </Text>
                <Flex ai_center>
                  <Text lf border='1px solid grey' radius>
                    {user.nickname}
                  </Text>
                </Flex>
              </Flex>

              <Flex ai_start col>
                <Text lf>
                  Date of Birth
                </Text>
                <Flex ai_center>
                  <Text lf border='1px solid grey' radius>
                    01/01/2000
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            <Box h='3rem' />
            
            <Flex ai_start col>
              <Text lf>
                Bio
              </Text>
              <Form>
                Form
              </Form>
            </Flex>
          </Flex>

        </Flex>
        <Flex drape mm mp>
        
          <code>{JSON.stringify(user, null, 2)}</code>
        </Flex>
      </Flex>
  )
}

export default AdminDashboard;

AdminDashboard.propTypes = {
  user: PropTypes.object,
};
