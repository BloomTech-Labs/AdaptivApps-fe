import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import FormButton from "../../../theme/FormButton";
// Material-UI imports
import {
  makeStyles,
  Container,
  Box,
  InputLabel,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    maxwidth: "100%",
    width: "90%",
    marginLeft: "2.8rem",
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
  },
  nameBox: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 360,
      height: 48,
    },
  },
  firstInput: {
    marginRight: "2.4rem",
  },
  boxSpacing: {
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
  typeSelect: {
    width: 744,
    height: 48,
  },
});

export default function OrgStep1({ updateProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, setValue, errors, control } = useForm();

  const onSubmit = async data => {
    updateProfile({
      variables: {
        type: data.type,
        email: userEmail,
      },
    });

    alert("Successfully updated account information!");
    await navigate(`/updateaccount/${userEmail}/step2of6`);
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.boxSpacing}>
        <InputLabel htmlFor="orgName">Organization Name*</InputLabel>
        <Controller
          as={<TextField />}
          name="orgName"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel htmlFor="website">Organization Website*</InputLabel>
        <Controller
          as={<TextField />}
          name="website"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel htmlFor="phoneNumber">
          Please enter your phone number
        </InputLabel>
        <Controller
          as={<TextField />}
          name="phoneNumber"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.addressBox}>
        <Box className={classes.firstInput}>
          <InputLabel htmlFor="city">City*</InputLabel>
          <Controller
            as={<TextField />}
            name="city"
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
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
      </Box>
      <Box>
        <InputLabel className={classes.inputLabel} htmlFor="bio">
          Tell us about your organization
        </InputLabel>
        <Controller
          as={<TextField />}
          name="bio"
          variant="outlined"
          multiline
          rows="8"
          control={control}
        />
      </Box>
      <FormButton
        label="Finish"
        type="submit"
        ariaLabel="Click here to finish updating your organization information."
      />
    </form>
  );
}
