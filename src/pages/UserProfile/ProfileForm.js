import React, { useState, useEffect } from 'react';
import config from '../../config/auth_config';
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
  ToolTip,
} from 'adaptiv-ui';
import PropTypes from 'prop-types';

// This is the form being used in UserDashboard
const ProfileForm = ({ loading, profile, user, updateProfile }) => {
  const [updated, setUpdated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const { handleSubmit, register, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: user && user.email,
      firstName: userProfile && userProfile.firstName,
      lastName: userProfile && userProfile.lastName,
      displayName: userProfile && userProfile.displayName,
      birthday: userProfile && userProfile.birthday,
      bio: userProfile && userProfile.bio,
      disability: userProfile && userProfile.disability,
    },
  });

  // updates profile in the backend and frontend
  const onSubmit = (formValues, e) => {
    e.preventDefault();
    // backend update
    updateProfile({
      variables: {
        email: user.email,
        firstName:
          formValues.firstName === ''
            ? userProfile.firstName
            : formValues.firstName,
        lastName:
          formValues.lastName === ''
            ? userProfile.lastName
            : formValues.lastName,
        displayName:
          formValues.displayName === ''
            ? userProfile.displayName
            : formValues.displayName,
        birthday:
          formValues.birthday === ''
            ? userProfile.birthday
            : formValues.birthday,
        bio: formValues.bio === '' ? userProfile.bio : formValues.bio,
        disability:
          formValues.disability === ''
            ? userProfile.disability
            : formValues.disability,
        legal: formValues.legal === '' ? userProfile.legal : formValues.legal,
      },
    });
    // frontend update
    setUserProfile({
      email: user.email,
      firstName:
        formValues.firstName === ''
          ? userProfile.firstName
          : formValues.firstName,
      lastName:
        formValues.lastName === '' ? userProfile.lastName : formValues.lastName,
      displayName:
        formValues.displayName === ''
          ? userProfile.displayName
          : formValues.displayName,
      birthday:
        formValues.birthday === '' ? userProfile.birthday : formValues.birthday,
      bio: formValues.bio === '' ? userProfile.bio : formValues.bio,
      disability:
        formValues.disability === ''
          ? userProfile.disability
          : formValues.disability,
      legal: formValues.legal === '' ? userProfile.legal : formValues.legal,
    });
  };

  // updates form fields with new values
  useEffect(() => {
    if (!loading && !userProfile) setUserProfile(profile);
    if (!loading && userProfile) {
      setValue([
        { firstName: userProfile && userProfile.firstName },
        { lastName: userProfile && userProfile.lastName },
        { displayName: userProfile && userProfile.displayName },
        { birthday: userProfile && userProfile.birthday },
        { bio: userProfile && userProfile.bio },
        { disability: userProfile && userProfile.disability },
        { legal: userProfile && userProfile.legal },
      ]);
    }
  }, [loading, userProfile, setValue, profile]);

  // alerts user to successful update, handy for screen readers
  const handleUpdated = () => {
    alert('Profile updated successfully!');
    setUpdated(false);
  };

  const userPicture = user && user.picture;

  return (
    <Flex ai_start col stretch>
      <h1>Account Information</h1>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Flex mm col ai_start>
        <Flex jc_between ai_center>
          <Box sqr="5rem">
            <img src={userPicture} alt="Profile" />
          </Box>
          <Text lf sm>
            {userProfile && userProfile.firstName !== null
              ? `${userProfile && userProfile.firstName} ${userProfile &&
                  userProfile.lastName}`
              : user && user.name}{' '}
            {user && user[config.roleUrl].includes('Admin') ? (
              <Text>{user && user[config.roleUrl]}</Text>
            ) : null}
          </Text>
        </Flex>

        <Box h="2rem" />

        <Flex ai_start col>
          <Text f_size="2.6rem" bold>
            Account Email Address
          </Text>
          <Box h="2rem" />
          <Flex ai_center>
            <Text lf>
              {userProfile ? userProfile.email : user && user.email}
            </Text>
          </Flex>
          <Box h="2rem" />
        </Flex>

        <Form ai_start col stretch onSubmit={handleSubmit(onSubmit)}>
          <Text xlf bold>
            Personal Information
          </Text>

          <Box h="2rem" />

          <Flex jc_between stretch>
            <Flex ai_start col>
              <Text mf>First Name</Text>
              <Flex ai_center>
                <Input
                  autoFocus
                  type="text"
                  placeholder={userProfile ? userProfile.firstName : null}
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
                  placeholder={userProfile ? userProfile.lastName : null}
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
                  placeholder={userProfile ? userProfile.displayName : null}
                  w="25rem"
                  name="displayName"
                  ref={register}
                />
              </Flex>
            </Flex>

            <Flex ai_start col>
              <Text mf>Date of Birth</Text>
              <Flex ai_center>
                <Input
                  type="text"
                  w="25rem"
                  name="birthday"
                  ref={register}
                  placeholder={
                    userProfile ? userProfile.birthday : 'mm/dd/yyyy'
                  }
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex ai_start col stretch>
            <Text mf>Bio</Text>
            <TextArea
              rows="8"
              cols="60"
              name="bio"
              ref={register}
              placeholder={userProfile ? userProfile.bio : null}
            />
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
                  placeholder={userProfile ? userProfile.disability : null}
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

          <Flex w="50%" jc_between ai_center>
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
            {updated === true ? handleUpdated() : null}
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
  loading: PropTypes.bool,
  updateProfile: PropTypes.any,
};
