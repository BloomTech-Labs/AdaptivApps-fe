import React, { useState, useEffect } from 'react';
import config from '../../config/auth_config';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import * as yup from 'yup';
//material ui
import {
  makeStyles,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxwidth: '100%',
    width: '90%',
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  },
  headingBox: {
    margin: '4rem 0 2rem 3rem',
    fontWeight: '400',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0.6rem',
  },
  profileHeader: {
    fontWeight: '400',
    marginLeft: '0',
  },
  profileInfo: {
    display: 'flex',
  },
  profileImg: {
    maxWidth: '5rem',
  },
  profileText: {
    margin: '0 0 0 1rem',
    fontSize: '1.8rem',
    alignSelf: 'flex-end',
  },
});

const ProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2)
    .max(15),
  lastName: yup
    .string()
    .min(3)
    .max(15),
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
  const classes = useStyles();

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
  console.log(userProfile);
  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={1}>
        <Typography className={classes.heading} variant="h3" gutterBottom>
          Account Information
        </Typography>
      </Box>
      <Container className={classes.profileContainer}>
        <h5 className={classes.profileHeader}>Account Email Address</h5>
        <Box className={classes.profileInfo}>
          <img
            className={classes.profileImg}
            src={userPicture}
            alt="Profile Image"
          />
          <Typography className={classes.profileText}>
            {userProfile && userProfile.firstName !== null
              ? `${userProfile && userProfile.firstName} ${userProfile &&
                  userProfile.lastName}`
              : user && user.name}{' '}
            {user && user[config.roleUrl].includes('Admin') ? (
              <Typography>{user && user[config.roleUrl]}</Typography>
            ) : null}
          </Typography>
        </Box>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5>Personal Information</h5>
            <Box>
              <TextField
                id="firstName"
                label={userProfile ? userProfile.firstName : null}
                type="text"
                variant="outlined"
                name="firstName"
                ref={register}
              />
              <TextField
                id="lastName"
                type="text"
                variant="outlined"
                placeholder={userProfile ? userProfile.lastName : null}
                name="lastName"
                ref={register}
                style={{ marginTop: 0, marginLeft: 0 }}
              />
            </Box>
            <Box>
              <TextField
                id="displayName"
                type="text"
                variant="outlined"
                placeholder={userProfile ? userProfile.displayName : null}
                name="displayName"
                ref={register}
              />
              <TextField
                id="birthday"
                type="text"
                variant="outlined"
                name="birthday"
                ref={register}
                placeholder={userProfile ? userProfile.birthday : 'mm/dd/yyyy'}
              />
            </Box>

            <Box>
              <TextField
                id="bio"
                name="bio"
                variant="outlined"
                ref={register}
                multiline
                rows="8"
                cols="60"
                defaultValue={userProfile ? userProfile.bio : null}
                // placeholder={userProfile ? userProfile.bio : null}
                variant="outlined"
              />
            </Box>

            <Box>
              <TextField
                id="disability"
                type="select"
                variant="outlined"
                name="disability"
                ref={register}
                placeholder={userProfile ? userProfile.disability : null}
              />
              <Select id="legal" name="legal" ref={register}>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </Box>

            <Box>
              <Button
                variant="outlined"
                color="#2962FF"
                type="submit"
                aria-label="save changes to user profile"
                onClick={() => {
                  setUpdated(true);
                }}
              >
                Save
              </Button>
              {updated === true ? handleUpdated() : null}
            </Box>
          </form>
        </Container>
      </Container>
    </main>
  );
};

export default ProfileForm;

ProfileForm.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object,
  loading: PropTypes.bool,
  updateProfile: PropTypes.any,
};
