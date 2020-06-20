// React/Reach Router imports
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_1 } from "../queries";
// Component imports
import NextButton from "../../../theme/SmallFormButton";
import SaveButton from "../../../theme/LargeFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Typography,
  Box,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "67.5%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
  },
  namePhoneBox: {
    display: "flex",
    marginBottom: "2.4rem",
    "& .MuiTextField-root": {
      width: 360,
      height: 48,
    },
  },
  firstInput: {
    marginRight: "2.4rem",
  },
  typeSelect: {
    width: 744,
    height: 48,
    marginBottom: "2.4rem",
  },
  addressBox: {
    display: "flex",
    marginBottom: "2.4rem",
    "& .MuiTextField-root": {
      width: 360,
      height: 48,
    },
  },
  bioBox: {
    marginBottom: "15rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10rem",
  },
});

export default function Step1({ updateProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_1, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      firstName: currentUserInfo && currentUserInfo?.profile?.firstName,
      lastName: currentUserInfo && currentUserInfo?.profile?.lastName,
      userName: currentUserInfo && currentUserInfo?.profile?.userName,
      phoneNumber: currentUserInfo && currentUserInfo?.profile?.phoneNumber,
      city: currentUserInfo && currentUserInfo?.profile?.city,
      state: currentUserInfo && currentUserInfo?.profile?.state,
      legal: currentUserInfo && currentUserInfo?.profile?.legal,
      bio: currentUserInfo && currentUserInfo?.profile?.bio,
    },
  });
  useEffect(() => {
    if (!loading && !currentUserInfo) setCurrentUserInfo(defaultInfo);
    if (!loading && currentUserInfo) {
      setValue([
        { firstName: currentUserInfo && currentUserInfo?.profile?.firstName },
        { lastName: currentUserInfo && currentUserInfo?.profile?.lastName },
        { userName: currentUserInfo && currentUserInfo?.profile?.userName },
        { phoneNumber: currentUserInfo && currentUserInfo?.profile?.phoneNumber },
        { city: currentUserInfo && currentUserInfo?.profile?.city },
        { state: currentUserInfo && currentUserInfo?.profile?.state },
        { legal: currentUserInfo && currentUserInfo?.profile?.legal },
        { bio: currentUserInfo && currentUserInfo?.profile?.bio },
      ]);
    }
  }, [loading, currentUserInfo, defaultInfo, setValue]);
  // Sets default values in input fields with current user's info
  console.log(currentUserInfo?.profile?.firstName);
  // Will update profile and route user to next step in profile wizard
  const onNext = handleSubmit(async data => {
    await updateProfile({
      variables: {
        email: userEmail,
        firstName: data.firstName,
        userName: data.userName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        city: data.city,
        state: data.state,
        legal: data.legal,
        bio: data.bio,
      },
    });

    alert("Successfully updated account info!");
    navigate(`/updateaccount/${userEmail}/step2of6`);
  });
  // Will update profile and route user back to settings page allowing user to complete profile wizard at a later time
  const onSave = handleSubmit(async data => {
    await updateProfile({
      variables: {
        email: userEmail,
        firstName: data.firstName,
        userName: data.userName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        city: data.city,
        state: data.state,
        legal: data.legal,
        bio: data.bio,
      },
    });

    alert("Successfully saved account info!");
    navigate(`/`);
  });

  console.log("Inside Step1", defaultInfo);

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={1} stepNumber={1} userEmail={userEmail} />
      <form className={classes.form}>
        <Box className={classes.namePhoneBox}>
          <Box>
            <InputLabel htmlFor="firstName">First Name*</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.firstInput}
              name="firstName"
              type="text"
              variant="outlined"
              control={control}
            />
          </Box>
          <Box>
            <InputLabel htmlFor="lastName">Last Name*</InputLabel>
            <Controller
              as={<TextField />}
              name="lastName"
              type="text"
              variant="outlined"
              control={control}
            />
          </Box>
        </Box>
        <Box className={classes.namePhoneBox}>
          <Box>
            <InputLabel htmlFor="userName">Username*</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.firstInput}
              name="userName"
              variant="outlined"
              type="text"
              control={control}
            />
          </Box>
          <Box>
            <InputLabel htmlFor="phoneNumber">Phone Number*</InputLabel>
            <Controller
              as={<TextField />}
              name="phoneNumber"
              variant="outlined"
              type="text"
              control={control}
            />
          </Box>
        </Box>
        <Box className={classes.addressBox}>
          <Box>
            <InputLabel htmlFor="city">City*</InputLabel>
            <Controller
              as={<TextField />}
              name="city"
              type="text"
              className={classes.firstInput}
              variant="outlined"
              control={control}
            />
          </Box>
          <Box>
            <InputLabel htmlFor="state">State*</InputLabel>
            <Controller
              as={<TextField />}
              name="state"
              type="text"
              variant="outlined"
              control={control}
            />
          </Box>
        </Box>
        <InputLabel htmlFor="legal">Are you over 18 years old?*</InputLabel>
        <Controller
          as={
            <Select className={classes.typeSelect}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="legal"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="bio">
          If you're comfortable sharing, tell us your story
        </InputLabel>
        <Controller
          as={<TextField />}
          name="bio"
          type="text"
          variant="outlined"
          className={classes.bioBox}
          control={control}
          multiline
          rows="8"
        />
        <Typography>* required field</Typography>
        <Box className={classes.btnBox}>
          <SaveButton
            label={"Save & Quit"}
            ariaLabel="Click to save and continue later."
            onClick={onSave}
          />
          <NextButton
            label={"Next"}
            ariaLabel="Click here to complete step 1 and move onto step 2."
            onClick={onNext}
          />
        </Box>
      </form>
    </Box>
  );
}
