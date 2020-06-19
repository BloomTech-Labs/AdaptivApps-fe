// React/Reach Router imports
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Query imports
import { GET_RECIPIENTS } from '../../Chat/queries/Chats'
import { useQuery } from "react-apollo";

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
    width: '67.5%',
    "& .MuiInputLabel-asterisk": {
      fontSize: '2rem',
      color: 'red',
      fontWeight: 'bolder'
    },
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
    marginRight: "2.4rem"
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
    marginBottom: 200,
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  error: {
    color: 'red',
    fontSize: '2rem',    
    fontVariant: 'all-small-caps',
    fontWeight: 'bold',
    '&:last-child': {
      fontSize: '1.65rem',
      color: 'red',
      marginTop: '1rem',
    }
  },
  errorLabel: {
    marginLeft: '1rem',
    fontSize: '1.65rem',
    color: 'red',
    fontVariant: 'all-small-caps',
    fontWeight: 'bold'
  }
});

export default function Step1({ updateProfile, handleNext, activeStep }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();
  const [errorState, setErrorState] = useState(false);
  const { data } = useQuery(GET_RECIPIENTS, { variables: { email: userEmail }});

  const onSubmit = async data => {
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
    await navigate(`/updateaccount/${userEmail}/step2of6`);
  };
  
  const userNames = []
  data && data.profiles.filter(user => user.userName !== null && user.userName !== '' && userNames.push(user.userName.toLowerCase()));

  const validateUsername = () => {
    const userName = control.getValues().userName.toLowerCase();
    if (userNames.includes(userName)) {
      setErrorState(true);
      alert('That username is already taken. Please choose another one!');
  } else setErrorState(false)  ;
};

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={1} stepNumber={1} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.namePhoneBox}>
          <Box>
            <InputLabel required htmlFor="firstName">First Name</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.firstInput}
              name="firstName"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.firstName && <Typography className={classes.error}>first name is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="lastName">Last Name</InputLabel>
            <Controller
              as={<TextField />}
              name="lastName"
              type="text"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.lastName && <Typography className={classes.error}>last name is a required field</Typography>}
          </Box>
        </Box>
        <Box className={classes.namePhoneBox}>
          <Box>
            <InputLabel required htmlFor="userName">Username</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.firstInput}
              name="userName"
              variant="outlined"
              type="text"
              control={control}
              defaultValue=""
              onBlur={validateUsername}
              rules={{ required: true }}
            />
            {errors.userName && <Typography className={classes.error}>username is a required field</Typography>}
            {errorState && <Typography className={classes.error}>Button is disabled until a unique username is chosen</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="phoneNumber">Phone Number</InputLabel>
            <Controller
              as={<TextField />}
              name="phoneNumber"
              variant="outlined"
              type="text"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.phoneNumber && <Typography className={classes.error}>phone number is a required field</Typography>}
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
        <InputLabel required htmlFor="legal">
          Are you over 18 years old?
          {errors.lastName && <span className={classes.errorLabel}>This field is required</span>}
          </InputLabel>
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
          rules={{ required: true }}
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
          defaultValue=""
        />
        <Box className={classes.btnBox}>
        <Typography className={classes.error}>* required field</Typography>
          <NextButton
            type="submit"
            label={"Next"}
            ariaLabel="Click here to complete step 1 and move onto step 2."
            onClick={handleSubmit}
            
          />
        </Box>
      </form>
    </Box>
  );
}
