import React from 'react'
import { useAuth0 } from "../../components/auth/react-auth0-spa";
import config from "../../components/auth/auth_config.json";
import PropTypes from 'prop-types';
import { Flex, Box, Text, Button, Form, Input, theme, TextArea, Select } from "adaptiv-ui";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const ProfileSchema = yup.object().shape({
  email: yup.string().required(),
  given_name: yup.string(),
  family_name: yup.string(),
  nickname: yup.string(),
  dob: yup.date(),
  bio: yup.string(),
  status: yup.string(), //string?
  overEighteen: yup.bool()
})

function UserDashboard(props) {
  const { user } = props;
  const { loading } = useAuth0();
  // console.log(user)
  const { handleSubmit, register, errors } = useForm({
    validationSchema: ProfileSchema
  });
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
          {/* <Box h='5rem' /> */}
          <Flex jc_between ai_center>

            <Box sqr='5rem' >
              <img src={user.picture} alt="Profile" />
            </Box>
            <Text lf sm>{user.name} ({user[config.roleUrl]})</Text>

          </Flex>

          <Box h='2rem' />

          <Flex ai_start col>

            <Text lf bold>
              Account Email Address
            </Text>

            <Flex ai_center>
              <Text lf>
                {user.email}
              </Text>
              <Button primary jc_center mm border={`2px solid ${theme.primary}`} w='7.75rem' h='3.75rem' aria-label='Change email for this user' onClick={() => alert('functionality coming next release canvas')}>Change</Button>     
            </Flex>
     
          </Flex>

          <Form ai_start col stretch onSubmit={handleSubmit(onSubmit)}>
            
            <Text xlf bold>
              Personal Information
            </Text>
     
            <Box h='2rem' />
     
            <Flex jc_between stretch>
     
              <Flex ai_start col>
                <Text mf>
                  First Name
                </Text>
                <Flex ai_center>
                  <Input type='text' placeholder={user.given_name} w='25rem' />
                </Flex>
              </Flex>

              <Flex ai_start col>
                <Text mf>
                  Last Name
                </Text>
                <Flex ai_center>
                  <Input type='text' placeholder={user.family_name} w='25rem' />
                </Flex>
              </Flex>

            </Flex>

            <Flex jc_between stretch>
              <Flex ai_start col>
                <Text mf>
                  Display Name
                </Text>
                <Flex ai_center>
                  <Input type='text' placeholder={user.nickname} w='25rem' />
                </Flex>
              </Flex>

              <Flex ai_start col>
                <Text mf>
                  Date of Birth
                </Text>
                <Flex ai_center>
                  <Input type='date' w='25rem' />
                </Flex>
              </Flex>
            </Flex>
            
            <Flex ai_start col stretch>
              <Text mf>
                Bio
              </Text>
              <TextArea rows='8' cols='60'/>
            </Flex>

            <Flex jc_between stretch>
     
              <Flex ai_start col>
                <Text mf>
                  Disability Status {/* is there a better way to word this? */}
                </Text>
                <Flex ai_center>
                  <Input type='select' placeholder='' w='25rem'/>
                </Flex>
              </Flex>

              <Flex ai_start col>
                <Text mf>
                  Are you over 18 years old?
                </Text>
                <Flex ai_center>
                  <Select w='20rem'>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Select>
                </Flex>
              </Flex>

            </Flex>

            <Button type='submit' jc_center primary border={`2px solid ${theme.primary}`} w='10rem' h='5rem' aria-label='save changes to user profile'>Save</Button>
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
