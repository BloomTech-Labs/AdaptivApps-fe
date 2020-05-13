import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
//material ui
import {
  makeStyles,
  Container,
  Typography,
  Box,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxwidth: "100%",
    width: "90%",
    // fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "0.6rem",
  },
  profileHeader: {
    fontWeight: "400",
    marginLeft: "0",
  },
  profileInfo: {
    display: "flex",
  },
  profileImg: {
    maxWidth: "5rem",
  },
  profileText: {
    margin: "0 0 0 1rem",
    fontSize: "1.8rem",
    alignSelf: "flex-end",
  },
  personalInfo: {
    display: "flex",
    marginTop: "3rem",
    marginBlockEnd: "0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiButton-label": {
      fontSize: "1.6rem",
    },
  },
  formBox: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  input: {
    width: "100%",
    maxWidth: "600px",
  },
  resize: {
    fontSize: "1.4rem",
  },
  checkbox: {
    width: "0px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "1rem 3% 0 0",
  },
  inputLabel: {
    fontSize: "1.4rem",
    margin: "1rem 0 .4rem 0",
  },
  button: {
    marginTop: "3rem",
    border: "1px solid #2962FF",
    color: "#2962FF",
    height: "4rem",
    width: "8rem",
    fontSize: "1.2rem",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const ProfileSchema = yup.object().shape({
  type: yup.string(),
  private: yup.boolean(),
  firstName: yup
    .string()
    .min(2)
    .max(15),
  lastName: yup
    .string()
    .min(3)
    .max(15),
  displayName: yup.string().max(10),
  phoneNumber: yup.string(),
  state: yup.string(),
  city: yup.string(),
  bio: yup.string().max(255),
  legal: yup.string(),
});

// This is the form being used in UserDashboard
const ProfileForm = ({ loading, profile, user, updateProfile }) => {
  const [updated, setUpdated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const classes = useStyles();

  const { handleSubmit, register, setValue, control } = useForm({
    mode: "onSubmit",
    validationSchema: ProfileSchema,
    defaultValues: {
      email: user && user.email,
      type: userProfile && userProfile.type,
      private: userProfile && userProfile.private,
      firstName: userProfile && userProfile.firstName,
      lastName: userProfile && userProfile.lastName,
      phoneNumber: userProfile && userProfile.phoneNumber,
      displayName: userProfile && userProfile.displayName,
      state: userProfile && userProfile.state,
      city: userProfile && userProfile.city,
      bio: userProfile && userProfile.bio,
      legal: userProfile && userProfile.legal,
    },
  });

  // updates profile in the backend and frontend
  const onSubmit = (formValues, e) => {
    e.preventDefault();
    // backend update
    updateProfile({
      variables: {
        email: user.email,
        type: formValues.type === "" ? userProfile.type : formValues.type,
        private:
          formValues.private === null
            ? userProfile.private
            : formValues.private,
        firstName:
          formValues.firstName === ""
            ? userProfile.firstName
            : formValues.firstName,
        lastName:
          formValues.lastName === ""
            ? userProfile.lastName
            : formValues.lastName,
        displayName:
          formValues.displayName === ""
            ? userProfile.displayName
            : formValues.displayName,
        phoneNumber:
          formValues.phoneNumber === ""
            ? userProfile.phoneNumber
            : formValues.phoneNumber,
        bio: formValues.bio === "" ? userProfile.bio : formValues.bio,
        state: formValues.state === "" ? userProfile.state : formValues.state,
        city: formValues.city === "" ? userProfile.city : formValues.city,
        legal: formValues.legal === "" ? userProfile.legal : formValues.legal,
      },
    });
    // frontend update
    setUserProfile({
      email: user.email,
      type: formValues.type === "" ? userProfile.type : formValues.type,
      private:
        formValues.private === null ? userProfile.private : formValues.private,
      firstName:
        formValues.firstName === ""
          ? userProfile.firstName
          : formValues.firstName,
      lastName:
        formValues.lastName === "" ? userProfile.lastName : formValues.lastName,
      displayName:
        formValues.displayName === ""
          ? userProfile.displayName
          : formValues.displayName,
      phoneNumber:
        formValues.phoneNumber === ""
          ? userProfile.phoneNumber
          : formValues.phoneNumber,
      bio: formValues.bio === "" ? userProfile.bio : formValues.bio,
      state: formValues.state === "" ? userProfile.state : formValues.state,
      city: formValues.city === "" ? userProfile.city : formValues.city,
      legal: formValues.legal === "" ? userProfile.legal : formValues.legal,
    });
  };

  // updates form fields with new values
  useEffect(() => {
    if (!loading && !userProfile) setUserProfile(profile);
    if (!loading && userProfile) {
      setValue([
        { type: userProfile && userProfile.type },
        { private: userProfile && userProfile.private },
        { firstName: userProfile && userProfile.firstName },
        { lastName: userProfile && userProfile.lastName },
        { displayName: userProfile && userProfile.displayName },
        { phoneNumber: userProfile && userProfile.phoneNumber },
        { bio: userProfile && userProfile.bio },
        { state: userProfile && userProfile.state },
        { city: userProfile && userProfile.city },
        { legal: userProfile && userProfile.legal },
      ]);
    }
  }, [loading, userProfile, setValue, profile]);

  // alerts user to successful update, handy for screen readers
  const handleUpdated = () => {
    alert("Profile updated successfully!");
    setUpdated(false);
  };

  const userPicture = user && user.picture;

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography variant="h1" gutterBottom>
          Account Information
        </Typography>
      </Box>
      <Container className={classes.profileContainer}>
        <Box className={classes.profileInfo}>
          <img className={classes.profileImg} src={userPicture} alt="Profile" />
          <Box className={classes.profileText}>
            <Typography>
              {userProfile && userProfile.firstName !== null
                ? `${userProfile && userProfile.firstName} ${userProfile &&
                    userProfile.lastName}`
                : user && user.name}{" "}
            </Typography>
            <Typography>{user && user.email}</Typography>
          </Box>
        </Box>

        <Typography className={classes.personalInfo} variant="h2" gutterBottom>
          Personal Information
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className={classes.formBox}>
            <Box className={classes.box}>
              <InputLabel className={classes.inputLabel} htmlFor="type">
                Type
              </InputLabel>
              <Controller
                as={<TextField />}
                className={classes.input}
                id="type"
                variant="outlined"
                type="text"
                placeholder={userProfile ? userProfile.type : ""}
                name="type"
                control={control}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
              />

              <InputLabel className={classes.inputLabel} htmlFor="firstName">
                First Name
              </InputLabel>
              <Controller
                as={<TextField />}
                className={classes.input}
                id="firstName"
                variant="outlined"
                type="text"
                placeholder={userProfile ? userProfile.firstName : ""}
                name="firstName"
                control={control}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
              />
            </Box>
            <Box className={classes.box}>
              <InputLabel className={classes.inputLabel} htmlFor="lastName">
                Last Name
              </InputLabel>
              <Controller
                as={<TextField />}
                className={classes.input}
                id="lastName"
                type="text"
                variant="outlined"
                placeholder={userProfile ? userProfile.lastName : ""}
                name="lastName"
                control={control}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
              />
            </Box>
          </Box>
          <InputLabel className={classes.inputLabel} htmlFor="phoneNumber">
            Phone Number
          </InputLabel>
          <Controller
            as={<TextField />}
            className={classes.input}
            id="phoneNumber"
            type="text"
            variant="outlined"
            placeholder={userProfile ? userProfile.phoneNumber : ""}
            name="phoneNumber"
            control={control}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
          />
          <Box className={classes.formBox}>
            <Box className={classes.box}>
              <InputLabel className={classes.inputLabel} htmlFor="displayName">
                Display Name
              </InputLabel>
              <Controller
                as={<TextField />}
                className={classes.input}
                id="displayName"
                type="text"
                variant="outlined"
                placeholder={userProfile ? userProfile.displayName : ""}
                name="displayName"
                control={control}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
              />
            </Box>
            <Box className={classes.box}>
              <InputLabel className={classes.inputLabel} htmlFor="state">
                State
              </InputLabel>
              <Controller
                as={<TextField />}
                className={classes.input}
                id="state"
                type="text"
                variant="outlined"
                name="state"
                placeholder={userProfile ? userProfile.state : ""}
                control={control}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
              />
              <InputLabel className={classes.inputLabel} htmlFor="city">
                City
              </InputLabel>
              <Controller
                as={<TextField />}
                className={classes.input}
                id="city"
                type="text"
                variant="outlined"
                name="city"
                placeholder={userProfile ? userProfile.city : ""}
                control={control}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
              />
            </Box>
          </Box>

          <Box className={classes.formBox}>
            <Box className={classes.box}>
              <InputLabel className={classes.inputLabel} htmlFor="bio">
                Bio
              </InputLabel>
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
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
              />
            </Box>
          </Box>
          <Box className={classes.box}>
            <InputLabel className={classes.inputLabel} htmlFor="legal">
              Are you over 18 years old?
            </InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value={`Adult`}>Yes</MenuItem>
                  <MenuItem value={`Minor`}>No</MenuItem>
                </Select>
              }
              className={classes.input}
              id="legal"
              name="legal"
              variant="outlined"
              control={control}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
            />
            <InputLabel className={classes.inputLabel} htmlFor="private">
              Private
            </InputLabel>
            <Controller
              as={<Checkbox />}
              defaultChecked
              inputProps={{ "aria-label": "secondary checkbox" }}
              color="primary"
              size="medium"
              className={classes.checkbox}
              id="private"
              variant="outlined"
              placeholder={userProfile ? userProfile.private : null}
              name="private"
              control={control}
            />
          </Box>

          <Box className={classes.formBox}>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
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
