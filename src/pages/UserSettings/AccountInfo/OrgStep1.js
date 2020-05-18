import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import FormButton from "../../../theme/FormButton";
// Material-UI imports
import {
  makeStyles,
  Box,
  InputLabel,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  nameBox: {
    display: "flex",
    '& .MuiTextField-root': {
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

    alert("Successfully updated account type!");
    await navigate(`/updateaccount/${userEmail}/step2of6`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
            <InputLabel htmlFor="firstName">First Name*</InputLabel>
            <Controller
              as={<TextField />}
              className={classes.firstInput}
              name="firstName"
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
              variant="outlined"
              control={control}
              defaultValue=""
            />
          </Box>
          <FormButton label={"Finish"} />
    </form>
  )
}
