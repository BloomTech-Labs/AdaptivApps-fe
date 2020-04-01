import React, { useState, useEffect } from 'react';
import config from '../../config/auth_config';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import * as yup from 'yup';
//material ui
import {
  makeStyles,
  Container,
  Typography,
  Box,
  FormControl,
  FormGroup,
  InputLabel,
  TextField,
  Input,
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
    fontSize: '2.4rem',
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
  personalInfo: {
    display: 'flex',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formBox: {
    display: 'flex',
  },
  input: {
    width: '100%',
    margin: '1rem 2.5% 2rem 0',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
  disability: yup.string(),
  legal: yup.string(),
});

// This is the form being used in UserDashboard
const ProfileForm = ({ loading, profile, user, updateProfile }) => {
  const [updated, setUpdated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const classes = useStyles();

  const { handleSubmit, register, setValue, control } = useForm({
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
        <Typography className={classes.heading} gutterBottom>
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

        <Typography className={classes.personalInfo} variant="h4" gutterBottom>
          Personal Information
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className={classes.formBox}>
            <Box className={classes.box}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Controller
                as={<TextField />}
                className={classes.input}
                id="firstName"
                variant="outlined"
                type="text"
                placeholder={userProfile ? userProfile.firstName : null}
                name="firstName"
                control={control}
              />
            </Box>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.input}
              id="lastName"
              type="text"
              variant="outlined"
              placeholder={userProfile ? userProfile.lastName : null}
              name="lastName"
              control={control}
            />
          </Box>
          <Box className={classes.formBox}>
            <InputLabel htmlFor="displayName">Display Name</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.input}
              id="displayName"
              type="text"
              variant="outlined"
              placeholder={userProfile ? userProfile.displayName : null}
              name="displayName"
              control={control}
            />
            <InputLabel htmlFor="birthday">Date of Birth</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.input}
              id="birthday"
              type="text"
              variant="outlined"
              name="birthday"
              placeholder={userProfile ? userProfile.birthday : 'mm/dd/yyyy'}
              control={control}
            />
          </Box>

          <Box className={classes.formBox}>
            <InputLabel htmlFor="bio">Bio</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.bio}
              id="bio"
              name="bio"
              variant="outlined"
              multiline
              rows="8"
              placeholder={userProfile ? userProfile.bio : null}
              control={control}
            />
          </Box>

          <Box className={classes.formBox}>
            <InputLabel htmlFor="disability">Disability Status</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.input}
              id="disability"
              type="select"
              variant="outlined"
              name="disability"
              ref={register}
              placeholder={userProfile ? userProfile.disability : null}
              control={control}
            />
            <InputLabel htmlFor="legal">Are you over 18 years old?</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value={userProfile?.legal} disabled>
                    {userProfile?.legal}
                  </MenuItem>
                  <MenuItem value={`Adult`}>Adult</MenuItem>
                  <MenuItem value={`Minor`}>Minor</MenuItem>
                </Select>
              }
              className={classes.input}
              id="legal"
              name="legal"
              control={control}
            />
          </Box>
          <Box className={classes.formBox}>
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
