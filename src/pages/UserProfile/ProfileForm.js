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
  Label,
} from 'adaptiv-ui';
import PropTypes from 'prop-types';
import * as yup from 'yup'

const ProfileSchema = yup.object().shape({
  firstName: yup.string().min(2).max(15),
  lastName: yup.string().min(3).max(15),
  displayName: yup.string().max(10),
  birthday: yup.string().max(10),
  bio: yup.string().max(255),
  disability: yup.string(), //string?
  // legal: yup.bool()
});

// This is the form being used in UserDashboard
const ProfileForm = ({ loading, profile, user, updateProfile }) => {
  const [updated, setUpdated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const { handleSubmit, register, setValue } = useForm({
    mode: 'onSubmit',
    validationSchema: ProfileSchema,
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
      <h4 style={{marginBottom: '0.5rem', fontSize: "2.4rem"}}>Account Information</h4>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Flex mm col ai_start style={{ marginTop: 0 }}>
        <Flex jc_between ai_center style={{ marginTop: 0 }}>
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
          <h5 style={{ marginLeft: 0, fontSize: "2.1rem" }}>Account Email Address</h5>
          <Flex ai_center>
            <Text mlf>
              {userProfile ? userProfile.email : user && user.email}
            </Text>
          </Flex>
          <Box h="2rem" />
        </Flex>

        <Form ai_start col stretch onSubmit={handleSubmit(onSubmit)}>
          <h5 style={{ marginLeft: 0, fontSize: "2.1rem" }}>Personal Information</h5>

          <Flex jc_between stretch>
            <Flex ai_start col>
              <Label htmlFor="firstName" style={{ marginBottom: '0.2rem' }}>
                First Name
              </Label>
              <Flex ai_center>
                <Input
                  autoFocus
                  id="firstName"
                  type="text"
                  placeholder={userProfile ? userProfile.firstName : null}
                  w="25rem"
                  name="firstName"
                  ref={register}
                  style={{ marginTop: 0, marginLeft: 0 }}
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex jc_between stretch>
            <Flex ai_start col>
              <Label htmlFor="displayName" style={{ marginBottom: '0.2rem' }}>
                Display Name
              </Label>
              <Flex ai_center>
                <Input
                  id="displayName"
                  type="text"
                  placeholder={userProfile ? userProfile.displayName : null}
                  w="25rem"
                  name="displayName"
                  ref={register}
                  style={{ marginLeft: 0, marginTop: 0 }}
                />
              </Flex>
            </Flex>

            <Flex ai_start col>
              <Label htmlFor="birthday" style={{ marginBottom: '0.2rem' }}>
                Date of Birth
              </Label>
              <Flex ai_center>
                <Input
                  id="birthday"
                  type="text"
                  w="25rem"
                  name="birthday"
                  ref={register}
                  placeholder={
                    userProfile ? userProfile.birthday : 'mm/dd/yyyy'
                  }
                  style={{ marginTop: 0, marginLeft: 0 }}
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex ai_start col stretch>
            <label htmlFor="bio" style={{ marginBottom: '0.2rem' }}>
              Bio
            </label>
            <TextArea
              id="bio"
              rows="8"
              cols="60"
              name="bio"
              ref={register}
              placeholder={userProfile ? userProfile.bio : null}
              style={{ marginTop: 0, marginLeft: 0 }}
            />
          </Flex>

          <Flex jc_between stretch>
            <Flex ai_start col>
              <label htmlFor="disability" style={{ marginBottom: '0.2rem' }}>
                Disability Status
              </label>
              <Flex ai_center>
                <Input
                  id="disability"
                  type="select"
                  w="25rem"
                  name="disability"
                  ref={register}
                  placeholder={userProfile ? userProfile.disability : null}
                  style={{ marginTop: 0, marginLeft: 0 }}
                />
              </Flex>
            </Flex>

            <Flex ai_start col>
              <label htmlFor="legal" style={{ marginBottom: '0.2rem' }}>
                Are you over 18 years old?
              </label>
              <Flex ai_center>
                <Select
                  id="legal"
                  w="20rem"
                  name="legal"
                  ref={register}
                  style={{ marginTop: 0, marginLeft: 0 }}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
              </Flex>
            </Flex> */}
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
              style={{ marginLeft: 0 }}
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
