import React from 'react'
import { useAuth0 } from "../../components/auth/react-auth0-spa";
import config from "../../components/auth/auth_config.json";
import PropTypes from 'prop-types';
import { Flex, Box, Text, Button, Form, Input } from "adaptiv-ui";
import { useForm } from 'react-hook-form'

function UserDashboard(props) {
  const { user } = props;
  const { loading } = useAuth0();
  // console.log(user)
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log(values);
  };

  // loading and no user will show Loading div
  if (loading || !user) {
    return <div>Loading...</div>;
  } else
    return(
      <Flex ai_start col stretch>

        <Text xlf bold mm>Account Information</Text>
        
        <Box h='0.2rem' w='90%' bg='lightgrey' />
        
        <Flex mm col ai_start>
          
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

          <Form ai_start col stretch onSubmit={handleSubmit(onSubmit)}>
            
            <Text xlf bold>
              Personal Information
            </Text>
     
            <Box h='3rem' />
     
            <Flex jc_between stretch>
     
              <Flex ai_start col>
                <Text mf>
                  First Name
                </Text>
                <Flex ai_center>
                  <Input type='text' placeholder={user.given_name} />
                </Flex>
              </Flex>

              <Flex ai_start col>
                <Text mf>
                  Last Name
                </Text>
                <Flex ai_center>
                  <Input type='text' placeholder={user.family_name} />
                </Flex>
              </Flex>

            </Flex>

            <Flex jc_between stretch>
              <Flex ai_start col>
                <Text mf>
                  Display Name
                </Text>
                <Flex ai_center>
                  <Input type='text' placeholder={user.nickname} />
                </Flex>
              </Flex>

              <Flex ai_start col>
                <Text mf>
                  Date of Birth
                </Text>
                <Flex ai_center>
                  <Input type='date' />
                </Flex>
              </Flex>
            </Flex>
            
            <Flex ai_start col stretch>
              <Text mf>
                Bio
              </Text>
              <Input type='textarea' w='50rem' h='10rem'/>
            </Flex>

            <Flex jc_between stretch>
     
              <Flex ai_start col>
                <Text mf>
                  Disability Status
                </Text>
                <Flex ai_center>
                  <Input type='select' placeholder=''/> {/* need to figure out options for select field */}
                </Flex>
              </Flex>

              <Flex ai_start col>
                <Text mf>
                  Are you over 18 years old?
                </Text>
                <Flex ai_center>
                  <Input type='select' placeholder='' /> {/* need to figure out options for select field */}
                </Flex>
              </Flex>

            </Flex>

            <Button type='submit' secondary>Submit</Button>
          </Form>

        </Flex>
        {/* <Flex drape mm mp>
        
          <code>{JSON.stringify(user, null, 2)}</code>
        </Flex> */}
      </Flex>
  )
}

export default UserDashboard;

UserDashboard.propTypes = {
  user: PropTypes.object,
};
