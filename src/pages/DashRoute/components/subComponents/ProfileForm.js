import React, { useState } from 'react';
import config from '../../../../components/auth/auth_config';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  Text,
  Button,
  Form,
  Input,
  theme,
  TextArea,
  Select,
} from 'adaptiv-ui';
import PropTypes from 'prop-types';

// This is the form being used in UserDashboard
const ProfileForm = ({ profile, user, updateProfile }) => {
  const [updated, setUpdated] = useState(false)

  const { handleSubmit, register } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: user?.email,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      displayName: profile?.displayName,
      birthday: profile?.birthday,
      bio: profile?.bio,
      disability: profile?.disability
    },
  });

  const onSubmit = (formValues, e) => {
    e.preventDefault()
    updateProfile({
      variables: {
        email: user.email,
        firstName: formValues.firstName === '' ? profile.firstName : formValues.firstName,
        lastName: formValues.lastName === '' ? profile.lastName : formValues.lastName,
        displayName: formValues.displayName === '' ? profile.displayName : formValues.displayName,
        birthday: formValues.birthday === '' ? profile.birthday : formValues.birthday,
        bio: formValues.bio === '' ? profile.bio : formValues.bio,
        disability: formValues.disability === '' ? profile.disability : formValues.disability,
        legal: formValues.legal === '' ? profile.legal : formValues.legal
      },
    });
  };
  
  return (
    <Flex ai_start col stretch>
      <Text xlf bold mm>
        Account Information
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Flex mm col ai_start>
        <Flex jc_between ai_center>
          <Box sqr="5rem">
            <img src={user.picture} alt="Profile" />
          </Box>
          <Text lf sm>
            {profile && profile.firstName !== null
              ? `${profile && profile.firstName} ${profile && profile.lastName}`
              : user.name}{' '}
            {user[config.roleUrl].includes('Admin') ? (
              <Text>{user[config.roleUrl]}</Text>
            ) : null}
          </Text>
        </Flex>

        <Box h="1rem" />

        <Flex ai_start col>
          <Text lf bold>
            Account Email Address
          </Text>

          <Flex ai_center>
            <Text lf>{profile ? profile.email : user.email}</Text>
            <Button
              primary
              jc_center
              mm
              border={`2px solid ${theme.primary}`}
              w="7.75rem"
              h="3.75rem"
              aria-label="Change email for this user"
              onClick={() => alert('functionality coming next release canvas')}
            >
              Change
            </Button>
          </Flex>
        </Flex>

        <Form ai_start col stretch onSubmit={handleSubmit(onSubmit)}>
          <Text xlf bold>
            Personal Information
          </Text>

          <Box h="1rem" />

          <Flex jc_between stretch>
            <Flex ai_start col>
              <Text mf>First Name</Text>
              <Flex ai_center>
                <Input
                  type="text"
                  placeholder={profile ? profile.firstName : null}
                  w="25rem"
                  name="firstName"
                  ref={register}
                />
              </Flex>
            </Flex>

            <Flex ai_start col>
              <Text mf>Last Name</Text>
              <Flex ai_center>
                <Input
                  type="text"
                  placeholder={profile ? profile.lastName : null}
                  w="25rem"
                  name="lastName"
                  ref={register}
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex jc_between stretch>
            <Flex ai_start col>
              <Text mf>Display Name</Text>
              <Flex ai_center>
                <Input
                  type="text"
                  placeholder={profile ? profile.displayName : null}
                  w="25rem"
                  name="displayName"
                  ref={register}
                />
              </Flex>
            </Flex>

            <Flex ai_start col>
              <Text mf>Date of Birth</Text>
              <Flex ai_center>
                <Input type="text" w="25rem" name="birthday" ref={register} placeholder={profile ? profile.birthday : 'mm/dd/yyyy'} />
              </Flex>
            </Flex>
          </Flex>

          <Flex ai_start col stretch>
            <Text mf>Bio</Text>
            <TextArea rows="8" cols="60" name="bio" ref={register} placeholder={profile ? profile.bio : null} />
          </Flex>

          <Flex jc_between stretch>
            <Flex ai_start col>
              <Text mf>Disability Status</Text>
              <Flex ai_center>
                <Input
                  type="select"
                  w="25rem"
                  name="disability"
                  ref={register}
                  placeholder={profile ? profile.disability : null}
                />
              </Flex>
            </Flex>

            <Flex ai_start col>
              <Text mf>Are you over 18 years old?</Text>
              <Flex ai_center>
                <Select w="20rem" name="legal" ref={register}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
              </Flex>
            </Flex>
          </Flex>

          <Flex w='50%' jc_between ai_center>
            <Button
              type="submit"
              jc_center
              primary
              border={`2px solid ${theme.primary}`}
              w="9rem"
              h="4rem"
              aria-label="save changes to user profile"
              onClick={() => {
                setUpdated(true);
              }}
            >
              Save
            </Button>
            {updated === true ? <Text>Profile updated!</Text> : null}
          </Flex>

        </Form>
      </Flex>
    </Flex>
  );
};

export default ProfileForm;

ProfileForm.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object,
};
