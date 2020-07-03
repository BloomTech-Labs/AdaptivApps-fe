// React/Reach Router imports
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_1, PROFILE_INFO } from "../queries";
// Component imports
import FinishButton from "../../../theme/SmallFormButton";
// import SaveButton from "../../../theme/LargeFormButton";
// import ProgressBar from "../../../theme/ProgressBar";
// Query imports
import { GET_RECIPIENTS } from "../../Chat/queries/Chats";
// Auth0 imports
// import { useAuth0 } from "../../../config/react-auth0-spa";

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

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "67.5%",
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiInputLabel-asterisk": {
      fontSize: "2rem",
      color: "red",
      fontWeight: "bolder",
      height: "100vh",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  form: {
    marginTop: "3.6rem",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    "& .MuiTextField-root": {
      width: "100%",
      marginBottom: "1.6rem",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  namePhoneBox: {
    display: "flex",
    marginBottom: "0.8rem",
    "& .MuiTextField-root": {
      width: "100%",
      height: "4.8rem",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  doubleInput: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  singleInput: {
    display: "flex",
    flexDirection: "column",
    width: "48.6%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  typeSelect: {
    height: "4.8rem",
    marginBottom: "1.6rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  em: {
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
  addressBox: {
    display: "flex",
    marginBottom: "1.6rem",
    "& .MuiTextField-root": {
      width: "36rem",
      height: "4.8rem",
      [theme.breakpoints.down("sm")]: {
        margin: "1.2rem auto",
      },
      [theme.breakpoints.down("xs")]: {
        margin: "1.2rem auto",
      },
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  bioBox: {
    width: "100%",
    "& .MuiTextField-root": {
      width: "100%",
      height: "4.8rem",
    },
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
  },
  error: {
    color: "red",
    fontSize: "2rem",
    fontVariant: "all-small-caps",
    fontWeight: "bold",
    "&:last-child": {
      fontSize: "1.65rem",
      color: "red",
      marginTop: "1rem",
    },
  },
  errorLabel: {
    marginLeft: "1rem",
    fontSize: "1.65rem",
    color: "red",
    fontVariant: "all-small-caps",
    fontWeight: "bold",
  },
}));

export default function Step1({ updateProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_1, {
    variables: { email: userEmail },
  });
  const { data } = useQuery(GET_RECIPIENTS);
  const { data: user } = useQuery(PROFILE_INFO, {
    variables: { email: userEmail },
  });
  const currentUser = user?.profile?.userName;

  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const [errorState, setErrorState] = useState();
  const { handleSubmit, setValue, control, errors } = useForm({
    defaultValues: {
      firstName: currentUserInfo && currentUserInfo?.profile?.firstName,
      lastName: currentUserInfo && currentUserInfo?.profile?.lastName,
      userName: currentUserInfo && currentUserInfo?.profile?.userName,
      phoneNumber: currentUserInfo && currentUserInfo?.profile?.phoneNumber,
      instagram: currentUserInfo && currentUserInfo?.profile?.instagram,
      facebook: currentUserInfo && currentUserInfo?.profile?.facebook,
      twitter: currentUserInfo && currentUserInfo?.profile?.twitter,
      legal: currentUserInfo && currentUserInfo?.profile?.legal,
      bio: currentUserInfo && currentUserInfo?.profile?.bio,
    },
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    if (!loading && !currentUserInfo) setCurrentUserInfo(defaultInfo);
    if (!loading && currentUserInfo) {
      setValue([
        { firstName: currentUserInfo && currentUserInfo?.profile?.firstName },
        { lastName: currentUserInfo && currentUserInfo?.profile?.lastName },
        { userName: currentUserInfo && currentUserInfo?.profile?.userName },
        {
          phoneNumber: currentUserInfo && currentUserInfo?.profile?.phoneNumber,
        },
        { instagram: currentUserInfo && currentUserInfo?.profile?.instagram },
        { facebook: currentUserInfo && currentUserInfo?.profile?.facebook },
        { twitter: currentUserInfo && currentUserInfo?.profile?.twitter },
        { legal: currentUserInfo && currentUserInfo?.profile?.legal },
        { bio: currentUserInfo && currentUserInfo?.profile?.bio },
      ]);
    }
  }, [loading, currentUserInfo, defaultInfo, setValue]);

  // Will update profile and route user to next step in profile wizard
  const onSubmit = async data => {
    await updateProfile({
      variables: {
        email: userEmail,
        firstName: data.firstName,
        userName: data.userName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        twitter: data.twitter,
        facebook: data.facebook,
        instagram: data.instagram,
        legal: data.legal,
        bio: data.bio,
      },
    });

    // alert("Successfully updated account info!");
    navigate(`/settings`);
  };

  const userNames = [];
  data &&
    data.profiles.filter(
      user =>
        user.userName !== null &&
        user.userName !== "" &&
        user.userName !== currentUser &&
        userNames.push(user.userName.toLowerCase())
    );

    const validateUsername = () => {
      const userName =
        control.getValues().userName !== null &&
        control.getValues().userName.toLowerCase();
      if (userNames.includes(userName)) {
        setErrorState(true);
        alert("That username is already taken. Please choose another one!");
      } else setErrorState(false);
    };

  // Will update profile and route user back to settings page allowing user to complete profile wizard at a later time
  // const onSave = handleSubmit(async data => {
  //   await updateProfile({
  //     variables: {
  //       email: userEmail,
  //       firstName: data.firstName,
  //       userName: data.userName,
  //       lastName: data.lastName,
  //       phoneNumber: data.phoneNumber,
  //       address1: data.address1,
  //       address2: data.address2,
  //       city: data.city,
  //       state: data.state,
  //       postalCode: data.postalCode,
  //       country: data.country,
  //       legal: data.legal,
  //       bio: data.bio,
  //     },
  //   });

  // alert("Successfully saved account info!");
  //   navigate(`/`);
  // });

  return (
    <Box className={classes.root}>
      {/* <ProgressBar activeStep={1} stepNumber={1} userEmail={userEmail} /> */}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.namePhoneBox}>
          <Box className={classes.doubleInput}>
            <Box className={classes.singleInput}>
              <InputLabel required for="firstName">
                First Name
              </InputLabel>
              <Controller
                as={<TextField />}
                className={classes.firstInput}
                id="firstName"
                autoComplete="first name"
                name="firstName"
                type="text"
                variant="outlined"
                control={control}
                aria-invalid={errors.firstName ? "true" : "false"}
                defaultValue=""
                rules={{ required: true }}
              />
              {errors.firstName && (
                <Typography className={classes.error} role="alert">
                  first name is a required field
                </Typography>
              )}
            </Box>
            <Box className={classes.singleInput}>
              <InputLabel required for="lastName">
                Last Name
              </InputLabel>
              <Controller
                as={<TextField />}
                id="lastName"
                name="lastName"
                autocomplete="last name"
                type="text"
                variant="outlined"
                control={control}
                aria-invalid={errors.lastName ? "true" : "false"}
                defaultValue=""
                rules={{ required: true }}
                className={classes.secondInput}
              />
              {errors.lastName && (
                <Typography className={classes.error} role="alert">
                  last name is a required field
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box className={classes.namePhoneBox}>
          <Box className={classes.doubleInput}>
            <Box className={classes.singleInput}>
              <InputLabel required for="userName">
                Username
              </InputLabel>
              <Controller
                as={<TextField />}
                className={classes.firstInput}
                id="userName"
                autoComplete="username"
                name="userName"
                variant="outlined"
                type="text"
                control={control}
                aria-invalid={errors.userName ? "true" : "false"}
                defaultValue=""
                onBlur={validateUsername}
                rules={{ required: true }}
              />
              {errors.userName && (
                <Typography className={classes.error} role="alert">
                  username is a required field
                </Typography>
              )}

              {errorState && (
                <Typography className={classes.error} role="alert">
                  Finish button is disabled until a unique username is chosen
                </Typography>
              )}
            </Box>
            <Box className={classes.singleInput}>
              <InputLabel required for="phoneNumber">
                Phone Number
              </InputLabel>
              <Controller
                as={<TextField />}
                id="phoneNumber"
                autoComplete="phone number"
                aria-invalid={errors.phoneNumber ? "true" : "false"}
                name="phoneNumber"
                variant="outlined"
                type="text"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
              {errors.phoneNumber && (
                <Typography className={classes.error} role="alert">
                  phone number is a required field
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        {/* <Box className={classes.addressBox}>
          <Box>
            <InputLabel required htmlFor="address1">Address 1</InputLabel>
            <Controller
              as={<TextField />}
              name="address1"
              type="text"
              className={classes.firstInput}
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.address1 && <Typography className={classes.error}>address is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel htmlFor="address2">Address 2</InputLabel>
            <Controller
              as={<TextField />}
              name="address2"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
            />
          </Box>
        </Box>
        <Box className={classes.addressBox}>
          <Box>
            <InputLabel required htmlFor="city">City</InputLabel>
            <Controller
              as={<TextField />}
              name="city"
              type="text"
              className={classes.firstInput}
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.city && <Typography className={classes.error}>city is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="state">State</InputLabel>
            <Controller
              as={<TextField />}
              name="state"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.state && <Typography className={classes.error}>state is a required field</Typography>}
          </Box>
        </Box>
        <Box className={classes.addressBox}>
          <Box>
            <InputLabel required htmlFor="postal code">Postal Code</InputLabel>
            <Controller
              as={<TextField />}
              name="postalCode"
              type="text"
              className={classes.firstInput}
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.postalCode && <Typography className={classes.error}>postal code is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="country">Country</InputLabel>
            <Controller
              as={<TextField />}
              name="country"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.country && <Typography className={classes.error}>country is a required field</Typography>}
          </Box>
        </Box> */}

        <InputLabel for="twitter">
          Please enter the full url link to your Twitter profile
        </InputLabel>
        <Controller
          as={<TextField />}
          id="twitter"
          autoComplete="twitter"
          name="twitter"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />

        <InputLabel for="facebook">
          Please enter the full url link to your Facebook profile
        </InputLabel>
        <Controller
          as={<TextField />}
          id="facebook"
          autoComplete="facebook"
          name="facebook"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />

        <InputLabel for="instagram">
          Please enter the full url link to your Instagram profile
        </InputLabel>
        <Controller
          as={<TextField />}
          id="instagram"
          autoComplete="instagram"
          name="instagram"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />

        <InputLabel required for="legal">
          Are you over 18 years old? (minors will not have access to the chat feature)
        </InputLabel>
        {errors.legal && (
          <Typography className={classes.error} role="alert">
            Please make a selection
          </Typography>
        )}
        <Controller
          as={
            <Select className={classes.typeSelect}>
              {/* <MenuItem value="">
                <em className={classes.em}>Please choose one</em>
              </MenuItem> */}
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          id="legal"
          name="legal"
          type="select"
          aria-invalid={errors.userName ? "true" : "false"}
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        <InputLabel for="bio">Bio</InputLabel>
        <Controller
          as={<TextField />}
          id="bio"
          name="bio"
          type="text"
          variant="outlined"
          className={classes.bioBox}
          control={control}
          defaultValue=""
          multiline
          rows="8"
        />
        <Typography className={classes.error}>* required field</Typography>
        <Box className={classes.btnBox}>
          <FinishButton
            type="submit"
            label="Finish"
            onClick={handleSubmit}
            ariaLabel="Click here to complete account update and go back to account settings."
          />
        </Box>
      </form>
    </Box>
  );
}
