// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
// Material-UI imports
import {
  makeStyles,
  Container,
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
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
  },
  nameBox: {
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
    marginTop: "2.4rem",
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
    justifyContent: "flex-end",
  },
});

export default function Step1({ updateProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {
    updateProfile({
      variables: {
        email: userEmail,
        firstName: data.firstName,
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

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.nameBox}>
        <Box>
          <InputLabel required htmlFor="firstName">
            First Name
          </InputLabel>
          <Controller
            as={<TextField />}
            className={classes.firstInput}
            name="firstName"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
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
            defaultValue=""
          />
        </Box>
      </Box>
      <InputLabel htmlFor="phoneNumber">
        Please enter your phone number
      </InputLabel>
      <Controller
        as={<TextField />}
        name="phoneNumber"
        variant="outlined"
        type="text"
        control={control}
        defaultValue=""
      />
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
            defaultValue=""
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
            defaultValue=""
          />
        </Box>
      </Box>
      <InputLabel htmlFor="legal">Are you over 18 years old?</InputLabel>
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
        defaultValue=""
      />
      <Box className={classes.btnBox}>
        <NextButton
          type="submit"
          label={"Next"}
          ariaLabel="Click here to complete step 1 and move onto step 2."
          onClick={handleSubmit}
        />
      </Box>
    </form>
  );
}
